import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "My Notebook — Rishi Lokesh",
  description: "Working notes. Unfinished thoughts.",
}

export default function NotebookPage() {
  const posts = getAllPosts()

  return (
    <main style={{
      maxWidth: "640px",
      margin: "0 auto",
      padding: "80px 24px",
    }}>

      <div style={{ marginBottom: "48px" }}>
        <Link href="/" style={{
          fontSize: "11px",
          color: "#555550",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          textDecoration: "none",
        }}>
          ← RISHI LOKESH
        </Link>
      </div>

      <div style={{
        borderLeft: "4px solid #ff2200",
        paddingLeft: "20px",
        marginBottom: "56px",
      }}>
        <h1 style={{
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#f0ece8",
          marginBottom: "12px",
        }}>
          MY NOTEBOOK
        </h1>
        <p style={{ color: "#555550", fontSize: "12px" }}>
          Working notes. Unfinished thoughts. Things I wrote down so I
          wouldn&apos;t forget them.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "#555550", fontSize: "13px" }}>Nothing here yet.</p>
      ) : (
        <div>
          {posts.map((post, i) => (
            <div key={post.slug} style={{
              borderTop: i === 0 ? "2px solid #ff2200" : "1px solid #1a0000",
              paddingTop: "24px",
              paddingBottom: "24px",
            }}>
              <Link href={`/notebook/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "#555550",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "10px",
                }}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>{post.readingTime}</span>
                </div>
                <h2 style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#f0ece8",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontSize: "13px",
                  color: "#888880",
                  lineHeight: 1.6,
                }}>
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
          <div style={{ borderTop: "2px solid #ff2200" }} />
        </div>
      )}

    </main>
  )
}
