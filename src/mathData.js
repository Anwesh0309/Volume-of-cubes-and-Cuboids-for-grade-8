/* =========================================================================
   MATH DATA & PROCEDURAL QUESTION GENERATOR
   Procedurally generates Grade 8 "Volume of Cubes & Cuboids" questions.
   Each question carries diagram data for <VolumeDiagram/>.
   ========================================================================= */

import { PRACTICE_QUESTIONS, getPracticeQuestion } from './practiceQuestionsData.js';
export { PRACTICE_QUESTIONS, getPracticeQuestion };

export const WESTERN_NAMES = [
  "Leo", "Emma", "Alex", "Oliver", "Sophia", "Jack", "Maya", "Lucas",
  "Ethan", "Chloe", "Noah", "Liam", "Harper", "Ava", "Mason", "Ella",
  "James", "Mia", "Logan", "Charlotte"
];

export const PRACTICE_WORLDS = [
  { id: 0, name: "Sugar Cube Cove", icon: "🧊", range: "Q1–10", difficulty: 1, unit: "cm" },
  { id: 1, name: "Toy Block Bay", icon: "🧱", range: "Q11–20", difficulty: 1, unit: "cm" },
  { id: 2, name: "Lunchbox Lane", icon: "🍱", range: "Q21–30", difficulty: 2, unit: "cm" },
  { id: 3, name: "Aquarium Alley", icon: "🐠", range: "Q31–40", difficulty: 2, unit: "cm" },
  { id: 4, name: "Juice Carton Junction", icon: "🧃", range: "Q41–50", difficulty: 2, unit: "cm" },
  { id: 5, name: "Container Port", icon: "🚢", range: "Q51–60", difficulty: 3, unit: "m" },
  { id: 6, name: "Swimming Pool Plaza", icon: "🏊", range: "Q61–70", difficulty: 3, unit: "m" },
  { id: 7, name: "Brick Builders", icon: "🏗️", range: "Q71–80", difficulty: 3, unit: "cm" },
  { id: 8, name: "Warehouse Wharf", icon: "📦", range: "Q81–90", difficulty: 4, unit: "cm" },
  { id: 9, name: "Reservoir Ridge", icon: "💧", range: "Q91–100", difficulty: 4, unit: "cm" }
];

