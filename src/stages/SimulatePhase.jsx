import React, { useState, useEffect, useRef } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { narrate, stopNarration } from '../utils/audio.js';
import { simulateStationIntro, feedbackNarration } from '../utils/narration.js';
import { iso, makeFit, ptsAttr, cuboidFaces, unitCubeFaces, cubeOrder } from '../components/iso.js';

/* =========================================================================
   SIMULATION STATIONS — Volume of Cubes & Cuboids (Grade 8)
   Station 1 · Cube Builder   → SEE volume as layers of unit cubes
   Station 2 · Tank Filler    → TRY it: set the water level, compute V & litres
   Station 3 · Box Designer   → WORK BACKWARDS / design boxes for a volume
   ========================================================================= */

const fmt = n => (Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))));
const close = (a, b) => Math.abs(a - b) < 0.011;
const LAYER_COLORS = ['#38bdf8', '#facc15', '#f472b6', '#4ade80', '#c084fc'];

/* ------------------------------------------------------------------------
   STATION DATA
   ------------------------------------------------------------------------ */
const STATION_ACTIVITIES = {
  1: [
    {
      id: 1,
      title: "Activity 1: Sugar Cube Box",
      desc: "A box holds 1 cm sugar cubes. It is 4 cm long, 3 cm wide and 2 cm high. Fill the bottom layer, stack the layers, then count all the cubes!",
      icon: "🧊",
      unit: "cm",
      L: 4, W: 3, H: 2,
      hint: "One layer has 4 × 3 = 12 cubes. There are 2 layers."
    },
    {
      id: 2,
      title: "Activity 2: Toy Block Crate",
      desc: "Leo packs 1 cm toy blocks into a crate 5 cm long, 4 cm wide and 3 cm high. Build it layer by layer and find its volume!",
      icon: "🧱",
      unit: "cm",
      L: 5, W: 4, H: 3,
      hint: "One layer has 5 × 4 = 20 blocks. Stack 3 layers: 20 × 3."
    },
    {
      id: 3,
      title: "Activity 3: Giant Dice",
      desc: "A giant dice is a cube with 3 cm edges, made of 1 cm cubes. Build it and count — what do you notice about a cube's volume?",
      icon: "🎲",
      unit: "cm",
      L: 3, W: 3, H: 3,
      hint: "A cube: 3 × 3 × 3 = 3³. Every edge is the same!"
    }
  ],
  2: [
    {
      id: 1,
      title: "Activity 1: Ethan's Aquarium",
      desc: "Ethan's tank is 50 cm long, 30 cm wide and 40 cm tall. Fill it right to the top, then find the volume of water and change it into litres.",
      icon: "🐠",
      unit: "cm",
      L: 50, W: 30, H: 40,
      target: 40, step: 1,
      groups: [
        { label: 'Base area', formula: '50 × 30', answer: 1500, unit: 'cm²' },
        { label: 'Volume of water', formula: '1500 × 40', answer: 60000, unit: 'cm³' },
        { label: 'In litres', formula: '60 000 ÷ 1000', answer: 60, unit: 'L' }
      ],
      hint: "Volume = base area × water depth. Then 1000 cm³ = 1 litre."
    },
    {
      id: 2,
      title: "Activity 2: Half-Full Water Tank",
      desc: "A water tank is 40 cm long, 25 cm wide and 30 cm tall. It is filled to a depth of 20 cm. Set the water level, then find how much water is inside.",
      icon: "🚰",
      unit: "cm",
      L: 40, W: 25, H: 30,
      target: 20, step: 1,
      groups: [
        { label: 'Base area', formula: '40 × 25', answer: 1000, unit: 'cm²' },
        { label: 'Volume of water', formula: '1000 × 20', answer: 20000, unit: 'cm³' },
        { label: 'In litres', formula: '20 000 ÷ 1000', answer: 20, unit: 'L' }
      ],
      hint: "Use the water DEPTH (20 cm), not the height of the tank!"
    },
    {
      id: 3,
      title: "Activity 3: School Swimming Pool",
      desc: "A pool is 25 m long, 10 m wide and 2 m deep. It is filled to a depth of 1.5 m. Set the level, then find the volume of water. (1 m³ = 1000 L)",
      icon: "🏊",
      unit: "m",
      L: 25, W: 10, H: 2,
      target: 1.5, step: 0.1,
      groups: [
        { label: 'Base area', formula: '25 × 10', answer: 250, unit: 'm²' },
        { label: 'Volume of water', formula: '250 × 1.5', answer: 375, unit: 'm³' },
        { label: 'In litres', formula: '375 × 1000', answer: 375000, unit: 'L' }
      ],
      hint: "In metres: 1 m³ holds 1000 litres, so multiply by 1000."
    }
  ],
  3: [
    {
      id: 1,
      title: "Activity 1: Lunch Box Height",
      desc: "A lunch box has a volume of 360 cm³. Its base is 12 cm long and 6 cm wide. How tall is it?",
      icon: "🍱",
      type: 'steps',
      unit: "cm",
      known: { L: 12, W: 6, H: 5 },
      unknownKey: 'H',
      start: 2,
      steps: [
        { text: "Base area = 12 × 6 =", answer: 72, unit: "cm²" },
        { text: "Height h = 360 ÷ 72 =", answer: 5, unit: "cm" }
      ],
      hint: "Volume = base area × height, so height = volume ÷ base area."
    },
    {
      id: 2,
      title: "Activity 2: Mystery Cube Box",
      desc: "A cube-shaped storage box has a volume of 512 cm³. How long is each edge?",
      icon: "📦",
      type: 'steps',
      unit: "cm",
      known: { L: 8, W: 8, H: 8 },
      unknownKey: 'all',
      start: 4,
      steps: [
        { text: "Edge s, where s × s × s = 512. s =", answer: 8, unit: "cm" },
        { text: "Check: area of the bottom face = s × s =", answer: 64, unit: "cm²" },
        { text: "64 × 8 =", answer: 512, unit: "cm³" }
      ],
      hint: "Try numbers: 7 × 7 × 7 = 343 (too small). Try the next number!"
    },
    {
      id: 3,
      title: "Activity 3: Design 3 Boxes",
      desc: "Ethan wants boxes that hold exactly 36 unit cubes. Every edge must be a whole number of at least 2 cm. Find all 3 different boxes!",
      icon: "✏️",
      type: 'design',
      unit: "cm",
      target: 36,
      need: 3,
      hint: "Split 36 into three factors, all 2 or more. Try starting with 2 × 2 × ?, then 2 × 3 × ?, then 3 × 3 × ?."
    }
  ]
};

