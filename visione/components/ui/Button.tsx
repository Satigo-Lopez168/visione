type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "ghost"
  | "inverse"
  | "inverse-outline"

type ButtonSize = "sm" | "md" | "lg"

const BASE_CLASS_NAME =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border font-ui font-semibold tracking-wide whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-standard focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--amber-a24),0_0_0_1px_var(--navy-600)] disabled:pointer-events-none disabled:border-transparent disabled:bg-ink-100 disabled:text-ink-400 disabled:shadow-none"

// Cada variante trae su propio color de borde. Ponerlo en BASE y sobrescribirlo
// aquí no sirve: Tailwind ordena las utilidades de `border-color` entre sí, no
// por el orden en que se escriben en el `className`.
const VARIANT_CLASS_NAMES = {
  primary:
    "border-transparent bg-navy-600 text-white hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-md active:scale-[0.985] active:bg-navy-800",
  accent:
    "border-transparent bg-amber-400 text-navy-700 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-md active:scale-[0.985] active:bg-amber-600",
  secondary:
    "border-navy-600 text-navy-600 hover:bg-navy-50 active:scale-[0.985] active:bg-navy-100",
  ghost: "border-transparent text-ink-700 hover:bg-ink-50 hover:text-ink-900",
  inverse:
    "border-transparent bg-white text-navy-600 hover:-translate-y-0.5 hover:bg-navy-50",
  "inverse-outline":
    "border-white-a24 text-white hover:border-white hover:bg-white-a12",
} as const satisfies Record<ButtonVariant, string>

const SIZE_CLASS_NAMES = {
  sm: "px-[14px] py-[7px] text-xs",
  md: "px-5 py-[10px] text-sm",
  lg: "px-7 py-[14px] text-md",
} as const satisfies Record<ButtonSize, string>

/** Tamaño en píxeles del glifo que acompaña al texto, por talla de botón. */
export const BUTTON_ICON_SIZES = { sm: 14, md: 16, lg: 18 } as const

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isBlock?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

/**
 * Clases del botón sin el elemento, para las piezas que necesitan el mismo
 * aspecto sobre otra etiqueta.
 */
export function getButtonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = ""
) {
  return `${BASE_CLASS_NAME} ${VARIANT_CLASS_NAMES[variant]} ${SIZE_CLASS_NAMES[size]} ${className}`
}

interface ButtonProps extends ButtonStyleProps, React.ComponentProps<"button"> {}

export function Button({
  variant = "primary",
  size = "md",
  isBlock = false,
  iconLeft,
  iconRight,
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(
        variant,
        size,
        `${isBlock ? "w-full" : ""} ${className}`
      )}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

interface ButtonLinkProps extends ButtonStyleProps, React.ComponentProps<"a"> {}

/**
 * El mismo botón sobre un enlace. Es un `<a>` y no un `next/link` a propósito:
 * en el sitio todos los destinos son anclas de la propia página — las rutas
 * `Nosotros`, `Programas`, `Admisiones` y `Contacto` del prototipo aún no
 * existen aquí. Cuando se creen, esto pasa a `next/link`.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  isBlock = false,
  iconLeft,
  iconRight,
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={getButtonClassName(
        variant,
        size,
        `${isBlock ? "w-full" : ""} ${className}`
      )}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </a>
  )
}
