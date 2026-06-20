"use client";

import { useState, useEffect } from "react";

/**
 * Shows a product photo if the file exists; otherwise falls back to
 * the colored gradient + emoji block. This means the site looks fine
 * whether or not photos have been added yet.
 *
 * Props:
 *  - src: image path (from lib/images.js)
 *  - product: the product (for emoji + gradient fallback)
 *  - className: applied to the wrapper
 *  - emojiClass: class for the emoji size
 */
export default function ProductImage({ src, product, className = "", emojiClass = "", children }) {
  const [failed, setFailed] = useState(false);

  // Reset error state when the src changes (e.g. garlic toggle)
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = src && !failed;

  return (
    <div
      className={className}
      style={!showImage ? { background: product?.gradient } : undefined}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={product?.name || "Product"}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span className={`emoji ${emojiClass}`} aria-hidden>{product?.emoji}</span>
      )}
      {children}
    </div>
  );
}
