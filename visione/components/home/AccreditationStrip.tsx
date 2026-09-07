import { CircleCheck } from "lucide-react"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { ACCREDITATIONS } from "@/lib/content"

export function AccreditationStrip() {
  return (
    <section className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-8 px-6 py-7">
        <Eyebrow className="text-ink-500">Respaldo oficial</Eyebrow>

        <div className="flex flex-wrap gap-7 font-ui text-sm text-ink-700">
          {ACCREDITATIONS.map((accreditation) => (
            <span key={accreditation} className="flex items-center gap-2">
              <CircleCheck size={16} aria-hidden="true" className="shrink-0" />
              {accreditation}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
