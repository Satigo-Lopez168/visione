/**
 * Eyebrow en versalitas sobre cada título de sección — docs/Design System.md §3.
 * Es el único texto en mayúsculas del sistema, junto con los badges. El color
 * lo pone quien lo usa: ámbar sobre fondo claro, ámbar claro sobre navy.
 */
export function Eyebrow({ className = "", ...rest }: React.ComponentProps<"p">) {
  return (
    <p
      className={`font-ui text-2xs font-bold tracking-eyebrow uppercase ${className}`}
      {...rest}
    />
  )
}
