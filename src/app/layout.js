import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { defaultTheme } from "@/lib/catalog";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import OrderConfirmPrompt from "@/components/OrderConfirmPrompt";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});
const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.flavorsofbima.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "Flavors Of BIMA",
    "homemade pickles",
    "avakaya",
    "gongura pickle",
    "chicken pickle",
    "podi",
    "spices",
    "Andhra pickles",
    "wood pressed oil",
    "no preservatives",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    type: "website",
    locale: "en_IN",
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#071a3d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const initialTheme = defaultTheme();
  return (
    <html
      lang="en"
      data-theme={initialTheme}
      className={`${cormorant.variable} ${outfit.variable} ${vibes.variable}`}
    >
      <head>
        {/* Google Analytics 4 — measurement ID G-CWTSZF0DHV */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CWTSZF0DHV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CWTSZF0DHV');`,
          }}
        />
        {/* No-flash: apply saved theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bima-theme');if(t==='white'||t==='navy-gold'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={initialTheme}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
          <OrderConfirmPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
