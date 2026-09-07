type StatTone = "brand" | "accent" | "inverse"

const VALUE_CLASS_NAMES = {
  brand: "text-navy-600",
  accent: "text-amber-400",
  inverse: "text-white",
} as const satisfies Record<StatTone, string>

const LABEL_CLASS_NAMES = {
  brand: "text-ink-500",
  accent: "text-navy-100",
  inverse: "text-white-a72",
} as const satisfies Record<StatTone, string>

interface StatProps extends React.ComponentProps<"div"> {
  value: React.ReactNode
  label: React.ReactNode
  tone?: StatTone
}

/** Cifra grande con su pie — la tira de datos del hero y de las secciones. */
export function Stat({
  value,
  label,
  tone = "brand",
  className = "",
  ...rest
}: StatProps) {
  return (
    <div className={className} {...rest}>
      <div
        className={`font-display text-[clamp(30px,3.6vw,49px)] leading-tight font-extrabold ${VALUE_CLASS_NAMES[tone]}`}
      >
        {value}
      </div>
      <div className={`mt-1.5 font-ui text-sm ${LABEL_CLASS_NAMES[tone]}`}>
        {label}
      </div>
    </div>
  )
}
