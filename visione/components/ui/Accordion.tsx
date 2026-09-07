"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps extends React.ComponentProps<"div"> {
  items: AccordionItem[]
  defaultOpenIndex?: number
}

/**
 * Acordeón de preguntas frecuentes: solo una abierta a la vez, y volver a
 * pulsar la abierta la cierra. El signo `+` gira 45° para convertirse en `×`.
 */
export function Accordion({
  items,
  defaultOpenIndex = 0,
  className = "",
  ...rest
}: AccordionProps) {
  const [openItemIndex, setOpenItemIndex] = useState(defaultOpenIndex)

  const handleToggle = (index: number) =>
    setOpenItemIndex(openItemIndex === index ? -1 : index)

  return (
    <div className={`border-t border-ink-200 ${className}`} {...rest}>
      {items.map((item, index) => {
        const isOpen = openItemIndex === index

        return (
          <div key={item.question} className="border-b border-ink-200">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => handleToggle(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-xl font-semibold text-ink-900 transition-colors duration-150 ease-standard hover:text-navy-600"
            >
              {item.question}
              <Plus
                size={20}
                aria-hidden="true"
                className={`shrink-0 text-amber-500 transition-transform duration-200 ease-standard ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            {isOpen ? (
              <div className="max-w-[70ch] pb-5 font-body text-md text-ink-500">
                {item.answer}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
