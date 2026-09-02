# Documentación de Visione

Índice de la documentación del proyecto. Todo lo que no sea código vive aquí:
sistema de diseño, decisiones de producto, referencias de marca y notas de
implementación.

## Documentos

| Documento | Contenido |
| --- | --- |
| [Design System.md](./Design%20System.md) | Sistema de diseño aplicado: color, tipografía, espaciado, componentes, marca, desviaciones y pendientes |

## Convenciones

- **Idioma:** los documentos se escriben en español; el código y sus comentarios
  siguen las convenciones de `CLAUDE.md`.
- **Nombres de archivo:** título legible en español, extensión `.md`
  (`Design System.md`, `Documentacion.md`). Al enlazarlos desde otro `.md`, los
  espacios van como `%20`.
- **Índice:** cada documento nuevo se añade a la tabla de arriba en el mismo
  commit que lo crea.
- **Fuente de verdad:** cuando un documento y el código discrepan, gana el
  código — el documento se corrige, no al revés. Los valores concretos (tokens,
  medidas, nombres de componentes) se copian del código, no de memoria.
- **Alcance:** aquí va documentación duradera. Las notas de una sola tarea o de
  una sesión no se guardan en `docs/`.
