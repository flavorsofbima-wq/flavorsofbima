import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--header-h) 24px 40px",
        gap: 14,
      }}
    >
      <div style={{ fontSize: 64 }} aria-hidden>🫙</div>
      <h1 className="section-title">Page <em>Not Found</em></h1>
      <p className="section-sub" style={{ marginBottom: 18 }}>
        The page you&rsquo;re looking for seems to have wandered off. Let&rsquo;s get you back to the good stuff.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-gold">Back Home</Link>
        <Link href="/shop" className="btn btn-outline">Browse Shop</Link>
      </div>
    </div>
  );
}
