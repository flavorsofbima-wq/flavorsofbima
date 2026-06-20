import { BRAND } from "@/lib/brand";
import styles from "../policy.module.css";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <h1 className={styles.title}>Terms of <em>Service</em></h1>
          <p className={styles.updated}>The basics of ordering from {BRAND.name}.</p>

          <div className={styles.body}>
            <h2>Ordering</h2>
            <p>
              By placing an order with {BRAND.name}, you confirm that the details you provide are accurate. All orders are
              subject to confirmation and availability, especially for seasonal items.
            </p>

            <h2>Pricing</h2>
            <p>
              Prices are listed in Indian Rupees (INR) and may change without notice. The price confirmed at the time of
              your order is the price that applies.
            </p>

            <h2>Product Freshness</h2>
            <p>
              Our products are best enjoyed within <strong>3 months from the date of packing</strong>. Always use a clean,
              dry spoon and store as advised to maintain freshness.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              {BRAND.name} is not liable for any allergic reactions. Please review the listed ingredients on each product
              and contact us if you have specific allergy concerns before ordering.
            </p>

            <div className={styles.note}>
              Questions about these terms? Email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or message{" "}
              <strong>{BRAND.phoneDisplay}</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
