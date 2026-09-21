/**
 * Whole-tree design-system ratchet.
 *
 * Counts violations across client/src and fails if any category went up
 * versus ds-baseline.json. A diff review cannot see a leftover three lines
 * below your change; this can.
 *
 *   node scripts/ds-audit.mjs           # compare against baseline (CI / pre-push)
 *   node scripts/ds-audit.mjs --update  # rewrite baseline after a count went down
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(clientRoot, 'src');
const baselinePath = path.join(clientRoot, 'ds-baseline.json');
const update = process.argv.includes('--update');

const CATEGORIES = [
  'styleAttributes',
  'arbitraryUtilities',
  'colorLiterals',
  'muiImports',
  'sxProps',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
      continue;
    }
    if (/\.(js|jsx|css)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function count(text, regex) {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function auditFile(filePath, text) {
  const isCss = filePath.endsWith('.css');
  return {
    styleAttributes: isCss ? 0 : count(text, /\bstyle\s*=\s*\{/g),
    arbitraryUtilities: isCss ? 0 : count(text, /[a-zA-Z][\w:%./-]*-\[[^\]]+\]/g),
    colorLiterals: isCss
      ? 0
      : count(text, /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g) +
        count(text, /rgba?\(\s*\d+/g),
    muiImports: isCss ? 0 : count(text, /from\s+['"]@mui\//g),
    sxProps: isCss ? 0 : count(text, /\bsx\s*=\s*\{/g),
  };
}

const empty = () => Object.fromEntries(CATEGORIES.map((k) => [k, 0]));

const totals = empty();
for (const file of walk(srcRoot)) {
  const text = fs.readFileSync(file, 'utf8');
  const found = auditFile(file, text);
  for (const key of CATEGORIES) totals[key] += found[key];
}

if (!fs.existsSync(baselinePath)) {
  if (!update) {
    console.error('ds-audit: no ds-baseline.json. Run with --update to create it.');
    process.exit(1);
  }
  fs.writeFileSync(
    baselinePath,
    `${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), counts: totals }, null, 2)}\n`,
  );
  console.log('ds-audit: wrote baseline');
  console.table(totals);
  process.exit(0);
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const previous = baseline.counts;
const risen = [];
const fallen = [];

for (const key of CATEGORIES) {
  const next = totals[key];
  const prev = previous[key] ?? 0;
  if (next > prev) risen.push(`${key}: ${prev} -> ${next}`);
  if (next < prev) fallen.push(`${key}: ${prev} -> ${next}`);
}

console.table(totals);

if (risen.length) {
  console.error('ds-audit: violation count went UP (not allowed):\n  ' + risen.join('\n  '));
  process.exit(1);
}

if (fallen.length) {
  console.log('ds-audit: counts went down:\n  ' + fallen.join('\n  '));
  if (update) {
    fs.writeFileSync(
      baselinePath,
      `${JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), counts: totals }, null, 2)}\n`,
    );
    console.log('ds-audit: baseline updated');
  } else {
    console.log('ds-audit: run with --update to lock the new lower baseline');
  }
} else {
  console.log('ds-audit: counts match baseline');
}

process.exit(0);
