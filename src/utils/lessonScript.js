/* =========================================================================
   LESSON SCRIPT — single source of truth for every spoken line.
   ---------------------------------------------------------------------------
   • UI components DISPLAY these exact strings.
   • src/utils/narration.js wraps them in styled segments for playback.
   • scripts/generate_audio.js reads ALL_PHRASES to pre-generate the MP3s.
   Because all three read the same strings, on-screen text and audio can
   never drift apart (1:1 parity).

   CONTENT POLICY: only paragraphs and questions are narrated.
   Titles, headings and labels live in the components and are NEVER spoken.
   Plain ESM (no Vite-only APIs) so Node scripts can import it too.
   ========================================================================= */

import { PRACTICE_QUESTIONS } from '../practiceQuestionsData.js';

export const WONDER = {
  paragraph:
    "Ethan's new fish tank is 50 centimetres long, 30 centimetres wide and 40 centimetres tall. To fill it right to the top, he needs 60 litres of water!",
  question:
    "How can we work out how much space is inside a box without filling it one cube at a time?"
};

export const STORY = [
  {
    body: "Volume is the amount of space a solid takes up, or how much it can hold. We measure it by counting how many unit cubes fit inside, using cubic units like cubic centimetres and cubic metres.",
    style: 'statement'
  },
  {
    body: "A box that is 4 cubes long, 3 cubes wide and 2 cubes high has 4 times 3, which is 12 cubes in each layer. Two layers make 24 unit cubes altogether!",
    style: 'statement'
  },
  {
    body: "Instead of counting every cube, we can multiply! The volume of a cuboid is length times width times height. A box 6 by 4 by 5 centimetres holds 120 cubic centimetres.",
    style: 'emphasis'
  },
  {
    body: "A cube has the same length, width and height. So its volume is the edge times itself three times, called s cubed. A cube with 5 centimetre edges has a volume of 125 cubic centimetres.",
    style: 'emphasis'
  },
  {
    body: "Liquids are measured in litres and millilitres. One cubic centimetre holds exactly 1 millilitre, so 1000 cubic centimetres make 1 litre.",
    style: 'thinking'
  },
  {
    body: "If you know the volume and two of the edges, you can find the third. A box with a volume of 240 cubic centimetres and a base of 10 by 6 centimetres must be 240 divided by 60, which is 4 centimetres tall.",
    style: 'thinking'
  },
  {
    body: "Ethan's tank is 50 by 30 by 40 centimetres, so its volume is 60,000 cubic centimetres. Dividing by 1000 tells him it holds 60 litres of water!",
    style: 'encouragement'
  },
  {
    body: "Brilliant! You can now count unit cubes, multiply length, width and height, and change cubic centimetres into litres. Step into the lab to build boxes, fill tanks and design your own boxes!",
    style: 'celebration'
  }
];

export const SIMULATE = {
  1: "Tap the grid to fill the bottom layer with unit cubes, then stack more layers. Count the cubes to find the volume!",
  2: "Set the water level, then work out the volume of water in cubic centimetres and in litres!",
  3: "Work backwards! Use the volume to find the missing edge, or design your own boxes with the right volume!"
};

