import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Flavors Of BIMA — order or ask us anything on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <ContactSection />
    </div>
  );
}
