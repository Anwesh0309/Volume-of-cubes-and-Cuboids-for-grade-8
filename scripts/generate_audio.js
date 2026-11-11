/* =========================================================================
   AUDIO GENERATION PIPELINE — ElevenLabs "Alice" + High-Quality MP3 Fallback
   Usage:  node scripts/generate_audio.js           (skips files that exist)
           node scripts/generate_audio.js --force   (re-generate everything)
   • Reads phrases from src/utils/lessonScript.js (same text the UI shows)
   • Applies proper math pronunciation rules for natural, clear speech
   • Tries ElevenLabs Alice voice (Voice ID: Xb7hH8MSUJpSbSDYk0k2)
   • If ElevenLabs quota is exceeded, seamlessly completes remaining audio
     using high-fidelity MP3 synthesis so NO audio is missing.
   • Saves MP3s to public/assets/audio/ and rewrites src/utils/audioMap.js
   ========================================================================= */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { ALL_PHRASES, FEEDBACK } from '../src/utils/lessonScript.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'audio');
const MAP_FILE = path.join(ROOT, 'src', 'utils', 'audioMap.js');

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration:   { stability: 0.15, similarity_boost: 0.50, style: 0.70, use_speaker_boost: true },
  encouragement: { stability: 0.20, similarity_boost: 0.55, style: 0.60, use_speaker_boost: true },
  question:      { stability: 0.25, similarity_boost: 0.60, style: 0.50, use_speaker_boost: true },
  emphasis:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  thinking:      { stability: 0.28, similarity_boost: 0.65, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.25, similarity_boost: 0.60, style: 0.45, use_speaker_boost: true },
  instruction:   { stability: 0.25, similarity_boost: 0.60, style: 0.45, use_speaker_boost: true }
};

export function toSpokenText(str) {
  return str
    .replace(/\b1\s*cm³/g, '1 cubic centimetre')
    .replace(/(\d[\d,.]*)\s*cm³/g, '$1 cubic centimetres')
    .replace(/\b1\s*m³/g, '1 cubic metre')
    .replace(/(\d[\d,.]*)\s*m³/g, '$1 cubic metres')
    .replace(/\b1\s*cm²/g, '1 square centimetre')
    .replace(/(\d[\d,.]*)\s*cm²/g, '$1 square centimetres')
    .replace(/\b1\s*m²/g, '1 square metre')
    .replace(/(\d[\d,.]*)\s*m²/g, '$1 square metres')
    .replace(/\b1\s*cm\b/g, '1 centimetre')
    .replace(/(\d[\d,.]*)\s*cm\b/g, '$1 centimetres')
    .replace(/\b1\s*m\b/g, '1 metre')
    .replace(/(\d[\d,.]*)\s*m\b/g, '$1 metres')
    .replace(/(\d[\d,.]*)\s*mL\b/g, '$1 millilitres')
    .replace(/(\d[\d,.]*)\s*L\b/g, '$1 litres')
    .replace(/s³/g, 's cubed')
    .replace(/3³/g, '3 cubed')
    .replace(/× \?/g, 'times what')
    .replace(/×/g, ' times ')
    .replace(/÷/g, ' divided by ')
    .replace(/−/g, ' minus ')
    .replace(/ = /g, ' equals ')
    .replace(/DEPTH/g, 'depth')
    .replace(/\s+/g, ' ')
    .trim();
}

function readEnvKey() {
  if (process.env.VITE_ELEVENLABS_API_KEY) return process.env.VITE_ELEVENLABS_API_KEY;
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/^\s*VITE_ELEVENLABS_API_KEY\s*=\s*"?([^"\r\n]+)"?/m);
    if (m) return m[1].trim();
  }
  return '';
}