export const SIMULATION_GUIDANCE = [
  // Station 1
  { text: "A box holds 1 cm sugar cubes. It is 4 cm long, 3 cm wide and 2 cm high. Fill the bottom layer, stack the layers, then count all the cubes!", style: 'instruction' },
  { text: "One layer has 4 × 3 = 12 cubes. There are 2 layers.", style: 'thinking' },
  { text: "Leo packs 1 cm toy blocks into a crate 5 cm long, 4 cm wide and 3 cm high. Build it layer by layer and find its volume!", style: 'instruction' },
  { text: "One layer has 5 × 4 = 20 blocks. Stack 3 layers: 20 × 3.", style: 'thinking' },
  { text: "A giant dice is a cube with 3 cm edges, made of 1 cm cubes. Build it and count — what do you notice about a cube's volume?", style: 'instruction' },
  { text: "A cube: 3 × 3 × 3 = 3³. Every edge is the same!", style: 'thinking' },
  // Station 2
  { text: "Ethan's tank is 50 cm long, 30 cm wide and 40 cm tall. Fill it right to the top, then find the volume of water and change it into litres.", style: 'instruction' },
  { text: "Volume = base area × water depth. Then 1000 cm³ = 1 litre.", style: 'thinking' },
  { text: "A water tank is 40 cm long, 25 cm wide and 30 cm tall. It is filled to a depth of 20 cm. Set the water level, then find how much water is inside.", style: 'instruction' },
  { text: "Use the water DEPTH (20 cm), not the height of the tank!", style: 'thinking' },
  { text: "A pool is 25 m long, 10 m wide and 2 m deep. It is filled to a depth of 1.5 m. Set the level, then find the volume of water. (1 m³ = 1000 L)", style: 'instruction' },
  { text: "In metres: 1 m³ holds 1000 litres, so multiply by 1000.", style: 'thinking' },
  // Station 3
  { text: "A lunch box has a volume of 360 cm³. Its base is 12 cm long and 6 cm wide. How tall is it?", style: 'instruction' },
  { text: "Volume = base area × height, so height = volume ÷ base area.", style: 'thinking' },
  { text: "A cube-shaped storage box has a volume of 512 cm³. How long is each edge?", style: 'instruction' },
  { text: "Try numbers: 7 × 7 × 7 = 343 (too small). Try the next number!", style: 'thinking' },
  { text: "Ethan wants boxes that hold exactly 36 unit cubes. Every edge must be a whole number of at least 2 cm. Find all 3 different boxes!", style: 'instruction' },
  { text: "Split 36 into three factors, all 2 or more. Try starting with 2 × 2 × ?, then 2 × 3 × ?, then 3 × 3 × ?.", style: 'thinking' }
];

export const REFLECT = {
  question:
    "How do you find the volume of a cube or a cuboid? Explain it to Robo with an example!"
};

export const FEEDBACK = {
  splitDone: "Awesome! You found the volume!",
  buildDone: "Great job! The tank is filled perfectly!",
  reverseDone: "Brilliant reverse thinking!",
  tryAgain: "Not quite. Try again!",
  practiceCorrect: "Correct! Excellent volume work!",
  practiceWrong: "Not quite!",
  lessonDone: "Outstanding reflection! Lesson complete!"
};

/** All 100 Practice questions prompts and hints */
export const PRACTICE_PHRASES = PRACTICE_QUESTIONS.flatMap(q => [
  { text: q.prompt, style: 'question' },
  { text: q.hint, style: 'thinking' }
]);

/** Every phrase that should exist as a pre-generated MP3, with its voice style. */
export const ALL_PHRASES = [
  { text: WONDER.paragraph, style: 'statement' },
  { text: WONDER.question, style: 'question' },
  ...STORY.map(s => ({ text: s.body, style: s.style })),
  { text: SIMULATE[1], style: 'instruction' },
  { text: SIMULATE[2], style: 'instruction' },
  { text: SIMULATE[3], style: 'question' },
  ...SIMULATION_GUIDANCE,
  ...PRACTICE_PHRASES,
  { text: REFLECT.question, style: 'thinking' },
  { text: FEEDBACK.splitDone, style: 'celebration' },
  { text: FEEDBACK.buildDone, style: 'celebration' },
  { text: FEEDBACK.reverseDone, style: 'celebration' },
  { text: FEEDBACK.tryAgain, style: 'encouragement' },
  { text: FEEDBACK.practiceCorrect, style: 'celebration' },
  { text: FEEDBACK.practiceWrong, style: 'encouragement' },
  { text: FEEDBACK.lessonDone, style: 'celebration' }
];
