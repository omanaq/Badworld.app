import type React from "react"
import "./globals.css"
import { Tajawal } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "لماذا كل هذا الضجيج؟",
  description: "رواية تستكشف الصراع بين الضجيج الداخلي والصمت الخارجي",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${tajawal.variable} font-sans bg-black text-gray-100 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
