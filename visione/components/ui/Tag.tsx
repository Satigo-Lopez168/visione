/**
 * Píldora de la lista de programas. Es un enlace: cada una lleva al programa
 * correspondiente dentro de la sección de oferta académica.
 */
export function Tag({ className = "", ...rest }: React.ComponentProps<"a">) {
  return (
    <a
      className={`inline-flex items-center gap-2 rounded-pill border border-ink-200 bg-ink-50 px-4 py-2 font-ui text-sm font-medium text-ink-800 transition-[color,background-color,border-color] duration-150 ease-standard hover:border-navy-600 hover:bg-navy-600 hover:text-white ${className}`}
      {...rest}
    />
  )
}
