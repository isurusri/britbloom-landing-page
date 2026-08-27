import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public/images');

const CONVERT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);
const SKIP_DIRS = new Set(['favicon_io']);

let totalSavedKB = 0;

async function processDir(dir) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            if (!SKIP_DIRS.has(entry)) await processDir(fullPath);
        } else if (CONVERT_EXTS.has(extname(entry))) {
            const outPath = fullPath.replace(/\.[^.]+$/, '.webp');
            const origKB = Math.round(stat.size / 1024);
            await sharp(fullPath).webp({ quality: 82 }).toFile(outPath);
            const newKB = Math.round(statSync(outPath).size / 1024);
            const saved = origKB - newKB;
            totalSavedKB += saved;
            console.log(`  ${basename(fullPath).padEnd(30)} ${origKB}KB → ${newKB}KB  (−${saved}KB)`);
        }
    }
}

console.log('Converting images to WebP...\n');
await processDir(publicDir);
console.log(`\nDone. Total saved: ~${Math.round(totalSavedKB / 1024)} MB`);
