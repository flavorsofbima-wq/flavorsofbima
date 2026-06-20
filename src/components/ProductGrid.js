"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

/**
 * Renders a grid of ProductCards and owns the "Choose options" modal,
 * so every place that lists products (home, shop, related) gets the
 * same behavior with one component.
 */
export default function ProductGrid({ products, className, style }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className={className} style={style}>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} onChoose={setActive} />
        ))}
      </div>
      <QuickViewModal product={active} onClose={() => setActive(null)} />
    </>
  );
}
