import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "My Notebook — Rishi Lokesh",
}

export default function NotebookPage() {
  const posts = getAllPosts()

  return (
    <main style={{ maxWidth: "580px", margin: "80px auto", padding: "0 24px" }}>
      <p style={{ marginBottom: "32px" }}>
        <Link href="/">Rishi Lokesh</Link>
      </p>

      <h1 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>My Notebook</h1>
      <p style={{ color: "#444", marginBottom: "40px" }}>
        Working notes. Things I wrote down so I wouldn&apos;t forget them.
      </p>

      <hr style={{ marginBottom: "24px" }} />

      {posts.map((post) => (
        <div key={post.slug} style={{ marginBottom: "28px" }}>
          <Link href={`/notebook/${post.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{post.title}</div>
            <div style={{ fontSize: "14px", color: "#555" }}>{post.description}</div>
          </Link>
        </div>
      ))}
    </main>
  )
}
