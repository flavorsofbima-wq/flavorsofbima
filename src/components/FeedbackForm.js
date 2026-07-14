"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import styles from "./FeedbackForm.module.css";

// Google Form submission endpoint + the field IDs it expects.
// NOTE: if the questions are ever edited in Google Forms, these IDs can
// change and submissions would silently stop being recorded. If you need
// to change the form, re-check these IDs.
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeW7vc7ZnTM4wsrtQgE2oRpfS5UlN8xiFHapyzdPOxLljbX9g/formResponse";

const FIELD = {
  name: "entry.1939977294",
  place: "entry.45147123",
  title: "entry.1054807656",
  feedback: "entry.2112589955",
  rating: "entry.297641873",
};

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const valid = name.trim() && place.trim() && title.trim() && feedback.trim() && rating > 0;

  async function submit() {
    if (!valid || sending) return;
    setSending(true);
    setError("");

    // Google Forms doesn't allow reading the response from the browser
    // (CORS), so we post with no-cors and treat completion as success.
    const body = new FormData();
    body.append(FIELD.name, name.trim());
    body.append(FIELD.place, place.trim());
    body.append(FIELD.title, title.trim());
    body.append(FIELD.feedback, feedback.trim());
    body.append(FIELD.rating, String(rating));

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setDone(true);
    } catch (e) {
      setError("Sorry, something went wrong. Please try again, or send us a message on WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <Reveal>
        <div className={styles.thanks}>
          <div className={styles.thanksIcon}>✦</div>
          <h2 className={styles.thanksTitle}>Thank you!</h2>
          <p className={styles.thanksText}>
            We&rsquo;ve received your feedback and we truly appreciate you taking the time.
            Every word helps us make our food better.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setName(""); setPlace(""); setTitle(""); setFeedback(""); setRating(0); setDone(false);
            }}
          >
            Share more feedback
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fb-name">Your Name</label>
            <input
              id="fb-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya S."
              maxLength={80}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="fb-place">Place</label>
            <input
              id="fb-place"
              className={styles.input}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="e.g. Hyderabad"
              maxLength={80}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fb-title">Feedback Title</label>
          <input
            id="fb-title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Best avakaya I've had in years"
            maxLength={120}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fb-text">Your Feedback</label>
          <textarea
            id="fb-text"
            className={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you loved — or what we could do better…"
            rows={5}
            maxLength={1200}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Your Rating</label>
          <div className={styles.stars} role="radiogroup" aria-label="Rating out of 5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className={`${styles.star} ${(hover || rating) >= n ? styles.starOn : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
            <span className={styles.ratingText}>
              {["", "Poor", "Fair", "Good", "Very good", "Excellent"][hover || rating] || ""}
            </span>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className="btn btn-gold btn-block"
          onClick={submit}
          disabled={!valid || sending}
          style={{ opacity: !valid || sending ? 0.55 : 1, marginTop: 6 }}
        >
          {sending ? "Sending…" : "Submit Feedback"}
        </button>

        <p className={styles.privacy}>
          Your feedback goes straight to us. We never share your details with anyone.
        </p>
      </div>
    </Reveal>
  );
}
