type ButtonVariant = "primary" | "accent" | "inverse-outline"

const BASE_CLASS_NAME =
  "inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:pointer-events-none disabled:opacity-50"

const VARIANT_CLASS_NAMES = {
  primary: "bg-navy-600 text-white hover:bg-navy-600/90",
  accent: "bg-amber-400 text-ink-900 hover:bg-amber-400/90",
  "inverse-outline":
    "border-2 border-white text-white hover:bg-white hover:text-navy-600",
} as const satisfies Record<ButtonVariant, string>

/**
 * Clases del botón sin el elemento, para las piezas que necesitan el mismo
 * aspecto sobre otra etiqueta — por ejemplo un `next/link`.
 */
export function getButtonClassName(
  variant: ButtonVariant = "primary",
  className = ""
) {
  return `${BASE_CLASS_NAME} ${VARIANT_CLASS_NAMES[variant]} ${className}`
}

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(variant, className)}
      {...rest}
    />
  )
}
