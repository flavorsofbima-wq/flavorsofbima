"use client";

import Link from "next/link";
import { fromPrice, originalPrice, hasDiscount, formatPrice, defaultVariant } from "@/lib/pricing";
import { getCategory, weightsForProduct } from "@/lib/catalog";
import { defaultImage } from "@/lib/images";
import ProductImage from "./ProductImage";
import styles from "./ProductCard.module.css";

/**
 * Item 10: card shows "from ₹xxx" and a "Choose options" button.
 * Clicking it calls onChoose(product) so the parent opens the modal.
 * No silent add — the customer always picks variant + weight first.
 */
export default function ProductCard({ product, onChoose }) {
  const cat = getCategory(product.category);
  const from = fromPrice(product);
  const origFrom = originalPrice(product, defaultVariant(product));
  const showStrike = hasDiscount(product) && origFrom > from;

  return (
    <article className={styles.card}>
      <button
        className={styles.imgLink}
        onClick={() => onChoose && onChoose(product)}
        aria-label={`Choose options for ${product.name}`}
      >
        <ProductImage src={defaultImage(product)} product={product} className={styles.img} emojiClass={styles.emoji}>
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          {product.seasonal && <span className={styles.seasonal} title="Seasonal — subject to availability">Seasonal</span>}
          {hasDiscount(product) && <span className={styles.discount}>Sale</span>}
        </ProductImage>
      </button>

      <div className={styles.body}>
        <div className={styles.cat}>{cat?.name}</div>
        <Link href={`/product/${product.slug}`} className={styles.nameLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.desc}>{product.shortDesc}</p>

        <div className={styles.foot}>
          <div className={styles.price}>
            <span className={styles.from}>from</span> {formatPrice(from)}
            {showStrike && <span className={styles.strike}>{formatPrice(origFrom)}</span>}
          </div>
        </div>

        <button className={styles.choose} onClick={() => onChoose && onChoose(product)}>
          Choose Options
        </button>
      </div>
    </article>
  );
}
