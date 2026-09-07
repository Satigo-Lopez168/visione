"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"
import { BUTTON_ICON_SIZES, ButtonLink } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"
import { Stat } from "@/components/ui/Stat"
import { FlightTrail } from "@/components/home/FlightTrail"
import { PaperPlane } from "@/components/home/PaperPlane"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Holgura entre el copy y la ruta, y radio de las curvas de descenso. */
const CLEARANCE = 30
const TURN_RADIUS = 30

/** Cuánta ruta separa al avión del punto que usa para calcular su ángulo. */
const HEADING_LOOKAHEAD = 0.035

const HERO_STATS = [
  { value: "10", label: "Programas técnicos con registro oficial" },
  { value: "3", label: "Jornadas: diurna, nocturna y fin de semana" },
  { value: "100%", label: "Modalidad a distancia con estrategia virtual" },
  { value: "2025", label: "Licencia de funcionamiento con vigencia indefinida" },
]

const STAT_PADDING_CLASS_NAMES = [
  "pt-7 pr-6 pb-8",
  "px-6 pt-7 pb-8",
  "px-6 pt-7 pb-8",
  "pt-7 pb-8 pl-6",
]

interface TextBox {
  top: number
  right: number
}

/** Rectángulos reales de los glifos de un elemento, relativos a la capa. */
function measureTextBoxes(
  element: Element | null,
  layerRect: DOMRect,
  boxes: TextBox[]
) {
  if (!element) return

  const range = document.createRange()
  range.selectNodeContents(element)

  for (const rect of Array.from(range.getClientRects())) {
    boxes.push({
      top: rect.top - layerRect.top,
      right: rect.right - layerRect.left,
    })
  }
}

/**
 * Traza la ruta del avión alrededor del copy ya compuesto: mide dónde termina
 * el texto y dibuja una curva que lo bordea sin cruzarlo. En pantallas
 * estrechas no queda margen a la derecha, así que planea por encima y sale por
 * el borde.
 */
