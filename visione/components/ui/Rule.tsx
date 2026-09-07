/**
 * El adorno recurrente de la marca: una regla ámbar corta bajo el título de
 * sección. Mide 56×4 y no cambia de tamaño con la tipografía.
 */
export function Rule({ className = "", ...rest }: React.ComponentProps<"div">) {
  return <div className={`h-1 w-14 bg-amber-400 ${className}`} {...rest} />
}
