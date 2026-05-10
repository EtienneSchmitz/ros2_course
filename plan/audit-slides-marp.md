# Audit — Slides MARP & Stack documentation (cours ROS 2)

## Contexte

Tu maintiens un cours de robotique/ROS 2 (ESME Bordeaux) avec une stack hybride :
- **Docusaurus** pour la documentation (`/docs/`, 9 modules)
- **MARP** pour les slides de cours (`/slides/`, 6 fichiers .md, ~1830 lignes)
- Build via npm scripts directement appelant `marp-cli`

Tu sens que MARP devient bloquant : pas d'animations, formules math non rendues, CSS dupliqué dans chaque fichier, et tu veux pouvoir intégrer les slides dans une stack moderne (Starlight/Astro plutôt que Docusaurus).

Cet audit fait l'inventaire factuel, identifie les blocages et recommande une cible.

---

## 1. État actuel — ce qui marche

| Élément | Statut |
|---|---|
| Pipeline de build | Scripts npm `build:slides` (PDF + HTML), `dev:slides` (watch HTML) — **fonctionnel** |
| Markdown comme source | ✅ Un fichier .md = un module de cours |
| Code highlighting | ✅ Natif MARP (Python, Bash) |
| Couverture pédagogique | 6 modules cohérents : intro, navigation, manipulation, vision, integration, presentation |
| Assets | 35 images centralisées dans `/slides/images/` |
| Versioning Marp CLI | `@marp-team/marp-cli@^4.1.2` (à jour) |

**Verdict** : la base fonctionne, ce n'est pas cassé. Le problème est plafond de fonctionnalités, pas de stabilité.

---

## 2. Limitations critiques identifiées

### 2.1 Animations — bloquant
MARP génère du HTML **statique**. Aucun support natif pour :
- Apparition progressive de bullets (équivalent `v-click`)
- Animation d'éléments (entrée/sortie)
- Transitions entre slides au-delà du défaut

Hack possible : injecter du JS, mais fragile et casse l'export PDF.

### 2.2 Formules mathématiques — non rendues
**34 références** à math/formula/cinématique/IK-FK dans les .md, **zéro formule rendue**. Tu écris en notation textuelle ce qui devrait être du LaTeX. Pour un cours qui couvre :
- Cinématique directe/inverse (manipulation)
- Transformations (TF2)
- Filtres (vision, navigation : Kalman, particules)

…c'est un manque pédagogique réel.

### 2.3 CSS dupliqué dans chaque fichier
Aucun fichier de config centralisé (pas de `marp.config.js` ni `.marprc`). Chaque .md contient son propre `<style>`. Modifier le footer ou le layout 2-colonnes = éditer 6 fichiers.

### 2.4 Layout fragile
`div.twocols` avec `column-count: 2` est un hack CSS. Le rendu dépend du contenu et casse facilement.

### 2.5 Diagrammes en images statiques
Les architectures ROS (nodes, topics, services) sont gérées en GIF/PNG. Modifier un nœud = recréer l'image. Mermaid résoudrait ça mais MARP n'a pas de support officiel.

### 2.6 Duplication docs/slides
`/docs/` (Docusaurus) et `/slides/` (MARP) racontent la même histoire dans deux formats. Sync manuelle, dérive garantie.

### 2.7 Pas d'intégration Docusaurus ↔ MARP
Les slides compilées sont juste copiées dans `/static/slides/`. Aucun lien depuis la doc, pas de TOC partagée, pas de cohérence visuelle.

---

## 3. Recommandation cible : **Slidev + Starlight**

### 3.1 Pourquoi Slidev pour les slides

| Critère | Slidev | MARP actuel | Reveal.js | Quarto |
|---|---|---|---|---|
| Source Markdown | ✅ | ✅ | ⚠️ (HTML-first) | ✅ |
| Animations `v-click` | ✅ natif | ❌ | ✅ (fragments) | ⚠️ limité |
| KaTeX | ✅ natif | ❌ | ⚠️ plugin | ✅ |
| Mermaid | ✅ natif | ❌ | ⚠️ plugin | ✅ |
| Export PDF fidèle | ✅ (Playwright) | ✅ | ⚠️ (print-pdf) | ✅ |
| Mode présentateur | ✅ natif (timer, notes, draw) | ❌ | ✅ | ⚠️ |
| Composants custom | ✅ Vue 3 | ❌ | ⚠️ JS brut | ❌ |
| Hot reload DX | ✅ excellent (Vite) | ⚠️ basique | ❌ | ❌ |
| Migration depuis MARP | Facile (Markdown→Markdown) | — | Moyenne | Moyenne |

**Slidev coche toutes tes priorités exprimées** : animations v-click, math+Mermaid, PDF + présentateur, et c'est du Vue/Vite donc cohérent avec une stack Astro/Starlight.

### 3.2 Pourquoi Starlight pour la doc

Starlight (Astro) résout les irritants de Docusaurus pour ton usage :
- Build plus rapide, bundle plus léger
- Markdown/MDX natif, KaTeX et Mermaid via plugins simples
- Composants framework-agnostiques (peut héberger des composants Vue de Slidev)
- I18n simple si tu envisages EN/FR
- Recherche locale incluse (Pagefind)

