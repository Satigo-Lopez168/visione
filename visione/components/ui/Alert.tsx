type AlertTone = "neutral" | "info" | "success" | "warning" | "danger"

const TONE_CLASS_NAMES = {
  neutral: "border-l-navy-600 bg-ink-50",
  info: "border-l-info-500 bg-info-100",
  success: "border-l-success-500 bg-success-100",
  warning: "border-l-amber-400 bg-warning-100",
  danger: "border-l-danger-500 bg-danger-100",
} as const satisfies Record<AlertTone, string>

interface AlertProps extends Omit<React.ComponentProps<"div">, "title"> {
  tone?: AlertTone
  /** Se llama `title` y no `heading` para leerse igual que en el prototipo. */
  title?: React.ReactNode
  icon?: React.ReactNode
}

export function Alert({
  tone = "neutral",
  title,
  icon,
  className = "",
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      role="status"
      className={`flex gap-3 rounded-sm border-l-4 p-4 font-ui text-sm text-ink-700 ${TONE_CLASS_NAMES[tone]} ${className}`}
      {...rest}
    >
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="flex-1">
        {title ? (
          <div className="mb-0.5 font-bold text-ink-900">{title}</div>
        ) : null}
        <div>{children}</div>
      </div>
    </div>
  )
}
