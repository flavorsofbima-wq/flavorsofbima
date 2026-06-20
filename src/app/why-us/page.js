import QualitySection from "@/components/QualitySection";
import Testimonials from "@/components/Testimonials";
import { WHYUS, TESTIMONIALS } from "@/lib/catalog";

export const metadata = {
  title: "Why Us",
  description: "No preservatives, no added colors, wood pressed oil, premium ingredients — why our food is different.",
};

export default function WhyUsPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <QualitySection items={WHYUS} />
      <Testimonials testimonials={TESTIMONIALS} />
    </div>
  );
}
