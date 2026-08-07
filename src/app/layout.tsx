import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"

import "./globals.css"

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Rishi Lokesh",
  description: "Notes and writing from Rishi Lokesh.",
  metadataBase: new URL("https://rishilokesh.me"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
