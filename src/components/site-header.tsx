import Link from "next/link"

import { siteConfig } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="border-b-2 border-foreground">
      <div className="mx-auto flex max-w-2xl items-baseline justify-between gap-4 px-5 py-5">
        <Link
          href="/"
          className="font-heading text-xl uppercase tracking-tight text-foreground hover:underline"
        >
          {siteConfig.name}
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          notes
        </span>
      </div>
    </header>
  )
}
