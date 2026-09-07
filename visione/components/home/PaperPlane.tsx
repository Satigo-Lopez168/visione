/**
 * El avión de papel del hero. Es SVG y no una imagen porque la animación lo
 * rota sobre su propio centro y necesita seguir nítido a cualquier tamaño.
 */
export function PaperPlane() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="block h-full w-full drop-shadow-[0_8px_18px_rgba(15,20,40,0.45)]"
    >
      <path d="M6 44 L94 12 L58 88 L44 60 Z" fill="var(--white)" />
      <path
        d="M6 44 L44 60 L94 12"
        fill="none"
        stroke="var(--ink-900)"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <path d="M44 60 L58 88" fill="none" stroke="var(--ink-900)" strokeWidth={1.1} />
      <path
        d="M94 12 L38 76"
        fill="none"
        stroke="var(--ink-900)"
        strokeWidth={0.9}
        strokeOpacity={0.75}
      />
      <path d="M6 44 L94 12 L38 76 Z" fill="var(--white)" fillOpacity={0.9} />
      <path
        d="M6 44 L38 76"
        fill="none"
        stroke="var(--ink-900)"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    </svg>
  )
}
