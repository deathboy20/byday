import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "ByDay - Find Daily Work in Ghana",
  description: "Ghana's trusted platform for connecting skilled workers with clients who need them",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <TooltipProvider>
            <Suspense fallback={null}>
              {children}
              <Toaster />
            </Suspense>
          </TooltipProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
