/** Ruta de reserva: la real se mide sobre el texto ya compuesto. */
const FALLBACK_PATH = "M 112 60 C 270 44, 350 126, 560 152 S 880 208, 1230 306"

interface FlightTrailProps {
  /** El `viewBox` se reescribe al tamaño real de la capa en cada medición. */
  svgRef: React.RefObject<SVGSVGElement | null>
  flightPathRef: React.RefObject<SVGPathElement | null>
  trailWideRef: React.RefObject<SVGPathElement | null>
  trailThinRef: React.RefObject<SVGPathElement | null>
}

/**
 * La estela del avión: la misma curva dibujada tres veces.
 *
 * - `flightPathRef` es invisible y solo aporta geometría — de ahí salen
 *   `getTotalLength()` y `getPointAtLength()` para colocar y orientar el avión.
 * - Las otras dos son el halo ancho y la línea fina que se ven.
 *
 * `pathLength={1}` normaliza la longitud a 1 sea cual sea su medida real, así
 * que con un único guion (`strokeDasharray={1}`) basta mover `strokeDashoffset`
 * de 1 a 0 para que la estela se pinte justo detrás del avión.
 *
 * Quien lo use debe darle un contenedor con tamaño: el SVG lo llena y, como
 * `preserveAspectRatio="none"` más un `viewBox` en píxeles hacen que una unidad
 * del SVG valga un píxel CSS, las coordenadas del path se pueden usar tal cual
 * para posicionar el avión.
 */
export function FlightTrail({
  svgRef,
  flightPathRef,
  trailWideRef,
  trailThinRef,
}: FlightTrailProps) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 520"
      preserveAspectRatio="none"
      className="absolute inset-0 block h-full w-full overflow-visible"
    >
      <path
        ref={flightPathRef}
        d={FALLBACK_PATH}
        fill="none"
        stroke="none"
        pathLength={1}
      />
      <path
        ref={trailWideRef}
        d={FALLBACK_PATH}
        fill="none"
        stroke="var(--white)"
        strokeOpacity={0.1}
        strokeWidth={14}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        // El `preserveAspectRatio="none"` deforma el SVG: sin esto, los 14px se
        // estirarían distinto en horizontal que en vertical.
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={trailThinRef}
        d={FALLBACK_PATH}
        fill="none"
        stroke="var(--white)"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
