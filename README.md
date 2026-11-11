# Volume of Cubes and Cuboids (Grade 8)

An interactive, gamified 5-phase math learning experience covering **Volume of Cubes & Cuboids** designed for Grade 8 students.

## 🚀 Features

- **Phase 1: Wonder & Curiosity** — An introductory visual hook exploring Ethan's 60L fish tank.
- **Phase 2: Visual Story** — 8 illustrated slides breaking down volume fundamentals, layer-by-layer counting, cuboid and cube formulas ($V = l \times w \times h$ and $V = s^3$), and converting $\text{cm}^3$ to litres.
- **Phase 3: Simulation Stations**
  - **Station 1 (Cube Builder):** Build 3D shapes layer-by-layer using unit cubes.
  - **Station 2 (Tank Filler):** Interactive water level slider with real-time capacity and volume calculations.
  - **Station 3 (Box Designer):** Working backwards to find missing dimensions and design custom containers.
- **Phase 4: Practice Game** — 10 themed worlds containing 100 curated questions with dynamic isometric 3D diagrams, hints, and explanations.
- **Phase 5: Reflect & Scoreboard** — Interactive reflection question and gamified rewards (XP, Stars, Streaks).
- **Audio & Narration Pipeline** — Integrated voice narration with pre-generated `.mp3` audio files, mathematical pronunciation, and instant overlap prevention when switching slides or skipping phases.

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Canvas Confetti**
- **ElevenLabs AI Audio** (Alice Educator Voice `Xb7hH8MSUJpSbSDYk0k2`)

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your ElevenLabs API key:
```bash
cp .env.example .env.local
```

### 3. Generate Audio Narration Files (Optional)
All 239 audio files are pre-generated in `public/assets/audio/`. To re-generate:
```bash
npm run audio:generate
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```
