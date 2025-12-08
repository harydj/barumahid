import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "barumahID - Platform Rent-to-Own",
  description: "Dari Ngekos, Bisa Punya Rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/images/Logo BarumahID.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/images/Logo BarumahID.png",
    shortcut: "/images/Logo BarumahID.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${figtree.variable} ${geistMono.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
