#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const slidesRoot = resolve(__dirname, "..");
const docsPublic = resolve(slidesRoot, "../docs/public/slides");

const deck = process.argv[2];
if (!deck) {
  console.error("Usage: build-deck.mjs <deck>");
  process.exit(1);
}

const entry = join(slidesRoot, deck, "slides.md");
if (!existsSync(entry)) {
  console.error(`Deck not found: ${entry}`);
  process.exit(1);
}

const distDir = join(slidesRoot, "dist");
mkdirSync(distDir, { recursive: true });

const pdfOut = join(distDir, `${deck}.pdf`);

execFileSync(
  "pnpm",
  ["exec", "slidev", "export", entry, "--output", pdfOut, "--with-clicks"],
  { stdio: "inherit", cwd: slidesRoot }
);

mkdirSync(docsPublic, { recursive: true });
copyFileSync(pdfOut, join(docsPublic, `${deck}.pdf`));

console.log(`✓ Built ${deck}.pdf and copied to apps/docs/public/slides/`);
