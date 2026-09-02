import { Eyebrow } from "@/components/ui/Eyebrow"
import { Heading } from "@/components/ui/Heading"

export default function Home() {
  return (
    <main className="flex flex-1 items-center bg-white px-6 py-24 text-ink-700">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <Eyebrow className="text-amber-400">Visione</Eyebrow>

        <Heading level={1} className="text-ink-900">
          Un lugar donde estudiar tiene sentido
        </Heading>

        <p className="max-w-[60ch] text-[clamp(17px,1.5vw,21px)]">
          Prototipo del sitio de Visione.
        </p>
      </div>
    </main>
  )
}
