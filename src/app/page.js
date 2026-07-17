import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import ImageWithFallback from "@/components/ImageWithFallback";
import Reveal from "@/components/Reveal";
import QualitySection from "@/components/QualitySection";
import Testimonials from "@/components/Testimonials";
import { bestsellers, CATEGORIES, productsByCategory, WHYUS, TESTIMONIALS, TRUSTBAR } from "@/lib/catalog";
import { BRAND } from "@/lib/brand";
import styles from "./home.module.css";

export default function HomePage() {
  const best = bestsellers();

  return (
    <>
      <HeroCarousel />

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(2)].map((_, dup) => (
            <span key={dup} className={styles.marqueeGroup}>
              {[
                "100% Homemade",
                "Wood Pressed Oil",
                "No Preservatives",
                // only advertise the licence if one is actually set in the Excel
                ...(BRAND.fssaiList.length ? ["FSSAI Licensed"] : []),
                "No Artificial Colors",
                "Traditional Recipes",
                "Handpicked Vegetables",
                "Small Batch",
              ].map((t) => (
                <span key={t} className={styles.marqueeItem}>✦ {t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* TRUST BAR — from Excel TrustBar sheet */}
      <div className={styles.trust}>
        <div className={styles.trustGrid}>
          {TRUSTBAR.map((t) => (
            <Reveal key={t.label} as="div" className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <ImageWithFallback
                  src={t.image ? `/images/trust/${t.image}` : ""}
                  alt={t.label}
                  fallback={t.emoji}
                />
              </div>
              <div className={styles.trustName}>{t.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* BEST SELLERS */}
      <section className="section" id="bestsellers">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Most Loved</div>
            <h2 className="section-title">Best <em>Sellers</em></h2>
            <div className="gold-rule"><span>✦</span></div>
            <p className="section-sub">The flavours our customers order again and again — made fresh with every order.</p>
          </Reveal>
          <ProductGrid products={best} className={styles.grid} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section alt" id="categories">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Browse</div>
            <h2 className="section-title">Shop by <em>Category</em></h2>
            <div className="gold-rule"><span>✦</span></div>
          </Reveal>
          <div className={styles.catGrid}>
            {CATEGORIES.map((c, idx) => (
              <Reveal key={c.id} delay={idx * 0.06}>
                <Link href={`/shop?category=${c.id}`} className={styles.catCard}>
                  <div className={`${styles.catVisual} ${styles["cg" + ((idx % 6) + 1)]}`}>
                    <ImageWithFallback
                      src={c.image ? `/images/categories/${c.image}` : ""}
                      alt={c.name}
                      className={styles.catImg}
                      fallback={c.icon}
                      fallbackClassName={styles.catEmoji}
                    />
                  </div>
                  <div className={styles.catShade}>
                    <div>
                      <div className={styles.catName}>{c.name}</div>
                      <div className={styles.catCount}>{productsByCategory(c.id).length} varieties</div>
                      <span className={styles.catCta}>Explore →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US / QUALITY teaser — full content lives on /why-us */}
      <QualitySection items={WHYUS} />

      {/* TESTIMONIALS + delivery trust */}
      <Testimonials testimonials={TESTIMONIALS} />

      {/* CTA band to the dedicated pages */}
      <section className="section alt">
        <div className="container">
          <div className={styles.ctaBand}>
            <Reveal>
              <h2 className="section-title" style={{ textAlign: "center" }}>Made With <em>Love</em>, The Right Way</h2>
              <p className="section-sub" style={{ marginBottom: 28 }}>
                Learn our story, see how we make every batch, or reach out — we&rsquo;d love to hear from you.
              </p>
              <div className={styles.ctaBtns}>
                <Link href="/about" className="btn btn-outline">Our Story</Link>
                <Link href="/why-us" className="btn btn-outline">Why Us</Link>
                <Link href="/contact" className="btn btn-gold">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
