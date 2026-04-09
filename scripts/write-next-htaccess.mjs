/**
 * Next.js interdit `public/_next/` (conflit avec la route interne). On injecte donc
 * après le build un `.htaccess` dans `out/_next/` pour Apache / LiteSpeed (Hostinger)
 * afin d’éviter les blocages sur les dossiers dont le nom commence par `_`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outNext = path.join(root, "out", "_next");

const inner = `# Next.js assets — ne pas traiter ce dossier comme “caché” / interdit.
# Note : une requête sur /_next/static/ (sans fichier) peut rester en 403 : c’est le
# refus d’afficher le listing du répertoire, pas un blocage des .css / .js.
#
# ForceType (mod_mime) : sur certains hôtes, les chunks sortent en text/html ou octet-stream ;
# avec X-Content-Type-Options: nosniff à la racine, le navigateur refuse d’appliquer le CSS.
<IfModule mod_authz_core.c>
  Require all granted
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Allow from all
</IfModule>
<IfModule mod_mime.c>
  <FilesMatch "\\.css$">
    ForceType text/css
  </FilesMatch>
  <FilesMatch "\\.(js|mjs)$">
    ForceType application/javascript
  </FilesMatch>
</IfModule>
`;

if (!fs.existsSync(outNext)) {
  console.warn("write-next-htaccess: out/_next missing — skip");
  process.exit(0);
}

fs.writeFileSync(path.join(outNext, ".htaccess"), inner, "utf8");

const staticDir = path.join(outNext, "static");
if (fs.existsSync(staticDir)) {
  fs.writeFileSync(path.join(staticDir, ".htaccess"), inner, "utf8");
}

console.log("write-next-htaccess: wrote out/_next/.htaccess (+ static/ if present)");
