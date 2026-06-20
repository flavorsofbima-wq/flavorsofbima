# Flavors Of BIMA — Website (Phase 1)

A premium Next.js website for **Flavors Of BIMA** — homemade pickles, podis & spices.
This is **Phase 1** of the custom build: full catalog, product variants, search, filters,
and a persistent shopping cart. (Online payments arrive in a later phase.)

---

## 🟢 What works in Phase 1

- **Homepage** — auto-rotating hero, bestsellers, categories, "Why Us", about, FAQ, contact
- **Shop page** — search + filters (category, veg/non-veg, garlic, price, bestseller, fresh batch) + sorting
- **Product pages** — every product has its own page with:
  - Weight options (250g / 500g / 1kg, or 100g / 250g / 500g for spices & podis)
  - With / Without garlic option (where relevant)
  - Quantity, live price, ingredients
- **Cart** — add items, change quantity, persists even after closing the browser
- **WhatsApp ordering** — every product and the cart can be ordered via WhatsApp
- **Policy pages**, **404 page**, mobile responsive, SEO metadata

---

## 💻 How to run it on your computer

You need **Node.js 18.18 or newer** installed. Check with:

```bash
node --version
```

If you don't have it, download from https://nodejs.org (the "LTS" version).

Then, inside this project folder:

```bash
# 1. Install the building blocks (only needed once, needs internet)
npm install

# 2. Start the website in preview mode
npm run dev
```

Open **http://localhost:3000** in your browser. You'll see the site.
Any change you save will refresh automatically.

To stop it, press `Ctrl + C` in the terminal.

---

## ✏️ How to edit your products (no coding needed)

**Everything about your products lives in ONE file:**

```
src/data/products.js
```

Open it in any text editor. Each product looks like this:

```js
{
  slug: "avakaya",              // the web address: /product/avakaya  (don't use spaces)
  name: "Avakaya",              // the name shown to customers
  category: "veg-pickles",      // veg-pickles | non-veg-pickles | spices | podis
  emoji: "🥭",                  // the little picture (until you add real photos)
  basePrice: 150,               // price for the smallest size (250g here)
  bestseller: true,             // shows a "bestseller" badge + appears on homepage
  seasonal: true,               // shows a "seasonal" note
  hasGarlic: true,              // shows the With/Without Garlic choice
  garlicSurcharge: 20,          // extra ₹ for the garlic version
  shortDesc: "Short one-liner shown on cards.",
  description: "The longer description shown on the product page.",
  ingredients: ["Raw mango", "Red chilli", "..."],
  badge: "🔥 #1 Seller",        // optional little badge (leave as "" for none)
}
```

**To change a price:** edit `basePrice`.
**To add a product:** copy an existing `{ ... }` block, paste it, change the details. Make sure `slug` is unique.
**To remove a product:** delete its `{ ... }` block.

> 💡 Tip: keep a backup copy of `products.js` before making big changes.

### Changing weights & multipliers

At the top of the same file, `WEIGHT_OPTIONS` controls the sizes and how price scales:

```js
"250g": [
  { label: "250g", grams: 250, multiplier: 1 },    // base price × 1
  { label: "500g", grams: 500, multiplier: 1.9 },  // base price × 1.9
  { label: "1kg",  grams: 1000, multiplier: 3.6 }, // base price × 3.6
]
```

### Changing contact details / social links

Edit `src/lib/brand.js` — phone, WhatsApp number, email, Instagram, etc. are all there.

---

## 🚀 Putting it online (deployment)

The easiest free way is **Vercel** (the company that makes Next.js):

1. Create a free account at https://vercel.com
2. Push this project to a GitHub repository (or use Vercel's drag-and-drop).
3. Click "Import Project", choose this project, and click Deploy.
4. Vercel gives you a live web address in ~2 minutes.

Later you can connect your own domain (`www.flavorsofbima.com`) in Vercel's settings.

> You do **not** need to run `npm run build` yourself — Vercel does it for you.

---

## 📸 Adding real product photos (optional, later)

1. Put your photos in the `public/images/` folder.
2. In `src/components/ProductCard.js` and `ProductDetail.js`, the colored emoji
   block can be swapped for a real `<img>`. (Happy to do this for you in a later phase.)

---

## 🗺️ What's coming in later phases

- **Phase 2:** Full checkout form (name, address, phone) — still no online payment, but a proper order summary.
- **Phase 3:** Database + **Razorpay** online payments + order saving + WhatsApp/email confirmations.
- **Phase 4:** Admin dashboard to manage products & orders without editing code.
- **Phase 5:** Customer accounts, order history, reviews.
- **Phase 6:** Delivery-pincode checker, notifications, final polish.

> Phases 3+ need your business account + payment gateway KYC to be ready.

---

## 🆘 Common issues

- **`npm install` fails:** make sure you have internet and Node 18.18+.
- **`command not found: npm`:** Node.js isn't installed — get it from nodejs.org.
- **Port 3000 in use:** run `npm run dev -- -p 3001` to use a different port.

---

Built with care for **Flavors Of BIMA** — *Authentic homemade taste, made with love.* ❤️

---

## 🆕 NEW: Managing your store with the Excel file

Your prices, products, content, FSSAI number, theme, and testimonials now live in:

```
admin/FlavorsOfBIMA-Admin.xlsx
```

It has 5 tabs:
- **Products** — prices per weight, active yes/no, discounts, garlic surcharge
- **Settings** — theme, FSSAI license, phone, email, social links
- **WhyUs** — your quality/process points (+ image filenames)
- **Testimonials** — customer reviews
- **Orders** — a log for you to paste WhatsApp orders into

### How to publish a change (IMPORTANT)

1. Edit the Excel file and save it.
2. On your computer, run:  `npm run dev`
   - This reads the Excel and updates the website data automatically.
   - **No Python needed** — it now uses Node (which you already have).
3. Check it looks right at http://localhost:3000
4. To put it live: commit the updated file `src/data/catalog.generated.json`
   and push to GitHub. Vercel rebuilds automatically.
   - **Vercel needs nothing extra** — it just builds the committed JSON.

### Discounts (Products tab)


- `discount_type` = `amount` → subtracts that many ₹
- `discount_type` = `percentage` → takes that % off
- Leave both blank for no discount.

### Hiding a product
Set `active` = `no`. It disappears from the website on next rebuild.

### Switching theme
Set `theme` in the Settings tab to `navy-gold` or `white`.
Visitors can also toggle it themselves with the ☀️/🌙 button — their choice is remembered.

---

## 🖼️ Image folders (place your photos)

```
public/images/brand/logo.png              ← your logo (nav + hero)
public/icon.png                           ← browser tab icon
public/images/banners/banner-1.jpg        ← carousel slides
public/images/banners/banner-2.jpg
public/images/banners/banner-3.jpg
public/images/banners/banner-shop.jpg     ← shop page banner
public/images/products/<slug>.jpg         ← product photos (see that folder's guide)
public/images/process/<name>.jpg          ← "why us" photos (names in Excel WhyUs tab)
public/images/testimonials/<name>.jpg     ← reviewer photos (names in Excel Testimonials tab)
```

Every image is optional — missing ones fall back gracefully so the site never breaks.
