import React, { useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { narrate, stopNarration } from '../utils/audio.js';
import { wonderNarration } from '../utils/narration.js';
import { WONDER } from '../utils/lessonScript.js';
import { iso, makeFit, ptsAttr, cuboidFaces } from '../components/iso.js';

/* Ethan's fish tank: 50 cm × 30 cm × 40 cm, filled with water */
function FishTank() {
  const L = 50, W = 30, H = 40;
  const faces = cuboidFaces(L, W, H);
  const fit = makeFit(faces.flatMap(f => f.p3.map(iso)), 300, 200, 28);
  const P = p => fit(iso(p));
  const water = cuboidFaces(L, W, H * 0.9).filter(f => f.visible);
  const back = faces.filter(f => !f.visible);
  const front = faces.filter(f => f.visible);
  const mid = (a, b) => { const p = P(a), q = P(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  const lab = (pt, txt, dx = 0, dy = 0, anchor = 'middle') => (
    <text x={pt[0] + dx} y={pt[1] + dy} fill="#e2e8f0" fontSize="12" fontWeight="800" textAnchor={anchor}>{txt}</text>
  );
  const fish = (x, y, z, c) => { const [fx, fy] = P([x, y, z]); return (
    <g transform={`translate(${fx},${fy})`}>
      <ellipse rx="9" ry="5" fill={c} /><path d="M8 0 L15 -5 L15 5Z" fill={c} /><circle cx="-4" cy="-1" r="1.4" fill="#0c0424" />
    </g>); };
  return (
    <svg viewBox="0 0 300 200" className="w-40 sm:w-52 shrink-0 h-auto max-h-[20vh] drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]">
      {back.map(f => <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />)}
      {water.map(f => <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="#38bdf8" fillOpacity={f.key === 'top' ? 0.55 : 0.35} stroke="#7dd3fc" strokeWidth="1" />)}
      {fish(20, 30, 18, '#fb923c')}
      {fish(38, 30, 26, '#facc15')}
      {front.map(f => <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="#e0f2fe" fillOpacity="0.06" stroke="#e2e8f0" strokeWidth="2.2" strokeLinejoin="round" />)}
      {lab(mid([0, W, 0], [L, W, 0]), '50 cm', -10, 18)}
      {lab(mid([L, W, 0], [L, 0, 0]), '30 cm', 18, 16)}
      {lab(mid([L, 0, 0], [L, 0, H]), '40 cm', 8, 4, 'start')}
    </svg>
  );
}

export function WonderPhase({ muted, onNext }) {
  useEffect(() => {
    narrate(wonderNarration(), !muted);
    return () => stopNarration();
  }, [muted]);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none z-10">
      <BgSymbols />

      <div className="w-full max-w-2xl glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto">
        {/* Glowing Phase Band */}
        <div className="phase-band phase-band--wonder" />

        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🔍</span>
          <span className="text-purple-300 font-display font-800 text-xs sm:text-sm tracking-wider uppercase">
            Phase 1: Wonder & Curiosity
          </span>
        </div>

        <h2 className="text-main-heading text-purple-200 mb-3 max-w-xl">
          How Much Water Fills Ethan's Tank?
        </h2>

        {/* Feature Stat Box */}
        <div className="w-full bg-[#1e143c]/90 border border-purple-400/30 rounded-2xl p-4 sm:p-6 mb-4 flex flex-col items-center shadow-xl">
          <div className="text-number text-amber-300 text-4xl sm:text-6xl mb-1">
            60 Litres of Water!
          </div>
          <div className="flex items-center gap-4 w-full">
            <FishTank />
            <p className="text-body text-slate-200 text-left">
              {WONDER.paragraph}
            </p>
          </div>
        </div>

        {/* Mascot Thinking Bubble */}
        <div className="flex items-center gap-3 bg-[#14082c]/80 border border-purple-500/30 rounded-full px-5 py-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-purple-500/30 text-purple-200 flex items-center justify-center font-bold text-sm shrink-0">
            🤖
          </div>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold">
            {WONDER.question}
          </p>
        </div>

        <button onClick={onNext} className="btn-gold flex items-center gap-2">
          <span>Explore the Story</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
