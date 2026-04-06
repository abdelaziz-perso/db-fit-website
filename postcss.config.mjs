import path from "node:path";
import { fileURLToPath } from "node:url";

/** Toujours ce dépôt, même si `process.cwd()` ou le workspace IDE pointe vers un dossier parent. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: projectRoot,
    },
  },
};

export default config;
