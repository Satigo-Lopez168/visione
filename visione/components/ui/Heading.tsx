type HeadingLevel = 1 | 2 | 3 | 4

type HeadingSize = "hero" | "display" | "xl" | "lg" | "md" | "sm"

/**
 * Escalas fluidas de docs/Design System.md §3: los títulos no usan un tamaño
 * fijo sino clamp() sobre el rango de 360px a 1440px. `level` elige la etiqueta
 * y `size` el tamaño, porque el prototipo usa varias escalas para el mismo
 * nivel semántico (el h2 del hero de "Nosotros" es mucho mayor que el resto).
 */
const SIZE_CLASS_NAMES = {
  hero: "text-[clamp(52px,9vw,132px)] leading-[0.96]",
  display: "text-[clamp(40px,6.2vw,92px)] leading-[0.98]",
  xl: "text-[clamp(34px,4.4vw,61px)] leading-heading",
  lg: "text-[clamp(30px,3.6vw,49px)] leading-heading",
  md: "text-2xl leading-heading",
  sm: "text-xl leading-heading",
} as const satisfies Record<HeadingSize, string>

const DEFAULT_SIZES = {
  1: "hero",
  2: "xl",
  3: "md",
  4: "sm",
} as const satisfies Record<HeadingLevel, HeadingSize>

interface HeadingProps extends React.ComponentProps<"h2"> {
  level?: HeadingLevel
  size?: HeadingSize
}

export function Heading({
  level = 2,
  size,
  className = "",
  ...rest
}: HeadingProps) {
  const HeadingTag = `h${level}` as const

  return (
    <HeadingTag
      className={`font-display font-bold tracking-tight text-balance ${SIZE_CLASS_NAMES[size ?? DEFAULT_SIZES[level]]} ${className}`}
      {...rest}
    />
  )
}
