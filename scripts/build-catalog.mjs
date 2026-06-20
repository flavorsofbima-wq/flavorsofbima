// ============================================================
//  BUILD-TIME CATALOG GENERATOR (Node version — no Python!)
//  ----------------------------------------------------------
//  Reads admin/FlavorsOfBIMA-Admin.xlsx using SheetJS and writes
//  src/data/catalog.generated.json which the site imports.
//
//  WHY: a deployed site can't read an Excel on your computer, and
//  browsers can't read Excel reliably. So we convert Excel -> JSON
//  HERE (during `npm run dev` / `npm run build`) and bake it in.
//
//  WORKFLOW: edit the Excel -> run `npm run dev` -> changes appear.
//  Runs entirely in Node — nothing else to install.
// ============================================================

import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

let XLSX;
try {
  XLSX = await import("xlsx");
} catch {
  console.log("\n" + "=".repeat(60));
  console.log("  ⚠️  EXCEL NOT READ — the 'xlsx' package isn't installed.");
  console.log("  ➜  Run this once:   npm install");
  console.log("     then:            npm run dev");
  console.log("  (The site is still using the OLD data until you do.)");
  console.log("=".repeat(60) + "\n");
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(__dirname);
const XLSX_PATH = path.join(ROOT, "admin", "FlavorsOfBIMA-Admin.xlsx");
const OUT = path.join(ROOT, "src", "data", "catalog.generated.json");

const META = {"avakaya": {"emoji": "🥭", "gradient": "linear-gradient(145deg,#1a0804,#5a1808,#9a2c10)", "shortDesc": "Classic Andhra raw mango pickle with rich red masala.", "description": "Our signature Avakaya — chunky raw mango pieces, fenugreek, mustard and rich red chilli masala, slow-set in wood pressed sesame oil. Bold, tangy and unmistakably homemade.", "ingredients": ["Raw mango", "Red chilli powder", "Mustard", "Fenugreek", "Wood pressed sesame oil", "Salt", "Garlic (optional)"], "badge": "🔥 #1 Seller"}, "tomato": {"emoji": "🍅", "gradient": "linear-gradient(145deg,#1a0808,#5a1818,#9a2828)", "shortDesc": "Tangy-spicy homemade tomato pickle.", "description": "Sun-ripened tomatoes cooked down with mustard, red chilli and Andhra spices into a thick, tangy pickle that pairs perfectly with rice, idly and dosa.", "ingredients": ["Tomato", "Red chilli powder", "Mustard", "Tamarind", "Wood pressed sesame oil", "Salt", "Garlic (optional)"], "badge": ""}, "gongura": {"emoji": "🌿", "gradient": "linear-gradient(145deg,#0a1a0a,#1a5a1a,#2a8a2a)", "shortDesc": "Quintessential Andhra sorrel leaf pickle.", "description": "Tender gongura (sorrel) leaves slow-cooked with red chilli and spices into the tangy, bold pickle Andhra is famous for. A must with hot rice and ghee.", "ingredients": ["Gongura leaves", "Red chilli powder", "Mustard", "Wood pressed sesame oil", "Salt", "Garlic (optional)"], "badge": "⭐ Most Ordered"}, "red-chilli": {"emoji": "🌶️", "gradient": "linear-gradient(145deg,#2a0808,#7a1010,#aa2020)", "shortDesc": "Fiery whole red chilli pickle.", "description": "For those who love the heat — plump red chillies stuffed with a mustard-forward masala and matured in wood pressed sesame oil. Intense, bold and traditional.", "ingredients": ["Red chilli", "Mustard", "Fenugreek", "Wood pressed sesame oil", "Salt"], "badge": ""}, "gongura-red-chilli": {"emoji": "🌿🌶️", "gradient": "linear-gradient(145deg,#0d1a0d,#2a5a2a,#4a8a4a)", "shortDesc": "Tangy gongura meets fiery red chilli.", "description": "Best of both worlds — the tang of gongura blended with the heat of red chilli in one perfectly balanced, bold jar.", "ingredients": ["Gongura leaves", "Red chilli", "Mustard", "Wood pressed sesame oil", "Salt", "Garlic (optional)"], "badge": "🌟 Mix"}, "lemon": {"emoji": "🍋", "gradient": "linear-gradient(145deg,#1a1a08,#585810,#8a8820)", "shortDesc": "Bright, zesty lemon pickle.", "description": "Whole lemon pieces matured with warming spices into a bright, tangy, slightly sweet-sour pickle that cuts through any rich meal.", "ingredients": ["Lemon", "Red chilli powder", "Mustard", "Fenugreek", "Wood pressed sesame oil", "Salt"], "badge": ""}, "gooseberry": {"emoji": "🫐", "gradient": "linear-gradient(145deg,#0a1a08,#285818,#408830)", "shortDesc": "Healthy, tangy amla pickle.", "description": "Nutrient-rich gooseberry (amla) pieces in a traditional Andhra spice blend — tangy, wholesome and full of goodness.", "ingredients": ["Gooseberry (amla)", "Red chilli powder", "Mustard", "Wood pressed sesame oil", "Salt"], "badge": ""}, "chicken-boneless": {"emoji": "🍗", "gradient": "linear-gradient(145deg,#1a0808,#4a1010,#8a1a1a)", "shortDesc": "Tender boneless chicken in Andhra spices.", "description": "Small tender boneless chicken pieces cooked in an authentic Andhra spice blend — clearly visible meat, less masala, bold homemade taste. Set in wood pressed sesame oil.", "ingredients": ["Boneless chicken", "Red chilli powder", "Ginger-garlic", "Andhra spices", "Wood pressed sesame oil", "Salt"], "badge": "🌟 Premium"}, "gongura-chicken-boneless": {"emoji": "🍗🌿", "gradient": "linear-gradient(145deg,#0d1a0d,#3a4a10,#6a7a1a)", "shortDesc": "Boneless chicken in tangy gongura.", "description": "Tender boneless chicken marinated with tangy gongura (sorrel) and Andhra spices — the ultimate non-veg pickle combination.", "ingredients": ["Boneless chicken", "Gongura leaves", "Red chilli powder", "Ginger-garlic", "Wood pressed sesame oil", "Salt"], "badge": "Must Try"}, "chicken-bone": {"emoji":"🍖","gradient":"linear-gradient(145deg,#1a0606,#4a0e0e,#8a1616)","shortDesc":"Bone-in chicken pickle, rich & traditional.","description":"Traditional country-style chicken pickle with bone-in cuts for deeper flavour, slow-cooked in an authentic Andhra spice blend and wood pressed sesame oil.","ingredients":["Chicken (with bone)","Red chilli powder","Ginger-garlic","Andhra spices","Wood pressed sesame oil","Salt"],"badge":"🍖 Traditional"},  "gongura-chicken-bone": {"emoji":"🍖🌿","gradient":"linear-gradient(145deg,#0d1a0a,#3a4a0e,#6a7a16)","shortDesc":"Bone-in chicken in tangy gongura.","description":"Country-style bone-in chicken pickle blended with tangy gongura (sorrel) and Andhra spices — bold, rustic and full of flavour.","ingredients":["Chicken (with bone)","Gongura leaves","Red chilli powder","Ginger-garlic","Wood pressed sesame oil","Salt"],"badge":"Must Try"}, "garam-masala": {"emoji": "🌶️", "gradient": "linear-gradient(145deg,#1a0a04,#5a2a0a,#9a4810)", "shortDesc": "Freshly ground whole spice blend.", "description": "A warming, aromatic blend of whole spices roasted and ground fresh — the soul of Indian cooking.", "ingredients": ["Cardamom", "Cinnamon", "Clove", "Cumin", "Coriander", "Black pepper"], "badge": ""}, "dhaniya-powder": {"emoji": "🌿", "gradient": "linear-gradient(145deg,#1a1208,#5a4210,#9a7020)", "shortDesc": "Roasted & ground coriander powder.", "description": "Freshly roasted coriander seeds ground to a warm, citrusy powder that forms the base of countless curries.", "ingredients": ["Coriander seeds"], "badge": ""}, "jeera-powder": {"emoji": "🫘", "gradient": "linear-gradient(145deg,#18140a,#504018,#887828)", "shortDesc": "Hand-roasted cumin powder.", "description": "Nutty, earthy hand-roasted cumin ground fresh — essential for tempering, raita and spice blends.", "ingredients": ["Cumin seeds"], "badge": ""}, "bisibele-bath-powder": {"emoji": "🍛", "gradient": "linear-gradient(145deg,#1a0e08,#5a3210,#9a5820)", "shortDesc": "Signature blend for bisibelebath.", "description": "The complex, rich spice blend that gives Karnataka's famous bisibelebath its unmistakable flavour.", "ingredients": ["Chana dal", "Coriander", "Red chilli", "Cinnamon", "Clove", "Dry coconut"], "badge": ""}, "vangi-bath-powder": {"emoji": "🍆", "gradient": "linear-gradient(145deg,#0a1408,#2a4418,#4a7428)", "shortDesc": "Aromatic blend for brinjal rice.", "description": "A bold, nutty spice blend crafted for vangi bath (brinjal rice) — equally delicious with any vegetable rice.", "ingredients": ["Coriander", "Chana dal", "Urad dal", "Red chilli", "Dry coconut", "Cinnamon"], "badge": ""}, "sambar-powder": {"emoji": "🥣", "gradient": "linear-gradient(145deg,#1a0e06,#5a3410,#9a6020)", "shortDesc": "Homemade sambar masala.", "description": "A balanced, fragrant homemade sambar powder with the perfect depth for everyday sambar and stews.", "ingredients": ["Coriander", "Toor dal", "Chana dal", "Red chilli", "Fenugreek", "Curry leaves"], "badge": ""}, "rasam-powder": {"emoji": "🍵", "gradient": "linear-gradient(145deg,#16100a,#4a3410,#7a5a20)", "shortDesc": "Light & aromatic rasam blend.", "description": "A comforting, aromatic rasam powder that turns simple tamarind broth into soul-warming rasam.", "ingredients": ["Coriander", "Cumin", "Black pepper", "Red chilli", "Toor dal"], "badge": ""}, "curry-leaf-powder": {"emoji": "🌿", "gradient": "linear-gradient(145deg,#0a1a0a,#1a4a1a,#2a7a2a)", "shortDesc": "Fresh, greenish, aromatic podi.", "description": "Fresh curry leaves roasted and ground with lentils and spices into a nutritious, fragrant podi. Greenish, premium and packed with flavour.", "ingredients": ["Curry leaves", "Urad dal", "Chana dal", "Red chilli", "Sesame", "Salt"], "badge": "💚 Premium"}, "gun-powder": {"emoji": "🌶️", "gradient": "linear-gradient(145deg,#1a1008,#5a3010,#9a5020)", "shortDesc": "Fiery, punchy idly-dosa podi.", "description": "The classic fiery lentil podi — mix with ghee or oil and it transforms idly, dosa and plain rice into something unforgettable.", "ingredients": ["Urad dal", "Chana dal", "Red chilli", "Sesame", "Garlic", "Salt"], "badge": "🔥 Spicy Hit"}, "palli-karam-podi": {"emoji": "🥜", "gradient": "linear-gradient(145deg,#1a0e08,#4a2a10,#8a4820)", "shortDesc": "Roasted peanut karam podi.", "description": "Roasted peanuts ground with red chilli and garlic into a fiery, nutty podi — a Telugu kitchen staple loved with rice and ghee.", "ingredients": ["Peanuts", "Red chilli", "Garlic", "Cumin", "Salt"], "badge": ""}, "vellulli-karam-podi": {"emoji": "🧄", "gradient": "linear-gradient(145deg,#14100a,#3a3010,#6a5820)", "shortDesc": "Bold garlic karam podi.", "description": "An intensely flavoured garlic podi — pungent, rich and bold. A little goes a long way over rice, idly or dosa.", "ingredients": ["Garlic", "Red chilli", "Urad dal", "Sesame", "Salt"], "badge": ""}, "flax-seeds-podi": {"emoji": "🌾", "gradient": "linear-gradient(145deg,#100e0a,#302e18,#5a5828)", "shortDesc": "Nutritious roasted flax podi.", "description": "Roasted flax seeds ground with mild spices into an omega-rich, healthy podi with a subtle nutty warmth.", "ingredients": ["Flax seeds", "Red chilli", "Garlic", "Cumin", "Salt"], "badge": ""}};

const FALLBACK_CATEGORIES = [{"id": "veg-pickles", "name": "Veg Pickles", "icon": "🥭", "type": "veg", "base": "250g"}, {"id": "non-veg-pickles", "name": "Non-Veg Pickles", "icon": "🍗", "type": "non-veg", "base": "250g"}, {"id": "spices", "name": "Spices", "icon": "🌶️", "type": "veg", "base": "100g"}, {"id": "podis", "name": "Podis", "icon": "🌿", "type": "veg", "base": "100g"}];

const yn = (v) => ["yes", "y", "true", "1"].includes(String(v ?? "").trim().toLowerCase());
const num = (v) => {
  if (v === null || v === undefined || String(v).trim() === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

function rowsOf(ws) {
  return XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
}

function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.log("\n  ⚠️  admin/FlavorsOfBIMA-Admin.xlsx not found.");
    console.log("     Keeping existing catalog.generated.json (no changes).\n");
    process.exit(0);
  }

  let wb;
  let readErr = null;

  // Attempt 1: read directly.
  try {
    const buf = fs.readFileSync(XLSX_PATH);
    wb = XLSX.read(buf, { type: "buffer", codepage: 65001 });
  } catch (e) {
    readErr = e;
  }

  // Attempt 2: if direct read failed (often a Windows lock from Excel/OneDrive),
  // copy the file to a temp path and read the copy. Copying usually succeeds
  // even when direct opening is blocked.
  if (!wb) {
    try {
      const tmp = path.join(os.tmpdir(), `bima-admin-${Date.now()}.xlsx`);
      fs.copyFileSync(XLSX_PATH, tmp);
      const buf = fs.readFileSync(tmp);
      wb = XLSX.read(buf, { type: "buffer", codepage: 65001 });
      try { fs.unlinkSync(tmp); } catch {}
      console.log("  ℹ️  Read the Excel via a temporary copy (original was locked).");
    } catch (e2) {
      readErr = readErr || e2;
    }
  }

  if (!wb) {
    const msg = String(readErr && readErr.message);
    console.log("\n" + "=".repeat(60));
    console.log("  ⚠️  Could not read the Excel file — even via a copy.");
    console.log("  Likely one of these:");
    console.log("   1) Excel is still running in the background.");
    console.log("      → Open Task Manager, End any 'Excel' process, retry.");
    console.log("   2) The file is OneDrive 'online-only' (cloud icon).");
    console.log("      → Right-click it → 'Always keep on this device'.");
    console.log("   3) A '~$FlavorsOfBIMA-Admin.xlsx' lock file exists in admin\\.");
    console.log("      → Delete that ~$ file, then retry.");
    console.log("  (Technical detail:", msg, ")");
    console.log("  Site will keep using the existing data for now.");
    console.log("=".repeat(60) + "\n");
    process.exit(0);
  }

  // ---- Categories (from the Categories sheet; falls back to defaults) ----
  let CATEGORIES = FALLBACK_CATEGORIES;
  const catImages = {};
  if (wb.Sheets["Categories"]) {
    const cr = rowsOf(wb.Sheets["Categories"]);
    let chr = -1;
    for (let i = 0; i < Math.min(cr.length, 12); i++) {
      const row = (cr[i] || []).map((c) => String(c).trim().toLowerCase());
      if (row.includes("id") && row.includes("name")) { chr = i; break; }
    }
    if (chr !== -1) {
      const ch = {};
      (cr[chr] || []).forEach((h, i) => { if (h) ch[String(h).trim().toLowerCase()] = i; });
      const parsed = [];
      for (let r = chr + 1; r < cr.length; r++) {
        const row = cr[r];
        if (!row || !row[ch["id"]]) continue;
        const id = String(row[ch["id"]]).trim();
        if (!id) continue;
        if ("active" in ch && !yn(row[ch["active"]])) continue; // active only
        parsed.push({
          id,
          name: String(row[ch["name"]]).trim(),
          icon: row[ch["icon"]] ? String(row[ch["icon"]]).trim() : "",
          type: row[ch["type"]] ? String(row[ch["type"]]).trim() : "veg",
          base: String(row[ch["base_weight"]] ?? "250g").trim() === "100g" ? "100g" : "250g",
          image: ch["image_filename"] != null && row[ch["image_filename"]] ? String(row[ch["image_filename"]]).trim() : "",
        });
      }
      if (parsed.length) CATEGORIES = parsed;
    }
  }

  // ---- Products ----
  // Find the header row dynamically (the row containing "slug") so the
  // parser still works even if blank/intro rows shift around.
  const pr = rowsOf(wb.Sheets["Products"]);
  let headerRow = -1;
  for (let i = 0; i < Math.min(pr.length, 12); i++) {
    const row = (pr[i] || []).map((c) => String(c).trim().toLowerCase());
    if (row.includes("slug")) { headerRow = i; break; }
  }
  if (headerRow === -1) {
    console.log("\n  ⚠️  Couldn't find the 'slug' header in the Products sheet.");
    console.log("     Check the Products tab still has its header row. Keeping old data.\n");
    process.exit(0);
  }
  const headers = pr[headerRow] || [];
  const idx = {};
  headers.forEach((h, i) => { if (h) idx[String(h).trim().toLowerCase()] = i; });

  // Data rows start after the header. We skip a row only if it's the
  // helper-note row (its 'slug' cell contains a space, e.g. "unique id").
  let dataStart = headerRow + 1;
  const firstCell = String((pr[dataStart] || [])[idx["slug"]] ?? "").trim();
  if (/\s/.test(firstCell) || firstCell.toLowerCase().includes("unique")) dataStart++;

  const get = (row, key) => row[idx[key]];

  const products = [];
  for (let r = dataStart; r < pr.length; r++) {
    const row = pr[r];
    if (!row || !get(row, "slug")) continue;
    const slug = String(get(row, "slug")).trim();
    if (!slug || /\s/.test(slug)) continue; // skip any stray note rows
    if (!yn(get(row, "active"))) continue; // item 12: active only

    const cat = String(get(row, "category")).trim();
    const catDef = CATEGORIES.find((c) => c.id === cat);
    const base = catDef ? catDef.base : "250g";

    const prices = {};
    if (base === "250g") {
      [["250g", "price_250g"], ["500g", "price_500g"], ["1kg", "price_1kg"]].forEach(([label, key]) => {
        const p = num(get(row, key));
        if (p !== null) prices[label] = Math.round(p);
      });
    } else {
      [["100g", "price_100g"], ["200g", "price_200g"], ["500g", "price_500g"]].forEach(([label, key]) => {
        const p = num(get(row, key));
        if (p !== null) prices[label] = Math.round(p);
      });
    }

    const meta = META[slug] || {
      emoji: "🫙",
      gradient: "linear-gradient(145deg,#0c2354,#071a3d)",
      shortDesc: "", description: "", ingredients: [], badge: "",
    };

    let dt = String(get(row, "discount_type") ?? "").trim().toLowerCase();
    if (dt !== "amount" && dt !== "percentage") dt = "";

    const isPickle = cat === "veg-pickles" || cat === "non-veg-pickles";

    products.push({
      slug,
      name: String(get(row, "name")).trim(),
      category: cat,
      prices,
      hasGarlic: yn(get(row, "has_garlic")),
      garlicSurcharge: Math.round(num(get(row, "garlic_surcharge")) || 0),
      // Oil & package options apply to pickles only
      hasOptions: isPickle,
      refinedOilDiff: isPickle ? Math.round(num(get(row, "refined_oil_diff")) || 0) : 0,
      glassBottleDiff: isPickle ? Math.round(num(get(row, "glass_bottle_diff")) || 0) : 0,
      discountType: dt,
      discountValue: num(get(row, "discount_value")) || 0,
      bestseller: yn(get(row, "bestseller")),
      seasonal: yn(get(row, "seasonal")),
      ...meta,
    });
  }

  // ---- Settings (find the "setting" header row) ----
  const st = rowsOf(wb.Sheets["Settings"]);
  const settings = {};
  let stStart = 3;
  for (let i = 0; i < Math.min(st.length, 10); i++) {
    if (String((st[i] || [])[0]).trim().toLowerCase() === "setting") { stStart = i + 1; break; }
  }
  for (let r = stStart; r < st.length; r++) {
    const row = st[r];
    if (row && row[0]) settings[String(row[0]).trim()] = row[1] != null ? String(row[1]).trim() : "";
  }

  // ---- WhyUs (find the "order" header row) ----
  const wu = rowsOf(wb.Sheets["WhyUs"]);
  const whyus = [];
  let wuStart = 3;
  for (let i = 0; i < Math.min(wu.length, 10); i++) {
    if (String((wu[i] || [])[0]).trim().toLowerCase() === "order") { wuStart = i + 1; break; }
  }
  for (let r = wuStart; r < wu.length; r++) {
    const row = wu[r];
    if (row && row[1]) whyus.push({
      order: num(row[0]) || 0, title: String(row[1]).trim(),
      desc: row[2] ? String(row[2]).trim() : "", image: row[3] ? String(row[3]).trim() : "",
    });
  }
  whyus.sort((a, b) => a.order - b.order);

  // ---- Testimonials (find the "order" header row) ----
  const ts = rowsOf(wb.Sheets["Testimonials"]);
  const testimonials = [];
  let tsStart = 3;
  for (let i = 0; i < Math.min(ts.length, 10); i++) {
    if (String((ts[i] || [])[0]).trim().toLowerCase() === "order") { tsStart = i + 1; break; }
  }
  for (let r = tsStart; r < ts.length; r++) {
    const row = ts[r];
    if (row && row[1]) testimonials.push({
      order: num(row[0]) || 0, name: String(row[1]).trim(),
      location: row[2] ? String(row[2]).trim() : "", rating: Math.round(num(row[3]) || 5),
      review: row[4] ? String(row[4]).trim() : "", image: row[5] ? String(row[5]).trim() : "",
    });
  }
  testimonials.sort((a, b) => a.order - b.order);

  // ---- TrustBar (find the "order" header row) ----
  const trustbar = [];
  if (wb.Sheets["TrustBar"]) {
    const tb = rowsOf(wb.Sheets["TrustBar"]);
    let tbStart = 3;
    for (let i = 0; i < Math.min(tb.length, 10); i++) {
      if (String((tb[i] || [])[0]).trim().toLowerCase() === "order") { tbStart = i + 1; break; }
    }
    for (let r = tbStart; r < tb.length; r++) {
      const row = tb[r];
      if (row && row[1]) trustbar.push({
        order: num(row[0]) || 0, label: String(row[1]).trim(),
        emoji: row[2] ? String(row[2]).trim() : "", image: row[3] ? String(row[3]).trim() : "",
      });
    }
    trustbar.sort((a, b) => a.order - b.order);
  }

  // ---- FAQ (find the "order" header row) ----
  const faq = [];
  if (wb.Sheets["FAQ"]) {
    const fq = rowsOf(wb.Sheets["FAQ"]);
    let fqStart = 3;
    for (let i = 0; i < Math.min(fq.length, 10); i++) {
      if (String((fq[i] || [])[0]).trim().toLowerCase() === "order") { fqStart = i + 1; break; }
    }
    for (let r = fqStart; r < fq.length; r++) {
      const row = fq[r];
      if (row && row[1]) faq.push({
        order: num(row[0]) || 0, q: String(row[1]).trim(),
        a: row[2] ? String(row[2]).trim() : "",
      });
    }
    faq.sort((a, b) => a.order - b.order);
  }

  // attach category images to category objects (from catImages map built earlier)
  const out = {
    generatedAt: new Date().toISOString(),
    categories: CATEGORIES, products, settings, whyus, testimonials, trustbar, faq,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), "utf-8");

  const sample = products[0];
  const samplePrice = sample && sample.prices ? Object.entries(sample.prices).map(([k, v]) => `${k}=₹${v}`).join(", ") : "n/a";
  let xlsxMtime = "?";
  try { xlsxMtime = fs.statSync(XLSX_PATH).mtime.toLocaleString(); } catch {}
  console.log("\n" + "=".repeat(60));
  console.log(`  ✅ EXCEL READ OK at ${new Date().toLocaleTimeString()}`);
  console.log(`     Source Excel last saved: ${xlsxMtime}`);
  console.log(`     ${products.length} products, ${CATEGORIES.length} categories, ${faq.length} FAQs, ${trustbar.length} trust items`);
  console.log(`     theme=${settings.theme || "(blank)"}, fssai1=${settings.fssai_license_1 || "(blank)"}, fssai2=${settings.fssai_license_2 || "(blank)"}`);
  console.log(`     e.g. ${sample ? sample.name : "?"}: ${samplePrice}`);
  console.log(`     (If a price looks wrong, the admin/ Excel is the one being read — update THAT file.)`);
  console.log("=".repeat(60) + "\n");
}

main();
