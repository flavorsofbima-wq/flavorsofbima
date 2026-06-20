"use client";

import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import styles from "./Testimonials.module.css";

const TRUST = [
  { icon: "📦", title: "Premium Packing", desc: "Sealed in food-grade, leak-proof premium packaging." },
  { icon: "✨", title: "Premium Quality", desc: "Only the finest ingredients make it into every jar." },
  { icon: "🛡️", title: "No-Leakage Delivery", desc: "Carefully packed to arrive safe, fresh and intact." },
];

function Stars({ n }) {
  return (
    <div className={styles.stars} aria-label={`${n} out of 5 stars`}>
      {"★".repeat(Math.max(0, Math.min(5, n)))}
      <span className={styles.starDim}>{"★".repeat(5 - Math.max(0, Math.min(5, n)))}</span>
    </div>
  );
}

export default function Testimonials({ testimonials }) {
  return (
    <section className="section alt" id="reviews">
      <div className="container">
        {/* Delivery / quality trust badges */}
        <div className={styles.trust}>
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className={styles.trustCard}>
                <div className={styles.trustIcon}>{t.icon}</div>
                <div>
                  <div className={styles.trustTitle}>{t.title}</div>
                  <div className={styles.trustDesc}>{t.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {testimonials && testimonials.length > 0 && (
          <>
            <Reveal className="section-head" style={{ marginTop: 64 }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>Loved By Customers</div>
              <h2 className="section-title">What People <em>Say</em></h2>
              <div className="gold-rule"><span>✦</span></div>
            </Reveal>

            <div className={styles.grid}>
              {testimonials.map((t, idx) => {
                const fakeProduct = {
                  name: t.name,
                  emoji: t.name ? t.name.charAt(0) : "👤",
                  gradient: "linear-gradient(145deg,#0c2354,#071a3d)",
                };
                return (
                  <Reveal key={t.name + idx} delay={idx * 0.06}>
                    <figure className={styles.card}>
                      <Stars n={t.rating} />
                      <blockquote className={styles.quote}>&ldquo;{t.review}&rdquo;</blockquote>
                      <figcaption className={styles.author}>
                        <ProductImage
                          src={t.image ? `/images/testimonials/${t.image}` : null}
                          product={fakeProduct}
                          className={styles.avatar}
                          emojiClass={styles.avatarText}
                        />
                        <div>
                          <div className={styles.authorName}>{t.name}</div>
                          {t.location && <div className={styles.authorLoc}>{t.location}</div>}
                        </div>
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
