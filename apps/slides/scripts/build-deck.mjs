#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync, cpSync, rmSync } from "node:fs";
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

const spaDocsDir = join(docsPublic, deck);
rmSync(spaDocsDir, { recursive: true, force: true });
cpSync(spaDir, spaDocsDir, { recursive: true });

console.log(
  `✓ Built ${deck}.pdf + SPA → apps/docs/public/slides/${deck}/ (embeddable at /slides/${deck}/)`
);
