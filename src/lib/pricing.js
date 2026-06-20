// ============================================================
//  PRICING ENGINE
//  ----------------------------------------------------------
//  Prices now come per-weight directly from the admin Excel
//  (product.prices = { "250g": 150, "500g": 285, ... }).
//  Discounts (item 17) are applied here: amount or percentage.
//  Every price shown on the site flows through computePrice().
// ============================================================

import { weightsForProduct, SETTINGS } from "@/lib/catalog";

function rawPrice(product, { weight, garlic, oil, pkg } = {}) {
  if (!product || !product.prices) return 0;
  const weights = weightsForProduct(product);
  const w = weight && product.prices[weight] != null ? weight : weights[0];
  let price = product.prices[w] || 0;
  // surcharges scale gently with size relative to the base weight
  const factor = price / (product.prices[weights[0]] || price || 1);
  if (product.hasGarlic && garlic && product.garlicSurcharge) {
    price += product.garlicSurcharge * factor;
  }
  if (product.hasOptions) {
    // oil: "wood" (default, +0) or "refined" (refinedOilDiff)
    if (oil === "refined" && product.refinedOilDiff) {
      price += product.refinedOilDiff * factor;
    }
    // package: "pouch" (default, +0) or "glass" (glassBottleDiff)
    if (pkg === "glass" && product.glassBottleDiff) {
      price += product.glassBottleDiff * factor;
    }
  }
  return price;
}

export function applyDiscount(product, price) {
  if (!product || !product.discountType || !product.discountValue) return price;
  if (product.discountType === "amount") {
    return Math.max(0, price - product.discountValue);
  }
  if (product.discountType === "percentage") {
    return Math.max(0, price * (1 - product.discountValue / 100));
  }
  return price;
}

export function computePrice(product, opts = {}) {
  return Math.round(applyDiscount(product, rawPrice(product, opts)));
}

export function originalPrice(product, opts = {}) {
  return Math.round(rawPrice(product, opts));
}

export function hasDiscount(product) {
  return !!(product && product.discountType && product.discountValue);
}

export function fromPrice(product) {
  const weights = weightsForProduct(product);
  if (!weights.length) return 0;
  // Use the same defaults the product page pre-selects, so the card's
  // "from ₹" matches what the customer first sees on the product page.
  return computePrice(product, defaultVariant(product));
}

export function formatPrice(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export function defaultVariant(product) {
  const weights = weightsForProduct(product);
  // Defaults are configurable in the Excel Settings sheet, with safe fallbacks.
  const dGarlic = String(SETTINGS.default_garlic || "with").toLowerCase() !== "without";
  const dOil = String(SETTINGS.default_oil || "wood").toLowerCase() === "refined" ? "refined" : "wood";
  const dPkg = String(SETTINGS.default_package || "glass").toLowerCase() === "pouch" ? "pouch" : "glass";
  return {
    weight: weights[0] || "250g",
    garlic: product?.hasGarlic ? dGarlic : false,    // only if product offers garlic
    oil: "wood" === dOil ? "wood" : dOil,            // wood pressed by default
    pkg: product?.hasOptions ? dPkg : "pouch",       // glass bottle default for pickles
  };
}

const OIL_LABEL = { wood: "wood pressed oil", refined: "refined oil" };
const PKG_LABEL = { pouch: "pouch", glass: "glass bottle" };

export function variantLabel(product, { weight, garlic, oil, pkg }) {
  const parts = [weight];
  if (product?.hasGarlic) parts.push(garlic ? "with garlic" : "without garlic");
  if (product?.hasOptions) {
    parts.push(OIL_LABEL[oil] || OIL_LABEL.wood);
    parts.push(PKG_LABEL[pkg] || PKG_LABEL.pouch);
  }
  return parts.join(" · ");
}
