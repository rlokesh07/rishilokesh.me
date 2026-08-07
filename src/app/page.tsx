import Link from "next/link"

export default function HomePage() {
  return (
    <main style={{ maxWidth: "580px", margin: "80px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Rishi Lokesh</h1>
      <p style={{ color: "#444", marginBottom: "32px" }}>
        ML and systems. Interested in the hardware that runs intelligence.
        Currently building things and figuring out what matters.
      </p>
      <p>
        <Link href="/notebook">My Notebook</Link>
      </p>
    </main>
  )
}
