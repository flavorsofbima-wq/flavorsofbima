import { BRAND } from "@/lib/brand";
import styles from "../policy.module.css";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <h1 className={styles.title}>Shipping <em>Policy</em></h1>
          <p className={styles.updated}>Please review our dispatch and delivery details below.</p>

          <div className={styles.body}>
            <h2>Order Processing</h2>
            <p>
              Because every product is freshly prepared in small batches, orders are typically packed and dispatched
              within <strong>2–4 business days</strong> of confirmation. Seasonal items may take slightly longer depending
              on ingredient availability.
            </p>

            <h2>Delivery Timeframes</h2>
            <p>
              Once dispatched, delivery usually takes <strong>3–7 business days</strong> depending on your location within
              India. We will share tracking details where available.
            </p>

            <h2>Packaging</h2>
            <p>
              All pickles and podis are sealed in food-grade containers and packed carefully to prevent leakage and damage
              in transit. If your order arrives damaged, please contact us within 48 hours.
            </p>

            <h2>Shipping Charges</h2>
            <p>
              Shipping charges are calculated based on weight and destination, and will be confirmed at the time of order.
              For exact charges, please reach out on WhatsApp.
            </p>

            <div className={styles.note}>
              Questions about a delivery? Message us on WhatsApp at <strong>{BRAND.phoneDisplay}</strong> or email{" "}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> and we&rsquo;ll help right away.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
