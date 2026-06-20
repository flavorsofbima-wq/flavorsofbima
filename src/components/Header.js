"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND, waLink } from "@/lib/brand";
import { useCart, cartTotals } from "@/lib/cartStore";
import { suggest } from "@/lib/search";
import { CATEGORIES } from "@/lib/catalog";
import { useTheme } from "./ThemeProvider";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sugs, setSugs] = useState([]);
  const [focused, setFocused] = useState(false);
  const boxRef = useRef(null);
  const catRef = useRef(null);

  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const [count, setCount] = useState(0);

  useEffect(() => { setCount(cartTotals(items).count); }, [items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setSugs(suggest(q)); }, [q]);

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setFocused(false);
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(e) {
    e?.preventDefault();
    setFocused(false);
    setMobOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={() => setMobOpen(false)}>
            {/* Logo image (item 1, 3). Falls back to FB monogram if missing. */}
            <img
              src="/images/brand/logo.png"
              alt={BRAND.name}
              className={styles.logoImg}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
            />
            <span className={styles.logoMark} style={{ display: "none" }} aria-hidden>FB</span>
            <span className={styles.logoText}>
              <span className={styles.brand}>{BRAND.name}</span>
              <span className={styles.tag}>{BRAND.tagline}</span>
            </span>
          </Link>

          <div className={styles.searchWrap} ref={boxRef}>
            <form onSubmit={submitSearch} className={styles.searchForm} role="search">
              <span className={styles.searchIcon} aria-hidden>⌕</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                placeholder="Search pickles, podis, spices…"
                aria-label="Search products"
                className={styles.searchInput}
              />
            </form>
            {focused && sugs.length > 0 && (
              <ul className={styles.suggest}>
                {sugs.map((sg) => (
                  <li key={sg.slug}>
                    <Link href={`/product/${sg.slug}`} className={styles.sugItem}
                      onClick={() => { setFocused(false); setQ(""); }}>
                      <span aria-hidden>{sg.emoji}</span> {sg.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className={styles.nav} aria-label="Primary">
            {/* item 7: About Us first, no Home */}
            <Link href="/about" className={styles.navLink}>About Us</Link>
            <Link href="/shop" className={styles.navLink}>Shop All</Link>

            {/* items 5,6: Categories dropdown */}
            <div className={styles.dropdown} ref={catRef}>
              <button
                className={styles.navLink}
                onClick={() => setCatOpen((v) => !v)}
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Categories <span className={styles.caret} aria-hidden>▾</span>
              </button>
              {catOpen && (
                <div className={styles.dropMenu}>
                  {CATEGORIES.map((c) => (
                    <Link key={c.id} href={`/shop?category=${c.id}`} className={styles.dropItem}
                      onClick={() => setCatOpen(false)}>
                      <span className="emoji" aria-hidden>{c.icon}</span> {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/why-us" className={styles.navLink}>Why Us</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          <div className={styles.actions}>
            {/* item 15: theme toggle */}
            <button className={styles.themeBtn} onClick={toggle}
              aria-label={`Switch to ${theme === "white" ? "dark" : "light"} theme`}
              title={`Switch to ${theme === "white" ? "navy" : "white"} theme`}>
              {theme === "white" ? "🌙" : "☀️"}
            </button>
            <button className={styles.cartBtn} onClick={openCart} aria-label={`Cart, ${count} items`}>
              🛒
              {count > 0 && <span className={styles.cartBadge}>{count}</span>}
            </button>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={styles.order}>💬 Order</a>
            <button className={`${styles.hamb} ${mobOpen ? styles.hambOpen : ""}`}
              onClick={() => setMobOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={mobOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {mobOpen && (
        <div className={styles.mobMenu}>
          <form onSubmit={submitSearch} className={styles.mobSearch} role="search">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…" aria-label="Search products" />
            <button type="submit" className="btn btn-gold btn-sm">Go</button>
          </form>
          <Link href="/about" className={styles.mobLink} onClick={() => setMobOpen(false)}>About Us</Link>
          <Link href="/shop" className={styles.mobLink} onClick={() => setMobOpen(false)}>Shop All</Link>
          <div className={styles.mobCatHead}>Categories</div>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/shop?category=${c.id}`} className={styles.mobSubLink}
              onClick={() => setMobOpen(false)}>
              <span className="emoji" aria-hidden>{c.icon}</span> {c.name}
            </Link>
          ))}
          <Link href="/why-us" className={styles.mobLink} onClick={() => setMobOpen(false)}>Why Us</Link>
          <Link href="/contact" className={styles.mobLink} onClick={() => setMobOpen(false)}>Contact</Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className={styles.mobOrder}>
            💬 Order on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
