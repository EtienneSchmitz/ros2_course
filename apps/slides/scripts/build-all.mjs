#!/usr/bin/env node
import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const slidesRoot = resolve(__dirname, "..");

const decks = readdirSync(slidesRoot)
  .filter((entry) => {
    const full = join(slidesRoot, entry);
    if (!statSync(full).isDirectory()) return false;
    if (["scripts", "dist", "node_modules"].includes(entry)) return false;
    return true;
  });

for (const deck of decks) {
  console.log(`\n▶ Building ${deck}…`);
  execFileSync(
    "node",
    [join(__dirname, "build-deck.mjs"), deck],
    { stdio: "inherit", cwd: slidesRoot }
  );
}
