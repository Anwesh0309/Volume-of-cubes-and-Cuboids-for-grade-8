/* =========================================================================
   AUDIO CLEANUP — deletes MP3s in public/assets/audio/ that are no longer
   referenced by src/utils/audioMap.js.
   Usage:  node scripts/clean_audio.js
   ========================================================================= */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { audioMap } from '../src/utils/audioMap.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'assets', 'audio');

const valid = new Set(Object.values(audioMap).map(p => path.basename(p)));
let removed = 0;

if (fs.existsSync(AUDIO_DIR)) {
  for (const f of fs.readdirSync(AUDIO_DIR)) {
    if (f.endsWith('.mp3') && !valid.has(f)) {
      fs.unlinkSync(path.join(AUDIO_DIR, f));
      console.log(`🗑  removed ${f}`);
      removed++;
    }
  }
}
console.log(`Done. ${removed} orphaned file(s) removed, ${valid.size} kept.`);