/* ------------------------------------------------------------------------
   STATION 1 — UNIT CUBE STACK
   ------------------------------------------------------------------------ */
function CubeStack({ L, W, H, cells, layers }) {
  const VW = 400, VH = 300;
  const box = cuboidFaces(L, W, H);
  const fit = makeFit(box.flatMap(f => f.p3.map(iso)), VW, VH, 44);
  const P = p => fit(iso(p));
  const cubes = [];
  for (let z = 0; z < layers; z++) cells.forEach(k => { const [x, y] = k.split(',').map(Number); cubes.push([x, y, z]); });
  cubes.sort(cubeOrder);
  const mid = (a, b) => { const p = P(a), q = P(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  const pL = mid([0, W, 0], [L, W, 0]), pW = mid([L, W, 0], [L, 0, 0]), pH = mid([L, 0, 0], [L, 0, H]);
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
      {box.filter(f => !f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="none" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="5 4" />
      ))}
      {cubes.map(([x, y, z]) => {
        const f = unitCubeFaces(x, y, z);
        const c = LAYER_COLORS[z % LAYER_COLORS.length];
        return (
          <g key={`${x}-${y}-${z}`} className="fade-in-up">
            <polygon points={ptsAttr(f.top.map(P))} fill={c} fillOpacity="0.95" stroke="#0c0424" strokeWidth="1.2" />
            <polygon points={ptsAttr(f.front.map(P))} fill={c} fillOpacity="0.62" stroke="#0c0424" strokeWidth="1.2" />
            <polygon points={ptsAttr(f.right.map(P))} fill={c} fillOpacity="0.4" stroke="#0c0424" strokeWidth="1.2" />
          </g>
        );
      })}
      {box.filter(f => f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="none" stroke="#e2e8f0" strokeWidth="1.6" strokeDasharray="5 4" opacity="0.7" />
      ))}
      <text x={pL[0] - 10} y={pL[1] + 22} fill="#fde047" fontSize="14" fontWeight="900" textAnchor="middle">l = {L}</text>
      <text x={pW[0] + 22} y={pW[1] + 18} fill="#fde047" fontSize="14" fontWeight="900" textAnchor="middle">w = {W}</text>
      <text x={pH[0] + 10} y={pH[1]} fill="#fde047" fontSize="14" fontWeight="900" dominantBaseline="middle">h = {H}</text>
    </svg>
  );
}

/* ------------------------------------------------------------------------
   STATION 2 — GLASS TANK WITH WATER
   ------------------------------------------------------------------------ */
