# @bootcamp/theme

Thème partagé entre le site Starlight (`apps/docs`) et les decks Slidev (`apps/slides`) pour le cours **ROS 2 — Bootcamp** (refonte Perpignan 2026).

## Contenu

- `src/tokens.css` — variables CSS (palette + typo + radii + shadows)
- `src/starlight.css` — surcharge des variables Starlight
- `src/slidev/` — thème Slidev `slidev-theme-bootcamp` :
  - `layouts/cover.vue`, `two-cols.vue`, `section.vue`, `end.vue`
  - `styles/index.ts`, `layout.css`
- `src/assets/logo-{arm,gear,iso}.svg` — 3 variantes du logo (choix final à valider sur la PR)
- `src/assets/favicon.svg`

## Utilisation

### Dans Starlight (`apps/docs`)

```js
// astro.config.mjs
starlight({
  customCss: ["@bootcamp/theme/starlight.css"],
})
```

### Dans un deck Slidev

```yaml
---
theme: ../../../packages/theme-bootcamp/src/slidev
---
```

Layouts disponibles : `cover`, `two-cols`, `section`, `end`.
