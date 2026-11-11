/* =========================================================================
   AUDIO ENGINE — ElevenLabs "Alice" narration pipeline
   Voice: Alice (Clear, Engaging Educator) — Voice ID: Xb7hH8MSUJpSbSDYk0k2
   Model: eleven_multilingual_v2
   ---------------------------------------------------------------------------
   1. Cache check   → audioMap[text] (pre-generated static MP3, zero latency)
   2. Dynamic fetch → /api/elevenlabs dev proxy, then direct ElevenLabs API
   3. Last resort   → browser speechSynthesis (so lessons never go silent)
   narrate() plays segments sequentially, eagerly preloading segment i+1.
   ========================================================================= */
import { audioMap } from './audioMap.js';

export const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
export const MODEL_ID = 'eleven_multilingual_v2';
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

// Per-style ElevenLabs settings (rate/pitch are only used by the browser fallback)
export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true, rate: 1.06, pitch: 1.2 },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true, rate: 1.0,  pitch: 1.1 },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true, rate: 0.98, pitch: 1.08 },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true, rate: 0.95, pitch: 1.05 },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true, rate: 0.90, pitch: 0.95 },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true, rate: 1.0,  pitch: 1.0 },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true, rate: 1.0,  pitch: 1.0 }
};

const settingsFor = style => STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;

export let audioMuted = false;
let currentAudioElement = null;
let elevenLabsDisabled = false; // flips on auth/quota errors so we stop retrying
const urlCache = new Map();     // `${style}|${text}` -> Promise<string|null>

/* ---------------------------- URL resolution ---------------------------- */
async function fetchElevenLabs(text, style) {
  if (elevenLabsDisabled) return null;
  const s = settingsFor(style);
  const body = JSON.stringify({
    text,
    model_id: MODEL_ID,
    voice_settings: {
      stability: s.stability,
      similarity_boost: s.similarity_boost,
      style: s.style,
      use_speaker_boost: s.use_speaker_boost
    }
  });

  const attempts = [];
  if (import.meta.env.DEV) {
    // Vite dev server proxy (see vite.config.js) — key stays server-side
    attempts.push({ url: `/api/elevenlabs/v1/text-to-speech/${VOICE_ID}`, headers: {} });
  }
  if (API_KEY) {
    attempts.push({
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: { 'xi-api-key': API_KEY }
    });
  }

  for (const a of attempts) {
    try {
      const res = await fetch(a.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg', ...a.headers },
        body
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 0 && /audio|octet/.test(blob.type || 'audio/mpeg')) {
          return URL.createObjectURL(blob);
        }
      } else if (res.status === 401 || res.status === 402 || res.status === 429) {
        if (a.headers['xi-api-key']) elevenLabsDisabled = res.status !== 429;
      }
    } catch (e) {
      /* network / CORS error — try the next route */
    }
  }
  return null;
}

/** Resolve a playable URL for a phrase: static asset first, then ElevenLabs. */
export function getAudioUrl(text, style = 'statement') {
  if (!text) return Promise.resolve(null);
  if (audioMap[text]) return Promise.resolve(audioMap[text]);
  const key = `${style}|${text}`;
  if (!urlCache.has(key)) {
    const p = fetchElevenLabs(text, style).then(url => {
      if (!url) urlCache.delete(key); // allow a later retry
      return url;
    });
    urlCache.set(key, p);
  }
  return urlCache.get(key);
}

/* ------------------------------- Playback ------------------------------- */
function pickVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find(v => /female|alice|zira|samantha|victoria|google us english/i.test(v.name)) ||
    voices.find(v => v.lang && v.lang.startsWith('en')) ||
    voices[0]
  );
}
let ttsVoice = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => { ttsVoice = pickVoice(); };
  ttsVoice = pickVoice();
}

function fallbackSpeech(seg, queueId) {
  return new Promise(resolve => {
    if (queueId !== currentQueue || audioMuted || typeof window === 'undefined' || !('speechSynthesis' in window) || !seg.text) {
      return resolve();
    }
    const cfg = settingsFor(seg.style);
    const utter = new SpeechSynthesisUtterance(seg.text);
    if (ttsVoice) utter.voice = ttsVoice;
    utter.rate = cfg.rate;
    utter.pitch = cfg.pitch;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

function playUrl(url, seg, queueId) {
  return new Promise(resolve => {
    if (queueId !== currentQueue || audioMuted) return resolve();
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      } catch (e) {}
      currentAudioElement = null;
    }
    const audio = new Audio(url);
    currentAudioElement = audio;
    let settled = false;
    const done = () => {
      if (!settled) {
        settled = true;
        audio.onended = null;
        audio.onpause = null;
        audio.onerror = null;
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        resolve();
      }
    };
    audio.onended = done;
    audio.onpause = () => {
      if (queueId !== currentQueue) done();
    };
    audio.onerror = (e) => {
      console.warn("Audio element failed to load/play:", url, e);
      if (queueId === currentQueue && !audioMuted) {
        fallbackSpeech(seg, queueId).then(done);
      } else {
        done();
      }
    };
    audio.play().then(() => {
      if (queueId !== currentQueue || audioMuted) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) {}
        done();
      }
    }).catch((err) => {
      console.warn("audio.play() caught:", err);
      if (queueId === currentQueue && !audioMuted) {
        fallbackSpeech(seg, queueId).then(done);
      } else {
        done();
      }
    });
  });
}

let currentQueue = 0;

export function setMuted(m) {
  audioMuted = m;
  if (m) stopNarration();
}

/** Play an array of segments in order. A newer narrate() call cancels older ones. */
export async function narrate(segments, autoplay = true) {
  if (!autoplay || audioMuted) return;
  stopNarration();
  const myQueue = ++currentQueue;
  const list = (Array.isArray(segments) ? segments : [segments]).filter(s => s && s.text);
  if (!list.length) return;

  let pending = getAudioUrl(list[0].text, list[0].style);
  for (let i = 0; i < list.length; i++) {
    if (myQueue !== currentQueue || audioMuted) return;
    const url = await pending;
    if (myQueue !== currentQueue || audioMuted) return;
    // Eager preload of the next segment while this one plays
    pending = i + 1 < list.length ? getAudioUrl(list[i + 1].text, list[i + 1].style) : null;
    if (url) await playUrl(url, list[i], myQueue);
    else await fallbackSpeech(list[i], myQueue);
    if (myQueue !== currentQueue) return;
  }
}

export function stopNarration() {
  currentQueue++;
  if (currentAudioElement) {
    const el = currentAudioElement;
    currentAudioElement = null;
    try {
      el.pause();
      el.currentTime = 0;
    } catch (e) {}
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/* --------------------------- Segment helpers ---------------------------- */
export const say = text => ({ text, style: 'statement' });
export const ask = text => ({ text, style: 'question' });
export const cheer = text => ({ text, style: 'celebration' });
export const encourage = text => ({ text, style: 'encouragement' });
export const emphasize = text => ({ text, style: 'emphasis' });
export const think = text => ({ text, style: 'thinking' });
export const celebrate = text => ({ text, style: 'celebration' });
export const instruct = text => ({ text, style: 'instruction' });
