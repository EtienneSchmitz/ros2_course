#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  cpSync,
  rmSync,
  readdirSync,
} from "node:fs";
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
const spaDir = join(distDir, deck);
mkdirSync(distDir, { recursive: true });
mkdirSync(docsPublic, { recursive: true });

const pdfOut = join(distDir, `${deck}.pdf`);

// 1. Build PDF (for download)
execFileSync(
  "pnpm",
  ["exec", "slidev", "export", entry, "--output", pdfOut, "--with-clicks"],
  { stdio: "inherit", cwd: slidesRoot }
);
copyFileSync(pdfOut, join(docsPublic, `${deck}.pdf`));

// 2. Build SPA (for iframe embed in Starlight)
rmSync(spaDir, { recursive: true, force: true });
execFileSync(
  "pnpm",
  [
    "exec",
    "slidev",
    "build",
    entry,
    "--out",
    spaDir,
    "--base",
    `/slides/${deck}/`,
  ],
  { stdio: "inherit", cwd: slidesRoot }
);

// 2b. Copy raw asset folders (img/, distros/, …) into the SPA output.
// Slidev bundles <img> into hashed assets, but ALSO emits
// <link rel="preload" as="image" href="./img/…"> pointing at the ORIGINAL
// paths. Without the raw files those preloads 404 (and break the link checker).
for (const e of readdirSync(join(slidesRoot, deck), { withFileTypes: true })) {
  if (e.isDirectory() && e.name !== "public") {
    cpSync(join(slidesRoot, deck, e.name), join(spaDir, e.name), {
      recursive: true,
    });
  }
}

const spaDocsDir = join(docsPublic, deck);
rmSync(spaDocsDir, { recursive: true, force: true });
cpSync(spaDir, spaDocsDir, { recursive: true });

console.log(
  `✓ Built ${deck}.pdf + SPA → apps/docs/public/slides/${deck}/ (embeddable at /slides/${deck}/)`
);
