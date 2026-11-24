import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Atlantis: light drizzle, then a full ocean. Bring an umbrella and gills. Visibility: mythological.";

// Guard: gate kit 1-140 karakter, satu baris, tanpa whitespace tepi.
if (LINE.length < 1 || LINE.length > 140) throw new Error(`line length ${LINE.length} outside 1-140`);
if (LINE.trim() !== LINE) throw new Error("leading/trailing whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("must be one line");
// Spasi ganda di tengah baris adalah typo yang tidak boleh lolos.
if (/\s{2,}/.test(LINE)) throw new Error("double space inside line");

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: yang tertulis harus byte-identik dengan baris final.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`wrote ${LINE.length} chars to ${outPath}`);
