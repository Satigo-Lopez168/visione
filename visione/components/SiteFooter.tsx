import Image from "next/image"
import { Mail, MapPin } from "lucide-react"
import { BrandIcon } from "@/components/ui/BrandIcon"
import { Eyebrow } from "@/components/ui/Eyebrow"
import {
  ICON_BUTTON_ICON_SIZES,
  IconButtonLink,
} from "@/components/ui/IconButton"
import { ACCREDITATIONS, NAV_LINKS } from "@/lib/content"

const LEGAL_LINES = [
  ...ACCREDITATIONS.map((accreditation) =>
    accreditation.replace(" · ", ": ")
  ),
  "Representante legal: María Camila Robles",
]

const SOCIAL_LINKS = [
  { name: "facebook", label: "Visione en Facebook" },
  { name: "instagram", label: "Visione en Instagram" },
  { name: "linkedin", label: "Visione en LinkedIn" },
] as const

const FOOTER_LINK_CLASS_NAME =
  "text-navy-100 transition-colors duration-150 ease-standard hover:text-amber-400"

export function SiteFooter() {
  return (
    <footer className="bg-navy-700 pt-18 text-navy-100">
      <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-12 px-6 pb-14">
        <div>
          <Image
            src="/assets/logo-visione-white.webp"
            alt="Visione — Fundación Educativa"
            width={157}
            height={52}
            className="mb-5 block h-[52px] w-auto"
          />
          <p className="max-w-[34ch] text-sm leading-relaxed text-navy-200">
            Institución de Educación para el Trabajo y el Desarrollo Humano, de
            naturaleza privada, en Sopó, Cundinamarca.
          </p>
        </div>

        <div>
          <Eyebrow className="mb-4.5 text-amber-400">Navegación</Eyebrow>
          <div className="flex flex-col gap-2.5 font-ui text-sm">
            <a href="#inicio" className={FOOTER_LINK_CLASS_NAME}>
              Inicio
            </a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={FOOTER_LINK_CLASS_NAME}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow className="mb-4.5 text-amber-400">Legal</Eyebrow>
          <div className="flex flex-col gap-2.5 font-ui text-sm text-navy-200">
            {LEGAL_LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>

        <div>
          <Eyebrow className="mb-4.5 text-amber-400">Hablemos</Eyebrow>
          <div className="flex flex-col gap-3 font-ui text-sm text-navy-100">
            <span className="flex items-start gap-2.5">
              <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
              Carrera 3 No. 2-41, Barrio Centro, Sopó — Cundinamarca
            </span>
            <a
              href="mailto:fundacion.visione@gmail.com"
              className={`flex items-center gap-2.5 ${FOOTER_LINK_CLASS_NAME}`}
            >
              <Mail size={16} aria-hidden="true" className="shrink-0" />
              fundacion.visione@gmail.com
            </a>
          </div>

          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map((social) => (
              <IconButtonLink
                key={social.name}
                href="#contacto"
                label={social.label}
                variant="inverse"
                size="sm"
              >
                <BrandIcon
                  name={social.name}
                  size={ICON_BUTTON_ICON_SIZES.sm}
                />
              </IconButtonLink>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-navy-500">
        <div className="mx-auto flex max-w-content flex-wrap justify-between gap-6 px-6 py-5 font-ui text-2xs text-navy-300">
          <span>© 2026 Fundación Visione. Todos los derechos reservados.</span>
          <span>Política de tratamiento de datos personales</span>
        </div>
      </div>
    </footer>
  )
}
