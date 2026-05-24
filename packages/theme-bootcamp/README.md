# @bootcamp/theme

Thème partagé entre le site Starlight (`apps/docs`) et les decks Slidev (`apps/slides`) pour le cours **ROS 2 — Bootcamp** (refonte Perpignan 2026).

## Contenu

- `src/tokens.css` — variables CSS (palette + typo + radii + shadows)
- `src/starlight.css` — surcharge des variables Starlight
- `src/slidev/` — thème Slidev `slidev-theme-bootcamp` :
  - `layouts/cover.vue`, `two-cols.vue`, `section.vue`, `end.vue`
  - `styles/index.ts`, `layout.css`
- `src/assets/logo-iso.svg` — logo officiel (cube isométrique = base Kiwi + bras SO-101)
- `src/assets/favicon.svg` — favicon dérivé du même glyphe

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

### Embedder un deck dans une page Starlight

Chaque deck Slidev est build aussi en mode SPA (en plus du PDF) et exposé sous `/slides/<deck>/` côté Astro. Pour l'embedder dans une page MDX :

```mdx
import SlidevEmbed from "../../../components/SlidevEmbed.astro";

<SlidevEmbed name="demo" title="Démo — thème ROS 2 Bootcamp" />
```

Props :
- `name` *(required)* — nom du sous-dossier de `apps/slides/`
- `title` — titre affiché dans la barre d'actions
- `pdf` *(default `true`)* — affiche le lien "PDF ↓" vers `/slides/<name>.pdf`
- `ratio` *(default `"16 / 9"`)* — ratio CSS de l'iframe
