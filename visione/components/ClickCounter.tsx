"use client"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/Button"

const CLICK_GOAL = 1000

gsap.registerPlugin(useGSAP)

export function ClickCounter() {
  const [clickCounter, setClickCounter] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const clickTextRef = useRef<HTMLParagraphElement>(null)
  const goalTextRef = useRef<HTMLParagraphElement>(null)
  const hasReachedClickGoal = clickCounter > CLICK_GOAL

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(clickTextRef.current, {
        scaleX: 2,
        duration: 0.05,
        ease: "elastic",
        yoyo: true,
        repeat: 1,
      })
    },
    { scope: containerRef, dependencies: [clickCounter] }
  )

  useGSAP(
    () => {
      if (!hasReachedClickGoal) return
      gsap.fromTo(
        goalTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }
      )
    },
    { scope: containerRef, dependencies: [hasReachedClickGoal] }
  )

  // El botón se anima a sí mismo: `currentTarget` evita tener que leer un ref
  // durante el render (regla react-hooks/refs).
  const handleClick = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setClickCounter((previousClickCounter) => previousClickCounter + 1)
      gsap.fromTo(
        event.currentTarget,
        { scale: 0.85 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.35)" }
      )
    }
  )

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center justify-center gap-16 rounded-2xl bg-navy-600 p-10"
    >
      <Button variant="inverse-outline" onClick={handleClick}>
        Click me
      </Button>

      <p ref={clickTextRef} className="text-white">
        Has hecho {clickCounter} clicks
      </p>

      {hasReachedClickGoal && (
        <p ref={goalTextRef} className="font-bold text-amber-400">
          ¡El contador es mayor a {CLICK_GOAL}!
        </p>
      )}
    </div>
  )
}
