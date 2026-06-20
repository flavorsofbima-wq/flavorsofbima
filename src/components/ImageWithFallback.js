"use client";

import { useState } from "react";

/**
 * Shows an image, and if it fails to load (or no src is given),
 * falls back to the supplied `fallback` node (usually an emoji span).
 * Lives in a client component because it needs the onError handler,
 * which server components can't pass to the browser.
 */
export default function ImageWithFallback({ src, alt, className, fallback, fallbackClassName }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return <span className={`emoji ${fallbackClassName || ""}`}>{fallback}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