const CTX = {
  box: { cm: ["lunch box", "shoebox", "jewellery box", "pencil box", "cereal box"], m: ["shipping container", "storage room", "garden shed", "skip bin"] },
  cube: { cm: ["sugar cube box", "dice", "toy block", "ice cube tray mould"], m: ["storage cube", "concrete block", "water tank"] },
  tank: { cm: ["fish tank", "water tank", "baking tray", "juice carton"], m: ["swimming pool", "pond", "reservoir"] }
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatNum(val) {
  return (Math.round(val * 100) / 100).toString();
}

const RULES = {
  count: "✦ COUNT THE UNIT CUBES",
  lwh: "✦ V = l × w × h",
  cube: "✦ V = s³",
  litres: "✦ 1000 cm³ = 1 L",
  depth: "✦ USE THE WATER DEPTH",
  reverse: "✦ WORK BACKWARDS",
  pack: "✦ HOW MANY FIT?"
};

export function makeQuestion(worldIndex = 0, questionIndex = 0) {
  return getPracticeQuestion(worldIndex, questionIndex);
}

/**
 * Procedural question generator fallback
 */
function makeProceduralQuestion(worldIndex = 0) {
  const world = PRACTICE_WORLDS[worldIndex] || PRACTICE_WORLDS[0];
  const name = pick(WESTERN_NAMES);
  const diff = world.difficulty;
  const unit = world.unit;
  const u3 = `${unit}³`;

  const allowed = ['count', 'cube', 'cuboid', 'cuboid'];
  if (diff >= 2) allowed.push('litres', 'depth', 'missingH', 'litres');
  if (diff >= 3) allowed.push('cubeRev', 'baseArea', 'm3litres', 'emptySpace');
  if (diff >= 4) allowed.push('pack', 'pack', 'rise', 'rise', 'missingH');
  let archetype = pick(allowed);
  if (unit === 'm' && (archetype === 'litres' || archetype === 'rise')) archetype = 'm3litres';

  let prompt = "";
  let correct = 0;
  let distractors = [];
  let diagramData = {};
  let explanation = "";
  let rule = RULES.lwh;
  let fmtOpt = v => `${v} ${u3}`;

  switch (archetype) {
    case 'count': {
      const L = randInt(2, 5), W = randInt(2, 4), H = randInt(2, 4);
      correct = L * W * H;
      prompt = `${name} builds this box out of 1 ${unit} unit cubes. How many unit cubes are used?`;
      diagramData = { type: 'cubes', L, W, H, unit };
      distractors = [L * W, L * W + H, 2 * (L * W + L * H + W * H), L + W + H];
      explanation = `${L} × ${W} = ${L * W} cubes per layer × ${H} layers = ${correct} cubes.`;
      rule = RULES.count;
      fmtOpt = v => `${v} cubes`;
      break;
    }

    case 'cube': {
      const s = randInt(2, 12);
      correct = s ** 3;
      prompt = `A ${pick(CTX.cube[unit])} is a cube with edges of ${s} ${unit}. Find its volume.`;
      diagramData = { type: 'box', L: s, W: s, H: s, unit };
      distractors = [6 * s * s, s * s, 3 * s, 4 * s * s];
      explanation = `V = ${s} × ${s} × ${s} = ${correct} ${u3}.`;
      rule = RULES.cube;
      break;
    }

    case 'cuboid': {
      const L = randInt(3, 20), W = randInt(2, 12), H = randInt(2, 15);
      correct = L * W * H;
      prompt = `A ${pick(CTX.box[unit])} is ${L} ${unit} long, ${W} ${unit} wide and ${H} ${unit} high. Find its volume.`;
      diagramData = { type: 'box', L, W, H, unit };
      distractors = [2 * (L * W + L * H + W * H), L * W, L + W + H, L * W * H * 2];
      explanation = `V = ${L} × ${W} × ${H} = ${correct} ${u3}.`;
      break;
    }

    case 'litres': {
      const L = 10 * randInt(2, 8), W = 10 * randInt(1, 5), H = 5 * randInt(2, 8);
      const V = L * W * H;
      correct = V / 1000;
      prompt = `A ${pick(CTX.tank.cm)} measures ${L} cm by ${W} cm by ${H} cm. How many litres does it hold when full?`;
      diagramData = { type: 'tank', L, W, H, depth: H, unit: 'cm' };
      distractors = [V / 100, V / 10, V / 10000, L * W / 1000];
      explanation = `${L} × ${W} × ${H} = ${V} cm³ = ${V} ÷ 1000 = ${formatNum(correct)} L.`;
      rule = RULES.litres;
      fmtOpt = v => `${v} L`;
      break;
    }

    case 'depth': {
      const L = randInt(10, 60), W = randInt(8, 40), H = randInt(15, 50);
      const d = randInt(4, H - 3);
      correct = L * W * d;
      prompt = `A ${pick(CTX.tank[unit])} is ${L} ${unit} long, ${W} ${unit} wide and ${H} ${unit} tall. Water fills it to a depth of ${d} ${unit}. Find the volume of the water.`;
      diagramData = { type: 'tank', L, W, H, depth: d, unit };
      distractors = [L * W * H, L * W * (H - d), L * W, L * W * (H + d)];
      explanation = `Use the depth: ${L} × ${W} × ${d} = ${correct} ${u3}.`;
      rule = RULES.depth;
      break;
    }

    case 'missingH': {
      const L = randInt(3, 15), W = randInt(2, 10), H = randInt(2, 12);
      const V = L * W * H;
      correct = H;
      prompt = `A ${pick(CTX.box[unit])} has a volume of ${V} ${u3}. It is ${L} ${unit} long and ${W} ${unit} wide. How high is it?`;
      diagramData = { type: 'box', L, W, H, unit, unknown: 'H', total: V };
      distractors = [V / L, V / W, H + 2, H * 2];
      explanation = `h = ${V} ÷ (${L} × ${W}) = ${V} ÷ ${L * W} = ${H} ${unit}.`;
      rule = RULES.reverse;
      fmtOpt = v => `${v} ${unit}`;
      break;
    }

    case 'cubeRev': {
      const s = randInt(2, 12);
      correct = s;
      prompt = `A ${pick(CTX.cube[unit])} has a volume of ${s ** 3} ${u3}. How long is each edge?`;
      diagramData = { type: 'box', L: s, W: s, H: s, unit, unknown: 'all', total: s ** 3 };
      distractors = [s ** 3 / 3, s * s, s + 1, s * 2];
      explanation = `${s} × ${s} × ${s} = ${s ** 3}, so each edge is ${s} ${unit}.`;
      rule = RULES.reverse;
      fmtOpt = v => `${v} ${unit}`;
      break;
    }

    case 'baseArea': {
      const L = randInt(3, 15), W = randInt(2, 10), H = randInt(2, 12);
      const V = L * W * H;
      correct = L * W;
      prompt = `A ${pick(CTX.box[unit])} has a volume of ${V} ${u3} and a height of ${H} ${unit}. Find the area of its base.`;
      diagramData = { type: 'box', L, W, H, unit, unknown: 'base', total: V };
      distractors = [V * H, V / 2, L * H, W * H];
      explanation = `Base area = ${V} ÷ ${H} = ${correct} ${unit}².`;
      rule = RULES.reverse;
      fmtOpt = v => `${v} ${unit}²`;
      break;
    }

    case 'm3litres': {
      const L = randInt(2, 12), W = randInt(2, 8), H = randInt(1, 3);
      const V = L * W * H;
      correct = V * 1000;
      prompt = `A ${pick(CTX.tank.m)} is ${L} m long, ${W} m wide and ${H} m deep. How many litres of water fill it? (1 m³ = 1000 L)`;
      diagramData = { type: 'tank', L, W, H, depth: H, unit: 'm' };
      distractors = [V, V * 100, V * 1000000, V * 10];
      explanation = `${L} × ${W} × ${H} = ${V} m³ = ${V} × 1000 = ${correct} L.`;
      rule = RULES.litres;
      fmtOpt = v => `${Number(v).toLocaleString('en-US')} L`;
      break;
    }

    case 'emptySpace': {
      const L = randInt(10, 50), W = randInt(8, 30), H = randInt(12, 40);
      const d = randInt(3, H - 4);
      correct = L * W * (H - d);
      prompt = `A ${pick(CTX.tank[unit])} ${L} ${unit} by ${W} ${unit} by ${H} ${unit} has water ${d} ${unit} deep. What volume of water is still needed to fill it?`;
      diagramData = { type: 'tank', L, W, H, depth: d, unit, showEmpty: true };
      distractors = [L * W * d, L * W * H, L * W * (H + d), L * W];
      explanation = `Empty part is ${H} − ${d} = ${H - d} ${unit} high: ${L} × ${W} × ${H - d} = ${correct} ${u3}.`;
      rule = RULES.depth;
      break;
    }

    case 'pack': {
      const c = randInt(2, 3);
      const a = randInt(2, 5), b = randInt(2, 4), e = randInt(1, 4);
      const L = a * c, W = b * c, H = e * c;
      correct = a * b * e;
      prompt = `How many ${c} ${unit} cubes can be packed into a box ${L} ${unit} by ${W} ${unit} by ${H} ${unit}?`;
      diagramData = { type: 'box', L, W, H, unit, grid: c };
      distractors = [L * W * H, (L * W * H) / c, a * b, a + b + e];
      explanation = `${L} ÷ ${c} = ${a}, ${W} ÷ ${c} = ${b}, ${H} ÷ ${c} = ${e}; ${a} × ${b} × ${e} = ${correct} cubes.`;
      rule = RULES.pack;
      fmtOpt = v => `${v} cubes`;
      break;
    }

    case 'rise': {
      const L = 10 * randInt(2, 6), W = 10 * randInt(2, 5);
      const r = randInt(1, 8);
      const litres = (L * W * r) / 1000;
      correct = r;
      prompt = `${name} pours ${formatNum(litres)} L of water into an empty tank with a base ${L} cm by ${W} cm. How deep is the water? (1 L = 1000 cm³)`;
      diagramData = { type: 'tank', L, W, H: r + randInt(3, 10), depth: r, unit: 'cm', unknownDepth: true };
      distractors = [r * 10, litres, r + 2, r * 2];
      explanation = `${formatNum(litres)} L = ${L * W * r} cm³; ÷ (${L} × ${W}) = ${r} cm.`;
      rule = RULES.reverse;
      fmtOpt = v => `${v} cm`;
      break;
    }

    default:
      break;
  }

  prompt = prompt.replace(/\b([Aa]) (?=[aeiouAEIOU]|(?:8|11|18|8\d)\b)/g, '$1n ');

  const correctLabel = formatNum(correct);
  const uniq = [];
  for (const d of distractors) {
    const f = formatNum(d);
    if (d > 0 && f !== correctLabel && !uniq.includes(f)) uniq.push(f);
  }
  const fallbacks = [correct * 2, correct + 10, correct * 1.5, correct + 4, correct + 1, correct + 2];
  for (const fb of fallbacks) {
    if (uniq.length >= 3) break;
    const f = formatNum(fb);
    if (fb > 0 && f !== correctLabel && !uniq.includes(f)) uniq.push(f);
  }

  const rawOptions = [correctLabel, ...uniq.slice(0, 3)].map(fmtOpt);
  const target = rawOptions[0];
  const options = [...rawOptions];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    world,
    name,
    archetype,
    prompt,
    correctIndex: options.indexOf(target),
    correctValue: correct,
    options,
    diagramData,
    rule,
    explanation
  };
}
