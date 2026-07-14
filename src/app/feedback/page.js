import FeedbackForm from "@/components/FeedbackForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Share Your Feedback",
  description:
    "Tell us what you think about Flavors Of BIMA — your feedback helps us make our homemade pickles, podis and snacks even better.",
};

export default function FeedbackPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: "center" }}>We&rsquo;re Listening</div>
            <h2 className="section-title">
              Share Your <em>Feedback</em>
            </h2>
            <div className="gold-rule">
              <span>✦</span>
            </div>
            <p className="section-sub">
              Every jar we make is shaped by what our customers tell us. Tell us what you loved,
              or where we can do better — we read every single message.
            </p>
          </Reveal>

          <FeedbackForm />
        </div>
      </section>
    </div>
  );
}
