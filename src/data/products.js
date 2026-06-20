// ============================================================
//  COMPATIBILITY SHIM
//  ----------------------------------------------------------
//  Product data now lives in the admin Excel and is loaded via
//  src/lib/catalog.js (generated at build time). This file just
//  re-exports from there so existing imports keep working.
//
//  To change products/prices: edit admin/FlavorsOfBIMA-Admin.xlsx,
//  then run `npm run dev` (or redeploy) to regenerate.
// ============================================================

export {
  CATEGORIES,
  PRODUCTS,
  SETTINGS,
  WHYUS,
  TESTIMONIALS,
  getProduct,
  getCategory,
  productsByCategory,
  bestsellers,
  categoryType,
  weightsForProduct,
  setting,
  defaultTheme,
} from "@/lib/catalog";
