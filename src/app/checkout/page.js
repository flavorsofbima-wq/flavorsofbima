"use client";

import Link from "next/link";
import { useCart, cartTotals } from "@/lib/cartStore";
import { formatPrice } from "@/lib/pricing";
import { BRAND, waLink } from "@/lib/brand";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const promptClear = useCart((s) => s.promptClear);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ minHeight: "70vh" }} />;

  const { enriched, subtotal } = cartTotals(items);

  function waCheckout() {
    if (!enriched.length) return waLink();
    const lines = enriched.map(
      (l) => `• ${l.product.name} (${l.label}) × ${l.qty} — ${formatPrice(l.lineTotal)}`
    );
    return waLink(`Hi ${BRAND.name}, I would like to order:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(subtotal)}`);
  }

  return (
    <div style={{ paddingTop: "calc(var(--header-h) + 48px)", paddingBottom: 80, minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <h1 className="section-title" style={{ textAlign: "center" }}>Checkout</h1>
        <div className="gold-rule"><span>✦</span></div>

        {enriched.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--ts)", marginBottom: 20 }}>Your cart is empty.</p>
            <Link href="/shop" className="btn btn-gold">Browse Products</Link>
          </div>
        ) : (
          <>
            <div style={{ background: "var(--navyc)", border: "1px solid var(--gbor)", borderRadius: "var(--r)", padding: 24, marginBottom: 20 }}>
              {enriched.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(212,175,55,0.1)", fontSize: "0.92rem" }}>
                  <span style={{ color: "var(--tm)" }}>{l.product.name} <span style={{ color: "var(--gold)" }}>({l.label})</span> × {l.qty}</span>
                  <span style={{ color: "var(--gold2)", fontWeight: 600 }}>{formatPrice(l.lineTotal)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, fontSize: "1.1rem" }}>
                <strong style={{ color: "var(--tm)" }}>Subtotal</strong>
                <strong style={{ color: "var(--gold2)" }}>{formatPrice(subtotal)}</strong>
              </div>
            </div>

            {/* Phase 2/3 note — honest placeholder */}
            <div style={{ background: "var(--navy2)", border: "1px dashed var(--gbor2)", borderRadius: "var(--r)", padding: 24, textAlign: "center" }}>
              <p style={{ color: "var(--gold2)", fontWeight: 600, marginBottom: 8 }}>🔒 Online payment coming soon</p>
              <p style={{ color: "var(--ts)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 20 }}>
                The full address form and secure Razorpay payment are being set up. For now, place your order on WhatsApp —
                we&rsquo;ll confirm and arrange delivery & payment personally.
              </p>
              <button
                className="btn btn-wa btn-block"
                onClick={() => {
                  window.open(waCheckout(), "_blank", "noopener,noreferrer");
                  promptClear();
                }}
              >
                💬 Complete Order on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
