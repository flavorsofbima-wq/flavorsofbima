"use client";

import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import styles from "./QualitySection.module.css";

/**
 * Item 18: highlights our quality promises with images.
 * Data comes from the Excel "WhyUs" sheet (title, desc, image).
 * Images live in public/images/process/<image>. Missing → emoji fallback.
 */
const FALLBACK_EMOJI = {
  "no-preservatives.jpg": "🚫",
  "no-added-colors.jpg": "🎨",
  "wood-pressed-oil.jpg": "🫙",
  "premium-ingredients.jpg": "⭐",
  "clean-hygienic.jpg": "🧼",
  "natural-process.jpg": "🌿",
  "no-refined-oils.jpg": "🚫",
  "premium-packing.jpg": "📦",
};

export default function QualitySection({ items }) {
  if (!items || !items.length) return null;

  return (
    <section className="section" id="quality">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Our Promise</div>
          <h2 className="section-title">Made the <em>Right Way</em></h2>
          <div className="gold-rule"><span>✦</span></div>
          <p className="section-sub">
            No compromises, no shortcuts — just pure, honest food made with care.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {items.map((it, idx) => {
            const emoji = FALLBACK_EMOJI[it.image] || "✓";
            const fakeProduct = {
              name: it.title,
              emoji,
              gradient: "linear-gradient(145deg,#0c2354,#071a3d)",
            };
            return (
              <Reveal key={it.title} delay={idx * 0.05}>
                <div className={styles.card}>
                  <ProductImage
                    src={it.image ? `/images/process/${it.image}` : null}
                    product={fakeProduct}
                    className={styles.img}
                    emojiClass={styles.emoji}
                  />
                  <div className={styles.body}>
                    <h3 className={styles.title}>{it.title}</h3>
                    <p className={styles.desc}>{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
