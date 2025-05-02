import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "لماذا كل هذا الضجيج؟ | رواية من تأليف عبدالعزيز الحمداني",
  description: "رواية تعبر عن الصراع النفسي الداخلي، التمرد على الواقع، الانكسار الوجودي، وتفكك الذات في مواجهة العبث.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-black text-white font-cairo antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
