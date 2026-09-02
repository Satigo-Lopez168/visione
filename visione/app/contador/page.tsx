import type { Metadata } from "next"
import Link from "next/link"
import { ClickCounter } from "@/components/ClickCounter"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"

/**
 * Ruta fuera del flujo del sitio: se conserva para probar las animaciones, pero
 * nada en la web enlaza aquí. Solo se llega escribiendo la URL. Si añades un
 * enlace a esta página desde el sitio, estás rompiendo esa decisión.
 */
export const metadata: Metadata = {
  title: "Contador — Visione",
  description: "Demo del contador de clicks animado con GSAP.",
  robots: { index: false, follow: false },
}

export default function ContadorPage() {
  return (
    <main className="flex-1 bg-white px-6 py-24 text-ink-700">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10">
        <header className="flex flex-col gap-3">
          <Eyebrow className="text-amber-400">Demo</Eyebrow>
          <Heading level={1} className="text-ink-900">
            Contador de clicks
          </Heading>
          <p className="max-w-[60ch] text-[clamp(17px,1.5vw,21px)]">
            Prueba de las dos formas de animar con GSAP en este proyecto:
            reactiva sobre el contador y en el handler del botón.
          </p>
        </header>

        <ClickCounter />

        <Link href="/" className="text-ink-900 underline underline-offset-4">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
