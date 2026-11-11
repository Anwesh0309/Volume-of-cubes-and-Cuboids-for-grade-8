# Volume Quest — Audio & Narration Pipeline

Same ElevenLabs "Alice" pipeline as the Number Bonds / Circumference modules.

- **Voice:** Alice — `Xb7hH8MSUJpSbSDYk0k2` · **Model:** `eleven_multilingual_v2`
- **API key:** `.env.local` → `VITE_ELEVENLABS_API_KEY`
- **Content policy:** only paragraphs and questions are narrated. Titles are never spoken.

## Files
| File | Role |
|---|---|
| `src/utils/lessonScript.js` | Single source of every spoken line (UI displays the same strings → 1:1 parity) |
| `src/utils/narration.js` | Phase functions: `wonderNarration()`, `getStoryNarration(i)`, `simulateStationIntro(n)`, `reflectQuestionNarration()`, feedback lines |
| `src/utils/audio.js` | Engine: `audioMap` cache → ElevenLabs (`/api/elevenlabs` dev proxy, then direct) → browser speech fallback. Sequential queue, `stopNarration()`, preloads segment i+1 |
| `src/utils/audioMap.js` | Auto-generated text → MP3 map |
| `scripts/generate_audio.js` | Pre-generates MP3s into `public/assets/audio/` (500 ms rate limit, skips existing; `--force` to redo) |
| `scripts/clean_audio.js` | Deletes MP3s no longer in `audioMap` |

## First-time setup
```bash
npm install
npm run audio:generate     # = node scripts/generate_audio.js  (creates the MP3s + audioMap.js)
npm run dev
```
Until you run the generator, the app fetches narration live from ElevenLabs.

## Adding / changing a line
1. Edit the text in `src/utils/lessonScript.js` (add new lines to `ALL_PHRASES`).
2. `npm run audio:generate`
3. `npm run audio:clean` (optional, removes orphaned MP3s)
4. Use it from `narration.js` and call `narrate(...)` in the component.
