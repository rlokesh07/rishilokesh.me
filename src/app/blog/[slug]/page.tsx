import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Markdown } from "@/components/markdown"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = getPostBySlug(slug)
    return {
      title: post.title,
      description: post.description,
    }
  } catch {
    return { title: "Post not found" }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getAllPosts().find((entry) => entry.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 md:py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground underline decoration-foreground/30 underline-offset-4 hover:text-foreground"
      >
        ← back
      </Link>

      <header className="mt-8 border-b-2 border-foreground pb-8">
        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span>/</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span>/</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}

        </div>
        <h1 className="font-heading mt-4 text-3xl uppercase leading-none tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">{post.description}</p>
      </header>

      <div className="pt-8">
        <Markdown content={post.content} />
      </div>
    </article>
  )
}
