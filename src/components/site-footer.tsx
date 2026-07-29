import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-foreground">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-5">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-mono text-xs text-muted-foreground underline decoration-foreground/40 underline-offset-2 hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </div>
    </footer>
  )
}
