# Jour 4 — Vision : brief & idées (préparation)

> Banque d'idées pour cadrer le Jour 4 (issue #65). À transformer en TP + slides.
> Ancré sur le fil rouge : le J4 produit le **vrai `detector`** qui remplace le nœud
> factice du J1.

## 1. Le contrat (non négociable)

Le J4 doit livrer un nœud `detector` qui publie sur **`/detections`** des messages
**`Detection.msg`** = `string class_id` + `geometry_msgs/Pose pose`
(cf. `plan/briques-j1-pour-j5.md`). Tout le reste (méthode de détection, modèle) est libre,
tant que la **sortie respecte ce contrat**. C'est ce qui permet à J5 de brancher la vraie
perception sans rien changer en aval.

## 2. Le vrai verrou : la POSE, pas la classe

Classer un objet est facile ; estimer sa **pose 3D** depuis une caméra l'est moins. Trois
stratégies, de la plus simple à la plus riche :

| Approche | Pose obtenue | Coût | Verdict |
|---|---|---|---|
| **Plan connu + intrinsèques** | back-projection pixel → 3D en supposant l'objet sur la table (z connu) | faible | bon compromis pédagogique |
| **Caméra RGB-D** (depth en sim) | profondeur directe → 3D du centroïde | moyen | réaliste, simple à câbler en Gazebo |
| **Marqueurs ArUco / AprilTag** | **6D directe** via `cv2.aruco` | très faible | ⭐ idéal pour enseigner, robuste, la classe = l'ID du marqueur |

**Reco** : commencer par **ArUco** (pose 6D gratuite + classe = ID) comme baseline qui
*marche à coup sûr*, puis monter en gamme avec couleur/IA. Ça garantit un J4 livrable même
si l'IA déborde.

## 3. Méthodes de détection (du simple à l'ambitieux)

| Méthode | Idée | Pour | Contre |
|---|---|---|---|
| **OpenCV couleur (HSV)** | seuillage HSV + contours → classe = couleur, pose = centroïde | zéro entraînement, visuel, rapide | sensible à l'éclairage, 2D |
| **ArUco** | `cv2.aruco.detectMarkers` → ID + pose 6D | robuste, 6D, pédagogique | objets « taggés » (moins réaliste) |
| **IA PyTorch — classif** | petit CNN entraîné sur quelques classes (cubes colorés/chiffres) | introduit l'entraînement | besoin d'un mini-dataset |
| **IA — détection (YOLO/ultralytics)** | modèle pré-entraîné ou fine-tuné → bbox + classe | « état de l'art », impressionnant | lourd pour 1 journée, GPU souhaitable |

**Reco de dosage** : OpenCV/ArUco = socle garanti ; l'IA PyTorch = la partie « ambitieuse »
avec un **modèle pré-entraîné** ou un **mini-classifieur** (transfer learning sur ~50 images)
pour rester dans la journée.

## 4. Objet / dataset commun (#35)

Choisir **un objet partagé** entre J3 (pick&place), J4 (détection) et J5 (projet). Options :
- **Cubes colorés** (rouge/bleu/vert) — simples à modéliser en Gazebo (SDF), classes = couleurs.
- **Cubes ArUco** — un marqueur par face, classe = ID. Combine détection facile + pose 6D.
- **Petits objets texturés** (si IA) — nécessite un dataset d'images.

**Reco** : un **cube** (≈4 cm) décliné en 3 couleurs **et** porteur d'un ArUco → couvre les
trois méthodes avec un seul modèle Gazebo. À fournir comme modèle SDF réutilisable.

## 5. Structure proposée (2 parties, comme les autres jours)

- **Partie 1 — Perception classique (OpenCV)**
  - acquérir le flux caméra : `image_transport` + `cv_bridge` (sim Gazebo : caméra montée
    sur le LeKiwi ou fixe au-dessus de la table) ;
  - détecter l'objet : seuillage couleur **ou** ArUco ;
  - estimer la pose (plan connu / depth / ArUco) ;
  - publier un premier `Detection.msg`.
- **Partie 2 — Perception par IA (PyTorch)**
  - classifier/détecter avec un modèle (pré-entraîné ou mini-entraînement) ;
  - comparer robustesse vs l'approche classique ;
  - (option) **asservissement visuel** : centrer la caméra/le bras sur l'objet.
- **Application (fil rouge)** : le nœud `detector` final publie `/detections` →
  remplace le factice du J1, prêt pour le J5.

## 6. Outils & dépendances

- `cv_bridge`, `image_transport`, `sensor_msgs/Image`
- OpenCV (`cv2`), `cv2.aruco`
- PyTorch + torchvision (ou `ultralytics` pour YOLO)
- Caméra Gazebo : capteur `camera`/`rgbd_camera` (plugin `gz-sim`), pont `ros_gz_image`
- (option) calibration : intrinsèques de la caméra sim (connues, pas besoin de calibrer)

## 7. Risques & gestion du temps

- ⚠️ **Entraîner un modèle from scratch en 1 jour = piège.** Préférer pré-entraîné /
  transfer learning / dataset minuscule.
- ⚠️ **Pose 6D depuis RGB pur** = difficile → ArUco ou RGB-D pour contourner.
- ⚠️ **Câblage caméra sim** (topics, QoS, frames) peut manger du temps → fournir un launch prêt.
- Garde une **baseline qui marche** (ArUco) pour que la journée soit toujours livrable.

## 8. Décisions à trancher (pour cadrer le TP)

1. **Classes** : couleurs (3), IDs ArUco (N), ou catégories d'objets ?
2. **Source de pose** : plan connu / RGB-D sim / ArUco ?
3. **Place de l'IA** : cœur du TP ou partie « bonus/ambitieuse » ?
4. **Caméra** : fixe au-dessus de la scène, ou embarquée sur le robot ?
5. **Objet commun** : cube couleur+ArUco (reco) ou autre ?

## 9. Idées bonus

- **Asservissement visuel** (visual servoing) : aligner le gripper sur l'objet en boucle fermée.
- **Tracking** multi-frames (filtrage de la pose) pour stabiliser `/detections`.
- **Comparaison** quantitative OpenCV vs IA (précision, FPS, robustesse à l'éclairage).
- **RViz** : afficher les détections (markers) pour le débogage visuel.
