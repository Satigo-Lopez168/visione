import { Info } from "lucide-react"
import { Alert } from "@/components/ui/Alert"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"
import { Rule } from "@/components/ui/Rule"

const ADMISSION_STEPS = [
  {
    title: "Elige tu programa",
    description:
      "Revisa duración, jornada, modalidad y costo total de los diez programas.",
  },
  {
    title: "Solicita información",
    description:
      "Déjanos tus datos y un asesor te contacta para resolver dudas de horario y pago.",
  },
  {
    title: "Entrega tus documentos",
    description:
      "Documento de identidad y los soportes que exige el programa que elegiste.",
  },
  {
    title: "Formaliza tu matrícula",
    description:
      "Acuerda tu plan de pago, recibe tus accesos y empieza en la siguiente cohorte.",
  },
]

export function AdmissionsSection() {
  return (
    <section id="admisiones" className="bg-white py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="mb-14 max-w-[640px]">
          <Eyebrow className="mb-4 text-amber-600">Admisiones</Eyebrow>

          <Heading className="mb-5 font-extrabold text-ink-900">
            Inscribirte toma cuatro pasos
          </Heading>

          <Rule />
        </div>

        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-6">
          {ADMISSION_STEPS.map((step, index) => (
            <div
              key={step.title}
              className={`border-t-4 pt-5 ${index === 0 ? "border-amber-400" : "border-ink-200"}`}
            >
              <div className="mb-2.5 font-ui text-2xs font-bold tracking-caps text-ink-400">
                PASO {String(index + 1).padStart(2, "0")}
              </div>

              <Heading level={4} size="md" className="mb-2.5 text-ink-900">
                {step.title}
              </Heading>

              <p className="text-sm leading-relaxed text-ink-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <Alert
          tone="info"
          title="Requisitos y fechas en actualización"
          icon={<Info size={18} aria-hidden="true" />}
        >
          Los requisitos exactos, las fechas de cohorte y las opciones de
          financiación se publicarán aquí. Mientras tanto, escríbenos y te
          enviamos la información de tu programa.
        </Alert>
      </div>
    </section>
  )
}
