"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BRAND, waLink } from "@/lib/brand";
import styles from "./HeroCarousel.module.css";

// Each slide can show an uploaded banner image (public/images/banners/banner-N.jpg).
// If the image is missing, a navy gradient + text shows instead — never breaks.
const SLIDES = [
  {
    img: "/images/banners/banner-1.jpg",
    eyebrow: "Premium Homemade Flavors",
    title: "Flavors Of BIMA",
    subtitle: "Authentic Homemade Pickles, Podis & Spices",
    text: "Crafted in small batches with wood pressed oil, handpicked vegetables and traditional recipes. No preservatives. No artificial colors.",
    bg: "radial-gradient(ellipse 60% 80% at 50% 50%, #0c2354 0%, #071a3d 70%)",
  },
  {
    img: "/images/banners/banner-2.jpg",
    eyebrow: "Made With Love",
    title: "Traditional Andhra Taste",
    subtitle: "The flavours you grew up with",
    text: "Every jar carries the warmth of home — time-tested recipes passed down through generations, made fresh for your table.",
    bg: "radial-gradient(ellipse 60% 80% at 50% 50%, #102b62 0%, #071a3d 70%)",
  },
  {
    img: "/images/banners/banner-3.jpg",
    eyebrow: "Pure & Natural",
    title: "No Shortcuts, Ever",
    subtitle: "Wood pressed oil · Homemade spices",
    text: "We never use preservatives or artificial colors. Just handpicked ingredients, ground-fresh spices, and small-batch care.",
    bg: "radial-gradient(ellipse 60% 80% at 50% 50%, #0a2050 0%, #071a3d 70%)",
  },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgOk, setImgOk] = useState({});

  const next = useCallback(() => setI((v) => (v + 1) % SLIDES.length), []);
  const go = (n) => setI(n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, paused]);

  // preload + detect which banner images exist
  useEffect(() => {
    SLIDES.forEach((s, idx) => {
      const im = new Image();
      im.onload = () => setImgOk((o) => ({ ...o, [idx]: true }));
      im.onerror = () => setImgOk((o) => ({ ...o, [idx]: false }));
      im.src = s.img;
    });
  }, []);

  const slide = SLIDES[i];
  const hasImg = imgOk[i];

  return (
    <section
      className={styles.hero}
      style={hasImg ? undefined : { background: slide.bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {hasImg && (
        <div className={styles.bgImg} style={{ backgroundImage: `url(${slide.img})` }} aria-hidden />
      )}
      {hasImg && <div className={styles.scrim} aria-hidden />}

      <div className={styles.inner} key={i}>
        <div className={styles.eyebrow}>{slide.eyebrow}</div>
        {/* item 3: same logo as top-right nav */}
        <img
          src="/images/brand/logo.png"
          alt={BRAND.name}
          className={styles.heroLogo}
          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
        />
        <span className={styles.mark} style={{ display: "none" }} aria-hidden>FB</span>
        <h1 className={styles.title}>{slide.title}</h1>
        <p className={styles.subtitle}>{slide.subtitle}</p>
        <p className={styles.text}>{slide.text}</p>
        <div className={styles.btns}>
          <Link href="/shop" className="btn btn-gold">✦ Shop Now</Link>
          <Link href="/shop" className="btn btn-outline">Browse All</Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">💬 WhatsApp Order</a>
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Choose slide">
        {SLIDES.map((_, n) => (
          <button key={n} className={`${styles.dot} ${n === i ? styles.dotActive : ""}`}
            onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} aria-selected={n === i} role="tab" />
        ))}
      </div>
    </section>
  );
}
