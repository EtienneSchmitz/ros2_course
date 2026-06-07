# ROS 2 — Bootcamp

Cours intensif ROS 2 en français — base mobile **Kiwi** + bras **SO-101**, ROS 2 **Kilted**.

[![Build & Deploy](https://github.com/EtienneSchmitz/ros2_course/actions/workflows/deploy.yml/badge.svg)](https://github.com/EtienneSchmitz/ros2_course/actions/workflows/deploy.yml)
[![ROS 2 Kilted](https://img.shields.io/badge/ROS%202-Kilted-22314E?logo=ros&logoColor=white)](https://docs.ros.org/en/kilted/)
[![Licence CC BY-NC-SA 4.0](https://img.shields.io/badge/licence-CC%20BY--NC--SA%204.0-lightgrey)](LICENSE)

🌐 **Site en ligne : [ros2.etienne-schmitz.com](https://ros2.etienne-schmitz.com)**

## Programme — 5 jours

| Jour | Thème | Robot |
| --- | --- | --- |
| [Installation](https://ros2.etienne-schmitz.com/installation) | Environnement ROS 2 Kilted + Gazebo Ionic | Kiwi + SO-101 |
| [J1 — Introduction](https://ros2.etienne-schmitz.com/introduction) | Nodes, topics, services, actions | — |
| [J2 — Navigation](https://ros2.etienne-schmitz.com/navigation) | SLAM + Nav2 (LIDAR) | Kiwi |
| [J3 — Manipulation](https://ros2.etienne-schmitz.com/manipulation) | Pick & place, MoveIt 2 | SO-101 |
| [J4 — Vision](https://ros2.etienne-schmitz.com/vision) | OpenCV, détection, asservissement visuel | — |
| [J5 — Intégration](https://ros2.etienne-schmitz.com/integration) | Scénario complet nav + manip + vision | Kiwi + SO-101 |

## Stack

- **Site** : [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) (`apps/docs`)
- **Slides** : [Slidev](https://sli.dev) avec thème custom partagé (`apps/slides`)
- **Thème partagé** : [`@bootcamp/theme`](packages/theme-bootcamp) — palette, typo, layouts, logo
- **Gestionnaire** : pnpm workspaces

## Démarrer

Pré-requis : **Node 25** (épinglé dans `.nvmrc`, `engine-strict` activé), pnpm 11 (via `corepack enable`).

```bash
pnpm install              # installe toutes les dépendances
pnpm dev                  # site Starlight       → http://localhost:4321
pnpm dev:slides           # deck Slidev démo     → http://localhost:3030
pnpm build                # build complet (slides PDF + site statique)
```

Autres scripts :

```bash
pnpm build:slides         # build du deck démo uniquement
pnpm build:slides:all     # build de tous les decks (demo + jour1/2/3/5)
pnpm preview              # prévisualise le site buildé
pnpm lint:md              # markdownlint sur le contenu docs
pnpm typecheck            # typecheck de tous les packages
```

`pnpm dev:slides` ouvre le deck `demo`. Pour travailler sur un autre deck :

```bash
pnpm --filter @bootcamp/slides exec slidev jour1/slides.md --open
# remplacer jour1 par jour2, jour3 ou jour5
```

## Structure

```text
apps/
  docs/      Site Starlight (déployé sur ros2.etienne-schmitz.com)
    src/content/docs/   introduction, installation, navigation,
                        manipulation, vision, integration
  slides/    Decks Slidev (demo, jour1, jour2, jour3, jour5)
packages/
  theme-bootcamp/   Thème partagé Starlight + Slidev
```

## Workspace apprenant

Les robots utilisés en cours sont clonés via [vcstool](https://github.com/dirk-thomas/vcstool)
à partir du fichier [`bootcamp.repos`](https://ros2.etienne-schmitz.com/bootcamp.repos),
publié sur le site :

```bash
cd ~/ros2_bootcamp_ws
wget https://ros2.etienne-schmitz.com/bootcamp.repos
vcs import src < bootcamp.repos
```

Les dépôts robots vivent sous [`github.com/EtienneSchmitz`](https://github.com/EtienneSchmitz) :
[`so_arm101_ros2`](https://github.com/EtienneSchmitz/so_arm101_ros2) (bras SO-101)
et [`lekiwi_ros2`](https://github.com/EtienneSchmitz/lekiwi_ros2) (base mobile Kiwi).

## Déploiement

Push sur `main` → GitHub Actions (`Build & Deploy`) → GitHub Pages → `ros2.etienne-schmitz.com`.

## Licence

© 2026 Étienne Schmitz.

Le contenu et le code de **ce dépôt** (site, slides, thème) sont publiés sous
licence [Creative Commons Attribution - Pas d'Utilisation Commerciale - Partage
dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0)](LICENSE) :
réutilisation et adaptation libres, **attribution obligatoire**, **usage
commercial interdit** (donc pas de revente), partage des dérivés sous la même
licence.

Les **dépôts robots** ([`so_arm101_ros2`](https://github.com/EtienneSchmitz/so_arm101_ros2),
[`lekiwi_ros2`](https://github.com/EtienneSchmitz/lekiwi_ros2)) sont des projets
distincts, dérivés de l'écosystème LeRobot / TheRobotStudio, et conservent leur
propre licence (Apache 2.0 en amont) — voir le fichier `LICENSE` de chacun.
