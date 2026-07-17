"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartStore";
import { computePrice, formatPrice, variantLabel, defaultVariant } from "@/lib/pricing";
import { weightsForProduct } from "@/data/products";
import { QUALITY_NOTES, waOrder, BRAND, waLink } from "@/lib/brand";
import { productImage } from "@/lib/images";
import ProductImage from "./ProductImage";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product, category }) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const promptClear = useCart((s) => s.promptClear);

  const weights = weightsForProduct(product);
  const dv = defaultVariant(product);
  const [weight, setWeight] = useState(dv.weight);
  const [garlic, setGarlic] = useState(dv.garlic);
  const [oil, setOil] = useState(dv.oil);
  const [pkg, setPkg] = useState(dv.pkg);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const sel = { weight, garlic, oil, pkg };
  const unitPrice = computePrice(product, sel);
  const total = unitPrice * qty;

  function add() {
    addItem(product.slug, sel, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function buyNow() {
    addItem(product.slug, sel, qty);
    openCart();
  }

  // WhatsApp message with the chosen variant
  const waMsg = `Hi ${BRAND.name}, I would like to order ${product.name} (${variantLabel(
    product,
    sel
  )}) × ${qty} — ${formatPrice(total)}`;

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`}>{category?.name}</Link>
          <span>/</span>
          <span className={styles.crumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.grid}>
          {/* Visual */}
          <div className={styles.visualCol}>
            <ProductImage
              src={productImage(product, { garlic })}
              product={product}
              className={styles.visual}
              emojiClass={styles.emoji}
            >
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
            </ProductImage>

            {/* Variant thumbnails — click to switch garlic/no-garlic image */}
            {product.hasGarlic && (
              <div className={styles.thumbs}>
                <button
                  className={`${styles.thumb} ${garlic ? styles.thumbActive : ""}`}
                  onClick={() => setGarlic(true)}
                  type="button"
                  aria-label="Show with-garlic image"
                >
                  <ProductImage
                    src={productImage(product, { garlic: true })}
                    product={product}
                    className={styles.thumbImg}
                    emojiClass={styles.thumbEmoji}
                  />
                  <span>With Garlic</span>
                </button>
                <button
                  className={`${styles.thumb} ${!garlic ? styles.thumbActive : ""}`}
                  onClick={() => setGarlic(false)}
                  type="button"
                  aria-label="Show without-garlic image"
                >
                  <ProductImage
                    src={productImage(product, { garlic: false })}
                    product={product}
                    className={styles.thumbImg}
                    emojiClass={styles.thumbEmoji}
                  />
                  <span>No Garlic</span>
                </button>
              </div>
            )}

            <div className={styles.assurances}>
              <span>🫙 Wood Pressed Oil</span>
              <span>🚫 No Preservatives</span>
              <span>🎨 No Artificial Colors</span>
              <span>🏡 Small Batch</span>
            </div>
          </div>

          {/* Info + variants */}
          <div className={styles.infoCol}>
            <div className={styles.cat}>{category?.name}</div>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(unitPrice)}</span>
              <span className={styles.priceUnit}>/ {weight}</span>
            </div>

            <p className={styles.desc}>{product.description}</p>

            {/* Weight selector */}
            <div className={styles.variantGroup}>
              <label className={styles.variantLabel}>Weight</label>
              <div className={styles.options}>
                {weights.map((w) => (
                  <button
                    key={w}
                    className={`${styles.option} ${weight === w ? styles.optionActive : ""}`}
                    onClick={() => setWeight(w)}
                  >
                    {w}
                    <span className={styles.optionPrice}>
                      {formatPrice(computePrice(product, { weight: w, garlic, oil, pkg }))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Garlic selector — only if applicable */}
            {product.hasGarlic && (
              <div className={styles.variantGroup}>
                <label className={styles.variantLabel}>Garlic Preference</label>
                <div className={styles.options}>
                  <button
                    className={`${styles.option} ${garlic ? styles.optionActive : ""}`}
                    onClick={() => setGarlic(true)}
                  >
                    With Garlic
                    {product.garlicSurcharge > 0 && <span className={styles.optionPrice}>+{formatPrice(product.garlicSurcharge)}</span>}
                  </button>
                  <button
                    className={`${styles.option} ${!garlic ? styles.optionActive : ""}`}
                    onClick={() => setGarlic(false)}
                  >
                    Without Garlic
                  </button>
                </div>
              </div>
            )}

            {/* Oil & Package — pickles only */}
            {product.hasOptions && (
              <>
                <div className={styles.variantGroup}>
                  <label className={styles.variantLabel}>Oil Type</label>
                  <div className={styles.options}>
                    <button
                      className={`${styles.option} ${oil === "wood" ? styles.optionActive : ""}`}
                      onClick={() => setOil("wood")}
                    >
                      Wood Pressed Oil
                    </button>
                    <button
                      className={`${styles.option} ${oil === "refined" ? styles.optionActive : ""}`}
                      onClick={() => setOil("refined")}
                    >
                      Refined Oil
                      {product.refinedOilDiff !== 0 && (
                        <span className={styles.optionPrice}>
                          {product.refinedOilDiff > 0 ? "+" : "−"}{formatPrice(Math.abs(product.refinedOilDiff))}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.variantGroup}>
                  <label className={styles.variantLabel}>Package Type</label>
                  <div className={styles.options}>
                    <button
                      className={`${styles.option} ${pkg === "pouch" ? styles.optionActive : ""}`}
                      onClick={() => setPkg("pouch")}
                    >
                      Pouch
                    </button>
                    <button
                      className={`${styles.option} ${pkg === "glass" ? styles.optionActive : ""}`}
                      onClick={() => setPkg("glass")}
                    >
                      Glass Bottle
                      {product.glassBottleDiff !== 0 && (
                        <span className={styles.optionPrice}>
                          {product.glassBottleDiff > 0 ? "+" : "−"}{formatPrice(Math.abs(product.glassBottleDiff))}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Quantity */}
            <div className={styles.variantGroup}>
              <label className={styles.variantLabel}>Quantity</label>
              <div className={styles.qtyRow}>
                <div className={styles.qty}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
                </div>
                <div className={styles.lineTotal}>
                  Total: <strong>{formatPrice(total)}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button className="btn btn-gold btn-block" onClick={buyNow}>Buy Now</button>
              <button className={`btn btn-outline btn-block ${styles.addBtn}`} onClick={add}>
                {added ? "✓ Added to cart" : "Add to Cart"}
              </button>
            </div>
            <button className="btn btn-wa btn-block" style={{ marginTop: 12 }}
              onClick={() => { window.open(waLink(waMsg), "_blank", "noopener,noreferrer"); promptClear(); }}>
              💬 Order this on WhatsApp
            </button>

            {/* Notes — per-product, from the Excel (falls back to defaults) */}
            {(product.shelfLife || QUALITY_NOTES.freshness) && (
              <div className={styles.notes}>
                <p>🌱 <strong>Fresh Batch:</strong> {product.shelfLife || QUALITY_NOTES.freshness}.</p>
                {product.seasonal && (
                  <p>🍂 {product.availabilityNote || QUALITY_NOTES.seasonal}.</p>
                )}
                {BRAND.deliveryNote && <p>🚚 {BRAND.deliveryNote}</p>}
              </div>
            )}

            {/* Ingredients */}
            <div className={styles.ingredients}>
              <h3>Ingredients</h3>
              <div className={styles.ingList}>
                {product.ingredients.map((ing) => (
                  <span key={ing} className={styles.ing}>{ing}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
