# ROS 2 — Bootcamp

Cours intensif ROS 2 en français — base mobile **Kiwi** + bras **SO-101**, ROS 2 **Kilted**.

> **Refonte 2026 en cours** — la session 2025 reste accessible :
> - Branche [`v2025`](https://github.com/EtienneSchmitz/ros2_course/tree/v2025)
> - Tag [`v2025-final`](https://github.com/EtienneSchmitz/ros2_course/releases/tag/v2025-final)
>
> Suivi de la refonte : issue [#17](https://github.com/EtienneSchmitz/ros2_course/issues/17).

## Stack

- **Site** : [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) (`apps/docs`)
- **Slides** : [Slidev](https://sli.dev) avec thème custom partagé (`apps/slides`)
- **Thème partagé** : [`@bootcamp/theme`](packages/theme-bootcamp) — palette, typo, layouts, logo
- **Gestionnaire** : pnpm workspaces

## Démarrer

Pré-requis : Node ≥ 24 (cf. `.nvmrc`), pnpm 11 (via `corepack enable`).

```bash
pnpm install              # installe toutes les dépendances
pnpm dev                  # site Starlight    → http://localhost:4321
pnpm dev:slides           # deck Slidev démo  → http://localhost:3030
pnpm build                # build complet (slides PDF + site statique)
```

## Structure

```
apps/
  docs/      Site Starlight (déployé sur ros2.etienne-schmitz.com)
  slides/    Decks Slidev (un sous-dossier par deck)
packages/
  theme-bootcamp/   Thème partagé Starlight + Slidev
```

## Déploiement

Push sur `main` → GitHub Actions → GitHub Pages → `ros2.etienne-schmitz.com`.
