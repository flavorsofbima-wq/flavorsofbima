import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Shop",
  description: "Browse all homemade pickles, podis and spices from Flavors Of BIMA. Filter by category, price, garlic preference and more.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <ShopClient />
    </Suspense>
  );
}
