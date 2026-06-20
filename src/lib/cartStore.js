"use client";

// ============================================================
//  CART STORE (Zustand + localStorage)
//  ----------------------------------------------------------
//  Persistent cart requirement: state is saved to localStorage
//  so the cart survives refreshes and revisits. In Phase 3 we
//  add an optional server sync for logged-in users — the API
//  here (addItem/removeItem/...) won't change.
//
//  A cart line is uniquely identified by: slug + weight + garlic.
//  Adding the same variant again increases quantity instead of
//  creating a duplicate line.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/data/products";
import { computePrice, variantLabel } from "@/lib/pricing";

function lineId(slug, weight, garlic, oil, pkg) {
  return `${slug}__${weight}__${garlic ? "g" : "ng"}__${oil || "wood"}__${pkg || "pouch"}`;
}

export const useCart = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, slug, weight, garlic, oil, pkg, qty }]
      isOpen: false,
      askClear: false, // item 8: show "did you complete your order?" prompt

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      // item 8: called after the user taps "Order on WhatsApp"
      promptClear: () => set({ askClear: true, isOpen: false }),
      dismissClear: () => set({ askClear: false }),

      addItem: (slug, { weight, garlic, oil, pkg }, qty = 1) => {
        const id = lineId(slug, weight, garlic, oil, pkg);
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + qty } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...s.items, {
              id, slug, weight, garlic: !!garlic,
              oil: oil || "wood", pkg: pkg || "pouch", qty,
            }],
            isOpen: true,
          };
        });
      },

      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "bima-cart", // localStorage key
      partialize: (s) => ({ items: s.items }), // don't persist isOpen
    }
  )
);

// ── DERIVED SELECTORS (compute, never store, totals) ──────────
// Enrich raw cart lines with product + live price details.
export function enrichCart(items) {
  return items
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null; // product removed from catalog
      const unitPrice = computePrice(product, {
        weight: line.weight,
        garlic: line.garlic,
        oil: line.oil,
        pkg: line.pkg,
      });
      return {
        ...line,
        product,
        unitPrice,
        lineTotal: unitPrice * line.qty,
        label: variantLabel(product, { weight: line.weight, garlic: line.garlic, oil: line.oil, pkg: line.pkg }),
      };
    })
    .filter(Boolean);
}

export function cartTotals(items) {
  const enriched = enrichCart(items);
  const subtotal = enriched.reduce((sum, l) => sum + l.lineTotal, 0);
  const count = enriched.reduce((sum, l) => sum + l.qty, 0);
  return { enriched, subtotal, count };
}
