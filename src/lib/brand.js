// ============================================================
//  BRAND — pulls live values from the admin Excel (Settings),
//  with sensible fallbacks so the site works even if a cell
//  is blank.
// ============================================================

import { SETTINGS } from "@/lib/catalog";

const s = (k, fb) => {
  const v = SETTINGS[k];
  return v == null || v === "" ? fb : String(v);
};

export const BRAND = {
  name: "Flavors Of BIMA",
  tagline: "Authentic homemade taste, made with love",
  description:
    "Handcrafted pickles, podis, and spices prepared in small batches using wood pressed oil, handpicked vegetables, homemade spices, and traditional recipes. No preservatives. No artificial colors.",
  phone: s("phone", "9550073264"),
  phoneDisplay: "+91 " + s("phone", "9550073264").replace(/(\d{5})(\d{5})/, "$1 $2"),
  whatsapp: s("whatsapp", "919550073264"),
  email: s("email", "hello@flavorsofbima.com"),
  website: "www.flavorsofbima.com",
  fssaiList: (() => {
    const valid = (v) => v && !/x{3,}/i.test(v); // skip blanks & placeholders
    const list = [];
    const n1 = s("fssai_license_1", ""), n2 = s("fssai_license_2", "");
    if (valid(n1)) list.push({ label: s("fssai_label_1", "FSSAI Lic. No"), number: n1 });
    if (valid(n2)) list.push({ label: s("fssai_label_2", "FSSAI Lic. No"), number: n2 });
    return list;
  })(),
  freeShippingAbove: Number(s("free_shipping_above", "0")) || 0,
  announcement: s("announcement", "100% Homemade · No Preservatives · Wood Pressed Oil"),
  social: {
    instagram: s("instagram", "https://www.instagram.com/flavorsofbima/"),
    facebook: s("facebook", "https://www.facebook.com/profile.php?id=61590354554505"),
    youtube: s("youtube", "https://www.youtube.com/@FlavorsOfBIMA"),
  },
};

export function waLink(message) {
  const text = encodeURIComponent(message || `Hi ${BRAND.name}, I would like to place an order!`);
  return `https://wa.me/${BRAND.whatsapp}?text=${text}`;
}

export function waOrder(productName) {
  return waLink(`Hi ${BRAND.name}, I would like to order ${productName}`);
}

export const QUALITY_NOTES = {
  freshness: "Best taste within 3 months from date of packing",
  seasonal: "Seasonal pickle — subject to availability",
};
