---
name: estilo-codigo
description: Convenciones de nombres y formato para el código de este proyecto — camelCase, nombres descriptivos, prefijos para booleanos, handlers y refs. Úsala al escribir, renombrar o revisar cualquier archivo .ts/.tsx.
---

# Estilo de código

Reglas de nomenclatura y formato para este proyecto. Aplícalas al escribir
código nuevo y al tocar código existente.

Los ejemplos ❌ salen de versiones reales de `app/page.tsx`, no son inventados.

## 1. camelCase para variables y funciones

Primera palabra en minúscula, las siguientes con inicial mayúscula. Sin guiones
bajos, sin guiones medios.

```ts
// ❌
const click_counter = 0
const ClickCounter = 0
const clickcounter = 0

// ✅
const clickCounter = 0
const handleClick = () => {}
```

Excepciones — estos **no** van en camelCase:

| Qué | Convención | Ejemplo |
|---|---|---|
| Componentes de React | `PascalCase` | `Home`, `ClickCounter` |
| Constantes fijas del módulo | `UPPER_SNAKE_CASE` | `MAX_CLICKS`, `ANIMATION_DURATION` |
| Clases de Tailwind | las que define Tailwind | `bg-purple-500` |

Un componente en camelCase no es solo feo: React trata a `<home />` como una
etiqueta HTML desconocida en vez de como tu componente.

## 2. El nombre dice cuál es su propósito

Quien lea el nombre debe saber qué guarda la variable o qué hace la función, sin
ir a leer su definición.

```ts
// ❌ no dicen nada
const data = 0
const temp = useRef(null)
const flag = false
const x = clickCounter + 1

// ✅ dicen exactamente qué son
const clickCounter = 0
const buttonRef = useRef(null)
const isAnimating = false
const nextClickCount = clickCounter + 1
```

Reglas derivadas:

- **Nada de abreviaturas.** `buttonRef`, no `btnRf`. Se escribe una vez y se lee
  cien; el editor autocompleta.
- **Sin números al final.** `container2` significa que a los dos les falta un
  nombre real: `pageContainer` y `buttonContainer`.
- **El nombre no miente.** Si `clickCounter` deja de contar clicks, se renombra.
  Un nombre desactualizado engaña más que uno vago.

## 3. Booleanos: prefijo `is`, `has` o `should`

Un booleano debe leerse como una pregunta de sí/no. Sin prefijo parece una orden
o un número.

```ts
// ❌ parece una función que inicia algo
const [startAnimation, setStartAnimation] = useState(false)

// ✅ se lee como "¿está animando?"
const [isAnimating, setIsAnimating] = useState(false)
```

| Prefijo | Cuándo | Ejemplo |
|---|---|---|
| `is` | un estado actual | `isAnimating`, `isVisible` |
| `has` | posesión o existencia | `hasClicks`, `hasError` |
| `should` | una decisión | `shouldAnimate` |

## 4. Las funciones se nombran con un verbo

Una variable guarda una **cosa** (sustantivo); una función **hace** algo (verbo).

```ts
// ❌ suena a que guarda un número
const clickCount = () => setClickCounter(clickCounter + 1)

// ✅ suena a acción
const incrementClickCounter = () => setClickCounter(clickCounter + 1)
```

Verbos habituales: `get`, `set`, `create`, `update`, `toggle`, `reset`,
`increment`, `animate`.

## 5. Handlers de eventos: prefijo `handle`

Las funciones que responden a un evento del usuario llevan `handle` + el evento.
Así se distinguen de un instante de un vistazo de la lógica normal.

```ts
// ✅
const handleClick = () => {}
const handleSubmit = () => {}
const handleMouseEnter = () => {}
```

Y se pasan **por referencia**, sin envolverlas en una flecha vacía:

```tsx
{/* ❌ una flecha que solo llama a otra función: capa de más */}
<button onClick={() => { handleClick() }}>click me</button>

{/* ✅ */}
<button onClick={handleClick}>click me</button>
```

La flecha solo se justifica si necesitas pasar un argumento:
`onClick={() => handleDelete(item.id)}`.

## 6. Refs: sufijo `Ref`

Un `useRef` no guarda el elemento, guarda una caja con el elemento dentro (hay
que hacer `.current`). El sufijo `Ref` te recuerda ese `.current`.

```ts
// ❌ parece que ya es el elemento
const container = useRef(null)
const buttonElement = useRef(null)

// ✅
const containerRef = useRef(null)
const buttonRef = useRef(null)
```

Ojo con este proyecto: si un `ref` se cae del JSX, la animación de GSAP apunta a
`null` y **no falla, simplemente no hace nada**. Un nombre claro ayuda a notar
que falta.

## 7. Espaciado consistente

```ts
// ❌
const container=useRef(null)
gsap.to(el, { scaleX:2, ease:"elastic",yoyo:true })

// ✅
const containerRef = useRef(null)
gsap.to(el, { scaleX: 2, ease: "elastic", yoyo: true })
```

- Espacio a ambos lados del `=`.
- Espacio después de cada `:` y de cada `,`, nunca antes.
- Sin ceros de relleno en los números: `0.05`, no `0.050`.

## 8. Sin imports sin usar

Cada import que no se usa es una pista falsa para quien lea el archivo.

```ts
// ❌ useEffect no se usa en ninguna parte
import { useEffect, useState, useRef } from "react"

// ✅
import { useState, useRef } from "react"
```

`pnpm lint` los detecta.

## Checklist rápido

Antes de dar por terminado un archivo:

- [ ] Variables y funciones en camelCase; componentes en PascalCase
- [ ] Ningún nombre genérico (`data`, `temp`, `flag`, `x`)
- [ ] Booleanos con `is` / `has` / `should`
- [ ] Funciones con verbo; handlers con `handle`
- [ ] Refs con sufijo `Ref`
- [ ] Espacios alrededor del `=` y después de los `:`
- [ ] Sin imports sin usar
