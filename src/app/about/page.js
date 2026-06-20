import AboutSection from "@/components/AboutSection";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "About Us",
  description: `The story behind ${BRAND.name} — authentic homemade pickles, podis and spices.`,
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <AboutSection alt={false} />
    </div>
  );
}
