#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const slidesRoot = resolve(__dirname, "..");

const deck = process.argv[2] ?? "jour1";
const entry = join(slidesRoot, deck, "slides.md");

if (!existsSync(entry)) {
  const decks = readdirSync(slidesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(slidesRoot, d.name, "slides.md")))
    .map((d) => d.name);
  console.error(`Deck introuvable : ${deck}`);
  console.error(`Decks disponibles : ${decks.join(", ")}`);
  console.error(`Usage : pnpm dev:slides <deck>   (ex. pnpm dev:slides jour2)`);
  process.exit(1);
}

execFileSync("pnpm", ["exec", "slidev", entry, "--open"], {
  stdio: "inherit",
  cwd: slidesRoot,
});