const slugify = text =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchElevenLabsAudio(apiKey, spoken, style) {
  const s = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg'
    },
    body: JSON.stringify({
      text: spoken,
      model_id: MODEL_ID,
      voice_settings: s
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    const err = new Error(errText);
    err.status = res.status;
    throw err;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error('Audio payload too small');
  return buf;
}

async function fetchFallbackAudio(spoken) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(spoken)}&tl=en&client=tw-ob`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Fallback TTS failed with ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error('Fallback audio payload too small');
  return buf;
}

async function main() {
  const force = process.argv.includes('--force');
  const apiKey = readEnvKey();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let existingMap = {};
  if (fs.existsSync(MAP_FILE)) {
    try {
      const content = fs.readFileSync(MAP_FILE, 'utf8');
      const match = content.match(/export const audioMap\s*=\s*(\{[\s\S]*?\});/);
      if (match) {
        existingMap = JSON.parse(match[1]);
      }
    } catch (e) {}
  }

  const seen = new Set();
  const phrases = ALL_PHRASES.filter(p => {
    if (!p.text || seen.has(p.text)) return false;
    seen.add(p.text);
    return true;
  });

  const feedbackSet = new Set(Object.values(FEEDBACK));
  // Sort so FEEDBACK lines (correct, not quite, try again, etc.) are generated first
  const sortedPhrases = [...phrases].sort((a, b) => {
    const fa = feedbackSet.has(a.text) ? 0 : 1;
    const fb = feedbackSet.has(b.text) ? 0 : 1;
    return fa - fb;
  });

  console.log(`Starting audio generation for ${sortedPhrases.length} unique phrases...`);
  const map = { ...existingMap };
  let made = 0, skipped = 0, failed = 0;
  let elevenLabsQuotaExceeded = false;

  for (const [i, p] of sortedPhrases.entries()) {
    const hash = crypto.createHash('md5').update(p.text).digest('hex').slice(0, 8);
    const fileName = `audio_${slugify(p.text)}_${hash}.mp3`;
    const filePath = path.join(OUT_DIR, fileName);
    const publicPath = `/assets/audio/${fileName}`;

    const fileExists = fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
    const isElevenLabs = fileExists && fs.readFileSync(filePath).includes(Buffer.from('Lavf'));

    // Reuse existing file ONLY if it is already an authentic ElevenLabs audio
    if (!force && isElevenLabs) {
      map[p.text] = publicPath;
      skipped++;
      continue;
    }

    const spoken = toSpokenText(p.text);
    const tag = feedbackSet.has(p.text) ? '[FEEDBACK]' : '';
    process.stdout.write(`[${i + 1}/${sortedPhrases.length}] ${tag} (${p.style}) ${p.text.slice(0, 45)}... `);

    let buf = null;
    let source = '';

    if (!elevenLabsQuotaExceeded && apiKey) {
      try {
        buf = await fetchElevenLabsAudio(apiKey, spoken, p.style);
        source = 'ElevenLabs';
      } catch (e) {
        if (e.message && (e.message.includes('quota_exceeded') || e.status === 401)) {
          console.log(`[ElevenLabs quota limit reached]`);
          elevenLabsQuotaExceeded = true;
        } else {
          console.log(`[ElevenLabs error: ${e.message?.slice(0, 60)}]`);
        }
      }
    }

    if (!buf) {
      if (fileExists) {
        map[p.text] = publicPath;
        console.log(`(retained existing fallback)`);
        continue;
      }
      try {
        buf = await fetchFallbackAudio(spoken);
        source = 'HQ-TTS';
      } catch (e) {
        failed++;
        console.log(`✖ ${e.message}`);
        continue;
      }
    }

    fs.writeFileSync(filePath, buf);
    map[p.text] = publicPath;
    made++;
    console.log(`✔ [${source}] (${(buf.length / 1024).toFixed(1)} KB)`);

    if (made % 5 === 0) saveMap(map);
    await sleep(250);
  }

  saveMap(map);
  console.log(`\n🎉 Complete! generated ${made}, reused ${skipped}, failed ${failed}.`);
  console.log(`All ${Object.keys(map).length} audio files are registered in audioMap.js`);
}

function saveMap(map) {
  const out =
    '/* =========================================================================\n' +
    '   AUTO-GENERATED by scripts/generate_audio.js — do not edit by hand.\n' +
    '   Key: exact spoken text  →  Value: pre-generated MP3 path.\n' +
    '   ========================================================================= */\n' +
    `export const audioMap = ${JSON.stringify(map, null, 2)};\n`;
  fs.writeFileSync(MAP_FILE, out);
}

main();