function buildFlightPath(
  layer: HTMLElement,
  width: number,
  height: number,
  textElements: (Element | null)[],
  actionElements: Element[],
  statsElement: Element | null
) {
  const layerRect = layer.getBoundingClientRect()
  const boxes: TextBox[] = []

  for (const element of textElements) {
    measureTextBoxes(element, layerRect, boxes)
  }

  for (const element of actionElements) {
    const rect = element.getBoundingClientRect()
    boxes.push({
      top: rect.top - layerRect.top,
      right: rect.right - layerRect.left,
    })
  }

  let copyTop = 190
  let copyRight = width * 0.72

  if (boxes.length) {
    copyTop = Math.min(...boxes.map((box) => box.top))
    copyRight = Math.max(...boxes.map((box) => box.right))
  }

  const statsTop = statsElement
    ? statsElement.getBoundingClientRect().top - layerRect.top
    : height

  const cruiseY = Math.max(
    TURN_RADIUS + 78,
    Math.min(copyTop - CLEARANCE - TURN_RADIUS, 168)
  )
  const freeRight = width - copyRight

  if (freeRight >= 2 * TURN_RADIUS + 40) {
    const descentX = Math.max(
      copyRight + TURN_RADIUS + 24,
      Math.min(
        copyRight + freeRight * 0.55 + TURN_RADIUS,
        width - TURN_RADIUS * 0.4
      )
    )
    const descentEndY = Math.max(
      cruiseY + 200,
      Math.min(height * 0.86, statsTop - TURN_RADIUS - 24)
    )

    return (
      `M ${width * 0.05} ${cruiseY}` +
      ` C ${width * 0.22} ${cruiseY - 26}, ${width * 0.34} ${cruiseY + 20}, ${width * 0.52} ${cruiseY + 10}` +
      ` C ${descentX - width * 0.1} ${cruiseY}, ${descentX - TURN_RADIUS * 0.6} ${cruiseY + 34}, ${descentX} ${cruiseY + 108}` +
      ` C ${descentX + 26} ${cruiseY + 200}, ${descentX + 30} ${descentEndY - 90}, ${descentX + 40} ${descentEndY}`
    )
  }

  const exitY = cruiseY + 130

  return (
    `M ${width * 0.06} ${cruiseY}` +
    ` C ${width * 0.26} ${cruiseY - 24}, ${width * 0.4} ${cruiseY + 22}, ${width * 0.58} ${cruiseY + 12}` +
    ` C ${width * 0.8} ${cruiseY}, ${width + TURN_RADIUS * 1.3} ${cruiseY}, ${width + TURN_RADIUS * 2.6} ${exitY}`
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const flightLayerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const flightPathRef = useRef<SVGPathElement>(null)
  const trailWideRef = useRef<SVGPathElement>(null)
  const trailThinRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const layer = flightLayerRef.current
      const flightPath = flightPathRef.current
      const plane = planeRef.current
      if (!layer || !flightPath || !plane) return

      let pathWidth = 0
      let pathHeight = 0

      const syncPath = () => {
        const width = layer.offsetWidth
        const height = layer.offsetHeight
        if (!height || (width === pathWidth && height === pathHeight)) return

        pathWidth = width
        pathHeight = height

        const pathData = buildFlightPath(
          layer,
          width,
          height,
          [titleRef.current, subtitleRef.current],
          Array.from(actionsRef.current?.children ?? []),
          statsRef.current
        )

        svgRef.current?.setAttribute("viewBox", `0 0 ${width} ${height}`)
        for (const path of [flightPath, trailWideRef.current, trailThinRef.current]) {
          path?.setAttribute("d", pathData)
        }
      }

      const renderFlight = (progress: number) => {
        syncPath()

        const totalLength = flightPath.getTotalLength()
        if (!totalLength) return

        const distance = Math.min(totalLength * progress, totalLength - 0.001)
        const point = flightPath.getPointAtLength(distance)
        const aheadPoint = flightPath.getPointAtLength(
          Math.min(distance + totalLength * HEADING_LOOKAHEAD, totalLength)
        )
        const heading =
          (Math.atan2(aheadPoint.y - point.y, aheadPoint.x - point.x) * 180) /
          Math.PI

        gsap.set(plane, {
          x: point.x,
          y: point.y,
          rotation: heading,
          opacity: 1,
        })

        const dashOffset = String(1 - progress)
        trailWideRef.current?.setAttribute("stroke-dashoffset", dashOffset)
        trailThinRef.current?.setAttribute("stroke-dashoffset", dashOffset)
      }

      const scrollTrigger = ScrollTrigger.create({
        trigger: layer,
        start: "top top",
        end: () => `+=${Math.max(layer.offsetHeight - 120, 1)}`,
        onUpdate: (self) => renderFlight(self.progress),
        onRefreshInit: () => {
          pathWidth = 0
          pathHeight = 0
        },
        onRefresh: (self) => renderFlight(self.progress),
      })

      renderFlight(scrollTrigger.progress)

      // Las webfonts condensadas recomponen el copy al cargar y la ruta se mide
      // sobre él: sin este refresco el avión vuela sobre la caja equivocada.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative -mt-25 overflow-hidden bg-navy-600 text-white"
    >
      <Image
        src="/assets/mark-visione.png"
        alt=""
        width={410}
        height={560}
        aria-hidden="true"
        className="pointer-events-none absolute top-[-60px] right-[-90px] h-[560px] w-auto opacity-[0.07]"
      />

      <div
        ref={flightLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <FlightTrail
          svgRef={svgRef}
          flightPathRef={flightPathRef}
          trailWideRef={trailWideRef}
          trailThinRef={trailThinRef}
        />

        <div
          ref={planeRef}
          // Los márgenes negativos son la mitad del tamaño: centran el avión
          // sobre el punto de la ruta, que es también su eje de giro.
          className="absolute top-0 left-0 -mt-[40px] -ml-[40px] size-[80px] opacity-0"
        >
          <PaperPlane />
        </div>
      </div>

      <div className="relative z-[2] mx-auto block max-w-content px-6 pt-[clamp(212px,22vh,262px)]">
        <Heading
          ref={titleRef}
          level={1}
          size="hero"
          className="text-center text-white"
        >
          Formación que transforma vidas
        </Heading>

        <p
          ref={subtitleRef}
          className="mt-7 text-center font-ui text-[clamp(17px,1.8vw,24px)] font-medium text-navy-100"
        >
          Una fundación educativa en Sopó
        </p>

        <div ref={actionsRef} className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href="#programas"
            variant="accent"
            size="lg"
            iconRight={<ArrowRight size={BUTTON_ICON_SIZES.lg} aria-hidden="true" />}
          >
            Ver programas
          </ButtonLink>
          <ButtonLink href="#admisiones" variant="inverse-outline" size="lg">
            Cómo inscribirme
          </ButtonLink>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-content px-6">
        <div
          ref={statsRef}
          className="mt-18 flex flex-wrap gap-px border-t border-white-a24"
        >
          {HERO_STATS.map((stat, index) => (
            <Stat
              key={stat.value}
              value={stat.value}
              label={stat.label}
              tone="accent"
              className={`min-w-[210px] flex-1 ${STAT_PADDING_CLASS_NAMES[index]}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
