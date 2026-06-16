# Prompt — Outillage de génération de dataset YOLO (à ajouter à `bootcamp_vision`)

> À donner tel quel à une IA pour générer l'outil de capture utilisé au TP03 (YOLO).
> Objectif : un dataset YOLO **auto-labellisé** produit dans la simulation, pour que les
> étudiants puissent **entraîner** un modèle sur les objets du cours en 8 h.

```text
# PROMPT — Génération de dataset YOLO synthétique (auto-labellisé) pour bootcamp_vision

## Contexte
Package bootcamp_vision (ROS 2 Kilted, Gazebo Ionic / gz-sim 9). Monde
worlds/vision_table.sdf : caméra fixe top-down 1280×720, intrinsèques fx=935.485,
cx=640, cy=360, table (dessus à z=0.40). Bibliothèque d'objets existante avec presets
de spawn (shapes, aruco, trash_*, coffee_pack_*, digit). On veut ENTRAÎNER un YOLO
custom sur ces objets → il faut un dataset d'images variées AUTO-LABELLISÉES.

## Objectif
Ajouter un pipeline de génération de dataset YOLO par domain randomization, sans
annotation manuelle. L'objet (pas la caméra) est randomisé.

## Exigences
### 1. Labels automatiques (choisir UNE voie, recommander la A)
- A) Ajouter au monde un capteur `boundingbox_camera` (gz-sim) aligné sur la caméra RGB,
  avec un `label` entier par modèle d'objet. Bridger/lire les bbox 2D côté script.
- B) Sinon : projeter les 8 coins de la bbox 3D connue de l'objet (extents du modèle +
  pose de spawn) via les intrinsèques → bbox 2D (min/max u,v).

### 2. Script capture_dataset.py (console_script ros2 run bootcamp_vision capture_dataset)
- Args : --classes (liste de presets, ex. coffee_pack_1 coffee_pack_2 coffee_pack_3
  trash_bottle trash_can), --per-class N (def. 300), --out <dir>, --val-split 0.2,
  --seed.
- Boucle, pour chaque échantillon :
  1. supprimer l'objet courant, spawn l'objet de la classe à une POSE ALÉATOIRE
     (x,y dans les bornes de la table ; yaw ∈ [0,360°) ; option roll/pitch léger) ;
  2. (option) randomiser l'intensité/teinte de la lumière + spawn 0–2 distracteurs ;
  3. attendre une frame FRAÎCHE sur /camera/image_raw ;
  4. récupérer la/les bbox (voie A ou B), filtrer celles hors-champ/trop petites ;
  5. écrire l'image .png + le label YOLO (class_id cx cy w h normalisés).
- Sortie au format ultralytics : images/{train,val}/, labels/{train,val}/, data.yaml
  (noms de classes, nc, chemins). Reproductible via --seed.
- Headless-friendly (gz server sans GUI), log de progression, robuste aux frames manquantes.

### 3. Doc / commandes
- README : comment générer le dataset puis entraîner :
    ros2 run bootcamp_vision capture_dataset --classes ... --per-class 300 --out ~/yolo_ds
    yolo detect train model=yolo11n.pt data=~/yolo_ds/data.yaml epochs=30 imgsz=640
  et inférer avec le .pt obtenu.
- Documenter le budget temps (génération + train) sur CPU vs GPU.

## Contraintes
- Randomiser l'OBJET via le service de spawn existant, pas l'orientation globale de la sim.
- Léger, CPU OK, tout commenté en français. Garder le preset pré-entraîné COCO comme fallback.
```
