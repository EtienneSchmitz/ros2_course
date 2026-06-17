# Briques J1 → J5 — contrat du fil rouge

> Sortie de la conception du Jour 5 (issue #51). Liste **noir sur blanc** les briques de
> code que le **Jour 1** doit produire, et que le **Jour 5** assemble en projet final.
> Chaque brique est d'abord codée en J1 avec des **données factices**, puis remplacée par
> le vrai robot/algorithme au fil de la semaine.

## Projet final (J5)

Transport pick & place : la **caméra** détecte un objet → le **SO-101** le saisit → le
**LeKiwi** le transporte vers une zone de dépôt liée à sa **classe** → dépôt.
Pipeline ROS 2 : **perception → décision → action**.

## Graphe cible

```
[detector] --/detections (Detection.msg)--> [mission_coordinator] --PickRequest.srv--> [arm_server]
                                                    |
                                                    +-- action NavigateToPose --> [base]
                                                    (params : zones de dépôt par classe)
```

## Les briques (produites en J1, en factice)

| # | Brique | Concept ROS 2 (J1) | Factice en J1 | Remplacé par |
|---|---|---|---|---|
| 1 | Interface `Detection.msg` (classe + `geometry_msgs/Pose`) + nœud `detector` qui la publie sur `/detections` | **message custom + publisher / topic** | détections tirées d'une liste en dur, à intervalle fixe | **J4 Vision** (vraie détection caméra + IA) |
| 2 | Interface `PickRequest.srv` + serveur `arm_server` qui répond « pris / échec » | **service custom (serveur + client)** | renvoie toujours succès après un `sleep` | **J3 Manipulation** (vrai pick MoveIt 2) |
| 3 | Client d'action `NavigateToPose` (déjà fourni par Nav2) appelé par le coordinateur | **action (client)** | serveur d'action bidon qui « arrive » après un délai | **J2 Navigation** (vrai Nav2 sur LeKiwi) |
| 4 | Nœud `mission_coordinator` **paramétré** : souscrit `/detections`, appelle le service de pick, puis l'action de navigation vers la zone de la classe | **paramètres + orchestration** | zones de dépôt par classe lues depuis des paramètres / YAML | enrichi en J5 (machine à états, reprises) |
| 5 | `mission.launch.py` qui démarre les 4 nœuds ensemble + visualisation `rqt_graph` | **launch file + graphe** | lance tout le graphe factice | étendu en J5 avec les vrais robots |

## Invariants (contrats à ne pas casser)

- **Noms de topics / interfaces figés** : `/detections`, `Detection.msg`, `PickRequest.srv`.
  J2/J3/J4 doivent fournir/consommer **exactement** ces interfaces pour que J5 assemble sans
  réécriture.
- `Detection.msg` : `string class_name` + `int32 class_id` + `float32 score` + boîte 2D
  (`float32 u, v, w, h`) + `geometry_msgs/Pose pose` (cf. `bootcamp_vision`, repris en J4).
- `PickRequest.srv` : requête `geometry_msgs/Pose target` → réponse `bool success`.
- Le `mission_coordinator` ne dépend **que** des interfaces, jamais d'un robot précis →
  c'est ce qui permet de basculer factice ↔ réel.

## Traçabilité

- Chaque brique = une étape guidée de `docs/introduction/02-premiere-brique.mdx` (J1, #54).
- Assemblage final = `docs/introduction/` mini-projet (#55) puis projet J5 (#47).
