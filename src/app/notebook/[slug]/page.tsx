import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { NotebookMarkdown } from "@/components/notebook-markdown"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = getPostBySlug(slug)
    return { title: `${post.title} — Rishi Lokesh`, description: post.description }
  } catch {
    return { title: "Not found" }
  }
}

export default async function NotebookPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getAllPosts().find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <main style={{
      maxWidth: "680px",
      margin: "0 auto",
      padding: "80px 24px",
    }}>

      <div style={{ marginBottom: "48px" }}>
        <Link href="/notebook" style={{
          fontSize: "11px",
          color: "#555550",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          textDecoration: "none",
        }}>
          ← MY NOTEBOOK
        </Link>
      </div>

      <header style={{
        borderLeft: "4px solid #ff2200",
        paddingLeft: "20px",
        marginBottom: "56px",
        paddingBottom: "4px",
      }}>
        <div style={{
          fontSize: "11px",
          color: "#555550",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "14px",
        }}>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span style={{ margin: "0 8px" }}>/</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}
        </div>
        <h1 style={{
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "#f0ece8",
          marginBottom: "14px",
        }}>
          {post.title}
        </h1>
        <p style={{ fontSize: "13px", color: "#888880", lineHeight: 1.6 }}>
          {post.description}
        </p>
      </header>

      <NotebookMarkdown content={post.content} />

    </main>
  )
}
