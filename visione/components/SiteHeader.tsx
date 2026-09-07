"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown, Menu } from "lucide-react"
import { ButtonLink } from "@/components/ui/Button"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { NAV_LINKS, PROGRAMS } from "@/lib/content"

const NAV_LINK_CLASS_NAME =
  "rounded-sm px-3 py-2 text-ink-900 transition-colors duration-150 ease-standard hover:text-amber-600"

const MENU_LINK_CLASS_NAME =
  "flex items-center justify-between rounded-sm px-2.5 py-3 text-ink-900 transition-colors duration-150 ease-standard hover:bg-ink-50 hover:text-navy-600"

const DROPDOWN_LINK_CLASS_NAME =
  "rounded-sm px-2.5 py-[7px] font-ui text-sm text-ink-800 transition-colors duration-150 ease-standard hover:bg-ink-50 hover:text-navy-600"

/**
 * Cabecera flotante: dos cápsulas blancas sobre el hero navy. La navegación de
 * escritorio aparece a partir de 980px (`nav:` — ver `--breakpoint-nav` en
 * globals.css); por debajo solo queda el botón de menú.
 */
export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)

  const handleMenuToggle = () => setIsMenuOpen((wasOpen) => !wasOpen)
  const handleMenuClose = () => setIsMenuOpen(false)
  const handleProgramsOpen = () => setIsProgramsOpen(true)
  const handleProgramsClose = () => setIsProgramsOpen(false)

  return (
    <header className="sticky top-0 z-[60] bg-transparent py-4">
      <div className="header-rail flex items-center gap-4">
        <div className="flex h-[68px] min-w-0 flex-1 items-center justify-between gap-6 rounded-xl bg-white pr-2.5 pl-7 shadow-md">
          <a href="#inicio" className="flex flex-none items-center">
            <Image
              src="/assets/logo-visione-navy.png"
              alt="Visione — Fundación Educativa"
              width={115}
              height={38}
              priority
              className="block h-[38px] w-auto"
            />
          </a>

          <nav className="flex items-center gap-2.5 font-ui text-md font-semibold">
            <a href="#nosotros" className={`hidden nav:block ${NAV_LINK_CLASS_NAME}`}>
              Nosotros
            </a>

            <div
              className="relative hidden nav:block"
              onMouseEnter={handleProgramsOpen}
              onMouseLeave={handleProgramsClose}
            >
              <a
                href="#programas"
                className={`flex items-center gap-[7px] ${NAV_LINK_CLASS_NAME}`}
              >
                Programas
                <ChevronDown size={16} aria-hidden="true" />
              </a>

              {isProgramsOpen ? (
                <div className="absolute top-full left-1/2 flex w-[720px] max-w-[calc(100vw-64px)] -translate-x-1/2 flex-col gap-3.5 rounded-md border-t-4 border-amber-400 bg-white p-7 shadow-lg">
                  <Eyebrow className="text-amber-600">
                    Diez programas técnicos laborales
                  </Eyebrow>

                  <div className="flex items-stretch gap-8">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      {PROGRAMS.slice(0, 5).map((program) => (
                        <a
                          key={program}
                          href="#programas"
                          className={DROPDOWN_LINK_CLASS_NAME}
                        >
                          {program}
                        </a>
                      ))}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      {PROGRAMS.slice(5).map((program) => (
                        <a
                          key={program}
                          href="#programas"
                          className={DROPDOWN_LINK_CLASS_NAME}
                        >
                          {program}
                        </a>
                      ))}
                    </div>

                    <div className="flex w-[220px] flex-none flex-col justify-between gap-4 rounded-sm bg-ink-50 p-5">
                      <p className="text-xs leading-normal text-ink-600">
                        Todos otorgan Certificado de Aptitud Ocupacional por
                        competencias laborales.
                      </p>
                      <ButtonLink
                        href="#programas"
                        size="sm"
                        iconRight={<ArrowRight size={14} aria-hidden="true" />}
                      >
                        Ver los diez programas
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <a href="#admisiones" className={`hidden nav:block ${NAV_LINK_CLASS_NAME}`}>
              Admisiones
            </a>
            <a href="#contacto" className={`hidden nav:block ${NAV_LINK_CLASS_NAME}`}>
              Contacto
            </a>

            <button
              type="button"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
              className="ml-1.5 flex size-12 cursor-pointer items-center justify-center rounded-pill bg-amber-400 text-navy-700 transition-colors duration-150 ease-standard hover:bg-amber-500"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </nav>
        </div>

        <a
          href="#admisiones"
          className="hidden h-[68px] flex-none items-center gap-4 rounded-xl bg-white pr-2.5 pl-7 font-ui text-md font-semibold text-ink-900 shadow-md transition-colors duration-150 ease-standard hover:text-navy-600 nav:flex"
        >
          Inscríbete
          <span className="flex size-12 items-center justify-center rounded-pill bg-navy-600">
            <Image
              src="/assets/mark-visione.png"
              alt=""
              width={16}
              height={22}
              className="block h-[22px] w-auto"
            />
          </span>
        </a>
      </div>

      {isMenuOpen ? (
        <div className="header-rail mt-3 max-h-[calc(100vh-140px)] overflow-y-auto rounded-xl border-t-4 border-amber-400 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-0.5 font-ui text-lg font-semibold">
            <a
              href="#nosotros"
              onClick={handleMenuClose}
              className={MENU_LINK_CLASS_NAME}
            >
              Nosotros
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href="#programas"
              onClick={handleMenuClose}
              className={MENU_LINK_CLASS_NAME}
            >
              Programas
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <div className="mt-0.5 mb-1.5 ml-2.5 flex flex-col gap-px border-l border-ink-200 pt-1.5 pb-2.5 pl-2.5">
              {PROGRAMS.map((program) => (
                <a
                  key={program}
                  href="#programas"
                  onClick={handleMenuClose}
                  className="rounded-sm px-2.5 py-2 text-sm font-medium text-ink-700 transition-colors duration-150 ease-standard hover:bg-ink-50 hover:text-navy-600"
                >
                  {program}
                </a>
              ))}
            </div>

            {NAV_LINKS.slice(2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMenuClose}
                className={MENU_LINK_CLASS_NAME}
              >
                {link.label}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>

          <a
            href="#admisiones"
            onClick={handleMenuClose}
            className="mt-[18px] flex h-[60px] items-center justify-between gap-4 rounded-lg bg-navy-600 pr-2 pl-6 font-ui text-md font-semibold text-white transition-colors duration-150 ease-standard hover:bg-navy-700"
          >
            Inscríbete
            <span className="flex size-11 items-center justify-center rounded-pill bg-amber-400 text-navy-700">
              <ArrowRight size={22} aria-hidden="true" />
            </span>
          </a>
        </div>
      ) : null}
    </header>
  )
}
