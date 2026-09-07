import type { Metadata } from "next"
import { Barlow_Condensed, Barlow_Semi_Condensed } from "next/font/google"
import "./globals.css"

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const barlowSemiCondensed = Barlow_Semi_Condensed({
  variable: "--font-barlow-semi-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Visione — Fundación Educativa",
  description:
    "Institución de Educación para el Trabajo y el Desarrollo Humano en Sopó, Cundinamarca. Diez programas técnicos laborales con registro oficial.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${barlowSemiCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
