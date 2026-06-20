import { BRAND } from "@/lib/brand";
import styles from "../policy.module.css";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <h1 className={styles.title}>Privacy <em>Policy</em></h1>
          <p className={styles.updated}>How we handle your information.</p>

          <div className={styles.body}>
            <h2>Information We Collect</h2>
            <p>
              When you place an order or contact us, we may collect your name, phone number, delivery address and email.
              We collect only what we need to process and deliver your order.
            </p>

            <h2>How We Use It</h2>
            <ul>
              <li>To process, pack and deliver your orders.</li>
              <li>To communicate with you about your order.</li>
              <li>To respond to your questions and requests.</li>
            </ul>

            <h2>What We Don&rsquo;t Do</h2>
            <p>
              We do <strong>not</strong> sell, rent or trade your personal information to third parties. Your details are
              used solely to serve you.
            </p>

            <h2>Payment Information</h2>
            <p>
              When online payments are enabled, transactions are handled by a trusted, secure payment provider. We do not
              store your card or banking details on our servers.
            </p>

            <h2>Contact</h2>
            <p>
              For any privacy questions, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or message us on
              WhatsApp at <strong>{BRAND.phoneDisplay}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
