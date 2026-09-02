# Visione — Documentación del prototipo

Prototipo del sitio público de **Fundación Visione**, Institución de Educación para el
Trabajo y el Desarrollo Humano (ETDH) en Sopó, Cundinamarca.

Referencia de estructura: mindmarket.com (header flotante, entrada lateral por scroll).
Contenido: fundacionvisione.com. Estilo: **Visione Design System**.

---

## Archivos

| Archivo | Ruta pública | Qué contiene |
| --- | --- | --- |
| `Visione Sitio Web.dc.html` | `/` | Home |
| `Nosotros.dc.html` | `/nosotros` | Quiénes somos, misión, visión, acreditación |
| `Programas.dc.html` | `/programas` | Los diez programas técnicos en detalle |
| `Admisiones.dc.html` | `/admisiones` | Requisitos, proceso, fechas, costos |
| `Contacto.dc.html` | `/contacto` | Formulario de solicitud de información |

Carpetas de apoyo: `assets/` (logo y marca, copiados del design system) y
`_ds/visione-design-system-…/` (tokens y componentes).

---

## Sistema de diseño aplicado

Las cinco páginas cargan el bundle del design system en `<helmet>` y componen con sus
componentes (`Button`, `IconButton`, `Icon`, `ProgramCard`, `Alert`, `Accordion`,
`Input`, `Select`, `Textarea`, `Checkbox`). No hay colores ni tipografías inventadas:
todo sale de `var(--*)`.

**Color.** Blanco como página por defecto, bandas alternas en `--ink-50`, una o dos
bandas navy `--navy-600` por página y ámbar `--amber-400` solo como acento (eyebrow,
regla de 4px bajo los títulos, botón de menú, CTA de cierre).

**Tipografía.** Barlow Condensed para títulos y cifras; Barlow Semi Condensed para
cuerpo e interfaz. Los títulos usan `clamp()` para escalar de móvil a escritorio.

**Idioma y tono.** Español neutro, tuteo, sentence case. Sin emoji.

---

## Header (las cinco páginas)

Patrón flotante inspirado en la referencia:

- Ocupa el **75 % del ancho** de la ventana, con tope de 1360px y mínimo de seguridad
  en pantallas angostas: `width: min(1360px, max(75%, min(100% - 24px, 640px)))`.
- Dos tarjetas blancas independientes con `--shadow-md`, sticky en `top: 0`, flotando
  sobre el hero navy (el hero tiene `margin-top: -100px`).
- Tarjeta principal: logo navy + nav (Nosotros · Programas · Admisiones · Contacto) +
  botón circular ámbar de menú. La página activa se marca con subrayado ámbar.
- Tarjeta secundaria: CTA **Inscríbete** con círculo navy y la V de la marca.
- **Bajo 980px** los enlaces y la tarjeta de inscripción se ocultan y todo pasa al
  panel del botón hamburguesa: navegación completa, los diez programas indentados
  (solo en el home) y el CTA navy de inscripción.

El corte se maneja en la lógica (`esEscritorio`, listener de `resize`), no con CSS
media queries, porque el sistema exige estilos inline.

---

## Home — `Visione Sitio Web.dc.html`

Orden de las secciones y qué resuelve cada una:

1. **Hero minimalista** — titular gigante centrado "Formación que transforma vidas",
   bajada de una línea y dos botones. Debajo, cuatro cifras (10 programas · 3 jornadas ·
   100 % virtual · licencia 2025).
2. **Franja de respaldo** — las tres resoluciones oficiales en una línea.
3. **Nosotros (entrada lateral)** — ver abajo.
4. **Las cuatro barreras** — económica, geográfica, de tiempo y de reconocimiento, en
   una línea de tiempo numerada.
5. **Programas (resumen)** — tres bloques (7 virtuales · 3 nuevos 2026 · 3 jornadas),
   los diez nombres como chips y el botón **Ver todos los programas**. El detalle vive
   en su propia página.
6. **Modelo educativo** — banda navy con cuatro rasgos del modelo.
7. **Admisiones** — los cuatro pasos, aviso de requisitos en actualización y botón
   **Ir a contacto**.
8. **Preguntas frecuentes** — acordeón de cinco preguntas.
9. **CTA ámbar** y **footer** navy de cuatro columnas.

### Animación 1 — avión de papel en el hero

