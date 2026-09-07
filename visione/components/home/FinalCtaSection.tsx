import { ArrowRight } from "lucide-react"
import { BUTTON_ICON_SIZES, ButtonLink } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"

export function FinalCtaSection() {
  return (
    <section id="contacto" className="bg-amber-400 py-20">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-12 px-6">
        <div className="max-w-[620px]">
          <Heading className="mb-3.5 font-extrabold text-navy-700">
            Inicia tu formación con Visione
          </Heading>

          <p className="text-lg leading-normal text-navy-700">
            Cuéntanos qué quieres estudiar y te acompañamos desde la primera
            pregunta hasta tu certificado.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href="mailto:fundacion.visione@gmail.com"
            size="lg"
            iconRight={<ArrowRight size={BUTTON_ICON_SIZES.lg} aria-hidden="true" />}
          >
            Contáctanos
          </ButtonLink>
          <ButtonLink href="#programas" variant="secondary" size="lg">
            Ver programas
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
