# Rapport de projet — Bootcamp ROS 2

- **Équipe :** (noms)
- **Date de soutenance :**
- **Dépôt du code :** (lien)

## 1. Présentation du projet

Décrivez en quelques lignes le scénario réalisé (objet détecté, classes gérées, zones de
dépôt) et le résultat obtenu.

## 2. Architecture ROS 2

### 2.1 Graphe des nœuds

> Insérez ici le schéma global (export `rqt_graph` ou diagramme).

### 2.2 Interfaces utilisées

| Interface | Type | Rôle | Justification du choix |
| --- | --- | --- | --- |
| `/detections` | topic (`Detection.msg`) | … | … |
| `PickRequest` | service | … | pourquoi un service et pas un topic ? |
| `NavigateToPose` | action | … | pourquoi une action ? |

## 3. Sous-systèmes

- **Perception (J4) :** approche, classes distinguées, fiabilité.
- **Manipulation (J3) :** stratégie de pick, poses.
- **Navigation (J2) :** cartographie, zones de dépôt.
- **Orchestration (coordinator) :** logique de mission, paramètres.

## 4. Répartition des tâches

| Membre | Contributions |
| --- | --- |
| … | … |

## 5. Difficultés rencontrées & solutions

…

## 6. Améliorations envisagées

Avec plus de temps, nous aurions…
