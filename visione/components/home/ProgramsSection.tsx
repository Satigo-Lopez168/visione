import { ArrowRight } from "lucide-react"
import { BUTTON_ICON_SIZES, ButtonLink } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"
import { Rule } from "@/components/ui/Rule"
import { Tag } from "@/components/ui/Tag"
import { PROGRAMS } from "@/lib/content"

interface ProgramHighlight {
  figure: string
  title: string
  description: string
  actionLabel: string
  actionHref: string
  isAccented: boolean
}

const PROGRAM_HIGHLIGHTS: ProgramHighlight[] = [
  {
    figure: "07",
    title: "Programas virtuales",
    description:
      "Dos semestres, 600 a 1.200 horas, $2.500.000 en total. Sistemas, software, contabilidad, seguridad y salud, administración, primera infancia y aseo institucional.",
    actionLabel: "Ver los siete",
    actionHref: "#programas",
    isAccented: true,
  },
  {
    figure: "03",
    title: "Programas nuevos 2026",
    description:
      "Tres semestres, 960 horas, modalidad presencial y a distancia. Contenido digital, aeronaves no tripuladas y emprendimiento empresarial.",
    actionLabel: "Ver los tres",
    actionHref: "#programas",
    isAccented: true,
  },
  {
    figure: "03",
    title: "Jornadas para elegir",
    description:
      "Diurna, nocturna y fin de semana en todos los programas, con tutoría asignada y evaluación por competencias.",
    actionLabel: "Cómo inscribirme",
    actionHref: "#admisiones",
    isAccented: false,
  },
]

export function ProgramsSection() {
  return (
    <section id="programas" className="bg-white py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-[640px]">
            <Eyebrow className="mb-4 text-amber-600">Oferta académica</Eyebrow>

            <Heading className="mb-5 font-extrabold text-ink-900">
              Diez programas técnicos laborales
            </Heading>

            <Rule className="mb-5" />

            <p className="text-md leading-relaxed text-ink-700">
              Todos con registro oficial de la Secretaría de Educación de
              Cundinamarca y Certificado de Aptitud Ocupacional por competencias
              laborales.
            </p>
          </div>

          <ButtonLink
            href="#programas"
            size="lg"
            iconRight={<ArrowRight size={BUTTON_ICON_SIZES.lg} aria-hidden="true" />}
          >
            Ver todos los programas
          </ButtonLink>
        </div>

        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {PROGRAM_HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.title}
              className={`border-t-4 pt-6 ${highlight.isAccented ? "border-amber-400" : "border-ink-200"}`}
            >
              <div className="mb-3.5 font-display text-4xl leading-tight font-extrabold text-navy-600">
                {highlight.figure}
              </div>

              <Heading level={3} className="mb-2.5 text-ink-900">
                {highlight.title}
              </Heading>

              <p className="mb-4 text-sm leading-relaxed text-ink-700">
                {highlight.description}
              </p>

              <a
                href={highlight.actionHref}
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy-600 transition-colors duration-150 ease-standard hover:text-amber-600"
              >
                {highlight.actionLabel}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-ink-200 pt-8">
          {PROGRAMS.map((program) => (
            <Tag key={program} href="#programas">
              {program}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  )
}
