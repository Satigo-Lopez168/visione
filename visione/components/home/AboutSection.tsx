"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"
import { BUTTON_ICON_SIZES, ButtonLink } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"
import { Rule } from "@/components/ui/Rule"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Entrada lateral de "Nosotros": el panel queda fijo y entra desde la derecha
 * mientras se recorre la pista de 210vh; al completarse, el scroll sigue
 * normal. El `power3.out` reproduce el `1 - (1 - p)³` del prototipo.
 */
export function AboutSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // `x: 0` no sobra: el panel arranca con `translate-x-full` para no
      // asomar antes de que corra el JS, y GSAP lo leería como un desplazamiento
      // en píxeles que se sumaría al xPercent.
      gsap.fromTo(
        panelRef.current,
        { xPercent: 100, x: 0 },
        {
          xPercent: 0,
          x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      )
    },
    { scope: trackRef }
  )

  return (
    <div ref={trackRef} className="relative h-[210vh] bg-navy-600">
      <span id="nosotros" className="absolute top-[calc(100%-100vh)] left-0 size-px" />

      <div
        ref={panelRef}
        className="sticky top-0 flex h-screen translate-x-full items-center overflow-hidden bg-ink-50 will-change-transform"
      >
        <Image
          src="/assets/mark-visione-navy.png"
          alt=""
          width={381}
          height={520}
          aria-hidden="true"
          className="pointer-events-none absolute right-[-70px] bottom-[-120px] h-[min(70vh,520px)] w-auto opacity-[0.06]"
        />

        <div className="relative mx-auto w-full max-w-content px-6">
          <Eyebrow className="mb-5 text-amber-600">Nuestra razón de ser</Eyebrow>

          <Heading size="display" className="mb-7 max-w-[20ch] text-ink-900">
            Estudiar no debería ser un privilegio
          </Heading>

          <Rule className="mb-7" />

          <p className="mb-8 max-w-[58ch] text-[clamp(17px,1.5vw,21px)] leading-relaxed text-ink-700">
            Formamos a jóvenes y adultos con programas técnicos laborales
            pertinentes para el sector productivo. Eliminamos las cuatro
            barreras que dejan a la gente fuera del aula.
          </p>

          <ButtonLink
            href="#programas"
            variant="secondary"
            size="lg"
            iconRight={<ArrowRight size={BUTTON_ICON_SIZES.lg} aria-hidden="true" />}
          >
            Conoce la Fundación
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
