import { waLink } from "@/lib/brand";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Order on WhatsApp"
      title="Order on WhatsApp"
    >
      💬
    </a>
  );
}
