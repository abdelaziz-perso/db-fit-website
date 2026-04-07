/**
 * Same role as `nextjs-portfolio-2026/scripts/patch-html-lang.mjs`: static export emits one
 * root html lang from `app/layout.tsx` (default locale). Patch all `out` HTML files so
 * `lang` matches the URL (en, ar, fr, or default for root / French silos).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

function readDefaultLocale() {
  const configPath = path.join(root, "lib", "i18n", "config.ts");
  const src = fs.readFileSync(configPath, "utf8");
  const m = src.match(/defaultLocale:\s*Locale\s*=\s*"([a-z]{2})"/);
  return m?.[1] ?? "fr";
}

function isLikelyHtmlDocument(raw) {
  return /<\s*html[\s>]/i.test(raw);
}

function htmlLangForFile(filePath, defaultLocale) {
  const rel = path.relative(outDir, filePath).split(path.sep).filter(Boolean);
  const fileName = rel[rel.length - 1] ?? "";

  if (/^google[0-9a-z]+\.html$/i.test(fileName)) {
    return null;
  }

  if (rel.length === 1 && fileName === "index.html") {
    return defaultLocale;
  }

  const top = rel[0];
  if (top === "en") return "en";
  if (top === "ar") return "ar";
  if (top === "fr") return "fr";
  if (top === "_next") return null;

  return defaultLocale;
}

function setHtmlLang(html, lang) {
  return html.replace(/<html([^>]*)>/, (_, inner) => {
    if (/\blang\s*=/.test(inner)) {
      const next = inner
        .replace(/\blang\s*=\s*"[^"]*"/, `lang="${lang}"`)
        .replace(/\blang\s*=\s*'[^']*'/, `lang='${lang}'`);
      return `<html${next}>`;
    }
    return `<html lang="${lang}"${inner}>`;
  });
}

function walkHtmlFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtmlFiles(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const defaultLocale = readDefaultLocale();
const files = walkHtmlFiles(outDir);
let patched = 0;

for (const file of files) {
  const lang = htmlLangForFile(file, defaultLocale);
  if (!lang) continue;
  const raw = fs.readFileSync(file, "utf8");
  if (!isLikelyHtmlDocument(raw)) continue;
  const next = setHtmlLang(raw, lang);
  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    patched += 1;
  }
}

console.log(
  `patch-html-lang: updated ${patched} file(s) under out/ (defaultLocale=${defaultLocale}).`,
);
