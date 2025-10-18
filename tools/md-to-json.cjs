#!/usr/bin/env node
// node tools/md-to-json.js recipes.md recipes.json
const fs = require('fs');

const [,, inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Usage: node md-to-json.js <recipes.md> <recipes.json>');
  process.exit(1);
}

const md = fs.readFileSync(inPath, 'utf8');

// A tolerant parser that looks for blocks like:
// ### Title
// 10 min 25 min 6–8 people Easy
// tag1 tag2 tag3
// [View Recipe](/recipes/slug/)
const lines = md.split(/\r?\n/);
const items = [];
for (let i=0; i<lines.length; i++) {
  const h = lines[i].match(/^#{2,3}\s+(.+)/); // ## or ### title
  if (!h) continue;

  const title = h[1].trim();
  let j = i + 1;

  // scan next non-empty lines for meta, tags, link
  function nextNonEmpty(k){ while (k < lines.length && !lines[k].trim()) k++; return k; }

  j = nextNonEmpty(j);
  const meta = (lines[j] || '').trim();
  j = nextNonEmpty(j+1);
  const tagsLine = (lines[j] || '').trim();
  j = nextNonEmpty(j+1);
  const linkLine = (lines[j] || '').trim();

  const difficulty = (meta.match(/\b(Easy|Medium|Hard)\b/) || [])[1] || null;
  const servings = (meta.match(/(\d[^\s]*\s*(people|servings|slices|rolls|cakes|pieces))/i) || [])[1] || null;
  const prepTime = (meta.match(/^([^\d]*\d.*?min|.*?hrs?.*?)(?=\s\d|$)/i) || [])[1] || null;
  let cookTime = null;
  if (prepTime) {
    const rest = meta.replace(prepTime,'').trim();
    cookTime = (rest.match(/(\d[^A-Z]*min|hrs?[^A-Z]*|[0-9–-]+\s*min)/i) || [])[1] || null;
  }

  const tags = tagsLine.split(/\s+/).filter(Boolean);
  const hrefMatch = linkLine.match(/\((https?:\/\/[^\)]+|\/[^\)]+)\)/);
  const href = hrefMatch ? hrefMatch[1] : null;

  const slug = href
    ? new URL(href, 'https://brains-of-the-op.github.io').pathname
    : '/' + title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

  const t = (title + ' ' + tags.join(' ')).toLowerCase();
  const mealType = /\bbreakfast\b/.test(t) ? 'breakfast'
                  : /\b(dessert|cake|pie|cookie)\b/.test(t) ? 'dessert'
                  : /\b(side|vegetable|salad)\b/.test(t) ? 'side'
                  : 'main';

  items.push({ slug, title, href, prepTime, cookTime, servings, difficulty, tags, mealType });
}

// Write JSON
fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} recipes to ${outPath}`);
