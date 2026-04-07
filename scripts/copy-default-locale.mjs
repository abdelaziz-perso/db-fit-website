/**
 * After `next build` with `output: "export"`, merges `out/fr/**` into `out/`
 * so French URLs are served without a `/fr` prefix (SEO + Hostinger static).
 * Skips `_next` if ever present under `fr/`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const frDir = path.join(outDir, "fr");

if (!fs.existsSync(frDir)) {
  console.warn(
    "copy-default-locale: out/fr not found — skip (not a static export build?)",
  );
  process.exit(0);
}

function copyMerged(srcDir, destDir, frRoot) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const from = path.join(srcDir, ent.name);
    const to = path.join(destDir, ent.name);
    if (ent.name === "_next") continue;
    // Same pattern as nextjs-portfolio-2026: `/fr` home redirects to `/`; real home is `app/page.tsx`.
    if (srcDir === frRoot && ent.name === "index.html") continue;
    if (ent.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyMerged(from, to, frRoot);
    } else {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }
}

copyMerged(frDir, outDir, frDir);
console.log("copy-default-locale: merged out/fr/* → out/ (default locale paths)");
