"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cartStore";
import styles from "./OrderConfirmPrompt.module.css";

/**
 * Item 8: after the user taps "Order on WhatsApp", we can't know if they
 * actually sent the message (they left for WhatsApp). So when they return,
 * this asks whether to clear the cart. Only "Yes" clears it.
 */
export default function OrderConfirmPrompt() {
  const askClear = useCart((s) => s.askClear);
  const clear = useCart((s) => s.clear);
  const dismissClear = useCart((s) => s.dismissClear);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !askClear) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Order confirmation">
      <div className={styles.box}>
        <div className={styles.icon} aria-hidden>💬</div>
        <h3 className={styles.title}>Did you complete your order?</h3>
        <p className={styles.text}>
          We&rsquo;ve opened WhatsApp with your order details. Once you&rsquo;ve sent the
          message to us, we&rsquo;ll confirm and arrange delivery. Would you like to clear your cart?
        </p>
        <div className={styles.btns}>
          <button className="btn btn-outline" onClick={dismissClear}>
            Not yet, keep it
          </button>
          <button className="btn btn-gold" onClick={() => { clear(); dismissClear(); }}>
            Yes, clear my cart
          </button>
        </div>
      </div>
    </div>
  );
}
