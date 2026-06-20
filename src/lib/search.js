// ============================================================
//  SEARCH & FILTER LOGIC
//  ----------------------------------------------------------
//  Pure functions — no React, no side effects. Easy to test and
//  reuse on a server later. The UI in components/Shop.jsx just
//  calls these.
// ============================================================

import { PRODUCTS, getCategory } from "@/data/products";
import { fromPrice } from "@/lib/pricing";

/** Lowercase haystack of everything a product can be searched by. */
function haystack(p) {
  const cat = getCategory(p.category);
  return [
    p.name,
    p.shortDesc,
    p.description,
    cat?.name,
    cat?.type, // "veg" / "non-veg"
    p.hasGarlic ? "garlic" : "",
    ...(p.ingredients || []),
  ]
    .join(" ")
    .toLowerCase();
}

/** Autocomplete suggestions for the search bar. */
export function suggest(query, limit = 6) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => haystack(p).includes(q))
    .slice(0, limit)
    .map((p) => ({ slug: p.slug, name: p.name, emoji: p.emoji, category: p.category }));
}

/**
 * Filter + search the catalog.
 * @param {object} f
 * @param {string} f.query
 * @param {string[]} f.categories  - category ids
 * @param {string} f.type          - "all" | "veg" | "non-veg"
 * @param {string} f.garlic        - "all" | "garlic" | "no-garlic"
 * @param {boolean} f.bestseller
 * @param {boolean} f.freshBatch
 * @param {number} f.maxPrice      - upper bound on "from" price
 * @param {string} f.sort          - "popular" | "price-asc" | "price-desc" | "name"
 */
export function runFilters(f = {}) {
  const {
    query = "",
    categories = [],
    type = "all",
    garlic = "all",
    bestseller = false,
    freshBatch = false,
    maxPrice = Infinity,
    sort = "popular",
  } = f;

  const q = query.trim().toLowerCase();

  let out = PRODUCTS.filter((p) => {
    if (q && !haystack(p).includes(q)) return false;
    if (categories.length && !categories.includes(p.category)) return false;
    if (type !== "all") {
      const cat = getCategory(p.category);
      if (cat?.type !== type) return false;
    }
    if (garlic === "garlic" && !p.hasGarlic) return false;
    if (garlic === "no-garlic" && p.hasGarlic) return false;
    if (bestseller && !p.bestseller) return false;
    if (freshBatch && !p.freshBatch) return false;
    if (fromPrice(p) > maxPrice) return false;
    return true;
  });

  switch (sort) {
    case "price-asc":
      out = out.sort((a, b) => fromPrice(a) - fromPrice(b));
      break;
    case "price-desc":
      out = out.sort((a, b) => fromPrice(b) - fromPrice(a));
      break;
    case "name":
      out = out.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "popular":
    default:
      out = out.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
      break;
  }

  return out;
}

/** Price bounds across the catalog, for the price slider. */
export function priceBounds() {
  const prices = PRODUCTS.map(fromPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
