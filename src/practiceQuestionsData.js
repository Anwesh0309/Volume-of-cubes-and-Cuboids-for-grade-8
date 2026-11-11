/* =========================================================================
   PRACTICE QUESTIONS DATA — 10 Worlds × 10 Questions = 100 Curated Questions
   Each question includes diagramData, 4 options, hint, explanation & rule.
   ========================================================================= */

export const PRACTICE_QUESTIONS = [
  // --- WORLD 0: Sugar Cube Cove (Q1–10) ---
  {
    id: 1, worldIndex: 0,
    prompt: "Leo builds a small box out of 1 cm unit cubes: 3 cm long, 2 cm wide and 2 cm high. How many unit cubes are used?",
    hint: "Count the cubes in one layer (3 × 2 = 6 cubes), then multiply by 2 layers.",
    diagramData: { type: 'cubes', L: 3, W: 2, H: 2, unit: 'cm' },
    options: ["12 cubes", "6 cubes", "8 cubes", "10 cubes"],
    correctIndex: 0, correctValue: 12,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "3 × 2 = 6 cubes per layer × 2 layers = 12 unit cubes."
  },
  {
    id: 2, worldIndex: 0,
    prompt: "A sugar cube box has edges of 2 cm on all sides. Find its volume.",
    hint: "For a cube, multiply edge × edge × edge: 2 × 2 × 2.",
    diagramData: { type: 'box', L: 2, W: 2, H: 2, unit: 'cm' },
    options: ["8 cm³", "4 cm³", "6 cm³", "12 cm³"],
    correctIndex: 0, correctValue: 8,
    rule: "✦ V = s³",
    explanation: "V = 2 × 2 × 2 = 8 cm³."
  },
  {
    id: 3, worldIndex: 0,
    prompt: "Emma packs 1 cm unit cubes into a tray 4 cm long, 2 cm wide and 1 cm high. How many cubes fit in the tray?",
    hint: "There is 1 layer of cubes: multiply 4 × 2 × 1.",
    diagramData: { type: 'cubes', L: 4, W: 2, H: 1, unit: 'cm' },
    options: ["8 cubes", "6 cubes", "10 cubes", "12 cubes"],
    correctIndex: 0, correctValue: 8,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "4 × 2 × 1 = 8 unit cubes."
  },
  {
    id: 4, worldIndex: 0,
    prompt: "A crystal dice is a cube with edges of 3 cm. What is its volume?",
    hint: "Multiply 3 × 3 × 3 to find the volume of the cube.",
    diagramData: { type: 'box', L: 3, W: 3, H: 3, unit: 'cm' },
    options: ["27 cm³", "9 cm³", "18 cm³", "36 cm³"],
    correctIndex: 0, correctValue: 27,
    rule: "✦ V = s³",
    explanation: "V = 3 × 3 × 3 = 27 cm³."
  },
  {
    id: 5, worldIndex: 0,
    prompt: "Jack builds a block tower 2 cm long, 2 cm wide and 4 cm high with 1 cm unit cubes. How many cubes did he use?",
    hint: "Each layer has 2 × 2 = 4 cubes. Multiply by 4 layers.",
    diagramData: { type: 'cubes', L: 2, W: 2, H: 4, unit: 'cm' },
    options: ["16 cubes", "8 cubes", "12 cubes", "20 cubes"],
    correctIndex: 0, correctValue: 16,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "2 × 2 = 4 cubes per layer × 4 layers = 16 unit cubes."
  },
  {
    id: 6, worldIndex: 0,
    prompt: "A gift box shaped like a cuboid is 5 cm long, 2 cm wide and 3 cm high. Find its volume.",
    hint: "Volume equals length × width × height: 5 × 2 × 3.",
    diagramData: { type: 'box', L: 5, W: 2, H: 3, unit: 'cm' },
    options: ["30 cm³", "10 cm³", "20 cm³", "25 cm³"],
    correctIndex: 0, correctValue: 30,
    rule: "✦ V = l × w × h",
    explanation: "V = 5 × 2 × 3 = 30 cm³."
  },
  {
    id: 7, worldIndex: 0,
    prompt: "Alex stacks 1 cm cubes to make a solid 3 cm long, 3 cm wide and 2 cm tall. How many unit cubes are in the solid?",
    hint: "Find the base layer: 3 × 3 = 9 cubes. Then multiply by 2 layers.",
    diagramData: { type: 'cubes', L: 3, W: 3, H: 2, unit: 'cm' },
    options: ["18 cubes", "9 cubes", "12 cubes", "24 cubes"],
    correctIndex: 0, correctValue: 18,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "3 × 3 = 9 cubes per layer × 2 layers = 18 unit cubes."
  },
  {
    id: 8, worldIndex: 0,
    prompt: "A wooden cube has edges of 4 cm. What is its volume?",
    hint: "Calculate 4 cubed: 4 × 4 × 4.",
    diagramData: { type: 'box', L: 4, W: 4, H: 4, unit: 'cm' },
    options: ["64 cm³", "16 cm³", "32 cm³", "48 cm³"],
    correctIndex: 0, correctValue: 64,
    rule: "✦ V = s³",
    explanation: "V = 4 × 4 × 4 = 64 cm³."
  },
  {
    id: 9, worldIndex: 0,
    prompt: "A small jewellery box is 6 cm long, 3 cm wide and 2 cm high. What is the space inside?",
    hint: "Multiply the three dimensions: 6 × 3 × 2.",
    diagramData: { type: 'box', L: 6, W: 3, H: 2, unit: 'cm' },
    options: ["36 cm³", "18 cm³", "24 cm³", "42 cm³"],
    correctIndex: 0, correctValue: 36,
    rule: "✦ V = l × w × h",
    explanation: "V = 6 × 3 × 2 = 36 cm³."
  },
  {
    id: 10, worldIndex: 0,
    prompt: "Sophia makes a rectangular prism with 1 cm cubes: 4 cm long, 3 cm wide and 2 cm high. How many cubes did she use?",
    hint: "Multiply length × width × height: 4 × 3 × 2.",
    diagramData: { type: 'cubes', L: 4, W: 3, H: 2, unit: 'cm' },
    options: ["24 cubes", "12 cubes", "18 cubes", "28 cubes"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "4 × 3 × 2 = 24 unit cubes."
  },

  // --- WORLD 1: Toy Block Bay (Q11–20) ---
  {
    id: 11, worldIndex: 1,
    prompt: "A toy block box is 5 cm long, 4 cm wide and 2 cm high. Find its volume.",
    hint: "Use the formula V = l × w × h: 5 × 4 × 2.",
    diagramData: { type: 'box', L: 5, W: 4, H: 2, unit: 'cm' },
    options: ["40 cm³", "20 cm³", "30 cm³", "48 cm³"],
    correctIndex: 0, correctValue: 40,
    rule: "✦ V = l × w × h",
    explanation: "V = 5 × 4 × 2 = 40 cm³."
  },
  {
    id: 12, worldIndex: 1,
    prompt: "Oliver builds a solid out of 1 cm cubes: 5 cm long, 2 cm wide and 3 cm tall. How many cubes are used?",
    hint: "There are 5 × 2 cubes in each layer, multiplied by 3 layers.",
    diagramData: { type: 'cubes', L: 5, W: 2, H: 3, unit: 'cm' },
    options: ["30 cubes", "15 cubes", "20 cubes", "25 cubes"],
    correctIndex: 0, correctValue: 30,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "5 × 2 = 10 cubes per layer × 3 layers = 30 unit cubes."
  },
  {
    id: 13, worldIndex: 1,
    prompt: "A puzzle cube has an edge length of 5 cm. What is its volume?",
    hint: "A cube volume is side cubed: 5 × 5 × 5.",
    diagramData: { type: 'box', L: 5, W: 5, H: 5, unit: 'cm' },
    options: ["125 cm³", "25 cm³", "75 cm³", "150 cm³"],
    correctIndex: 0, correctValue: 125,
    rule: "✦ V = s³",
    explanation: "V = 5 × 5 × 5 = 125 cm³."
  },
  {
    id: 14, worldIndex: 1,
    prompt: "A crate for toy cars is 7 cm long, 3 cm wide and 2 cm high. Calculate its volume.",
    hint: "Multiply 7 × 3 × 2.",
    diagramData: { type: 'box', L: 7, W: 3, H: 2, unit: 'cm' },
    options: ["42 cm³", "21 cm³", "35 cm³", "49 cm³"],
    correctIndex: 0, correctValue: 42,
    rule: "✦ V = l × w × h",
    explanation: "V = 7 × 3 × 2 = 42 cm³."
  },
  {
    id: 15, worldIndex: 1,
    prompt: "Maya uses 1 cm blocks to make a platform 4 cm long, 4 cm wide and 2 cm high. How many blocks are in the platform?",
    hint: "The base layer has 4 × 4 = 16 blocks. Two layers make 16 × 2.",
    diagramData: { type: 'cubes', L: 4, W: 4, H: 2, unit: 'cm' },
    options: ["32 cubes", "16 cubes", "24 cubes", "36 cubes"],
    correctIndex: 0, correctValue: 32,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "4 × 4 = 16 blocks per layer × 2 layers = 32 unit cubes."
  },
  {
    id: 16, worldIndex: 1,
    prompt: "A rectangular game container is 8 cm long, 3 cm wide and 2 cm high. Find its volume.",
    hint: "Volume = length × width × height: 8 × 3 × 2.",
    diagramData: { type: 'box', L: 8, W: 3, H: 2, unit: 'cm' },
    options: ["48 cm³", "24 cm³", "36 cm³", "54 cm³"],
    correctIndex: 0, correctValue: 48,
    rule: "✦ V = l × w × h",
    explanation: "V = 8 × 3 × 2 = 48 cm³."
  },
  {
    id: 17, worldIndex: 1,
    prompt: "A cube-shaped block mould has edges of 6 cm. Find the volume of the mould.",
    hint: "Multiply 6 × 6 × 6.",
    diagramData: { type: 'box', L: 6, W: 6, H: 6, unit: 'cm' },
    options: ["216 cm³", "36 cm³", "108 cm³", "144 cm³"],
    correctIndex: 0, correctValue: 216,
    rule: "✦ V = s³",
    explanation: "V = 6 × 6 × 6 = 216 cm³."
  },
  {
    id: 18, worldIndex: 1,
    prompt: "Lucas stacks 1 cm cubes: 6 cm long, 2 cm wide and 3 cm high. How many cubes are there altogether?",
    hint: "Count 6 × 2 = 12 cubes per layer, then multiply by 3 layers.",
    diagramData: { type: 'cubes', L: 6, W: 2, H: 3, unit: 'cm' },
    options: ["36 cubes", "18 cubes", "24 cubes", "42 cubes"],
    correctIndex: 0, correctValue: 36,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "6 × 2 = 12 cubes per layer × 3 layers = 36 unit cubes."
  },
  {
    id: 19, worldIndex: 1,
    prompt: "A small storage tin is 9 cm long, 4 cm wide and 2 cm high. What is its volume?",
    hint: "Multiply 9 × 4 × 2.",
    diagramData: { type: 'box', L: 9, W: 4, H: 2, unit: 'cm' },
    options: ["72 cm³", "36 cm³", "54 cm³", "80 cm³"],
    correctIndex: 0, correctValue: 72,
    rule: "✦ V = l × w × h",
    explanation: "V = 9 × 4 × 2 = 72 cm³."
  },
  {
    id: 20, worldIndex: 1,
    prompt: "Noah builds a model with 1 cm cubes that is 5 cm long, 3 cm wide and 3 cm high. How many cubes did he use?",
    hint: "Multiply 5 × 3 = 15, then multiply by 3 layers.",
    diagramData: { type: 'cubes', L: 5, W: 3, H: 3, unit: 'cm' },
    options: ["45 cubes", "15 cubes", "30 cubes", "50 cubes"],
    correctIndex: 0, correctValue: 45,
    rule: "✦ COUNT THE UNIT CUBES",
    explanation: "5 × 3 = 15 cubes per layer × 3 layers = 45 unit cubes."
  },

  // --- WORLD 2: Lunchbox Lane (Q21–30) ---
  {
    id: 21, worldIndex: 2,
    prompt: "A school lunchbox is 15 cm long, 10 cm wide and 6 cm deep. What is its volume?",
    hint: "Multiply length × width × height: 15 × 10 × 6.",
    diagramData: { type: 'box', L: 15, W: 10, H: 6, unit: 'cm' },
    options: ["900 cm³", "450 cm³", "600 cm³", "1500 cm³"],
    correctIndex: 0, correctValue: 900,
    rule: "✦ V = l × w × h",
    explanation: "V = 15 × 10 × 6 = 900 cm³."
  },
  {
    id: 22, worldIndex: 2,
    prompt: "A sandwich box has a volume of 480 cm³. Its base is 12 cm long and 8 cm wide. How tall is the box?",
    hint: "Divide the volume by the base area: 480 ÷ (12 × 8).",
    diagramData: { type: 'box', L: 12, W: 8, H: 5, unit: 'cm', unknown: 'H', total: 480 },
    options: ["5 cm", "4 cm", "6 cm", "8 cm"],
    correctIndex: 0, correctValue: 5,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 12 × 8 = 96 cm². Height = 480 ÷ 96 = 5 cm."
  },
  {
    id: 23, worldIndex: 2,
    prompt: "A pencil case shaped like a cuboid is 20 cm long, 6 cm wide and 4 cm high. Find its volume.",
    hint: "Multiply 20 × 6 × 4.",
    diagramData: { type: 'box', L: 20, W: 6, H: 4, unit: 'cm' },
    options: ["480 cm³", "240 cm³", "360 cm³", "520 cm³"],
    correctIndex: 0, correctValue: 480,
    rule: "✦ V = l × w × h",
    explanation: "V = 20 × 6 × 4 = 480 cm³."
  },
  {
    id: 24, worldIndex: 2,
    prompt: "A bento box has a volume of 720 cm³ and a height of 6 cm. What is the area of its base?",
    hint: "Base area = volume ÷ height: 720 ÷ 6.",
    diagramData: { type: 'box', L: 12, W: 10, H: 6, unit: 'cm', unknown: 'base', total: 720 },
    options: ["120 cm²", "60 cm²", "180 cm²", "240 cm²"],
    correctIndex: 0, correctValue: 120,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 720 ÷ 6 = 120 cm²."
  },
  {
    id: 25, worldIndex: 2,
    prompt: "A snack box is 12 cm long, 5 cm wide and 4 cm deep. How many 1 cm unit cubes fit inside?",
    hint: "Calculate the volume: 12 × 5 × 4.",
    diagramData: { type: 'box', L: 12, W: 5, H: 4, unit: 'cm' },
    options: ["240 cubes", "120 cubes", "180 cubes", "300 cubes"],
    correctIndex: 0, correctValue: 240,
    rule: "✦ V = l × w × h",
    explanation: "12 × 5 × 4 = 240 unit cubes fit inside."
  },
  {
    id: 26, worldIndex: 2,
    prompt: "A cuboid container has a volume of 600 cm³. It is 10 cm long and 6 cm wide. Find its height.",
    hint: "Height = volume ÷ (length × width) = 600 ÷ 60.",
    diagramData: { type: 'box', L: 10, W: 6, H: 10, unit: 'cm', unknown: 'H', total: 600 },
    options: ["10 cm", "6 cm", "8 cm", "12 cm"],
    correctIndex: 0, correctValue: 10,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 10 × 6 = 60 cm². Height = 600 ÷ 60 = 10 cm."
  },
  {
    id: 27, worldIndex: 2,
    prompt: "A thermal lunch bag has dimensions 18 cm by 10 cm by 5 cm. What is its capacity in cubic centimetres?",
    hint: "Multiply 18 × 10 × 5.",
    diagramData: { type: 'box', L: 18, W: 10, H: 5, unit: 'cm' },
    options: ["900 cm³", "450 cm³", "800 cm³", "1000 cm³"],
    correctIndex: 0, correctValue: 900,
    rule: "✦ V = l × w × h",
    explanation: "V = 18 × 10 × 5 = 900 cm³."
  },
  {
    id: 28, worldIndex: 2,
    prompt: "A cube-shaped biscuit tin has a volume of 343 cm³. How long is each edge?",
    hint: "Find which number multiplied by itself three times equals 343.",
    diagramData: { type: 'box', L: 7, W: 7, H: 7, unit: 'cm', unknown: 'all', total: 343 },
    options: ["7 cm", "6 cm", "8 cm", "9 cm"],
    correctIndex: 0, correctValue: 7,
    rule: "✦ WORK BACKWARDS",
    explanation: "7 × 7 × 7 = 343, so each edge is 7 cm."
  },
  {
    id: 29, worldIndex: 2,
    prompt: "A rectangular storage tub is 16 cm long, 12 cm wide and 5 cm high. Calculate its volume.",
    hint: "Multiply 16 × 12 × 5.",
    diagramData: { type: 'box', L: 16, W: 12, H: 5, unit: 'cm' },
    options: ["960 cm³", "480 cm³", "840 cm³", "1020 cm³"],
    correctIndex: 0, correctValue: 960,
    rule: "✦ V = l × w × h",
    explanation: "V = 16 × 12 × 5 = 960 cm³."
  },
  {
    id: 30, worldIndex: 2,
    prompt: "A metal tin with a base area of 80 cm² is 7 cm tall. What is its total volume?",
    hint: "Volume = base area × height = 80 × 7.",
    diagramData: { type: 'box', L: 10, W: 8, H: 7, unit: 'cm' },
    options: ["560 cm³", "280 cm³", "480 cm³", "640 cm³"],
    correctIndex: 0, correctValue: 560,
    rule: "✦ V = l × w × h",
    explanation: "V = 80 × 7 = 560 cm³."
  },

  // --- WORLD 3: Aquarium Alley (Q31–40) ---
  {
    id: 31, worldIndex: 3,
    prompt: "A fish tank is 40 cm long, 25 cm wide and 20 cm high. How many litres of water does it hold when full?",
    hint: "Find the volume: 40 × 25 × 20 = 20,000 cm³. Divide by 1000 to get litres.",
    diagramData: { type: 'tank', L: 40, W: 25, H: 20, depth: 20, unit: 'cm' },
    options: ["20 L", "10 L", "25 L", "200 L"],
    correctIndex: 0, correctValue: 20,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "40 × 25 × 20 = 20,000 cm³. 20,000 ÷ 1000 = 20 L."
  },
  {
    id: 32, worldIndex: 3,
    prompt: "Ethan's aquarium is 50 cm long, 30 cm wide and 40 cm tall. Water fills it to a depth of 25 cm. What is the volume of water?",
    hint: "Use the water depth, not the total height: 50 × 30 × 25.",
    diagramData: { type: 'tank', L: 50, W: 30, H: 40, depth: 25, unit: 'cm' },
    options: ["37,500 cm³", "25,000 cm³", "60,000 cm³", "75,000 cm³"],
    correctIndex: 0, correctValue: 37500,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Water volume = 50 × 30 × 25 = 37,500 cm³."
  },
  {
    id: 33, worldIndex: 3,
    prompt: "A turtle tank is 60 cm long, 30 cm wide and 20 cm deep. How many litres does it hold when full?",
    hint: "60 × 30 × 20 = 36,000 cm³. Divide by 1000 to get litres.",
    diagramData: { type: 'tank', L: 60, W: 30, H: 20, depth: 20, unit: 'cm' },
    options: ["36 L", "18 L", "30 L", "360 L"],
    correctIndex: 0, correctValue: 36,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "60 × 30 × 20 = 36,000 cm³. 36,000 ÷ 1000 = 36 L."
  },
  {
    id: 34, worldIndex: 3,
    prompt: "A small glass aquarium holds 15 litres of water. What is its volume in cubic centimetres?",
    hint: "Remember that 1 litre = 1000 cubic centimetres. Multiply 15 × 1000.",
    diagramData: { type: 'tank', L: 30, W: 25, H: 20, depth: 20, unit: 'cm' },
    options: ["15,000 cm³", "1,500 cm³", "150 cm³", "150,000 cm³"],
    correctIndex: 0, correctValue: 15000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "15 L × 1000 = 15,000 cm³."
  },
  {
    id: 35, worldIndex: 3,
    prompt: "An aquarium is 40 cm long, 20 cm wide and 30 cm tall. Water is 15 cm deep. How many litres of water are in the tank?",
    hint: "Water volume = 40 × 20 × 15 = 12,000 cm³. Divide by 1000.",
    diagramData: { type: 'tank', L: 40, W: 20, H: 30, depth: 15, unit: 'cm' },
    options: ["12 L", "6 L", "18 L", "24 L"],
    correctIndex: 0, correctValue: 12,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "40 × 20 × 15 = 12,000 cm³. 12,000 ÷ 1000 = 12 L."
  },
  {
    id: 36, worldIndex: 3,
    prompt: "A breeding tank is 30 cm long, 20 cm wide and 25 cm deep. Water fills it to a depth of 10 cm. Find the volume of the water.",
    hint: "Calculate length × width × water depth: 30 × 20 × 10.",
    diagramData: { type: 'tank', L: 30, W: 20, H: 25, depth: 10, unit: 'cm' },
    options: ["6,000 cm³", "3,000 cm³", "12,000 cm³", "15,000 cm³"],
    correctIndex: 0, correctValue: 6000,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "30 × 20 × 10 = 6,000 cm³."
  },
  {
    id: 37, worldIndex: 3,
    prompt: "A glass tank 50 cm long and 40 cm wide contains 40 litres of water. How deep is the water?",
    hint: "40 litres = 40,000 cm³. Divide by base area (50 × 40 = 2000).",
    diagramData: { type: 'tank', L: 50, W: 40, H: 25, depth: 20, unit: 'cm', unknownDepth: true },
    options: ["20 cm", "10 cm", "15 cm", "25 cm"],
    correctIndex: 0, correctValue: 20,
    rule: "✦ WORK BACKWARDS",
    explanation: "40 L = 40,000 cm³. Base area = 50 × 40 = 2000 cm². Depth = 40,000 ÷ 2000 = 20 cm."
  },
  {
    id: 38, worldIndex: 3,
    prompt: "A nano tank is a cube with edges of 30 cm. How many litres of water can it hold when completely full?",
    hint: "Volume = 30 × 30 × 30 = 27,000 cm³. Divide by 1000.",
    diagramData: { type: 'tank', L: 30, W: 30, H: 30, depth: 30, unit: 'cm' },
    options: ["27 L", "9 L", "18 L", "30 L"],
    correctIndex: 0, correctValue: 27,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "30 × 30 × 30 = 27,000 cm³. 27,000 ÷ 1000 = 27 L."
  },
  {
    id: 39, worldIndex: 3,
    prompt: "A fish tank 45 cm by 20 cm by 30 cm has water 20 cm deep. What volume of empty space remains in the tank?",
    hint: "The empty height is 30 - 20 = 10 cm. Multiply 45 × 20 × 10.",
    diagramData: { type: 'tank', L: 45, W: 20, H: 30, depth: 20, unit: 'cm', showEmpty: true },
    options: ["9,000 cm³", "4,500 cm³", "18,000 cm³", "27,000 cm³"],
    correctIndex: 0, correctValue: 9000,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Empty height = 30 − 20 = 10 cm. Empty volume = 45 × 20 × 10 = 9,000 cm³."
  },
  {
    id: 40, worldIndex: 3,
    prompt: "Liam pours 18 litres of water into a tank 60 cm long and 30 cm wide. How deep does the water reach?",
    hint: "18 litres = 18,000 cm³. Base area = 60 × 30 = 1800. Divide 18,000 by 1800.",
    diagramData: { type: 'tank', L: 60, W: 30, H: 15, depth: 10, unit: 'cm', unknownDepth: true },
    options: ["10 cm", "5 cm", "15 cm", "20 cm"],
    correctIndex: 0, correctValue: 10,
    rule: "✦ WORK BACKWARDS",
    explanation: "18 L = 18,000 cm³. Base area = 60 × 30 = 1800 cm². Depth = 18,000 ÷ 1800 = 10 cm."
  },

  // --- WORLD 4: Juice Carton Junction (Q41–50) ---
  {
    id: 41, worldIndex: 4,
    prompt: "A juice carton is 10 cm long, 5 cm wide and 20 cm high. How many millilitres of juice can it hold?",
    hint: "Volume = 10 × 5 × 20 = 1000 cm³. Since 1 cm³ = 1 mL, it holds 1000 mL.",
    diagramData: { type: 'box', L: 10, W: 5, H: 20, unit: 'cm' },
    options: ["1,000 mL", "500 mL", "750 mL", "1,500 mL"],
    correctIndex: 0, correctValue: 1000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "10 × 5 × 20 = 1000 cm³ = 1000 mL."
  },
  {
    id: 42, worldIndex: 4,
    prompt: "A family milk carton is 8 cm long, 8 cm wide and 25 cm high. How many litres is that?",
    hint: "8 × 8 × 25 = 1600 cm³. Divide by 1000 to convert to litres.",
    diagramData: { type: 'box', L: 8, W: 8, H: 25, unit: 'cm' },
    options: ["1.6 L", "1.2 L", "1.8 L", "2 L"],
    correctIndex: 0, correctValue: 1.6,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "8 × 8 × 25 = 1600 cm³. 1600 ÷ 1000 = 1.6 L."
  },
  {
    id: 43, worldIndex: 4,
    prompt: "A small juice box holds 250 mL of juice. What is its volume in cubic centimetres?",
    hint: "One millilitre equals exactly one cubic centimetre.",
    diagramData: { type: 'box', L: 5, W: 5, H: 10, unit: 'cm' },
    options: ["250 cm³", "25 cm³", "2,500 cm³", "25,000 cm³"],
    correctIndex: 0, correctValue: 250,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "1 mL = 1 cm³, so 250 mL = 250 cm³."
  },
  {
    id: 44, worldIndex: 4,
    prompt: "A fruit juice container has a volume of 2000 cm³. Its base is 10 cm by 10 cm. How tall is the container?",
    hint: "Height = volume ÷ base area = 2000 ÷ (10 × 10).",
    diagramData: { type: 'box', L: 10, W: 10, H: 20, unit: 'cm', unknown: 'H', total: 2000 },
    options: ["20 cm", "10 cm", "15 cm", "25 cm"],
    correctIndex: 0, correctValue: 20,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 10 × 10 = 100 cm². Height = 2000 ÷ 100 = 20 cm."
  },
  {
    id: 45, worldIndex: 4,
    prompt: "A juice dispenser tank is 25 cm long, 20 cm wide and 30 cm tall. How many litres does it hold when full?",
    hint: "25 × 20 × 30 = 15,000 cm³. Divide by 1000 to get litres.",
    diagramData: { type: 'tank', L: 25, W: 20, H: 30, depth: 30, unit: 'cm' },
    options: ["15 L", "7.5 L", "12 L", "20 L"],
    correctIndex: 0, correctValue: 15,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "25 × 20 × 30 = 15,000 cm³. 15,000 ÷ 1000 = 15 L."
  },
  {
    id: 46, worldIndex: 4,
    prompt: "A juice jug 12 cm long and 10 cm wide is filled with juice to a depth of 15 cm. What is the volume of juice?",
    hint: "Multiply 12 × 10 × 15.",
    diagramData: { type: 'tank', L: 12, W: 10, H: 20, depth: 15, unit: 'cm' },
    options: ["1,800 cm³", "900 cm³", "1,200 cm³", "2,400 cm³"],
    correctIndex: 0, correctValue: 1800,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume = 12 × 10 × 15 = 1,800 cm³."
  },
  {
    id: 47, worldIndex: 4,
    prompt: "An iced tea dispenser is 20 cm by 20 cm by 40 cm. It is half full. How many litres of iced tea are inside?",
    hint: "Half full means depth is 20 cm. 20 × 20 × 20 = 8000 cm³ = 8 litres.",
    diagramData: { type: 'tank', L: 20, W: 20, H: 40, depth: 20, unit: 'cm' },
    options: ["8 L", "4 L", "12 L", "16 L"],
    correctIndex: 0, correctValue: 8,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "Depth = 40 ÷ 2 = 20 cm. Volume = 20 × 20 × 20 = 8,000 cm³ = 8 L."
  },
  {
    id: 48, worldIndex: 4,
    prompt: "A cube-shaped drink cooler has edges of 20 cm. How many litres does it hold?",
    hint: "Volume = 20 × 20 × 20 = 8000 cm³. Divide by 1000.",
    diagramData: { type: 'tank', L: 20, W: 20, H: 20, depth: 20, unit: 'cm' },
    options: ["8 L", "4 L", "6 L", "12 L"],
    correctIndex: 0, correctValue: 8,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "20 × 20 × 20 = 8,000 cm³. 8,000 ÷ 1000 = 8 L."
  },
  {
    id: 49, worldIndex: 4,
    prompt: "Harper pours 3 litres of orange juice into an empty container with base 20 cm by 15 cm. How deep is the juice?",
    hint: "3 litres = 3000 cm³. Base area = 20 × 15 = 300. Depth = 3000 ÷ 300.",
    diagramData: { type: 'tank', L: 20, W: 15, H: 15, depth: 10, unit: 'cm', unknownDepth: true },
    options: ["10 cm", "5 cm", "8 cm", "12 cm"],
    correctIndex: 0, correctValue: 10,
    rule: "✦ WORK BACKWARDS",
    explanation: "3 L = 3000 cm³. Base area = 20 × 15 = 300 cm². Depth = 3000 ÷ 300 = 10 cm."
  },
  {
    id: 50, worldIndex: 4,
    prompt: "A juice carton is 8 cm long, 6 cm wide and 15 cm high. What is its capacity in litres?",
    hint: "8 × 6 × 15 = 720 cm³. 720 ÷ 1000 = 0.72 litres.",
    diagramData: { type: 'box', L: 8, W: 6, H: 15, unit: 'cm' },
    options: ["0.72 L", "0.36 L", "0.48 L", "7.2 L"],
    correctIndex: 0, correctValue: 0.72,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "8 × 6 × 15 = 720 cm³. 720 ÷ 1000 = 0.72 L."
  },

  // --- WORLD 5: Container Port (Q51–60, unit: m) ---
  {
    id: 51, worldIndex: 5,
    prompt: "A shipping container is 6 m long, 2 m wide and 3 m high. What is its volume in cubic metres?",
    hint: "Multiply length × width × height: 6 × 2 × 3.",
    diagramData: { type: 'box', L: 6, W: 2, H: 3, unit: 'm' },
    options: ["36 m³", "18 m³", "24 m³", "48 m³"],
    correctIndex: 0, correctValue: 36,
    rule: "✦ V = l × w × h",
    explanation: "V = 6 × 2 × 3 = 36 m³."
  },
  {
    id: 52, worldIndex: 5,
    prompt: "A cargo container is 10 m long, 3 m wide and 2 m high. How many litres of liquid would fill it? (1 m³ = 1000 L)",
    hint: "Volume = 10 × 3 × 2 = 60 m³. Multiply 60 by 1000 to get litres.",
    diagramData: { type: 'tank', L: 10, W: 3, H: 2, depth: 2, unit: 'm' },
    options: ["60,000 L", "6,000 L", "30,000 L", "600,000 L"],
    correctIndex: 0, correctValue: 60000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "10 × 3 × 2 = 60 m³. 60 × 1000 = 60,000 L."
  },
  {
    id: 53, worldIndex: 5,
    prompt: "A port storage bay has a volume of 120 m³ and a height of 4 m. Find the area of its base.",
    hint: "Base area = volume ÷ height = 120 ÷ 4.",
    diagramData: { type: 'box', L: 6, W: 5, H: 4, unit: 'm', unknown: 'base', total: 120 },
    options: ["30 m²", "15 m²", "24 m²", "40 m²"],
    correctIndex: 0, correctValue: 30,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 120 ÷ 4 = 30 m²."
  },
  {
    id: 54, worldIndex: 5,
    prompt: "A concrete ballast block at the dock is a cube with edges of 2 m. What is its volume?",
    hint: "For a cube: 2 × 2 × 2.",
    diagramData: { type: 'box', L: 2, W: 2, H: 2, unit: 'm' },
    options: ["8 m³", "4 m³,", "6 m³", "12 m³"],
    correctIndex: 0, correctValue: 8,
    rule: "✦ V = s³",
    explanation: "V = 2 × 2 × 2 = 8 m³."
  },
  {
    id: 55, worldIndex: 5,
    prompt: "A large freight crate is 8 m long, 4 m wide and 3 m tall. Find its volume.",
    hint: "Multiply 8 × 4 × 3.",
    diagramData: { type: 'box', L: 8, W: 4, H: 3, unit: 'm' },
    options: ["96 m³", "48 m³", "72 m³", "108 m³"],
    correctIndex: 0, correctValue: 96,
    rule: "✦ V = l × w × h",
    explanation: "V = 8 × 4 × 3 = 96 m³."
  },
  {
    id: 56, worldIndex: 5,
    prompt: "A storage shed holds 75 m³ of cargo. It is 5 m long and 3 m wide. How high is the shed?",
    hint: "Height = 75 ÷ (5 × 3) = 75 ÷ 15.",
    diagramData: { type: 'box', L: 5, W: 3, H: 5, unit: 'm', unknown: 'H', total: 75 },
    options: ["5 m", "3 m", "4 m", "6 m"],
    correctIndex: 0, correctValue: 5,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 5 × 3 = 15 m². Height = 75 ÷ 15 = 5 m."
  },
  {
    id: 57, worldIndex: 5,
    prompt: "A grain storage hopper has dimensions 5 m by 4 m by 2 m. How many litres of grain can it hold?",
    hint: "5 × 4 × 2 = 40 m³. Multiply by 1000 to find litres.",
    diagramData: { type: 'tank', L: 5, W: 4, H: 2, depth: 2, unit: 'm' },
    options: ["40,000 L", "4,000 L", "20,000 L", "400,000 L"],
    correctIndex: 0, correctValue: 40000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "5 × 4 × 2 = 40 m³. 40 × 1000 = 40,000 L."
  },
  {
    id: 58, worldIndex: 5,
    prompt: "A maritime cube tank has a volume of 27 m³. How long is each side?",
    hint: "Find which number cubed equals 27.",
    diagramData: { type: 'box', L: 3, W: 3, H: 3, unit: 'm', unknown: 'all', total: 27 },
    options: ["3 m", "2 m", "4 m", "9 m"],
    correctIndex: 0, correctValue: 3,
    rule: "✦ WORK BACKWARDS",
    explanation: "3 × 3 × 3 = 27, so each side is 3 m."
  },
  {
    id: 59, worldIndex: 5,
    prompt: "A refrigerated shipping container is 12 m long, 2 m wide and 3 m high. What is its volume?",
    hint: "Multiply 12 × 2 × 3.",
    diagramData: { type: 'box', L: 12, W: 2, H: 3, unit: 'm' },
    options: ["72 m³", "36 m³", "54 m³", "84 m³"],
    correctIndex: 0, correctValue: 72,
    rule: "✦ V = l × w × h",
    explanation: "V = 12 × 2 × 3 = 72 m³."
  },
  {
    id: 60, worldIndex: 5,
    prompt: "A water ballast tank in a ship is 6 m by 5 m by 2 m. Water fills it to a depth of 1 m. How many litres of water are in the tank?",
    hint: "Volume = 6 × 5 × 1 = 30 m³. 30 × 1000 = 30,000 litres.",
    diagramData: { type: 'tank', L: 6, W: 5, H: 2, depth: 1, unit: 'm' },
    options: ["30,000 L", "15,000 L", "60,000 L", "300,000 L"],
    correctIndex: 0, correctValue: 30000,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume = 6 × 5 × 1 = 30 m³. 30 × 1000 = 30,000 L."
  },

  // --- WORLD 6: Swimming Pool Plaza (Q61–70, unit: m) ---
  {
    id: 61, worldIndex: 6,
    prompt: "A backyard swimming pool is 10 m long, 5 m wide and 2 m deep. What is its capacity in litres when full?",
    hint: "10 × 5 × 2 = 100 m³. 100 × 1000 = 100,000 litres.",
    diagramData: { type: 'tank', L: 10, W: 5, H: 2, depth: 2, unit: 'm' },
    options: ["100,000 L", "50,000 L", "75,000 L", "1,000,000 L"],
    correctIndex: 0, correctValue: 100000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "10 × 5 × 2 = 100 m³. 100 × 1000 = 100,000 L."
  },
  {
    id: 62, worldIndex: 6,
    prompt: "A community lap pool is 25 m long and 10 m wide. Water is 2 m deep. Find the volume of water in cubic metres.",
    hint: "Multiply length × width × depth: 25 × 10 × 2.",
    diagramData: { type: 'tank', L: 25, W: 10, H: 2, depth: 2, unit: 'm' },
    options: ["500 m³", "250 m³", "350 m³", "750 m³"],
    correctIndex: 0, correctValue: 500,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume = 25 × 10 × 2 = 500 m³."
  },
  {
    id: 63, worldIndex: 6,
    prompt: "A training pool is 20 m long, 8 m wide and 2 m deep. Water fills it to a depth of 1.5 m. How many litres of water are inside?",
    hint: "Volume = 20 × 8 × 1.5 = 240 m³. Multiply by 1000.",
    diagramData: { type: 'tank', L: 20, W: 8, H: 2, depth: 1.5, unit: 'm' },
    options: ["240,000 L", "120,000 L", "320,000 L", "400,000 L"],
    correctIndex: 0, correctValue: 240000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "20 × 8 × 1.5 = 240 m³. 240 × 1000 = 240,000 L."
  },
  {
    id: 64, worldIndex: 6,
    prompt: "A diving pool is a cube 6 m long, 6 m wide and 6 m deep. Find its volume in cubic metres.",
    hint: "Calculate 6 × 6 × 6.",
    diagramData: { type: 'box', L: 6, W: 6, H: 6, unit: 'm' },
    options: ["216 m³", "36 m³", "108 m³", "256 m³"],
    correctIndex: 0, correctValue: 216,
    rule: "✦ V = s³",
    explanation: "V = 6 × 6 × 6 = 216 m³."
  },
  {
    id: 65, worldIndex: 6,
    prompt: "A paddling pool is 8 m long and 4 m wide. It contains 16 m³ of water. How deep is the water?",
    hint: "Base area = 8 × 4 = 32 m². Depth = 16 ÷ 32.",
    diagramData: { type: 'tank', L: 8, W: 4, H: 1, depth: 0.5, unit: 'm', unknownDepth: true },
    options: ["0.5 m", "0.25 m", "1 m", "1.5 m"],
    correctIndex: 0, correctValue: 0.5,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 8 × 4 = 32 m². Depth = 16 ÷ 32 = 0.5 m."
  },
  {
    id: 66, worldIndex: 6,
    prompt: "A hotel pool is 15 m long, 6 m wide and 2 m deep. It is filled to a depth of 1.8 m. What volume of water does it hold?",
    hint: "Multiply 15 × 6 × 1.8.",
    diagramData: { type: 'tank', L: 15, W: 6, H: 2, depth: 1.8, unit: 'm' },
    options: ["162 m³", "81 m³", "180 m³", "216 m³"],
    correctIndex: 0, correctValue: 162,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume = 15 × 6 × 1.8 = 162 m³."
  },
  {
    id: 67, worldIndex: 6,
    prompt: "A garden pond is 5 m long, 4 m wide and 1.5 m deep. How many litres of water fill it completely?",
    hint: "5 × 4 × 1.5 = 30 m³. 30 × 1000 = 30,000 litres.",
    diagramData: { type: 'tank', L: 5, W: 4, H: 1.5, depth: 1.5, unit: 'm' },
    options: ["30,000 L", "15,000 L", "20,000 L", "45,000 L"],
    correctIndex: 0, correctValue: 30000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "5 × 4 × 1.5 = 30 m³. 30 × 1000 = 30,000 L."
  },
  {
    id: 68, worldIndex: 6,
    prompt: "A rectangular spa pool has base area 12 m² and holds 18 m³ of water. How deep is the water?",
    hint: "Depth = volume ÷ base area = 18 ÷ 12.",
    diagramData: { type: 'tank', L: 4, W: 3, H: 2, depth: 1.5, unit: 'm', unknownDepth: true },
    options: ["1.5 m", "1 m", "1.2 m", "2 m"],
    correctIndex: 0, correctValue: 1.5,
    rule: "✦ WORK BACKWARDS",
    explanation: "Depth = 18 ÷ 12 = 1.5 m."
  },
  {
    id: 69, worldIndex: 6,
    prompt: "A school pool 20 m long by 10 m wide by 2 m deep is filled with water 1.6 m deep. What volume of empty space remains above the water?",
    hint: "The empty height is 2 - 1.6 = 0.4 m. Multiply 20 × 10 × 0.4.",
    diagramData: { type: 'tank', L: 20, W: 10, H: 2, depth: 1.6, unit: 'm', showEmpty: true },
    options: ["80 m³", "40 m³", "160 m³", "320 m³"],
    correctIndex: 0, correctValue: 80,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Empty height = 2 − 1.6 = 0.4 m. Empty space = 20 × 10 × 0.4 = 80 m³."
  },
  {
    id: 70, worldIndex: 6,
    prompt: "If 90,000 litres of water are poured into a pool 15 m long and 6 m wide, what depth does the water reach?",
    hint: "90,000 L = 90 m³. Base area = 15 × 6 = 90 m². Depth = 90 ÷ 90.",
    diagramData: { type: 'tank', L: 15, W: 6, H: 2, depth: 1, unit: 'm', unknownDepth: true },
    options: ["1 m", "0.5 m", "1.5 m", "2 m"],
    correctIndex: 0, correctValue: 1,
    rule: "✦ WORK BACKWARDS",
    explanation: "90,000 L = 90 m³. Base area = 15 × 6 = 90 m². Depth = 90 ÷ 90 = 1 m."
  },

  // --- WORLD 7: Brick Builders (Q71–80, unit: cm) ---
  {
    id: 71, worldIndex: 7,
    prompt: "A standard building brick is 20 cm long, 10 cm wide and 5 cm high. What is its volume?",
    hint: "Multiply 20 × 10 × 5.",
    diagramData: { type: 'box', L: 20, W: 10, H: 5, unit: 'cm' },
    options: ["1,000 cm³", "500 cm³", "750 cm³", "1,500 cm³"],
    correctIndex: 0, correctValue: 1000,
    rule: "✦ V = l × w × h",
    explanation: "V = 20 × 10 × 5 = 1,000 cm³."
  },
  {
    id: 72, worldIndex: 7,
    prompt: "A concrete paving block is a cube with a volume of 1000 cm³. What is the length of each edge?",
    hint: "Find the cube root: which number times itself three times gives 1000?",
    diagramData: { type: 'box', L: 10, W: 10, H: 10, unit: 'cm', unknown: 'all', total: 1000 },
    options: ["10 cm", "5 cm", "20 cm", "100 cm"],
    correctIndex: 0, correctValue: 10,
    rule: "✦ WORK BACKWARDS",
    explanation: "10 × 10 × 10 = 1000, so each edge is 10 cm."
  },
  {
    id: 73, worldIndex: 7,
    prompt: "A stone building block has a volume of 2400 cm³ and height 12 cm. Find its base area.",
    hint: "Base area = volume ÷ height = 2400 ÷ 12.",
    diagramData: { type: 'box', L: 20, W: 10, H: 12, unit: 'cm', unknown: 'base', total: 2400 },
    options: ["200 cm²", "100 cm²", "150 cm²", "300 cm²"],
    correctIndex: 0, correctValue: 200,
    rule: "✦ WORK BACKWARDS",
    explanation: "Base area = 2400 ÷ 12 = 200 cm²."
  },
  {
    id: 74, worldIndex: 7,
    prompt: "A concrete planter box is 30 cm long, 20 cm wide and 15 cm deep. Find its volume.",
    hint: "Multiply 30 × 20 × 15.",
    diagramData: { type: 'box', L: 30, W: 20, H: 15, unit: 'cm' },
    options: ["9,000 cm³", "4,500 cm³", "6,000 cm³", "12,000 cm³"],
    correctIndex: 0, correctValue: 900,
    rule: "✦ V = l × w × h",
    explanation: "V = 30 × 20 × 15 = 9,000 cm³."
  },
  {
    id: 75, worldIndex: 7,
    prompt: "A solid cube brick has edges of 8 cm. What is its volume?",
    hint: "Calculate 8 × 8 × 8.",
    diagramData: { type: 'box', L: 8, W: 8, H: 8, unit: 'cm' },
    options: ["512 cm³", "64 cm³", "256 cm³", "384 cm³"],
    correctIndex: 0, correctValue: 512,
    rule: "✦ V = s³",
    explanation: "V = 8 × 8 × 8 = 512 cm³."
  },
  {
    id: 76, worldIndex: 7,
    prompt: "A mortar mixing trough is 40 cm long, 30 cm wide and 20 cm high. How many litres does it hold?",
    hint: "40 × 30 × 20 = 24,000 cm³. Divide by 1000 to get litres.",
    diagramData: { type: 'tank', L: 40, W: 30, H: 20, depth: 20, unit: 'cm' },
    options: ["24 L", "12 L", "18 L", "48 L"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "40 × 30 × 20 = 24,000 cm³. 24,000 ÷ 1000 = 24 L."
  },
  {
    id: 77, worldIndex: 7,
    prompt: "A decorative block has a volume of 729 cm³ and is shaped like a cube. What is the length of one side?",
    hint: "Test: 9 × 9 × 9 = 729.",
    diagramData: { type: 'box', L: 9, W: 9, H: 9, unit: 'cm', unknown: 'all', total: 729 },
    options: ["9 cm", "7 cm", "8 cm", "11 cm"],
    correctIndex: 0, correctValue: 9,
    rule: "✦ WORK BACKWARDS",
    explanation: "9 × 9 × 9 = 729, so each side is 9 cm."
  },
  {
    id: 78, worldIndex: 7,
    prompt: "Mason lays a foundation block 50 cm long, 20 cm wide and 10 cm high. Find its volume.",
    hint: "Multiply 50 × 20 × 10.",
    diagramData: { type: 'box', L: 50, W: 20, H: 10, unit: 'cm' },
    options: ["10,000 cm³", "5,000 cm³", "7,500 cm³", "15,000 cm³"],
    correctIndex: 0, correctValue: 10000,
    rule: "✦ V = l × w × h",
    explanation: "V = 50 × 20 × 10 = 10,000 cm³."
  },
  {
    id: 79, worldIndex: 7,
    prompt: "A hollow brick holds 1.5 litres of liquid. What is its capacity in cubic centimetres?",
    hint: "1 litre = 1000 cm³, so 1.5 litres = 1.5 × 1000.",
    diagramData: { type: 'box', L: 15, W: 10, H: 10, unit: 'cm' },
    options: ["1,500 cm³", "150 cm³", "15,000 cm³", "150,000 cm³"],
    correctIndex: 0, correctValue: 1500,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "1.5 L × 1000 = 1,500 cm³."
  },
  {
    id: 80, worldIndex: 7,
    prompt: "A concrete slab has a base area of 500 cm² and volume of 3500 cm³. How thick is the slab?",
    hint: "Height = volume ÷ base area = 3500 ÷ 500.",
    diagramData: { type: 'box', L: 25, W: 20, H: 7, unit: 'cm', unknown: 'H', total: 3500 },
    options: ["7 cm", "5 cm", "6 cm", "8 cm"],
    correctIndex: 0, correctValue: 7,
    rule: "✦ WORK BACKWARDS",
    explanation: "Thickness = 3500 ÷ 500 = 7 cm."
  },

  // --- WORLD 8: Warehouse Wharf (Q81–90, unit: cm) ---
  {
    id: 81, worldIndex: 8,
    prompt: "How many 2 cm cubes can be packed into a storage crate 8 cm long, 6 cm wide and 4 cm high?",
    hint: "Along the edges: 8 ÷ 2 = 4, 6 ÷ 2 = 3, 4 ÷ 2 = 2. Multiply 4 × 3 × 2.",
    diagramData: { type: 'box', L: 8, W: 6, H: 4, unit: 'cm', grid: 2 },
    options: ["24 cubes", "12 cubes", "48 cubes", "96 cubes"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ HOW MANY FIT?",
    explanation: "8 ÷ 2 = 4; 6 ÷ 2 = 3; 4 ÷ 2 = 2. Total = 4 × 3 × 2 = 24 cubes."
  },
  {
    id: 82, worldIndex: 8,
    prompt: "How many 3 cm cubes can fit into a carton 12 cm long, 9 cm wide and 6 cm high?",
    hint: "Find how many fit along each side: 12 ÷ 3 = 4, 9 ÷ 3 = 3, 6 ÷ 3 = 2. 4 × 3 × 2 = 24.",
    diagramData: { type: 'box', L: 12, W: 9, H: 6, unit: 'cm', grid: 3 },
    options: ["24 cubes", "18 cubes", "36 cubes", "72 cubes"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ HOW MANY FIT?",
    explanation: "12 ÷ 3 = 4; 9 ÷ 3 = 3; 6 ÷ 3 = 2. Total = 4 × 3 × 2 = 24 cubes."
  },
  {
    id: 83, worldIndex: 8,
    prompt: "A shipping crate is 100 cm long, 50 cm wide and 40 cm high. How many litres is its capacity?",
    hint: "100 × 50 × 40 = 200,000 cm³. Divide by 1000 to get litres.",
    diagramData: { type: 'box', L: 100, W: 50, H: 40, unit: 'cm' },
    options: ["200 L", "100 L", "150 L", "2,000 L"],
    correctIndex: 0, correctValue: 200,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "100 × 50 × 40 = 200,000 cm³. 200,000 ÷ 1000 = 200 L."
  },
  {
    id: 84, worldIndex: 8,
    prompt: "How many 2 cm cubes can fit into a box 10 cm long, 8 cm wide and 6 cm tall?",
    hint: "10 ÷ 2 = 5, 8 ÷ 2 = 4, 6 ÷ 2 = 3. Multiply 5 × 4 × 3.",
    diagramData: { type: 'box', L: 10, W: 8, H: 6, unit: 'cm', grid: 2 },
    options: ["60 cubes", "30 cubes", "120 cubes", "240 cubes"],
    correctIndex: 0, correctValue: 60,
    rule: "✦ HOW MANY FIT?",
    explanation: "10 ÷ 2 = 5; 8 ÷ 2 = 4; 6 ÷ 2 = 3. Total = 5 × 4 × 3 = 60 cubes."
  },
  {
    id: 85, worldIndex: 8,
    prompt: "A packing tank 30 cm by 20 cm by 25 cm contains water 15 cm deep. What is the volume of empty space inside?",
    hint: "Empty height = 25 - 15 = 10 cm. Multiply 30 × 20 × 10.",
    diagramData: { type: 'tank', L: 30, W: 20, H: 25, depth: 15, unit: 'cm', showEmpty: true },
    options: ["6,000 cm³", "3,000 cm³", "9,000 cm³", "15,000 cm³"],
    correctIndex: 0, correctValue: 6000,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Empty height = 25 − 15 = 10 cm. Empty volume = 30 × 20 × 10 = 6,000 cm³."
  },
  {
    id: 86, worldIndex: 8,
    prompt: "How many 4 cm cubes can be packed into a crate 16 cm by 12 cm by 8 cm?",
    hint: "Divide each dimension by 4: 4 × 3 × 2.",
    diagramData: { type: 'box', L: 16, W: 12, H: 8, unit: 'cm', grid: 4 },
    options: ["24 cubes", "12 cubes", "48 cubes", "96 cubes"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ HOW MANY FIT?",
    explanation: "16 ÷ 4 = 4; 12 ÷ 4 = 3; 8 ÷ 4 = 2. Total = 4 × 3 × 2 = 24 cubes."
  },
  {
    id: 87, worldIndex: 8,
    prompt: "A large warehouse container holds 360 litres. Its base is 120 cm long and 60 cm wide. What is its height?",
    hint: "360 L = 360,000 cm³. Divide by base area (120 × 60 = 7200).",
    diagramData: { type: 'box', L: 120, W: 60, H: 50, unit: 'cm', unknown: 'H', total: 360000 },
    options: ["50 cm", "40 cm", "60 cm", "75 cm"],
    correctIndex: 0, correctValue: 50,
    rule: "✦ WORK BACKWARDS",
    explanation: "360 L = 360,000 cm³. Base area = 120 × 60 = 7200 cm². Height = 360,000 ÷ 7200 = 50 cm."
  },
  {
    id: 88, worldIndex: 8,
    prompt: "How many 5 cm cubic boxes can be packed into a storage crate 25 cm by 20 cm by 15 cm?",
    hint: "25 ÷ 5 = 5, 20 ÷ 5 = 4, 15 ÷ 5 = 3. Multiply 5 × 4 × 3.",
    diagramData: { type: 'box', L: 25, W: 20, H: 15, unit: 'cm', grid: 5 },
    options: ["60 cubes", "30 cubes", "50 cubes", "120 cubes"],
    correctIndex: 0, correctValue: 60,
    rule: "✦ HOW MANY FIT?",
    explanation: "25 ÷ 5 = 5; 20 ÷ 5 = 4; 15 ÷ 5 = 3. Total = 5 × 4 × 3 = 60 cubes."
  },
  {
    id: 89, worldIndex: 8,
    prompt: "A crate 50 cm by 40 cm by 30 cm is filled with liquid to 80% of its height. How many litres of liquid are in the crate?",
    hint: "80% of 30 cm = 24 cm depth. 50 × 40 × 24 = 48,000 cm³ = 48 litres.",
    diagramData: { type: 'tank', L: 50, W: 40, H: 30, depth: 24, unit: 'cm' },
    options: ["48 L", "24 L", "36 L", "60 L"],
    correctIndex: 0, correctValue: 48,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "Depth = 0.8 × 30 = 24 cm. Volume = 50 × 40 × 24 = 48,000 cm³ = 48 L."
  },
  {
    id: 90, worldIndex: 8,
    prompt: "How many 2 cm cubes fit inside a cube box with edges of 10 cm?",
    hint: "Along each edge: 10 ÷ 2 = 5. So 5 × 5 × 5 = 125.",
    diagramData: { type: 'box', L: 10, W: 10, H: 10, unit: 'cm', grid: 2 },
    options: ["125 cubes", "25 cubes", "50 cubes", "250 cubes"],
    correctIndex: 0, correctValue: 125,
    rule: "✦ HOW MANY FIT?",
    explanation: "10 ÷ 2 = 5 along each edge. 5 × 5 × 5 = 125 cubes."
  },

  // --- WORLD 9: Reservoir Ridge (Q91–100) ---
  {
    id: 91, worldIndex: 9,
    prompt: "Mia pours 12 litres of water into an empty glass tank with base 40 cm by 30 cm. How deep does the water rise?",
    hint: "12 L = 12,000 cm³. Base area = 40 × 30 = 1200. Depth = 12,000 ÷ 1200.",
    diagramData: { type: 'tank', L: 40, W: 30, H: 20, depth: 10, unit: 'cm', unknownDepth: true },
    options: ["10 cm", "5 cm", "8 cm", "12 cm"],
    correctIndex: 0, correctValue: 10,
    rule: "✦ WORK BACKWARDS",
    explanation: "12 L = 12,000 cm³. Base area = 40 × 30 = 1200 cm². Depth = 12,000 ÷ 1200 = 10 cm."
  },
  {
    id: 92, worldIndex: 9,
    prompt: "A reservoir tank 60 cm by 50 cm holds water 20 cm deep. Adding more water makes the depth rise to 28 cm. How many litres were added?",
    hint: "Rise in height = 28 - 20 = 8 cm. Volume added = 60 × 50 × 8 = 24,000 cm³ = 24 litres.",
    diagramData: { type: 'tank', L: 60, W: 50, H: 35, depth: 8, unit: 'cm' },
    options: ["24 L", "12 L", "18 L", "30 L"],
    correctIndex: 0, correctValue: 24,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "Rise = 28 − 20 = 8 cm. Volume added = 60 × 50 × 8 = 24,000 cm³ = 24 L."
  },
  {
    id: 93, worldIndex: 9,
    prompt: "A concrete rainwater tank is 3 m long, 2 m wide and 2 m deep. How many litres of water does it hold when full?",
    hint: "Volume = 3 × 2 × 2 = 12 m³. 12 × 1000 = 12,000 litres.",
    diagramData: { type: 'tank', L: 3, W: 2, H: 2, depth: 2, unit: 'm' },
    options: ["12,000 L", "6,000 L", "8,000 L", "24,000 L"],
    correctIndex: 0, correctValue: 12000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "3 × 2 × 2 = 12 m³. 12 × 1000 = 12,000 L."
  },
  {
    id: 94, worldIndex: 9,
    prompt: "Noah drops a solid metal block into a tank with base 50 cm by 20 cm, causing the water to rise by 3 cm. What is the volume of the block?",
    hint: "The volume of the block equals the volume of water displaced: 50 × 20 × 3.",
    diagramData: { type: 'tank', L: 50, W: 20, H: 20, depth: 3, unit: 'cm' },
    options: ["3,000 cm³", "1,500 cm³", "2,000 cm³", "6,000 cm³"],
    correctIndex: 0, correctValue: 3000,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume displaced = 50 × 20 × 3 = 3,000 cm³."
  },
  {
    id: 95, worldIndex: 9,
    prompt: "A township reservoir is 20 m long, 15 m wide and 4 m deep. How many litres of water does it hold when full?",
    hint: "Volume = 20 × 15 × 4 = 1200 m³. 1200 × 1000 = 1,200,000 litres.",
    diagramData: { type: 'tank', L: 20, W: 15, H: 4, depth: 4, unit: 'm' },
    options: ["1,200,000 L", "600,000 L", "800,000 L", "120,000 L"],
    correctIndex: 0, correctValue: 1200000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "20 × 15 × 4 = 1200 m³. 1200 × 1000 = 1,200,000 L."
  },
  {
    id: 96, worldIndex: 9,
    prompt: "A rectangular tank with base 80 cm by 50 cm contains 60 litres of water. How deep is the water?",
    hint: "60 L = 60,000 cm³. Base area = 80 × 50 = 4000. Depth = 60,000 ÷ 4000.",
    diagramData: { type: 'tank', L: 80, W: 50, H: 25, depth: 15, unit: 'cm', unknownDepth: true },
    options: ["15 cm", "10 cm", "12 cm", "20 cm"],
    correctIndex: 0, correctValue: 15,
    rule: "✦ WORK BACKWARDS",
    explanation: "60 L = 60,000 cm³. Base area = 80 × 50 = 4000 cm². Depth = 60,000 ÷ 4000 = 15 cm."
  },
  {
    id: 97, worldIndex: 9,
    prompt: "A water tank 50 cm by 40 cm by 30 cm is filled to 20 cm depth. How many litres of water must be added to fill it completely?",
    hint: "Remaining height = 30 - 20 = 10 cm. Volume needed = 50 × 40 × 10 = 20,000 cm³ = 20 litres.",
    diagramData: { type: 'tank', L: 50, W: 40, H: 30, depth: 20, unit: 'cm', showEmpty: true },
    options: ["20 L", "10 L", "15 L", "40 L"],
    correctIndex: 0, correctValue: 20,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Remaining height = 30 − 20 = 10 cm. Volume needed = 50 × 40 × 10 = 20,000 cm³ = 20 L."
  },
  {
    id: 98, worldIndex: 9,
    prompt: "An irrigation canal section is 50 m long, 4 m wide and 2 m deep. Water flows at a depth of 1.5 m. Find the volume of water in cubic metres.",
    hint: "Multiply 50 × 4 × 1.5.",
    diagramData: { type: 'tank', L: 50, W: 4, H: 2, depth: 1.5, unit: 'm' },
    options: ["300 m³", "150 m³", "200 m³", "400 m³"],
    correctIndex: 0, correctValue: 300,
    rule: "✦ USE THE WATER DEPTH",
    explanation: "Volume = 50 × 4 × 1.5 = 300 m³."
  },
  {
    id: 99, worldIndex: 9,
    prompt: "Adding 36 litres of water into a tank with base 60 cm by 40 cm causes the water level to rise. By how many centimetres does the level rise?",
    hint: "36 L = 36,000 cm³. Base area = 60 × 40 = 2400. Rise = 36,000 ÷ 2400.",
    diagramData: { type: 'tank', L: 60, W: 40, H: 25, depth: 15, unit: 'cm', unknownDepth: true },
    options: ["15 cm", "10 cm", "12 cm", "18 cm"],
    correctIndex: 0, correctValue: 15,
    rule: "✦ WORK BACKWARDS",
    explanation: "36 L = 36,000 cm³. Base area = 60 × 40 = 2400 cm². Rise = 36,000 ÷ 2400 = 15 cm."
  },
  {
    id: 100, worldIndex: 9,
    prompt: "A grand water reservoir is 10 m long, 8 m wide and 5 m deep. It is 75% full. How many litres of water are currently in the reservoir?",
    hint: "Total volume = 10 × 8 × 5 = 400 m³ = 400,000 litres. 75% of 400,000 = 300,000 litres.",
    diagramData: { type: 'tank', L: 10, W: 8, H: 5, depth: 3.75, unit: 'm' },
    options: ["300,000 L", "150,000 L", "200,000 L", "400,000 L"],
    correctIndex: 0, correctValue: 300000,
    rule: "✦ 1000 cm³ = 1 L",
    explanation: "Total volume = 10 × 8 × 5 = 400 m³ = 400,000 L. 75% of 400,000 = 300,000 L."
  }
];

export function getPracticeQuestion(worldIndex, questionIndex = 0) {
  const idx = worldIndex * 10 + questionIndex;
  return PRACTICE_QUESTIONS[idx] || PRACTICE_QUESTIONS[0];
}

