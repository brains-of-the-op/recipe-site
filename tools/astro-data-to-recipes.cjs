#!/usr/bin/env node
/**
 * Convert Astro's .astro/data-store.json -> public/recipes.json (planner-friendly)
 * Usage:
 *   node tools/astro-data-to-recipes.cjs .astro/data-store.json public/recipes.json
 *
 * Notes:
 * - Handles Astro's dehydrated Map structure
 * - Extracts recipe frontmatter data for meal planning
 */

const fs = require('fs');
const path = require('path');

const [,, inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Usage: node tools/astro-data-to-recipes.cjs <.astro/data-store.json> <public/recipes.json>');
  process.exit(1);
}

const BASE_PATH = '/recipe-site/recipes';

function readJSON(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }

/**
 * Rehydrate Astro's dehydrated Map structure
 * Format: [["Map", idx1, idx2, ...], ...data indexed by indices]
 */
function rehydrateMap(arr, rootIndex = 0) {
  const item = arr[rootIndex];
  
  // If it's a Map marker
  if (Array.isArray(item) && item[0] === "Map") {
    const map = {};
    // Indices come in pairs: key index, value index
    for (let i = 1; i < item.length; i += 2) {
      const keyIdx = item[i];
      const valIdx = item[i + 1];
      const key = rehydrateMap(arr, keyIdx);
      const val = rehydrateMap(arr, valIdx);
      map[key] = val;
    }
    return map;
  }
  
  // If it's a number (index reference), resolve it
  if (typeof item === 'number') {
    return rehydrateMap(arr, item);
  }
  
  // If it's an array with numeric values, resolve them
  if (Array.isArray(item) && item.length > 0) {
    return item.map(val => {
      if (typeof val === 'number' && val < arr.length) {
        return rehydrateMap(arr, val);
      }
      return val;
    });
  }
  
  // If it's an object with number values, try to resolve them
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const resolved = {};
    for (const [key, val] of Object.entries(item)) {
      if (typeof val === 'number' && val < arr.length) {
        resolved[key] = rehydrateMap(arr, val);
      } else if (Array.isArray(val)) {
        resolved[key] = val.map(v => {
          if (typeof v === 'number' && v < arr.length) {
            return rehydrateMap(arr, v);
          }
          return v;
        });
      } else {
        resolved[key] = val;
      }
    }
    return resolved;
  }
  
  // Otherwise return as-is
  return item;
}

function asArray(x){ if(!x) return []; return Array.isArray(x) ? x : String(x).split(',').map(s=>s.trim()).filter(Boolean); }
function first(...vals){ for (const v of vals){ if (v !== undefined && v !== null && String(v).trim() !== '') return v; } return null; }

function inferMealType(title, tagsArr){
  const t = (title + ' ' + (tagsArr||[]).join(' ')).toLowerCase();
  if (/\bbreakfast\b/.test(t)) return 'breakfast';
  if (/\b(dessert|cake|pie|cookie|brownie|pudding|sweet|no-bake)\b/.test(t)) return 'dessert';
  if (/\b(side|vegetable|salad|coleslaw|rolls?|sauce|gravy)\b/.test(t)) return 'side';
  if (/\b(dinner|lunch|main)\b/.test(t)) return 'main';
  return 'main'; // default
}

const rawStore = readJSON(inPath);
const store = rehydrateMap(rawStore);

console.log('Rehydrated data store, looking for recipes...');

// Extract recipes from the rehydrated store
const recipes = store['recipes'] || {};
const recipeEntries = Object.entries(recipes);

console.log(`Found ${recipeEntries.length} recipe entries`);

const items = recipeEntries.map(([slug, entry]) => {
  const data = entry.data || entry.frontmatter || entry;

  const title = first(
    data?.title, entry.title,
    slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  );

  const tags = asArray(first(data?.tags, entry.tags));

  // Time and serving fields
  const prepTime  = first(data?.prepTime,  entry.prepTime);
  const cookTime  = first(data?.cookTime,  entry.cookTime);
  const totalTime = first(data?.totalTime, entry.totalTime);
  const servings  = first(data?.servings,  entry.servings);
  const difficulty = first(data?.difficulty, entry.difficulty);
  const image = first(data?.image, entry.image);

  const href = `${BASE_PATH}/${slug}/`;

  return {
    slug,
    title: String(title || 'Untitled Recipe'),
    href,
    prepTime: prepTime || null,
    cookTime: cookTime || null,
    totalTime: totalTime || null,
    servings: servings || null,
    difficulty: difficulty ? String(difficulty) : null,
    tags,
    mealType: first(data?.mealType, inferMealType(String(title||''), tags)),
    image: image || null
  };
});

// Sort by title
const sorted = items.sort((a,b)=>a.title.localeCompare(b.title, undefined, {sensitivity:'base'}));

fs.writeFileSync(outPath, JSON.stringify(sorted, null, 2));
console.log(`✅ Wrote ${sorted.length} recipes to ${outPath}`);

