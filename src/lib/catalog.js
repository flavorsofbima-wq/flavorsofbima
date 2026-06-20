// ============================================================
//  CATALOG (generated from the admin Excel at build time)
//  ----------------------------------------------------------
//  scripts/build-catalog.py reads admin/FlavorsOfBIMA-Admin.xlsx
//  and writes src/data/catalog.generated.json. This module wraps
//  that JSON with the same helper API the app already used, so
//  components don't care where the data came from.
//
//  Prices now come per-weight straight from the sheet (no more
//  multipliers). Discounts, active-flags, FSSAI, theme, why-us
//  and testimonials all flow from the sheet too.
// ============================================================

import data from "@/data/catalog.generated.json";

export const CATEGORIES = data.categories;
export const PRODUCTS = data.products;
export const SETTINGS = data.settings || {};
export const WHYUS = data.whyus || [];
export const TESTIMONIALS = data.testimonials || [];
export const TRUSTBAR = data.trustbar || [];
export const FAQ = data.faq || [];
export const GENERATED_AT = data.generatedAt || "";

// Weight option sets per category base (labels only — prices are per product now)
export const WEIGHT_LABELS = {
  "250g": ["250g", "500g", "1kg"],
  "100g": ["100g", "200g", "500g"],
};

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}
export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}
export function productsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.category === categoryId);
}
export function bestsellers() {
  return PRODUCTS.filter((p) => p.bestseller);
}
export function categoryType(categoryId) {
  return getCategory(categoryId)?.type || "veg";
}

// Available weight labels for a product (those that actually have a price)
export function weightsForProduct(product) {
  if (!product) return [];
  const cat = getCategory(product.category);
  const base = cat?.base === "100g" ? "100g" : "250g";
  const labels = WEIGHT_LABELS[base];
  // only include weights that have a price in the sheet
  return labels.filter((l) => product.prices && product.prices[l] != null);
}

// Settings helpers
export function setting(key, fallback = "") {
  const v = SETTINGS[key];
  return v == null || v === "" ? fallback : v;
}
export function defaultTheme() {
  const t = setting("theme", "navy-gold").toLowerCase();
  return t === "white" ? "white" : "navy-gold";
}
