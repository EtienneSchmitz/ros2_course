---
marp: true
paginate: true
---

<style>
    footer {
        text-align: right;
        margin-right : 50px;
    }
</style>

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->
 
# Workshop ROS 2  
## Navigation

Etienne SCHMITZ

![bg right fit](./images/navigation/logo.jpg)

---

## Sommaire

---

## 🚶‍♂️ Pourquoi un robot doit-il savoir naviguer ?

🎯 Pour **accomplir une mission** dans un environnement réel :

- Livrer un colis 🧺  
- Nettoyer une pièce 🧹  
- Explorer un lieu inconnu 🗺️  
- Suivre une personne 👣

### 🚧 Problème à résoudre

- Où suis-je ? (**localisation**)
- Où aller ? (**planification**)
- Comment y aller sans heurter d’obstacles ? (**contrôle et perception**)

---

## ✅ Solution : Nav2 - La stack de navigation ROS 2

- 🧠 Se localiser (SLAM / AMCL)
- 🗺️ Créer ou utiliser une carte
- 📦 Planifier un chemin (global & local planner)
- 🤝 Utiliser les capteurs (LIDAR, IMU, odométrie, etc…)

![bg right 70%](./images/navigation/logo_nav2.png)

--- 

# Capteurs et techniques de localisation

---

## 🧭 IMU (Inertial Measurement Unit)

- Mesure les **vitesses angulaires** (gyroscope)
- Mesure les **accélérations linéaires** (accéléromètre)
- Peut inclure un **magnétomètre** (champ magnétique)

> ⚠️ L’IMU dérive rapidement : elle est utile pour des mouvements courts ou pour stabiliser des fusions de capteurs.

### 🎛️ Dans une IMU numérique typique :
- 1x Gyroscope
- 3x Accéléromètres linéaires
- 3x Magnétomètres

---

## ⚙️ Odométrie

- Combine les données de l’**IMU** et des **encodeurs de roues**
- Fournit une estimation **continue** de la position du robot
- ⚠️ **Erreur cumulative** : la position devient de moins en moins fiable avec le temps

> Utilisée seule, l’odométrie ne suffit pas pour naviguer précisément à long terme. Elle doit être **fusionnée avec d'autres capteurs** (GPS, LIDAR, etc.)

![bg right:40% fit](./images/navigation/odometry.png)

---

## 🧭 Multilatération (2D / 3D)

- Estime la position en mesurant les **distances** entre le robot et plusieurs **stations fixes** (3 pour une localisation 2D, 4 pour une localisation 3D)
- 🎯 Plus les distances sont précises, plus la position estimée est fiable

> ⚠️ Ne pas confondre avec la **triangulation**, qui utilise des **angles** plutôt que des distances  
> ⚠️ Méthode sensible aux **réflexions de signal** (rebonds, interférences)

![bg right:45% 90%](./images/navigation/multiateration.jpeg)

---

## 📍 GPS-RTK — Real Time Kinematic

- Améliore le GPS classique en combinant les données avec une **station de référence au sol**
- Fournit une localisation **absolue avec précision centimétrique**
- Fonctionne en **temps réel** via un lien de communication (radio, 4G, etc.)
- ❗ Nécessite une zone **dégagée extérieure**, sans obstacle

> ✅ Très utilisé en **robotique agricole**, en **topographie**, et sur les **véhicules autonomes**

---

## 📶 Multilatération UWB (Ultra Wide Band)

- Principe similaire au GPS-RTK, mais en **intérieur**
- Utilise plusieurs **ancres UWB fixes** dans l’environnement
- Le robot mesure les **temps de vol** du signal pour estimer sa position

> 📏 Précision : ±10 à 30 cm

### ⚠️ Limites
- Sensible aux **réflexions du signal**
- Moins fiable dans des environnements métalliques ou encombrés

> ✅ Idéal pour les **usines**, **entrepôts** et **espaces indoor contrôlés**


---

## 🔦 LIDAR — Light Detection and Ranging

- Utilise un **laser** pour mesurer des **distances** à l’environnement
- Retourne une carte de **profondeur** (2D ou 3D selon le modèle)

### 🧰 Types de LIDAR
- 📍 Fixe
- 🔁 Rotatif à 360° (mono-faisceau)
- 🌐 Multi-beam rotatif (3D)

### 🛠️ Usages typiques
- Détection d’obstacles
- Cartographie (SLAM)
- Suivi de murs ou de personnes

--- 
## 🌐 LIDAR multi-beam

### 🔍 Fonctionnement
- Superpose plusieurs **faisceaux verticaux et horizontaux**
- Fournit une **perception 3D dense** de l’environnement

### ✅ Avantages
- Très précis pour l’**évitement d’obstacles 3D**
- Permet une compréhension fine de la **scène autour du robot**

![bg right:50% 90%](./images/navigation/multibeam_laser.jpeg)

--- 

AMCL + SLAM

--- 

Stack NAV 2

--- 

Présentation ROS2