function WaterTank({ L, W, H, level, unit, target }) {
  const VW = 400, VH = 300;
  const box = cuboidFaces(L, W, H);
  const fit = makeFit(box.flatMap(f => f.p3.map(iso)), VW, VH, 46);
  const P = p => fit(iso(p));
  const water = level > 0 ? cuboidFaces(L, W, level).filter(f => f.visible) : [];
  const mid = (a, b) => { const p = P(a), q = P(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  const pL = mid([0, W, 0], [L, W, 0]), pW = mid([L, W, 0], [L, 0, 0]), pH = mid([L, 0, 0], [L, 0, H]);
  const tgt = P([0, W, target]);
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
      {box.filter(f => !f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="#0ea5e9" fillOpacity="0.03" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="5 4" />
      ))}
      {water.map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="#38bdf8" fillOpacity={f.key === 'top' ? 0.6 : 0.38} stroke="#7dd3fc" strokeWidth="1" />
      ))}
      {box.filter(f => f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="#e0f2fe" fillOpacity="0.05" stroke="#e2e8f0" strokeWidth="2.2" strokeLinejoin="round" />
      ))}
      {/* target mark on the left edge */}
      <line x1={tgt[0] - 26} y1={tgt[1]} x2={tgt[0] - 4} y2={tgt[1]} stroke="#f472b6" strokeWidth="3" />
      <text x={tgt[0] - 30} y={tgt[1]} fill="#f472b6" fontSize="12" fontWeight="900" textAnchor="end" dominantBaseline="middle">target {fmt(target)}</text>
      {level > 0 && (() => {
        const c = P([L / 2, W, level / 2]);
        return <text x={c[0]} y={c[1]} fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" dominantBaseline="middle" style={{ paintOrder: 'stroke', stroke: '#0c4a6e', strokeWidth: 4 }}>water {fmt(level)} {unit}</text>;
      })()}
      <text x={pL[0] - 10} y={pL[1] + 22} fill="#fde047" fontSize="14" fontWeight="900" textAnchor="middle">{L} {unit}</text>
      <text x={pW[0] + 22} y={pW[1] + 18} fill="#fde047" fontSize="14" fontWeight="900" textAnchor="middle">{W} {unit}</text>
      <text x={pH[0] + 10} y={pH[1]} fill="#fde047" fontSize="14" fontWeight="900" dominantBaseline="middle">{H} {unit}</text>
    </svg>
  );
}

/* ------------------------------------------------------------------------
   STATION 3 — BOXES
   ------------------------------------------------------------------------ */
