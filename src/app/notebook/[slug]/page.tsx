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
    <main style={{ maxWidth: "620px", margin: "80px auto", padding: "0 24px" }}>
      <p style={{ marginBottom: "40px" }}>
        <Link href="/notebook">My Notebook</Link>
      </p>

      <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {" · "}
        {post.readingTime}
      </div>

      <h1 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>{post.title}</h1>
      <p style={{ color: "#555", marginBottom: "40px" }}>{post.description}</p>

      <hr style={{ marginBottom: "40px" }} />

      <NotebookMarkdown content={post.content} />
    </main>
  )
}
