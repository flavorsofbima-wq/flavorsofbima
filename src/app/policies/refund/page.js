import { BRAND } from "@/lib/brand";
import styles from "../policy.module.css";

export const metadata = { title: "Refund Policy" };

export default function RefundPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <h1 className={styles.title}>Refund <em>Policy</em></h1>
          <p className={styles.updated}>Your satisfaction matters to us.</p>

          <div className={styles.body}>
            <h2>Food Safety First</h2>
            <p>
              As we sell <strong>freshly made, perishable food products</strong>, we are generally unable to accept returns
              once an order has been delivered, for hygiene and safety reasons.
            </p>

            <h2>Damaged or Incorrect Orders</h2>
            <p>
              If your order arrives damaged, leaking, or is incorrect, please contact us within{" "}
              <strong>48 hours</strong> of delivery with photos. We will arrange a replacement or refund for the affected
              items.
            </p>

            <h2>Quality Concerns</h2>
            <p>
              We take great pride in our quality. If you are unhappy with the freshness or quality of a product, please
              reach out — we&rsquo;ll always work with you to make it right.
            </p>

            <h2>How Refunds Are Processed</h2>
            <ul>
              <li>Approved refunds are processed to your original payment method.</li>
              <li>Refunds may take 5–7 business days to reflect, depending on your bank.</li>
            </ul>

            <div className={styles.note}>
              To raise a concern, message us on WhatsApp at <strong>{BRAND.phoneDisplay}</strong> or email{" "}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
