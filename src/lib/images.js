// ============================================================
//  PRODUCT IMAGES
//  ----------------------------------------------------------
//  Resolves which image file to show for a product + variant.
//  Place image files in:  public/images/products/
//
//  NAMING:
//   - Pickles WITH a garlic option:
//        {slug}-garlic.jpg      and   {slug}-nogarlic.jpg
//   - Everything else:
//        {slug}.jpg
//
//  If an expected file is missing, components fall back to the
//  colored emoji block automatically (handled in the component).
// ============================================================

const BASE = "/images/products";

/**
 * The image path for a product given the garlic choice.
 * For garlic-capable products we return the garlic-specific file.
 * For others we return the plain {slug}.jpg.
 */
export function productImage(product, { garlic } = {}) {
  if (!product) return null;
  if (product.hasGarlic) {
    return `${BASE}/${product.slug}-${garlic ? "garlic" : "nogarlic"}.jpg`;
  }
  return `${BASE}/${product.slug}.jpg`;
}

/**
 * The default image to show on cards / listings (before the user
 * chooses anything). For garlic products we default to the garlic
 * version, matching the traditional Andhra style.
 */
export function defaultImage(product) {
  return productImage(product, { garlic: !!product?.hasGarlic });
}

/**
 * Both variant images for a garlic product (used to preload / show
 * the gallery on the product page). Returns a list of { label, src,
 * garlic } entries — one entry for non-garlic products.
 */
export function variantImages(product) {
  if (!product) return [];
  if (product.hasGarlic) {
    return [
      { label: "With Garlic", src: `${BASE}/${product.slug}-garlic.jpg`, garlic: true },
      { label: "Without Garlic", src: `${BASE}/${product.slug}-nogarlic.jpg`, garlic: false },
    ];
  }
  return [{ label: product.name, src: `${BASE}/${product.slug}.jpg`, garlic: false }];
}
