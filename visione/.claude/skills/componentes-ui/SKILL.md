---
name: componentes-ui
description: Reutiliza los componentes del design system (Button, Heading, Label, Input, etc.) en vez de escribir elementos HTML sueltos. Úsala al crear o modificar cualquier interfaz, al añadir un botón, campo o título, y al decidir si algo merece ser un componente nuevo.
---

# Componentes del design system

Los componentes reutilizables viven en `components/ui/`. Antes de escribir
cualquier JSX de interfaz, la regla es una sola:

> **Busca el componente antes de escribir la etiqueta.**

```bash
ls components/ui/
```

Si existe `Button.tsx`, no escribes `<button>`. Escribes `<Button>`.

## Regla 0: nunca un elemento suelto con estilos

El problema no es estético, es de mantenimiento: cada `<button>` con su propia
ristra de clases es una copia que hay que encontrar y actualizar cuando el
design system cambie.

```tsx
// ❌ estilos copiados a mano, imposibles de cambiar en un solo sitio
<button className="w-40 rounded-full border-2 border-white text-white hover:bg-red-400">
  click me
</button>

// ✅ una sola fuente de verdad
<Button variant="primary">click me</Button>
```

Lo mismo aplica a `<h1>`/`<h2>` (→ `Heading`), `<label>` (→ `Label`),
`<input>` (→ `Input`).

## Dónde viven y cómo se llaman

```
components/
  ui/              ← piezas del design system, sin lógica de negocio
    Button.tsx
    Heading.tsx
    Label.tsx
    Input.tsx
```

- **Un componente por archivo.** El archivo se llama igual que el componente.
- **`PascalCase`** en el nombre del archivo y del componente — es la excepción a
  la regla de camelCase (ver la skill `estilo-codigo`).
- **Export nombrado**, no `export default`: fuerza que todos lo importen con el
  mismo nombre y el autocompletado lo encuentra.

```tsx
// components/ui/Button.tsx
export function Button({ ... }: ButtonProps) { ... }
```

Se importan con el alias `@/` que ya está configurado en `tsconfig.json`:

```tsx
import { Button } from "@/components/ui/Button"
```

## Cómo se tipan las props

**Extiende siempre las props nativas del elemento.** Si no lo haces, el día que
necesites `disabled`, `type="submit"` o `aria-label` tendrás que ir a editar el
componente.

```tsx
// ❌ solo sirve para lo que imaginaste hoy
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

// ✅ hereda onClick, disabled, type, aria-*, todo
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary"
}

export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest} />
}
```

Tres cosas que hace ese ejemplo y conviene copiar siempre:

1. **`...rest` al final** — todo lo que no consumas se reenvía al elemento real.
2. **`className` al final de la cadena** — deja que quien lo usa pueda ajustar
   algo puntual (un margen) sin tener que tocar el componente.
3. **Un valor por defecto en la variante** — `<Button>` a secas debe funcionar.

### Variantes: usa uniones de strings, no booleanos

```tsx
// ❌ ¿qué pasa si alguien pone las dos? Estado imposible que compila
<Button isPrimary isDanger />

// ✅ mutuamente excluyentes por construcción
<Button variant="danger" />
```

Y las variantes se resuelven con un objeto, no con `if` encadenados:

```tsx
const VARIANTS = {
  primary: "...",
  secondary: "...",
} as const
```

## Cuándo crear un componente nuevo

Crea uno cuando se cumpla **cualquiera** de estas:

- El mismo bloque de JSX aparece **dos o más veces**.
- Tiene estado o lógica propia (un `useState`, una animación).
- Es una pieza del design system, aunque hoy se use una sola vez (`Input`,
  `Label`).

No lo crees si es un envoltorio de un solo uso sin estilos ni lógica: eso es
indirección sin beneficio.

## Reglas específicas de este proyecto

- **`"use client"` solo si hace falta.** Un componente lo necesita si usa hooks
  (`useState`, `useRef`, `useGSAP`) o APIs del navegador. Un `Button` que solo
  recibe `onClick` por props y lo reenvía **no** lo necesita: se importa sin
  problema desde un componente que sí es cliente.
- **Nada de colores a mano.** Los valores salen de los tokens del design system
  (ver abajo), nunca un `bg-purple-500` escrito directamente en la página.
- **Animaciones GSAP dentro del componente.** Si un componente se anima, su
  `useRef` y su `useGSAP` viven dentro de él, no en la página que lo usa. Ojo
  con la trampa del proyecto: un `ref` que no llega al elemento no da error, la
  animación simplemente no ocurre.
- **Accesibilidad mínima:** `Label` siempre con `htmlFor` apuntando al `id` del
  `Input`. Un campo sin label asociado no es utilizable con lector de pantalla.

## Tokens del design system

> ⏳ **Pendiente.** Esta sección se completa con el design system que vas a
> compartir: paleta (primary, secondary, estados), escala tipográfica,
> espaciado y radios de borde.
>
> Los tokens se declaran en el bloque `@theme inline` de `app/globals.css`
> (Tailwind v4 se configura en CSS, aquí **no hay `tailwind.config.js`**), y los
> componentes de `components/ui/` los consumen a través de las clases que
> Tailwind genera a partir de ellos.

## Checklist

Antes de dar por terminada una interfaz:

- [ ] Miré `components/ui/` antes de escribir cualquier etiqueta
- [ ] Ningún `<button>`, `<input>`, `<label>` o `<h1>` suelto con clases propias
- [ ] Los componentes nuevos extienden `React.ComponentProps<"...">`
- [ ] Las variantes son uniones de strings, no props booleanas
- [ ] `className` y `...rest` se reenvían
- [ ] Ningún color escrito a mano: todo sale de los tokens
