import React, { useState, useEffect, useRef } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { narrate, stopNarration } from '../utils/audio.js';
import { getStoryNarration } from '../utils/narration.js';
import { STORY } from '../utils/lessonScript.js';

const STORY_META = [
  { title: "What Is Volume?", quote: "Volume = the space inside a 3D shape", bubble: "1 cm³ is a cube 1 cm long on every edge!" },
  { title: "Counting Unit Cubes", quote: "Cubes in one layer × number of layers", bubble: "Build it layer by layer!" },
  { title: "The Cuboid Formula", quote: "V = l × w × h = 6 × 4 × 5 = 120 cm³", bubble: "Base area × height works too!" },
  { title: "Cubes: All Edges Equal", quote: "V = s × s × s = s³ = 125 cm³", bubble: "Cube a number: multiply it by itself 3 times!" },
  { title: "Litres & Cubic Centimetres", quote: "1 cm³ = 1 mL   ·   1000 cm³ = 1 L", bubble: "A 10 cm cube holds exactly 1 litre!" },
  { title: "Working Backwards", quote: "h = V ÷ (l × w) = 240 ÷ 60 = 4 cm", bubble: "Divide the volume by the base area!" },
  { title: "Ethan's Fish Tank", quote: "50 × 30 × 40 = 60 000 cm³ = 60 L", bubble: "Divide by 1000 to get litres!" },
  { title: "Step Into the Simulation Lab!", quote: "Ready to become a volume engineer?", bubble: "Click below to enter the interactive lab!" }
];

// Body text comes from lessonScript.js so the narration matches it word-for-word
const STORY_SLIDES = STORY_META.map((m, i) => ({
  id: i + 1,
  image: `/assets/images/slide${i + 1}.png`,
  body: STORY[i].body,
  ...m
}));

export function StoryPhase({ muted, onDone, onSlideChange }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = STORY_SLIDES[slideIdx];

  const onSlideChangeRef = useRef(onSlideChange);
  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  useEffect(() => {
    if (onSlideChangeRef.current) {
      onSlideChangeRef.current(slideIdx + 1, STORY_SLIDES.length);
    }
  }, [slideIdx]);

  useEffect(() => {
    stopNarration();
    narrate(getStoryNarration(slideIdx), !muted);
    return () => stopNarration();
  }, [slideIdx, muted]);

  const playSlideAudio = () => {
    stopNarration();
    narrate(getStoryNarration(slideIdx), true);
  };

  const goNext = () => {
    stopNarration();
    if (slideIdx < STORY_SLIDES.length - 1) {
      setSlideIdx(i => i + 1);
    } else {
      onDone();
    }
  };

  const goPrev = () => {
    stopNarration();
    if (slideIdx > 0) setSlideIdx(i => i - 1);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      {/* Main Story Card with Maximum Grade 4 Visual Legibility & Scaled Image */}
      <div className="w-full max-w-5xl max-h-[92vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Left Column: Extra Large Image Illustration */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 h-80 sm:h-[420px] md:h-[450px] w-full bg-black/40 flex items-center justify-center shrink-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Column: Extra Large Typography & Callout Pills */}
        <div className="flex flex-col items-start text-left justify-center gap-4.5 overflow-y-auto max-h-full py-1">
          {/* Slide Title & Audio Listen Button */}
          <div className="w-full flex items-center justify-between gap-3">
            <h2 className="font-display font-900 text-3xl sm:text-4xl md:text-5xl text-amber-400 leading-tight drop-shadow-md">
              {slide.title}
            </h2>
            <button
              type="button"
              onClick={playSlideAudio}
              title="Listen to slide audio"
              className="bg-amber-400/20 hover:bg-amber-400/35 border-2 border-amber-400/60 text-amber-300 font-display font-900 text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2 transition cursor-pointer shrink-0 shadow-lg hover:scale-105 active:scale-95"
            >
              <span className="text-base sm:text-lg">🔊</span>
              <span>Listen</span>
            </button>
          </div>

          {/* Body Narrative */}
          <p className="text-slate-100 text-xl sm:text-2xl leading-relaxed font-extrabold drop-shadow-sm">
            {slide.body}
          </p>

          {/* Pull-Quote Sparkle Pill */}
          <div className="w-full bg-[#1e0e45] border-2 border-amber-400/60 rounded-2xl px-6 py-3.5 text-center text-amber-300 font-display font-900 text-lg sm:text-xl flex items-center justify-center gap-3 shadow-lg">
            <span className="shrink-0 text-2xl">✨</span>
            <span className="leading-snug">"{slide.quote}"</span>
            <span className="shrink-0 text-2xl">✨</span>
          </div>

          {/* Mascot Speech Bubble Pill */}
          <div className="flex items-center gap-4 w-full mt-1">
            <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-4xl shadow-lg shrink-0">
              🦁
            </div>
            <div className="bg-white text-[#0c031d] rounded-2xl px-7 py-3.5 font-display font-900 text-lg sm:text-xl shadow-xl flex-1 text-left leading-snug">
              {slide.bubble}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Row: Back, Dots, Next */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-3 z-20 shrink-0">
        <button
          onClick={goPrev}
          disabled={slideIdx === 0}
          className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/30 text-white font-display font-900 text-xl sm:text-2xl px-10 py-4 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-xl hover:scale-105"
        >
          ← Back
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-3.5">
          {STORY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                stopNarration();
                setSlideIdx(i);
              }}
              className={`rounded-full transition-all cursor-pointer ${
                i === slideIdx
                  ? 'w-4.5 h-4.5 bg-amber-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]'
                  : 'w-3.5 h-3.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="btn-gold text-xl sm:text-2xl px-11 py-4 font-900 flex items-center gap-2 shadow-[0_0_35px_rgba(250,204,21,0.85)] hover:scale-105"
        >
          <span>{slideIdx === STORY_SLIDES.length - 1 ? 'Enter Lab 🧪' : 'Next'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
