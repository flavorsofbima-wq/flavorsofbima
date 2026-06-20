// Deletes the entire Next.js build folder (.next) so a freshly
// regenerated catalog.generated.json is always picked up cleanly.
// Clearing only .next/cache sometimes leaves stale pre-rendered pages
// (e.g. the shop listing) showing old prices. A full wipe is safe —
// Next simply rebuilds on the next start (first load is a bit slower).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(__dirname);
const nextDir = path.join(ROOT, ".next");

try {
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("  🧹 Cleared Next.js build (.next) — fresh data will load.");
  }
} catch (e) {
  // non-fatal — if it fails, the site still runs
  console.log("  (Could not clear .next — not a problem:", e.message, ")");
}

