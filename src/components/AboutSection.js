"use client";

import Reveal from "./Reveal";
import { BRAND } from "@/lib/brand";
import styles from "@/app/home.module.css";

export default function AboutSection({ alt = true }) {
  return (
    <section className={`section ${alt ? "alt" : ""}`} id="about">
      <div className="container">
        <div className={styles.aboutGrid}>
          <Reveal className={styles.aboutVisual}>
            <img
              src="/images/brand/logo.png"
              alt={BRAND.name}
              className={styles.aboutLogo}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
            />
            <span className={styles.aboutMark} style={{ display: "none" }} aria-hidden>FB</span>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="eyebrow left">Our Story</div>
            <h2 className="section-title" style={{ textAlign: "left" }}>The <em>BIMA</em> Story</h2>
            <p className={styles.aboutP}>
              {BRAND.name} is born from a passion for authentic homemade food and timeless traditional recipes.
              We specialize in handcrafted pickles, flavorful podis, and homemade specialties prepared in small
              batches using quality ingredients, rich spices, and lots of love.
            </p>
            <blockquote className={styles.aboutQuote}>
              &ldquo;Every jar carries the warmth of home and authentic homemade taste.&rdquo;
            </blockquote>
            <p className={styles.aboutP}>
              No factories. No shortcuts. No artificial preservatives. Just real homemade food, made the right
              way — with wood pressed sesame oil, handpicked vegetables and homemade spices.
            </p>
            <div className={styles.aboutTags}>
              {["🫙 Wood Pressed Sesame Oil", "🥬 Handpicked Vegetables", "📜 Traditional Recipes", "🚫 No Preservatives"].map((t) => (
                <span key={t} className={styles.aboutTag}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
