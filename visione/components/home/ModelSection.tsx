import { Clock, FileText, GraduationCap, User } from "lucide-react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"

const MODEL_FEATURES = [
  {
    icon: GraduationCap,
    title: "Por competencias",
    description: "Evaluamos lo que sabes hacer, no lo que memorizas.",
  },
  {
    icon: Clock,
    title: "Tres jornadas",
    description: "Diurna, nocturna y fin de semana en todos los programas.",
  },
  {
    icon: FileText,
    title: "Certificado oficial",
    description:
      "Aptitud Ocupacional con registro de la Secretaría de Educación.",
  },
  {
    icon: User,
    title: "Tutoría cercana",
    description: "Un tutor asignado que conoce tu nombre y tu avance.",
  },
]

export function ModelSection() {
  return (
    <section className="bg-navy-600 py-22 text-white">
      <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-[clamp(40px,5vw,72px)] px-6">
        <div>
          <Eyebrow className="mb-4 text-amber-400">
            Cómo se estudia en Visione
          </Eyebrow>

          <Heading size="lg" className="mb-5 font-extrabold text-white">
            Virtualidad que respeta tu vida
          </Heading>

          <p className="text-md leading-relaxed text-navy-100">
            Contenidos digitales, tutoría cercana y evaluación por competencias.
            La misma exigencia del aula, sin pedirte que dejes tu trabajo.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-px bg-white-a24">
          {MODEL_FEATURES.map((feature, index) => {
            const FeatureIcon = feature.icon
            const isLeftColumn = index % 2 === 0

            return (
              <div
                key={feature.title}
                className={`bg-navy-600 py-7 ${isLeftColumn ? "pr-7" : "px-7"}`}
              >
                <FeatureIcon size={22} aria-hidden="true" className="text-amber-400" />

                <Heading level={4} className="mt-3.5 mb-2 text-white">
                  {feature.title}
                </Heading>

                <p className="text-sm leading-normal text-navy-100">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
