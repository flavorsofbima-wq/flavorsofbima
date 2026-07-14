import Link from "next/link";
import { BRAND, waLink } from "@/lib/brand";
import { CATEGORIES, GENERATED_AT } from "@/lib/catalog";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.brandRow}>
              <span className={styles.mark} aria-hidden>FB</span>
              <div>
                <div className={styles.brandName}>{BRAND.name}</div>
                <div className={styles.brandTag}>{BRAND.tagline}</div>
              </div>
            </div>
            <p className={styles.about}>{BRAND.description}</p>
            <div className={styles.social}>
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
              <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">👍</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
              <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">▶️</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Shop</h4>
            <Link href="/shop">All Products</Link>
            <Link href="/shop?bestseller=1">Best Sellers</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.id}`}>{c.icon} {c.name}</Link>
            ))}
          </div>

          <div className={styles.col}>
            <h4>Policies</h4>
            <Link href="/policies/shipping">Shipping Policy</Link>
            <Link href="/policies/refund">Refund Policy</Link>
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/terms">Terms of Service</Link>
            <Link href="/contact">FAQ</Link>
            <Link href="/feedback">Share Feedback</Link>
          </div>

          <div className={styles.col}>
            <h4>Contact</h4>
            <a href={`tel:+91${BRAND.phone}`}>📞 {BRAND.phoneDisplay}</a>
            <a href={`mailto:${BRAND.email}`}>✉️ {BRAND.email}</a>
            {BRAND.fssaiList.map((f) => (
              <p key={f.number}>🛡️ {f.label}: {f.number}</p>
            ))}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm" style={{ marginTop: 12 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} <strong>{BRAND.name}</strong>. All rights reserved.</span>
          <span>Made with ❤️ for food lovers across India</span>
          {GENERATED_AT && (
            <span style={{ opacity: 0.4, fontSize: "0.68rem" }}>
              data v{new Date(GENERATED_AT).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
