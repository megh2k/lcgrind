// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth App",
  description: "Modern authentication app with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen text-gray-800`}>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