L'intégration Slidev↔Starlight passe par : embed iframe des slides compilées, ou liens directs depuis chaque page de doc vers la slide correspondante.

---

## 4. Stack cible proposée

```
ros_course/
├── docs/                    → Starlight (Astro)
│   └── content/docs/...     → MDX pour math/Mermaid inline
├── slides/                  → Slidev
│   ├── intro/slides.md
│   ├── navigation/slides.md
│   └── ... (1 dossier par module)
├── shared/
│   ├── theme/               → Thème Slidev custom (couleurs ESME)
│   └── components/          → Composants Vue réutilisables (RosNodeGraph, TfTree...)
└── package.json             → Workspaces npm/pnpm
```

**Pipeline build** :
- `pnpm dev:slides intro` → hot reload Slidev module par module
- `pnpm build:slides` → HTML + PDF dans `apps/docs/public/slides/`
- `pnpm dev` → Starlight sert la doc + slides compilées en static
- Déploiement : Vercel/Netlify/Pages, build unique

---

## 5. Estimation effort de migration (si tu décides d'y aller)

| Tâche | Effort | Risque |
|---|---|---|
| Setup Slidev + thème custom | 0.5 j | Faible |
| Setup Starlight + import contenu Docusaurus | 1 j | Faible (migration MD→MDX quasi 1:1) |
| Migration slides MARP→Slidev (6 fichiers) | 1.5 j | Faible (Markdown reste compatible à 80%) |
| Ajout formules KaTeX (cinématique, vision) | 1 j | Moyen (rédaction mathématique) |
| Conversion images→Mermaid (nodes/topics) | 0.5 j | Faible |
| Ajout animations v-click clés | 1 j | Faible (incrémental) |
| **Total réaliste** | **~5.5 jours** | **Faible global** |

Risque le plus important : ton thème CSS custom MARP (footer, layout 2-cols) doit être réécrit en Vue/Slidev. Mais c'est une simplification, pas une perte.

---

## 6. Décisions à acter avant migration (si tu y vas)

1. **Monorepo ou multi-repos ?** → recommandation : monorepo pnpm workspaces (slides + docs versionnés ensemble)
2. **Thème ESME visuel ?** → définir palette, logo, footer une seule fois, partagé Slidev↔Starlight
3. **Stratégie i18n ?** → si EN/FR envisagé, Starlight le gère nativement, Slidev moins bien
4. **Hosting ?** → Pages GitHub suffit, ou Vercel pour preview deployments par PR

---

## 7. Quick wins possibles **sans migration**

Si tu ne veux/peux pas migrer immédiatement, voici 3 améliorations à coût faible sur la stack MARP actuelle :

1. **Centraliser le CSS** : créer `/slides/theme.css` avec les styles communs, l'inclure via `--theme-set` dans le script npm. Élimine la duplication dans les 6 fichiers.
2. **Ajouter KaTeX via marp-math** : plugin `markdown-it-katex` configurable via `marp.config.js`. Permet de rendre les formules sans changer d'outil.
3. **Rendre les diagrammes en SVG** : pré-générer les architectures ROS depuis Mermaid CLI (`mmdc`) avant le build MARP. Moins fluide qu'une intégration native mais évite les GIF.

Ces 3 wins → ~1 jour de travail, repoussent la décision de migration de plusieurs mois.

---

## 8. Recommandation finale

**Si l'horizon du cours dépasse 1 an** : migre vers **Slidev + Starlight**. ROI clair : animations, math, Mermaid, mode présentateur, DX moderne, intégration unifiée. ~5.5 jours d'effort, faible risque.

**Si l'horizon est court (1-2 sessions restantes)** : applique les 3 quick wins MARP. Pas de migration.

**Ce que je déconseille** :
- Reveal.js : trop low-level, pas de gain DX par rapport à MARP
- Quarto : excellent en académique pur, mais animations pauvres, courbe de réécriture importante
- Rester sur MARP **sans quick wins** : la dette pédagogique (formules non rendues) va s'accumuler

---

## Fichiers clés référencés

- [package.json](package.json) — scripts MARP actuels à remplacer
- [slides/introduction.md](slides/introduction.md) — fichier le plus dense (605 lignes), test de migration idéal
- [slides/manipulation.md](slides/manipulation.md) — candidat #1 pour KaTeX (cinématique IK/FK)
- [slides/vision.md](slides/vision.md) — candidat pour animations v-click (pipeline perception)
- [src/css/custom.css](src/css/custom.css) — styles Docusaurus actuels, à réutiliser comme base de thème ESME
- [docs/](docs/) — contenu Docusaurus à migrer vers Starlight
- [slides/images/](slides/images/) — 35 assets, à trier (GIF→Mermaid quand pertinent)

---

## Vérification post-migration (si tu y vas)

1. `pnpm dev:slides introduction` → hot reload fonctionne, animations visibles
2. `pnpm build:slides` → HTML + PDF générés, vérifier PDF imprimable identique au HTML (sans animations)
3. Mode présentateur : `?presenter` → notes, timer, prochaine slide visibles
4. Math : ouvrir manipulation, vérifier que les formules IK/FK sont rendues
5. Mermaid : un graphe ROS nodes/topics rendu correctement (zoom OK)
6. Starlight : `pnpm dev` → la doc charge, lien vers slides fonctionne, les composants partagés s'affichent dans les deux contextes
