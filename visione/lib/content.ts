import type { AccordionItem } from "@/components/ui/Accordion"

/**
 * Copy del sitio. Vive aquí y no dentro de cada sección porque la lista de
 * programas aparece tres veces (menú de escritorio, menú móvil y sección de
 * oferta) y una copia desincronizada es un error silencioso.
 */
export const PROGRAMS = [
  "Sistemas Teleinformáticos",
  "Programación de Software",
  "Contabilidad y Finanzas",
  "Seguridad y Salud en el Trabajo",
  "Administración de Empresas y Transformación Digital",
  "Atención a la Primera Infancia",
  "Gestión de Servicios de Aseo Institucional",
  "Creación de Contenido Digital",
  "Aeronaves No Tripuladas",
  "Emprendimiento y Gestión de Proyectos",
] as const

/** Resoluciones que respaldan la licencia y los registros del programa. */
export const ACCREDITATIONS = [
  "Licencia · Resolución 005577 de 2025",
  "Registro · Resolución 006674 de 2025",
  "Registro · Resolución 009408 de 2025",
] as const

export const FAQ_ITEMS: AccordionItem[] = [
  {
    question: "¿Necesito ser bachiller para inscribirme?",
    answer:
      "Los programas técnicos laborales están dirigidos a jóvenes y adultos. Escríbenos con el programa que te interesa y te confirmamos los requisitos exactos de ingreso.",
  },
  {
    question: "¿Qué certificado recibo al terminar?",
    answer:
      "Un Certificado de Aptitud Ocupacional por competencias laborales, expedido bajo el registro oficial de la Secretaría de Educación de Cundinamarca.",
  },
  {
    question: "¿Cómo funciona la modalidad virtual?",
    answer:
      "La formación es a distancia con estrategia de educación virtual: contenidos digitales, encuentros con tu tutor y actividades evaluadas por competencias. Tres programas también tienen componente presencial en la sede de Sopó.",
  },
  {
    question: "¿Cuánto cuesta y puedo pagar por cuotas?",
    answer:
      "Los programas de dos semestres cuestan $2.500.000 en total y los de tres semestres $5.400.000. Acordamos contigo un plan de pago antes de formalizar la matrícula.",
  },
  {
    question: "¿Dónde queda la sede?",
    answer:
      "Carrera 3 No. 2-41, Barrio Centro, Sopó — Cundinamarca. Puedes agendar una visita para conocer las instalaciones.",
  },
]

/**
 * Destinos de la navegación. El prototipo apunta a `Nosotros.dc.html`,
 * `Programas.dc.html`, `Admisiones.dc.html` y `Contacto.dc.html`; aquí solo
 * existe la portada, así que cada uno cae en su ancla de esta misma página.
 */
export const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Programas", href: "#programas" },
  { label: "Admisiones", href: "#admisiones" },
  { label: "Contacto", href: "#contacto" },
] as const
