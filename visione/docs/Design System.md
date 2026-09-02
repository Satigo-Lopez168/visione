# Visione Design System — cómo se aplica en este prototipo

Documento de referencia del sistema de diseño usado en las cinco páginas del sitio.
El sistema completo vive en `_ds/visione-design-system-8a25daaf-7cfb-4b06-8160-b88ae2c16f00/`;
aquí se documenta qué se usa, con qué valores y bajo qué reglas.

Para la estructura de páginas y el comportamiento del prototipo, ver `Documentacion.md`.

---

## 1. Cómo se carga

Cada página `.dc.html` carga el bundle en `<helmet>`, en este orden:

```
tokens/fonts.css → colors → typography → spacing → elevation → motion → semantic → base
components/components.css → styles.css → _ds_bundle.js
```

Los componentes se montan desde el espacio global, sin clase de lógica:

```html
<x-import component-from-global-scope="VisioneDesignSystem_8a25da.Button"
          variant="accent" size="lg" href="Programas.dc.html"
          icon-right="arrow-right" hint-size="auto,48px">Ver programas</x-import>
```

Los estilos propios del prototipo son **inline** y siempre en `var(--*)`.
No hay hojas de estilo con clases; el único `<style>` es el reset de `body` y `a`.

---

## 2. Color

Cinco valores fijos de marca. Todo lo demás son tintes de esos cinco.

| Token | Valor | Rol en el prototipo |
| --- | --- | --- |
| `--navy-600` | `#292960` | Bandas oscuras: hero, portadas internas, banda del modelo educativo, calendario de cohortes |
| `--navy-700` | — | Footer de las cinco páginas |
| `--white` | `#FFFFFF` | Página por defecto; tarjetas flotantes del header |
| `--amber-400` | `#FBB800` | Acento único |
| `--ink-700` | `#3E4C59` | Cuerpo de texto |
| `--ink-900` | `#1F2933` | Títulos sobre claro |
| `--ink-50` | — | Bandas alternas (barreras, acreditación, proceso de inscripción) |
| `--ink-200` | — | Filetes de 1px entre filas de listas |

**Regla del ámbar.** Nunca como fondo grande, con una sola excepción deliberada por
página: la banda de CTA de cierre. Sus usos permitidos aquí son:

- eyebrow en versalitas sobre cada título de sección
- regla de 4px bajo los títulos (`width:56px;height:4px`)
- borde superior de 4px en tarjetas destacadas y en el paso 01
- botón circular de menú del header
- cifras destacadas sobre navy

**Proporción real:** ~70 % blanco, ~20 % navy, ~6 % neutros ink, ~4 % ámbar.

---

## 3. Tipografía

| Familia | Token | Uso |
| --- | --- | --- |
| Barlow Condensed | `--font-display` | h1–h4, cifras, títulos de programa |
| Barlow Semi Condensed | `--font-ui` / `--font-body` | Cuerpo, nav, botones, etiquetas, meta |

**Escalas fluidas.** Como el sitio va de 360px a 1440px, los títulos no usan el token
fijo sino `clamp()` sobre el mismo rango del sistema:

| Elemento | Valor |
| --- | --- |
| h1 del home | `clamp(52px, 9vw, 132px)` con `line-height:0.96` |
| h1 de páginas internas | `clamp(44px, 6.4vw, 96px)` con `line-height:0.98` |
| h2 de sección | `clamp(30px, 3.6vw, 49px)` |
| h2 grande (Nosotros) | `clamp(40px, 6.2vw, 92px)` |
| Bajada / intro | `clamp(17px, 1.5vw, 21px)` |

**Eyebrow.** Siempre `--text-2xs`, peso 700, `letter-spacing: var(--tracking-eyebrow)`,
mayúsculas, color `--amber-600` sobre claro y `--amber-400` sobre navy.

**Sentence case** en todo: títulos, botones, nav. Solo eyebrows y badges van en
mayúsculas.

---

## 4. Espaciado y contenedores

- Contenedor de contenido: `max-width:1180px` con `padding:0 24px`.
- Contenedor del header: `min(1360px, max(75%, min(100% - 24px, 640px)))` — el header
  ocupa el 75 % del ancho, con tope de 1360px y piso de 640px.
- Ritmo vertical: 88–96px entre secciones; 72px en las bandas de CTA.
- Portadas internas: `padding: clamp(168px, 20vh, 220px) 0 72px` para dejar aire bajo
  el header flotante.
