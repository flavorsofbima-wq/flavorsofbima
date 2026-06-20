"use client";

import Reveal from "./Reveal";
import { BRAND, waLink } from "@/lib/brand";
import { FAQ } from "@/lib/catalog";
import styles from "@/app/home.module.css";

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Get In Touch</div>
          <h2 className="section-title">Questions &amp; <em>Contact</em></h2>
          <div className="gold-rule"><span>✦</span></div>
        </Reveal>

        <div className={styles.contactGrid}>
          <div id="faq">
            {FAQ.map((f) => (
              <Reveal key={f.q}>
                <details className={styles.faq}>
                  <summary className={styles.faqQ}>{f.q}</summary>
                  <p className={styles.faqA}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Order or ask us anything</h3>
              <p className={styles.contactText}>
                The fastest way to reach us is WhatsApp — we confirm every order personally and answer questions quickly.
              </p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-block" style={{ marginBottom: 12 }}>
                💬 Chat on WhatsApp
              </a>
              <a href={`tel:+91${BRAND.phone}`} className="btn btn-outline btn-block">📞 Call {BRAND.phoneDisplay}</a>
              <div className={styles.contactMeta}>
                <span>✉️ {BRAND.email}</span>
                {BRAND.fssaiList.map((f) => (
                  <span key={f.number}>🛡️ {f.label}: {f.number}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