Un avión de papel entra bajo el header por la izquierda y avanza a medida que se hace
scroll, dejando una estela de humo.

- La estela son tres `<path>` SVG superpuestos (ancho difuso, fino, y la guía) con
  `stroke-dasharray`/`dashoffset` animados por progreso de scroll.
- La posición y el ángulo del avión salen de `getPointAtLength()` sobre la guía.
- **La ruta no usa fracciones fijas del ancho.** Se recalcula midiendo los rectángulos
  reales del copy (líneas del `h1` vía `Range`, bajada, botones y cifras) y trazando el
  vuelo alrededor: planea por la franja libre entre el header y el titular, y solo
  desciende si hay margen real a la derecha; si no lo hay (teléfono), sale plano por el
  borde. Verificado sin cruces de 360 a 1440px.
- Todo corre en un único `requestAnimationFrame` que también recalcula al cambiar el
  alto de la capa.

### Animación 2 — entrada lateral de "Nosotros"

Una pista de `210vh` con fondo navy contiene un panel `position: sticky` de `100vh`.
Al llegar, el panel queda fijo y se desliza desde la derecha (`translateX` 100 %→0 %,
con easing cúbico) mientras se recorre la pista; al completarse, el scroll continúa
normal hacia las cuatro barreras. El ancla `#nosotros` apunta al final de la pista para
que el enlace deje el panel ya cubriendo la pantalla.

---

## Nosotros

Portada navy ("Estudiar no debería ser un privilegio" + Quiénes somos + cifras
ETDH/2025/2031/Sopó), **Misión** y **Visión** en dos columnas con regla superior ámbar
y navy, y **Acreditación y normatividad** en cuatro filas: licencia (Res. 005577 del
19/06/2025, vigencia indefinida), registro de programas (Res. 006674 del 13/08/2025,
5 años), representante legal y sede.

## Programas

Portada navy con breadcrumb y cifras, las **diez tarjetas** `ProgramCard` agrupadas por
resolución (siete de la Res. 006674, tres nuevas de la Res. 009408), bloque "qué
incluye cada programa" y CTA. Cada tarjeta es clicable y lleva a admisiones.

## Admisiones

Portada con cifras (4 pasos · 48 h · 3 cohortes · sin examen), **requisitos** en cinco
filas, **proceso** de cuatro pasos, **fechas** de las tres cohortes 2026 en banda navy y
**costos** ($2.500.000 / $5.400.000 / certificado incluido) con cuatro vías de
financiación.

## Contacto

Formulario de solicitud de información con validación en cliente:

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Nombre completo | texto | sí |
| Número de documento | texto | sí |
| Correo electrónico | email | sí |
| Celular / WhatsApp | tel | sí |
| Programa de interés | select (10 + "aún no lo decido") | sí |
| Jornada preferida | select | no |
| Cohorte | select | no |
| Municipio | select | no |
| ¿Qué quieres saber? | textarea | no |
| Autorización de datos | checkbox | sí |

Los errores solo aparecen tras el primer intento de envío y están redactados como
instrucción ("Ingresa un correo electrónico válido"). Al enviar, el formulario se
reemplaza por una confirmación personalizada con nombre, correo y programa, más un
enlace para enviar otra solicitud. **No hay backend**: el envío es simulado en estado.

Al lado, los canales alternos: correo `fundacion.visione@gmail.com`, sede y horario de
atención.

---

## Datos que faltan por validar

Contenido inventado como marcador de posición, a reemplazar antes de publicar:

- **Admisiones**: edad mínima de 16 años, lista de documentos, fechas de las tres
  cohortes 2026, descuento del 10 % por pago total, Beca Visione y convenio empresarial.
- **Contacto**: horario de atención.
- **Imágenes**: no se usó fotografía; el design system no incluye ninguna.
- Sí provienen de la fuente oficial: resoluciones, dirección, representante legal,
  nombres de los diez programas, duraciones y los precios ($2.500.000 y $5.400.000).

## Pendientes sugeridos

- Botón flotante de WhatsApp en Contacto (318 363 3793) — quedó sin implementar.
- Reducir la sección de Admisiones del home a un resumen con botón, como se hizo con
  Programas, para que no duplique la página.
- Conectar el formulario a un backend o servicio de correo.
- Reemplazar los bloques de imagen por fotografía documental real.
