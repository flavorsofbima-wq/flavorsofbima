import { notFound } from "next/navigation";
import { getProduct, getCategory, productsByCategory, PRODUCTS } from "@/data/products";
import { fromPrice, formatPrice } from "@/lib/pricing";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";

// Pre-render every product page at build time (fast + SEO friendly)
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: `${product.name} · ${BRAND.name}`,
      description: product.description,
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  // JSON-LD structured data for rich search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: fromPrice(product),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} category={category} />

      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <Reveal className="section-head">
              <div className="eyebrow" style={{ justifyContent: "center" }}>You may also like</div>
              <h2 className="section-title">More <em>{category?.name}</em></h2>
              <div className="gold-rule"><span>✦</span></div>
            </Reveal>
            <ProductGrid products={related} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 22 }} />
          </div>
        </section>
      )}
    </>
  );
}