- Padding de tarjeta: 24–28px. Gap de rejilla: 24px.

**Rejillas.** Todas son `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` para que se
reacomoden solas sin media queries:

| Contenido | mínimo |
| --- | --- |
| Tarjetas de programa | 290px |
| Cifras de portada | 210px |
| Pasos de admisión | 230px |
| Columnas de footer | 240px |
| Bloques de texto a dos columnas | 320–360px |

---

## 5. Componentes del sistema en uso

| Componente | Dónde |
| --- | --- |
| `Button` | CTAs de todas las páginas — variantes `primary`, `accent`, `secondary`, `inverse-outline`, `ghost` |
| `IconButton` | Redes sociales del footer |
| `Icon` | Lucide vía `currentColor`; ver nota de tamaños abajo |
| `ProgramCard` | Los diez programas en `/programas` |
| `Accordion` | Preguntas frecuentes del home |
| `Alert` | Aviso de requisitos en el home (`tone="info"`) |
| `Input` · `Select` · `Textarea` · `Checkbox` | Formulario de `/contacto` |

**Tamaños de icono.** El prop `size` es numérico, así que no puede escribirse como
literal en el template: se expone desde `renderVals()` (`s14`, `s16`, `s20`, `s22`,
`s32`) y se pasa como `size="{{ s16 }}"`. Escala usada: 14px en enlaces de texto,
16px en meta y footer, 20px en filas de lista, 22px en el botón de menú.

**Nombres de icono.** Se usa `circle-check`, no `check-circle-2` — ese id no existe en
la versión de Lucide que carga el bundle.

---

## 6. Bordes, sombras y radios

- Radios: `--radius-sm`/`--radius-md` en general; `--radius-xl` en las tarjetas del
  header; `--radius-pill` solo en chips y botones circulares.
- Filetes: 1px `--ink-200`; sobre navy, `--white-a24`.
- Barra de 4px = acento (regla bajo título, borde superior de tarjeta, borde del
  mega-menú y del panel móvil).
- Sombras teñidas de navy: `--shadow-md` en las tarjetas del header, `--shadow-lg` en
  paneles flotantes (mega-menú, menú móvil).

---

## 7. Marca

| Archivo | Uso |
| --- | --- |
| `assets/logo-visione-navy.png` | Lockup del header, sobre tarjeta blanca (38px de alto) |
| `assets/logo-visione-white.webp` | Lockup del footer, sobre navy (52px) |
| `assets/mark-visione.png` | V blanca: círculo navy del botón "Inscríbete" y ornamento al 7 % de opacidad en portadas |
| `assets/mark-visione-navy.png` | V navy: ornamento al 6 % en el panel de Nosotros |

El ornamento es el único permitido por el sistema: la V grande, recortada en una
esquina, a baja opacidad. No hay gradientes decorativos, patrones ni texturas.

---

## 8. Desviaciones respecto al sistema

Tres decisiones se apartan de lo que describe la guía, todas por pedido explícito:

1. **Header flotante en tarjetas.** La guía describe un header sticky navy de ancho
   completo que colapsa de 88px a 64px. Aquí es una tarjeta blanca al 75 % del ancho
   flotando sobre el hero, más una segunda tarjeta independiente para "Inscríbete"
   — patrón tomado de la referencia de mindmarket.com.
2. **Animación de scroll.** El avión de papel del hero y la entrada lateral de
   "Nosotros" son movimiento continuo ligado al scroll, algo que la guía no
   contempla (pide reveals de 12px, una sola vez). Se mantuvieron las duraciones y
   curvas del sistema en el resto de transiciones.
3. **Botón flotante de WhatsApp** en `/contacto`: la guía dice que nada se fija salvo
   el header y el sidebar del portal.

Todo lo demás — color, tipografía, espaciado, iconografía, radios, sombras, tono de
copy — sigue el sistema sin excepciones.

---

## 9. Pendientes de marca

Heredados de los caveats del propio design system:

- **Sin fotografía.** Todos los espacios de imagen son bloques `--ink-100` etiquetados.
- **Iconos sustituidos.** Lucide vía CDN; si Visione tiene librería propia, se cambia.
- **Fuentes desde Google Fonts.** Para autohospedar, poner los `.woff2` en
  `assets/fonts/` y cambiar el `@import` de `tokens/fonts.css` por `@font-face`.
