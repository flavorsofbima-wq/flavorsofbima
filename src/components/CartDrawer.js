"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart, cartTotals } from "@/lib/cartStore";
import { formatPrice } from "@/lib/pricing";
import { BRAND, waLink } from "@/lib/brand";
import { productImage } from "@/lib/images";
import ProductImage from "./ProductImage";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, close, setQty, removeItem, promptClear } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  const { enriched, subtotal, count } = cartTotals(items);

  // Build a WhatsApp message listing the whole cart
  function waCheckout() {
    if (!enriched.length) return waLink();
    const lines = enriched.map(
      (l) => `• ${l.product.name} (${l.label}) × ${l.qty} — ${formatPrice(l.lineTotal)}`
    );
    const msg =
      `Hi ${BRAND.name}, I would like to order:\n\n` +
      lines.join("\n") +
      `\n\nTotal: ${formatPrice(subtotal)}`;
    return waLink(msg);
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>
            Your Cart {count > 0 && <span className={styles.count}>{count}</span>}
          </h2>
          <button className={styles.closeBtn} onClick={close} aria-label="Close cart">✕</button>
        </div>

        {enriched.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon} aria-hidden>🫙</div>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptyText}>Add some homemade goodness to get started.</p>
            <Link href="/shop" className="btn btn-gold" onClick={close}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.lines}>
              {enriched.map((l) => (
                <div key={l.id} className={styles.line}>
                  <ProductImage
                    src={productImage(l.product, { garlic: l.garlic })}
                    product={l.product}
                    className={styles.thumb}
                    emojiClass={styles.thumbEmoji}
                  />
                  <div className={styles.lineBody}>
                    <div className={styles.lineName}>{l.product.name}</div>
                    <div className={styles.lineVariant}>{l.label}</div>
                    <div className={styles.lineBottom}>
                      <div className={styles.qty}>
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease quantity">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <div className={styles.linePrice}>{formatPrice(l.lineTotal)}</div>
                    </div>
                  </div>
                  <button className={styles.remove} onClick={() => removeItem(l.id)} aria-label={`Remove ${l.product.name}`}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.foot}>
              <div className={styles.subtotalRow}>
                <span>Subtotal</span>
                <span className={styles.subtotal}>{formatPrice(subtotal)}</span>
              </div>
              <p className={styles.note}>🚚 {BRAND.deliveryNote}</p>
              <Link href="/checkout" className="btn btn-gold btn-block" onClick={close}>
                Proceed to Checkout
              </Link>
              <button
                className="btn btn-wa btn-block"
                style={{ marginTop: 10 }}
                onClick={() => {
                  window.open(waCheckout(), "_blank", "noopener,noreferrer");
                  promptClear();
                }}
              >
                💬 Order this on WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