function SolidBox({ L, W, H, labels, done, VW = 400, VH = 300, pad = 46, small }) {
  const box = cuboidFaces(L, W, H);
  const fit = makeFit(box.flatMap(f => f.p3.map(iso)), VW, VH, pad);
  const P = p => fit(iso(p));
  const col = { top: '#facc15', front: '#f472b6', right: '#38bdf8' };
  const mid = (a, b) => { const p = P(a), q = P(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  const pL = mid([0, W, 0], [L, W, 0]), pW = mid([L, W, 0], [L, 0, 0]), pH = mid([L, 0, 0], [L, 0, H]);
  const fs = small ? 11 : 14;
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full">
      {box.filter(f => !f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 4" />
      ))}
      {box.filter(f => f.visible).map(f => (
        <polygon key={f.key} points={ptsAttr(f.p3.map(P))} fill={col[f.key]} fillOpacity={done ? 0.55 : 0.28} stroke={col[f.key]} strokeWidth="2.2" strokeLinejoin="round" />
      ))}
      {labels && (
        <>
          <text x={pL[0] - 8} y={pL[1] + fs + 6} fill="#fde047" fontSize={fs} fontWeight="900" textAnchor="middle">{labels.L}</text>
          <text x={pW[0] + 16} y={pW[1] + fs + 2} fill="#fde047" fontSize={fs} fontWeight="900" textAnchor="middle">{labels.W}</text>
          <text x={pH[0] + 8} y={pH[1]} fill={labels.H.includes('?') ? '#f472b6' : '#fde047'} fontSize={fs} fontWeight="900" dominantBaseline="middle">{labels.H}</text>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------------
   MAIN COMPONENT
   ------------------------------------------------------------------------ */
export function SimulatePhase({ muted, onNext }) {
  const [station, setStation] = useState(1);
  const [actIdx, setActIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Station 1
  const [cells, setCells] = useState([]);
  const [layers, setLayers] = useState(1);
  const [totalAns, setTotalAns] = useState('');

  // Station 2
  const [level, setLevel] = useState(0);
  const [levelOk, setLevelOk] = useState(false);
  const [groupAns, setGroupAns] = useState({});
  const [groupOk, setGroupOk] = useState({});

  // Station 3
  const [stepIdx, setStepIdx] = useState(0);
  const [stepAns, setStepAns] = useState('');
  const [stepWrong, setStepWrong] = useState(false);
  const [grow, setGrow] = useState(0);
  const [dims, setDims] = useState({ l: '', w: '', h: '' });
  const [designs, setDesigns] = useState([]);
  const animRef = useRef(null);

  const currentActivity = STATION_ACTIVITIES[station][actIdx];
  const say = list => narrate(list, !muted);

  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setShowHint(false);
    setFeedback(null);
    setCells([]);
    setLayers(1);
    setTotalAns('');
    setLevel(0);
    setLevelOk(false);
    setGroupAns({});
    setGroupOk({});
    setStepIdx(0);
    setStepAns('');
    setStepWrong(false);
    setGrow(0);
    setDims({ l: '', w: '', h: '' });
    setDesigns([]);

    stopNarration();
    // Speak the station intro on first activity, or speak the activity guidance
    if (actIdx === 0) {
      narrate([
        ...simulateStationIntro(station),
        { text: currentActivity.desc, style: 'instruction' }
      ], !muted);
    } else {
      narrate({ text: currentActivity.desc, style: 'instruction' }, !muted);
    }

    return () => stopNarration();
  }, [station, actIdx, muted]);

  const animate = (from, to, setter, ms = 900) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = performance.now();
    const step = now => {
      const k = Math.min(1, (now - start) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setter(from + (to - from) * e);
      if (k < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  /* ---------- Station 1 ---------- */
  const a1 = currentActivity;
  const perLayer = station === 1 ? a1.L * a1.W : 0;
  const layerFull = station === 1 && cells.length === perLayer;
  const toggleCell = (x, y) => {
    const k = `${x},${y}`;
    setLayers(1);
    setCells(c => (c.includes(k) ? c.filter(v => v !== k) : [...c, k]));
  };
  const fillRow = y => {
    setLayers(1);
    setCells(c => {
      const add = [...Array(a1.L)].map((_, x) => `${x},${y}`).filter(k => !c.includes(k));
      return [...c, ...add];
    });
  };
  const checkCubes = () => {
    const V = a1.L * a1.W * a1.H;
    if (close(parseFloat(totalAns), V)) {
      setCells([...Array(a1.L * a1.W)].map((_, i) => `${i % a1.L},${Math.floor(i / a1.L)}`));
      setLayers(a1.H);
      setFeedback({ success: true, text: `🎉 ${a1.L} × ${a1.W} = ${perLayer} cubes per layer × ${a1.H} layers = ${V} ${a1.unit}³. So V = l × w × h!` });
      say(feedbackNarration.splitDone());
    } else {
      setFeedback({ success: false, text: `Not quite! Count the cubes in ONE layer, then multiply by the number of layers.` });
      say(feedbackNarration.tryAgain());
    }
  };

  /* ---------- Station 2 ---------- */
  const checkLevel = () => {
    if (close(level, currentActivity.target)) {
      setLevelOk(true);
      setFeedback({ success: true, text: `✅ Water level set to ${fmt(currentActivity.target)} ${currentActivity.unit}. Now calculate the water's volume!` });
    } else {
      setFeedback({ success: false, text: `The water is at ${fmt(level)} ${currentActivity.unit}. Drag it to exactly ${fmt(currentActivity.target)} ${currentActivity.unit}.` });
      say(feedbackNarration.tryAgain());
    }
  };
  const checkWater = () => {
    const ok = {};
    currentActivity.groups.forEach((g, i) => { ok[i] = close(parseFloat(groupAns[i]), g.answer); });
    setGroupOk(ok);
    if (Object.values(ok).every(Boolean)) {
      const g = currentActivity.groups;
      setFeedback({ success: true, text: `🎉 ${g[1].answer.toLocaleString()} ${g[1].unit} = ${g[2].answer.toLocaleString()} litres of water!` });
      say(feedbackNarration.buildDone());
    } else {
      setFeedback({ success: false, text: "Some boxes are red — check those calculations again!" });
      say(feedbackNarration.tryAgain());
    }
  };

  /* ---------- Station 3 ---------- */
  const isSteps = station === 3 && currentActivity.type === 'steps';
  const s3Done = isSteps && stepIdx >= currentActivity.steps.length;
  const checkStep = () => {
    const st = currentActivity.steps[stepIdx];
    if (close(parseFloat(stepAns), st.answer)) {
      const next = stepIdx + 1;
      setStepIdx(next);
      setStepAns('');
      setStepWrong(false);
      const growAt = currentActivity.unknownKey === 'all' ? 1 : currentActivity.steps.length;
      if (next === growAt) animate(0, 1, setGrow, 1100);
      if (next >= currentActivity.steps.length) {
        setFeedback({ success: true, text: `🎉 Solved! The box snaps to its real size.` });
        say(feedbackNarration.reverseDone());
      } else {
        setFeedback(null);
      }
    } else {
      setStepWrong(true);
      setFeedback({ success: false, text: "Not quite — check this step. Use the 💡 Hint if you're stuck!" });
      say(feedbackNarration.tryAgain());
    }
  };
  const addDesign = () => {
    const v = [dims.l, dims.w, dims.h].map(Number);
    const a = currentActivity;
    if (v.some(n => !Number.isInteger(n) || n <= 0)) {
      setFeedback({ success: false, text: "Enter three whole numbers for length, width and height." });
      return;
    }
    if (v.some(n => n < 2)) {
      setFeedback({ success: false, text: "Every edge must be at least 2 cm long." });
      return;
    }
    const V = v[0] * v[1] * v[2];
    if (V !== a.target) {
      setFeedback({ success: false, text: `${v.join(' × ')} = ${V} cubes. We need exactly ${a.target}!` });
      say(feedbackNarration.tryAgain());
      return;
    }
    const key = [...v].sort((p, q) => p - q).join('×');
    if (designs.some(d => d.key === key)) {
      setFeedback({ success: false, text: "You already found that box — turning it around doesn't make a new box!" });
      return;
    }
    const next = [...designs, { key, v }];
    setDesigns(next);
    setDims({ l: '', w: '', h: '' });
    if (next.length >= a.need) {
      setFeedback({ success: true, text: `🎉 All ${a.need} boxes found! Different shapes, the same volume of ${a.target} cm³.` });
      say(feedbackNarration.reverseDone());
    } else {
      setFeedback({ success: true, text: `✅ ${v.join(' × ')} = ${a.target}. ${a.need - next.length} more to find!` });
    }
  };

  const s3Visual = () => {
    const a = currentActivity;
    const lerp = (p, q) => p + (q - p) * grow;
    if (a.unknownKey === 'all') {
      const s = lerp(a.start, a.known.L);
      const lb = stepIdx >= 1 ? `${a.known.L} cm` : 's = ?';
      return <SolidBox L={s} W={s} H={s} labels={{ L: lb, W: lb, H: lb }} done={s3Done} />;
    }
    const h = lerp(a.start, a.known.H);
    return <SolidBox L={a.known.L} W={a.known.W} H={h} labels={{ L: `${a.known.L} cm`, W: `${a.known.W} cm`, H: stepIdx >= a.steps.length ? `${a.known.H} cm` : 'h = ?' }} done={s3Done} />;
  };

  /* ---------- Navigation ---------- */
  const nextActivity = () => {
    if (actIdx < 2) {
      setActIdx(i => i + 1);
    } else if (station < 3) {
      setStation(s => s + 1);
      setActIdx(0);
    } else {
      onNext();
    }
  };

  const prevActivity = () => {
    if (actIdx > 0) {
      setActIdx(i => i - 1);
    } else if (station > 1) {
      setStation(s => s - 1);
      setActIdx(2);
    }
  };

  const STATIONS = [
    { n: 1, icon: '🧊', name: 'Station 1: Cube Builder', sub: 'Stack unit cubes in layers' },
    { n: 2, icon: '🚰', name: 'Station 2: Tank Filler', sub: 'Fill tanks & find litres' },
    { n: 3, icon: '📐', name: 'Station 3: Box Designer', sub: 'Work backwards & design' }
  ];

  const inputCls = ok =>
    `bg-[#14082c] border-2 rounded-xl px-3 py-2 text-white font-display font-900 text-base text-center outline-none w-24 shadow-inner ${
      ok === true ? 'border-emerald-400' : ok === false ? 'border-rose-400' : 'border-cyan-400/70 focus:border-amber-400'
    }`;

  const handleToggleHint = () => {
    if (showHint) {
      setShowHint(false);
      stopNarration();
    } else {
      setShowHint(true);
      stopNarration();
      narrate({ text: currentActivity.hint, style: 'thinking' }, !muted);
    }
  };

  const hintBtn = (
    <button
      onClick={handleToggleHint}
      className={`border font-display font-900 text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
        showHint
          ? 'bg-amber-400 text-slate-950 border-amber-300'
          : 'bg-purple-900/80 hover:bg-purple-800 border-purple-400/50 text-purple-200'
      }`}
    >
      <span>💡</span>
      <span>{showHint ? "Hide Hint" : "Hint"}</span>
    </button>
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      {/* Main Simulation Stations Glass Card Container */}
      <div className="w-full max-w-6xl max-h-[94vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Cyan Accent Bar */}
        <div className="w-24 h-2 bg-cyan-400 rounded-full mb-2.5 shadow-[0_0_18px_rgba(56,189,248,0.85)] shrink-0" />

        {/* Card Header Title */}
        <h2 className="font-display font-900 text-2xl sm:text-3xl text-white flex items-center gap-3 mb-3.5 shrink-0">
          <span className="text-3xl sm:text-4xl">🧪</span>
          <span>Simulation Stations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 w-full items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column: Station Sidebar Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 shrink-0">
            <div className="flex flex-col gap-3.5">
              {STATIONS.map(s => (
                <button
                  key={s.n}
                  onClick={() => {
                    stopNarration();
                    setStation(s.n);
                    setActIdx(0);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                    station === s.n
                      ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                      : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                      station === s.n ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                    }`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-display font-900 text-base sm:text-lg leading-tight">{s.name}</p>
                      <p className="text-xs font-extrabold text-slate-300 mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                  <span className="text-base">🔓</span>
                </button>
              ))}
            </div>

            {/* Bottom Left CTA Button */}
            <button
              onClick={() => {
                stopNarration();
                onNext();
              }}
              className="btn-gold font-display font-900 text-base sm:text-lg py-4 px-6 shadow-[0_0_25px_rgba(250,204,21,0.65)] hover:scale-105 transition mt-2 w-full flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Go to Practice Phase!</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Interactive Simulation Box */}
          <div className="md:col-span-8 bg-[#13092e]/95 border-2 border-purple-400/35 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-inner flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 justify-between">
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3 shrink-0 gap-3">
                <h3 className="font-display font-900 text-xl sm:text-2xl text-cyan-300 flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{currentActivity.icon}</span>
                  <span>{currentActivity.title}</span>
                </h3>
                <span className="font-display font-900 text-xs sm:text-sm text-slate-200 bg-white/10 px-4 py-1 rounded-full border border-white/15 shrink-0">
                  Activity {actIdx + 1} of 3
                </span>
              </div>

              {/* Activity Description */}
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-extrabold mb-3 shrink-0">
                {currentActivity.desc}
              </p>

              {/* ===================== STATION 1: CUBE BUILDER ===================== */}
              {station === 1 && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">
                    <CubeStack L={a1.L} W={a1.W} H={a1.H} cells={cells} layers={layers} />
                  </div>

                  <div className="w-60 sm:w-64 shrink-0 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">① Fill the bottom layer ({cells.length}/{perLayer})</p>
                    <div className="flex flex-col gap-1 bg-[#14082c] p-2 rounded-xl border border-cyan-400/30">
                      {[...Array(a1.W)].map((_, y) => (
                        <div key={y} className="flex items-center gap-1">
                          <button onClick={() => fillRow(y)} title="Fill this row" className="text-[10px] font-900 text-cyan-300 bg-white/10 hover:bg-white/20 rounded px-1.5 py-1 cursor-pointer">row ▶</button>
                          {[...Array(a1.L)].map((_, x) => {
                            const on = cells.includes(`${x},${y}`);
                            return (
                              <button
                                key={x}
                                onClick={() => toggleCell(x, y)}
                                className={`w-7 h-7 rounded-md border-2 transition cursor-pointer ${on ? 'bg-sky-400 border-sky-200 scale-105' : 'bg-white/5 border-white/20 hover:border-cyan-300'}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider mt-1">② Stack the layers ({layers}/{a1.H})</p>
                    <div className="flex gap-2">
                      <button
                        disabled={!layerFull || layers >= a1.H}
                        onClick={() => setLayers(n => Math.min(a1.H, n + 1))}
                        className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400/60 text-cyan-200 font-display font-900 text-sm py-2 rounded-xl cursor-pointer transition disabled:opacity-35 disabled:cursor-not-allowed"
                      >
                        ＋ Add a layer
                      </button>
                      <button
                        disabled={layers <= 1}
                        onClick={() => setLayers(n => Math.max(1, n - 1))}
                        className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-display font-900 text-sm px-3 py-2 rounded-xl cursor-pointer transition disabled:opacity-35 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                    </div>
                    {!layerFull && <p className="text-xs font-bold text-slate-400 italic">Finish the bottom layer before stacking.</p>}
                    <div className="bg-[#14082c] rounded-xl px-3 py-2 border border-white/10 text-xs font-900 text-slate-200 flex justify-between">
                      <span>Cubes so far</span>
                      <span className="text-amber-300">{cells.length * layers}</span>
                    </div>

                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider mt-1">③ Volume of the full box</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number" placeholder="Total" value={totalAns}
                        onChange={e => setTotalAns(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && checkCubes()}
                        className={inputCls(feedback ? feedback.success : null) + ' flex-1'}
                      />
                      <span className="text-sm font-900 text-slate-300">{a1.unit}³</span>
                    </div>
                    <div className="flex gap-2">
                      <button disabled={totalAns === ''} onClick={checkCubes} className="btn-gold flex-1 text-sm font-900 px-3 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
                        Check ✨
                      </button>
                      {hintBtn}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== STATION 2: TANK FILLER ===================== */}
              {station === 2 && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex items-center justify-center">
                    <WaterTank L={currentActivity.L} W={currentActivity.W} H={currentActivity.H} level={level} unit={currentActivity.unit} target={currentActivity.target} />
                  </div>

                  <div className="w-64 sm:w-72 shrink-0 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
                    {!levelOk ? (
                      <>
                        <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">① Pour water to depth {fmt(currentActivity.target)} {currentActivity.unit}</p>
                        <div className="flex items-center gap-2 bg-[#14082c] px-3 py-2 rounded-xl border border-cyan-400/30">
                          <span className="text-sm">🚰</span>
                          <input
                            type="range" min="0" max={currentActivity.H} step={currentActivity.step} value={level}
                            onChange={e => { setLevel(Number(e.target.value)); setFeedback(null); }}
                            className="flex-1 accent-cyan-400 cursor-pointer"
                          />
                          <span className="text-xs font-900 text-sky-300 w-14 text-right">{fmt(level)} {currentActivity.unit}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setLevel(l => Math.max(0, Number((l - currentActivity.step).toFixed(2))))} className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-900 text-sm px-3 py-2 rounded-xl cursor-pointer">−</button>
                          <button onClick={() => setLevel(l => Math.min(currentActivity.H, Number((l + currentActivity.step).toFixed(2))))} className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-900 text-sm px-3 py-2 rounded-xl cursor-pointer">＋</button>
                          <button onClick={checkLevel} className="btn-gold flex-1 text-sm font-900 px-3 py-2.5">Check level ✨</button>
                        </div>
                        <p className="text-xs font-bold text-slate-400 italic">The pink mark shows where the water should reach.</p>
                        <div className="flex">{hintBtn}</div>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">② Calculate the water</p>
                        {currentActivity.groups.map((g, i) => (
                          <div key={i} className="bg-[#14082c] rounded-xl p-2.5 border-2 border-sky-400/40">
                            <p className="text-xs font-900 text-sky-300">{g.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-900 text-slate-200 flex-1">{g.formula} =</span>
                              <input type="number" value={groupAns[i] || ''} onChange={e => setGroupAns(s => ({ ...s, [i]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && checkWater()} className={inputCls(groupOk[i])} />
                              <span className="text-[11px] font-900 text-slate-300 w-7">{g.unit}</span>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <button onClick={checkWater} className="btn-gold flex-1 text-sm font-900 px-3 py-2.5">Check ✨</button>
                          {hintBtn}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ===================== STATION 3: BOX DESIGNER ===================== */}
              {station === 3 && isSteps && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex flex-col items-center justify-center gap-2">
                    <div className="flex-1 min-h-0 w-full flex items-center justify-center">{s3Visual()}</div>
                    <div className="w-full">
                      <div className="flex justify-between text-xs font-900 text-slate-300 mb-1">
                        <span>Steps solved</span>
                        <span className="text-amber-300">{Math.min(stepIdx, currentActivity.steps.length)} / {currentActivity.steps.length}</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/15">
                        <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${(Math.min(stepIdx, currentActivity.steps.length) / currentActivity.steps.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="w-64 sm:w-72 shrink-0 flex flex-col gap-2 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">Solve it step by step</p>
                    {currentActivity.steps.map((st, i) => {
                      const doneStep = i < stepIdx;
                      const active = i === stepIdx;
                      return (
                        <div
                          key={i}
                          className={`rounded-xl p-2.5 border-2 transition ${
                            doneStep ? 'bg-emerald-950/70 border-emerald-400/60' : active ? 'bg-[#14082c] border-amber-400/70' : 'bg-[#14082c]/50 border-white/10 opacity-40'
                          }`}
                        >
                          <p className="text-xs font-900 text-slate-100">{i + 1}. {st.text}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {doneStep ? (
                              <span className="text-sm font-900 text-emerald-300">✔ {st.answer} {st.unit}</span>
                            ) : (
                              <>
                                <input
                                  type="number" disabled={!active} value={active ? stepAns : ''} placeholder="?"
                                  onChange={e => { setStepAns(e.target.value); setStepWrong(false); }}
                                  onKeyDown={e => e.key === 'Enter' && active && checkStep()}
                                  className={inputCls(active && stepWrong ? false : null) + ' flex-1 disabled:opacity-50'}
                                />
                                <span className="text-xs font-900 text-slate-300">{st.unit}</span>
                                {active && (
                                  <button onClick={checkStep} disabled={stepAns === ''} className="btn-gold text-xs font-900 px-3 py-2 disabled:opacity-40">✓</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex">{hintBtn}</div>
                  </div>
                </div>
              )}

              {station === 3 && !isSteps && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 grid grid-rows-3 gap-2">
                    {[...Array(currentActivity.need)].map((_, i) => {
                      const d = designs[i];
                      return (
                        <div key={i} className={`rounded-2xl border-2 flex items-center gap-3 px-3 py-1 min-h-0 ${d ? 'border-emerald-400/60 bg-emerald-950/30 fade-in-up' : 'border-dashed border-white/20 bg-[#14082c]/60'}`}>
                          <p className="text-xs font-900 text-slate-300 w-12 shrink-0">Box {i + 1}</p>
                          <div className="flex-1 h-full min-h-0 flex items-center justify-center">
                            {d ? (
                              <SolidBox L={d.v[0]} W={d.v[1]} H={d.v[2]} done VW={260} VH={110} pad={16} small labels={{ L: `${d.v[0]}`, W: `${d.v[1]}`, H: `${d.v[2]}` }} />
                            ) : (
                              <p className="text-3xl text-white/20 font-900">?</p>
                            )}
                          </div>
                          <p className={`text-sm font-900 w-28 shrink-0 text-right ${d ? 'text-emerald-300' : 'text-white/20'}`}>{d ? `${d.v.join(' × ')} = ${currentActivity.target}` : '? × ? × ?'}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-60 sm:w-64 shrink-0 flex flex-col gap-2.5 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">Design a box ({designs.length}/{currentActivity.need} found)</p>
                    {['l', 'w', 'h'].map(k => (
                      <div key={k} className="flex items-center gap-2">
                        <span className="text-sm font-900 text-pink-300 w-6">{k} =</span>
                        <input
                          type="number" value={dims[k]} placeholder="?"
                          onChange={e => setDims(s => ({ ...s, [k]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && addDesign()}
                          className={inputCls(null) + ' flex-1'}
                        />
                        <span className="text-sm font-900 text-slate-300">cm</span>
                      </div>
                    ))}
                    <div className="bg-[#14082c] rounded-xl px-3 py-2 border border-white/10 text-xs font-900 text-slate-200 flex justify-between">
                      <span>Volume</span>
                      <span className={Number(dims.l) * Number(dims.w) * Number(dims.h) === currentActivity.target ? 'text-emerald-300' : 'text-amber-300'}>
                        {dims.l && dims.w && dims.h ? `${Number(dims.l) * Number(dims.w) * Number(dims.h)} cm³` : '—'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={designs.length >= currentActivity.need}
                        onClick={addDesign}
                        className="btn-gold flex-1 text-sm font-900 px-3 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ＋ Add box
                      </button>
                      {hintBtn}
                    </div>
                  </div>
                </div>
              )}

              {/* Hint + feedback strip */}
              {showHint && (
                <div className="p-2.5 mt-2 bg-amber-950/90 border border-amber-400/50 text-amber-200 rounded-xl text-xs sm:text-sm font-bold w-full text-center fade-in-up shrink-0">
                  💡 {currentActivity.hint}
                </div>
              )}
              {feedback && (
                <div className={`p-2.5 mt-2 rounded-2xl text-sm font-900 w-full text-center shadow-xl shrink-0 fade-in-up ${
                  feedback.success ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400/60' : 'bg-rose-950/90 text-rose-300 border-2 border-rose-400/60'
                }`}>
                  {feedback.text}
                </div>
              )}
            </div>

            {/* Bottom Activity Step Buttons */}
            <div className="flex items-center justify-between border-t border-white/15 pt-3 mt-3 shrink-0">
              <button
                onClick={prevActivity}
                disabled={station === 1 && actIdx === 0}
                className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/25 text-white font-display font-900 text-sm sm:text-base px-6 py-2.5 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                ← Previous Activity
              </button>

              <button
                onClick={nextActivity}
                className="btn-gold text-sm sm:text-base font-900 px-8 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <span>{station === 3 && actIdx === 2 ? 'Go to Practice Phase' : 'Next Activity'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
