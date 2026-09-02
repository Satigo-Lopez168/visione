/**
 * Eyebrow en versalitas sobre cada título de sección — docs/Design System.md §3.
 * Es el único texto en mayúsculas del sistema, junto con los badges.
 */
export function Eyebrow({ className = "", ...rest }: React.ComponentProps<"p">) {
  return (
    <p
      className={`text-xs font-bold tracking-[0.18em] uppercase ${className}`}
      {...rest}
    />
  )
}
