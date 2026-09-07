type IconButtonVariant = "plain" | "solid" | "outline" | "inverse"

type IconButtonSize = "sm" | "md" | "lg"

const BASE_CLASS_NAME =
  "inline-flex cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent text-ink-600 transition-[color,background-color,border-color,transform] duration-150 ease-standard hover:bg-ink-50 hover:text-ink-900 active:scale-[0.985] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--amber-a24),0_0_0_1px_var(--navy-600)]"

const VARIANT_CLASS_NAMES = {
  plain: "",
  solid: "bg-navy-600 text-white hover:bg-navy-700 hover:text-white",
  outline: "border-ink-200",
  inverse: "text-white hover:bg-white-a12 hover:text-white",
} as const satisfies Record<IconButtonVariant, string>

const SIZE_CLASS_NAMES = {
  sm: "size-[30px]",
  md: "size-[38px]",
  lg: "size-[46px]",
} as const satisfies Record<IconButtonSize, string>

/** Tamaño en píxeles del glifo, por talla de botón de icono. */
export const ICON_BUTTON_ICON_SIZES = { sm: 15, md: 18, lg: 22 } as const

interface IconButtonLinkProps extends React.ComponentProps<"a"> {
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

/**
 * Botón cuadrado de un solo icono sobre un enlace — hoy solo lo usan las redes
 * del pie. `label` es obligatorio: sin texto visible, el `aria-label` es la
 * única forma de saber a dónde lleva.
 */
export function IconButtonLink({
  label,
  variant = "plain",
  size = "md",
  className = "",
  children,
  ...rest
}: IconButtonLinkProps) {
  return (
    <a
      aria-label={label}
      className={`${BASE_CLASS_NAME} ${VARIANT_CLASS_NAMES[variant]} ${SIZE_CLASS_NAMES[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
