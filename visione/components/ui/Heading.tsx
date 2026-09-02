type HeadingLevel = 1 | 2 | 3

/**
 * Escalas fluidas de docs/Design System.md §3: los títulos no usan un tamaño
 * fijo sino clamp() sobre el rango de 360px a 1440px.
 */
const LEVEL_CLASS_NAMES = {
  1: "text-[clamp(44px,6.4vw,96px)] leading-[0.98]",
  2: "text-[clamp(30px,3.6vw,49px)] leading-[1.05]",
  3: "text-[clamp(22px,2.2vw,30px)] leading-[1.15]",
} as const satisfies Record<HeadingLevel, string>

interface HeadingProps extends React.ComponentProps<"h1"> {
  level?: HeadingLevel
}

export function Heading({
  level = 2,
  className = "",
  ...rest
}: HeadingProps) {
  const HeadingTag = `h${level}` as const

  return (
    <HeadingTag
      className={`font-semibold tracking-tight text-balance ${LEVEL_CLASS_NAMES[level]} ${className}`}
      {...rest}
    />
  )
}
