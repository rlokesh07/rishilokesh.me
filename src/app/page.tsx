import Link from "next/link"

import { getAllPosts } from "@/lib/blog"

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <h1 className="font-heading text-4xl uppercase leading-none tracking-tight md:text-5xl">
        Blog
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm text-muted-foreground">
        Working notes. Unfinished thoughts. Things I wrote down so I wouldn&apos;t
        forget them.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 border-t-2 border-foreground pt-6 font-mono text-sm text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <ul className="mt-12 border-t-2 border-foreground">
          {posts.map((post) => (
            <li key={post.slug} className="border-b-2 border-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="block py-5 transition-colors hover:bg-foreground hover:text-background"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs uppercase tracking-wide opacity-70">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="font-heading mt-2 text-2xl uppercase leading-tight tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
