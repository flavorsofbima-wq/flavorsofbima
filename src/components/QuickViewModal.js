"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartStore";
import { computePrice, originalPrice, hasDiscount, formatPrice, variantLabel, defaultVariant } from "@/lib/pricing";
import { weightsForProduct, getCategory } from "@/lib/catalog";
import { productImage } from "@/lib/images";
import { QUALITY_NOTES, BRAND, waLink } from "@/lib/brand";
import ProductImage from "./ProductImage";
import styles from "./QuickViewModal.module.css";

/**
 * Item 9: "Choose options" popup. Shows image, description, variants
 * (weight + garlic), quantity, live price, Add to Cart and WhatsApp order.
 * Controlled by `product` (null = closed).
 */
export default function QuickViewModal({ product, onClose }) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const promptClear = useCart((s) => s.promptClear);

  const weights = product ? weightsForProduct(product) : [];
  const [weight, setWeight] = useState(weights[0] || "250g");
  const [garlic, setGarlic] = useState(!!product?.hasGarlic);
  const [oil, setOil] = useState("wood");
  const [pkg, setPkg] = useState("glass");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // reset when product changes
  useEffect(() => {
    if (product) {
      const dv = defaultVariant(product);
      setWeight(dv.weight);
      setGarlic(dv.garlic);
      setOil(dv.oil);
      setPkg(dv.pkg);
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  // lock scroll while open
  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  // Esc to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (product) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const cat = getCategory(product.category);
  const sel = { weight, garlic, oil, pkg };
  const unit = computePrice(product, sel);
  const orig = originalPrice(product, sel);
  const showStrike = hasDiscount(product) && orig > unit;
  const total = unit * qty;

  function add() {
    addItem(product.slug, sel, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }
  function buyNow() {
    addItem(product.slug, sel, qty);
    onClose();
    openCart();
  }

  const waMsg = `Hi ${BRAND.name}, I would like to order ${product.name} (${variantLabel(product, sel)}) × ${qty} — ${formatPrice(total)}`;

  function orderWhatsApp() {
    window.open(waLink(waMsg), "_blank", "noopener,noreferrer");
    onClose();
    promptClear(); // item 8
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={product.name}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.grid}>
          <div className={styles.left}>
            <ProductImage
              src={productImage(product, { garlic })}
              product={product}
              className={styles.img}
              emojiClass={styles.emoji}
            >
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
            </ProductImage>
          </div>

          <div className={styles.right}>
            <div className={styles.cat}>{cat?.name}</div>
            <h2 className={styles.name}>{product.name}</h2>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(unit)}</span>
              {showStrike && <span className={styles.strike}>{formatPrice(orig)}</span>}
              <span className={styles.per}>/ {weight}</span>
            </div>

            <p className={styles.desc}>{product.description}</p>

            <div className={styles.group}>
              <label className={styles.label}>Weight</label>
              <div className={styles.opts}>
                {weights.map((w) => (
                  <button key={w} className={`${styles.opt} ${weight === w ? styles.optActive : ""}`}
                    onClick={() => setWeight(w)}>
                    {w}
                    <span className={styles.optPrice}>{formatPrice(computePrice(product, { weight: w, garlic, oil, pkg }))}</span>
                  </button>
                ))}
              </div>
            </div>

            {product.hasGarlic && (
              <div className={styles.group}>
                <label className={styles.label}>Garlic Preference</label>
                <div className={styles.opts}>
                  <button className={`${styles.opt} ${garlic ? styles.optActive : ""}`} onClick={() => setGarlic(true)}>
                    With Garlic
                    {product.garlicSurcharge > 0 && <span className={styles.optPrice}>+{formatPrice(product.garlicSurcharge)}</span>}
                  </button>
                  <button className={`${styles.opt} ${!garlic ? styles.optActive : ""}`} onClick={() => setGarlic(false)}>
                    Without Garlic
                  </button>
                </div>
              </div>
            )}

            {product.hasOptions && (
              <>
                <div className={styles.group}>
                  <label className={styles.label}>Oil Type</label>
                  <div className={styles.opts}>
                    <button className={`${styles.opt} ${oil === "wood" ? styles.optActive : ""}`} onClick={() => setOil("wood")}>
                      Wood Pressed Oil
                    </button>
                    <button className={`${styles.opt} ${oil === "refined" ? styles.optActive : ""}`} onClick={() => setOil("refined")}>
                      Refined Oil
                      {product.refinedOilDiff !== 0 && (
                        <span className={styles.optPrice}>
                          {product.refinedOilDiff > 0 ? "+" : "−"}{formatPrice(Math.abs(product.refinedOilDiff))}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>Package Type</label>
                  <div className={styles.opts}>
                    <button className={`${styles.opt} ${pkg === "pouch" ? styles.optActive : ""}`} onClick={() => setPkg("pouch")}>
                      Pouch
                    </button>
                    <button className={`${styles.opt} ${pkg === "glass" ? styles.optActive : ""}`} onClick={() => setPkg("glass")}>
                      Glass Bottle
                      {product.glassBottleDiff !== 0 && (
                        <span className={styles.optPrice}>
                          {product.glassBottleDiff > 0 ? "+" : "−"}{formatPrice(Math.abs(product.glassBottleDiff))}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className={styles.group}>
              <label className={styles.label}>Quantity</label>
              <div className={styles.qtyRow}>
                <div className={styles.qty}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
                </div>
                <div className={styles.lineTotal}>Total: <strong>{formatPrice(total)}</strong></div>
              </div>
            </div>

            <div className={styles.actions}>
              <button className="btn btn-gold btn-block" onClick={buyNow}>Buy Now</button>
              <button className="btn btn-outline btn-block" onClick={add}>
                {added ? "✓ Added to cart" : "Add to Cart"}
              </button>
            </div>
            <button className="btn btn-wa btn-block" style={{ marginTop: 10 }} onClick={orderWhatsApp}>
              💬 Order this on WhatsApp
            </button>

            <div className={styles.notes}>
              <span>🌱 {QUALITY_NOTES.freshness}</span>
              {product.seasonal && <span>🍂 {QUALITY_NOTES.seasonal}</span>}
            </div>

            <Link href={`/product/${product.slug}`} className={styles.fullLink} onClick={onClose}>
              View full details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
