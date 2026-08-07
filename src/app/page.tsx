import Link from "next/link"

export default function HomePage() {
  return (
    <main style={{
      maxWidth: "640px",
      margin: "0 auto",
      padding: "80px 24px",
    }}>

      <div style={{
        borderLeft: "4px solid #ff2200",
        paddingLeft: "20px",
        marginBottom: "64px",
      }}>
        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#f0ece8",
          marginBottom: "16px",
        }}>
          RISHI<br />LOKESH
        </h1>
        <p style={{
          color: "#888880",
          fontSize: "13px",
          lineHeight: 1.8,
          maxWidth: "420px",
        }}>
          ML and systems. Interested in the hardware that actually runs
          intelligence — GPUs, kernels, compilers, inference engines.
          Currently building things and figuring out what matters.
        </p>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <div style={{
          borderTop: "1px solid #ff2200",
          paddingTop: "24px",
        }}>
          <p style={{
            color: "#555550",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "12px",
          }}>
            writing
          </p>
          <Link
            href="/notebook"
            style={{
              display: "inline-block",
              color: "#ff2200",
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textDecoration: "none",
              borderBottom: "2px solid #ff2200",
              paddingBottom: "2px",
            }}
          >
            MY NOTEBOOK →
          </Link>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #1a0000",
        paddingTop: "24px",
        fontSize: "11px",
        color: "#444440",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}>
        <a href="mailto:hello@rishilokesh.me" style={{ color: "#444440" }}>
          hello@rishilokesh.me
        </a>
      </div>

    </main>
  )
}
