"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES } from "@/lib/catalog";
import { runFilters, priceBounds } from "@/lib/search";
import styles from "@/app/shop/shop.module.css";

const SORTS = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name (A–Z)" },
];

export default function ShopClient() {
  const params = useSearchParams();
  const bounds = useMemo(() => priceBounds(), []);

  const [filters, setFilters] = useState({
    query: "",
    categories: [],
    type: "all",
    garlic: "all",
    bestseller: false,
    freshBatch: false,
    maxPrice: bounds.max,
    sort: "popular",
  });
  const [mobFiltersOpen, setMobFiltersOpen] = useState(false);

  // Sync from URL params on load / when they change
  useEffect(() => {
    const q = params.get("q") || "";
    const category = params.get("category");
    const bestseller = params.get("bestseller") === "1";
    setFilters((f) => ({
      ...f,
      query: q,
      categories: category ? [category] : [],
      bestseller,
    }));
  }, [params]);

  const results = useMemo(() => runFilters(filters), [filters]);

  function toggleCategory(id) {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(id)
        ? f.categories.filter((c) => c !== id)
        : [...f.categories, id],
    }));
  }

  function reset() {
    setFilters({
      query: "",
      categories: [],
      type: "all",
      garlic: "all",
      bestseller: false,
      freshBatch: false,
      maxPrice: bounds.max,
      sort: "popular",
    });
  }

  const activeCount =
    filters.categories.length +
    (filters.type !== "all" ? 1 : 0) +
    (filters.garlic !== "all" ? 1 : 0) +
    (filters.bestseller ? 1 : 0) +
    (filters.freshBatch ? 1 : 0) +
    (filters.maxPrice < bounds.max ? 1 : 0);

  const FilterPanel = (
    <div className={styles.filters}>
      <div className={styles.filterHead}>
        <h3>Filters</h3>
        {activeCount > 0 && (
          <button className={styles.clearBtn} onClick={reset}>Clear all</button>
        )}
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Category</label>
        {CATEGORIES.map((c) => (
          <label key={c.id} className={styles.check}>
            <input
              type="checkbox"
              checked={filters.categories.includes(c.id)}
              onChange={() => toggleCategory(c.id)}
            />
            <span><span className="emoji">{c.icon}</span> {c.name}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Type</label>
        <div className={styles.pills}>
          {["all", "veg", "non-veg"].map((t) => (
            <button
              key={t}
              className={`${styles.pill} ${filters.type === t ? styles.pillActive : ""}`}
              onClick={() => setFilters((f) => ({ ...f, type: t }))}
            >
              {t === "all" ? "All" : t === "veg" ? "Veg" : "Non-Veg"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Garlic</label>
        <div className={styles.pills}>
          {[
            { id: "all", label: "All" },
            { id: "garlic", label: "With Garlic" },
            { id: "no-garlic", label: "No Garlic" },
          ].map((g) => (
            <button
              key={g.id}
              className={`${styles.pill} ${filters.garlic === g.id ? styles.pillActive : ""}`}
              onClick={() => setFilters((f) => ({ ...f, garlic: g.id }))}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          Max Price: <span className={styles.priceVal}>₹{filters.maxPrice}</span>
        </label>
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className={styles.range}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Shop All <em>Products</em></h1>
          <p className={styles.sub}>Handcrafted pickles, podis and spices — made fresh in small batches.</p>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>{FilterPanel}</aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.searchBar}>
              <span aria-hidden>⌕</span>
              <input
                type="search"
                placeholder="Search by name, ingredient, category…"
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                aria-label="Search products"
              />
            </div>
            <div className={styles.toolbarRight}>
              <button className={styles.mobFilterBtn} onClick={() => setMobFiltersOpen(true)}>
                ⚙ Filters{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                className={styles.sort}
                aria-label="Sort products"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.count}>{results.length} product{results.length !== 1 ? "s" : ""}</div>

          {results.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <p className={styles.emptyTitle}>No products match your filters</p>
              <button className="btn btn-gold" onClick={reset}>Clear filters</button>
            </div>
          ) : (
            <ProductGrid products={results} className={styles.grid} />
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobFiltersOpen && (
        <div className={styles.mobSheet}>
          <div className={styles.mobSheetHead}>
            <h3>Filters</h3>
            <button onClick={() => setMobFiltersOpen(false)} aria-label="Close filters">✕</button>
          </div>
          <div className={styles.mobSheetBody}>{FilterPanel}</div>
          <div className={styles.mobSheetFoot}>
            <button className="btn btn-outline" onClick={reset}>Clear</button>
            <button className="btn btn-gold" onClick={() => setMobFiltersOpen(false)}>
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
