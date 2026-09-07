import { Accordion } from "@/components/ui/Accordion"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"
import { FAQ_ITEMS } from "@/lib/content"

export function FaqSection() {
  return (
    <section className="bg-ink-50 py-24">
      <div className="mx-auto max-w-narrow px-6">
        <div className="mb-10">
          <Eyebrow className="mb-4 text-amber-600">Preguntas frecuentes</Eyebrow>

          <Heading size="lg" className="font-extrabold text-ink-900">
            Lo que más nos preguntan las familias
          </Heading>
        </div>

        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}
