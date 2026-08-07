import type { Metadata } from "next"
import "katex/dist/katex.min.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rishi Lokesh",
  description: "Notes and writing from Rishi Lokesh.",
  metadataBase: new URL("https://rishilokesh.me"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
