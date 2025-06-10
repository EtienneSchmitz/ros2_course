---
marp: true
title: Introduction à ROS 2
theme: default
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
 

# ROS 2  

## Introduction à l’écosystème

Etienne Schmitz

![bg right fit](./images/introduction/jazzy_logo.png)

---

## Sommaires



---

<!-- _class: lead -->

# ROS 2 : un écosystème open-source pour la robotique

---
## Qu'est-ce que ROS 2 ?

**ROS 2 (Robot Operating System 2)** est une suite logicielle (*middleware*) open-source conçue pour simplifier le développement de systèmes robotiques complexes.  
Plutôt que de multiplier les SDKs pour chaque robot, ROS 2 propose une infrastructure unifiée, modulaire et réutilisable.

**ROS 2 est utilisé dans de nombreux domaines** : recherche académique, industrie, robotique mobile, bras manipulateurs, véhicules autonomes, etc.

--- 

## Les principales fonctionnalités de ROS 2

- 🧰 **Bibliothèques** : communication inter-processus, calcul de trajectoires, asservissement moteur, gestion des capteurs, etc.  
- 🖥️ **Applications** : simulation physique (*Gazebo, Ignition*), visualisation de données (*RViz*), enregistrement et rejeu de données (*rosbag*), outils de débogage, etc.  
- 📐 **Conventions** : standardisation des formats de représentation des robots (*URDF, SDF*), des capteurs, des actionneurs, des messages et des services.  
- 🌍 **Communauté** : large base de composants open-source, documentation abondante, forums d'entraide (*ROS Answers*), tutoriels et vidéos pédagogiques.

---
## Historique de ROS

![bg right:33% 95%](./images/introduction/pr2_robot.jpg)

- **2010** : Lancement de **ROS 1** par *Willow Garage*, initialement conçu pour le robot **PR2**.  
- **2012** : Lancement de **ROS-Industrial** : adaptation de ROS aux besoins de l’**industrie**.
- **2012** : Création de la **OSRF (Open Source Robotics Foundation)** — aujourd’hui **Open Robotics**, organisme gérant le développement de ROS.
- **2017** : Lancement de **ROS 2**, une réécriture complète pour répondre aux **limitations de ROS 1** (temps réel, sécurité, fiabilité, middleware DDS...).


---

## De ROS 1 à ROS 2 : une nouvelle architecture

- **Évolution naturelle de ROS 1** pour répondre aux **besoins modernes** : temps réel, fiabilité, ...
- **Plus de flexibilité**, sécurité, modularité, performance  
- Passage d’une architecture **centralisée (ROS 1)** à une architecture **distribuée (ROS 2)**
- Meilleure gestion du **temps réel** grâce au middleware DDS  

> ⚠️ **Rétrocompatibilité partielle** : des ponts existent, mais **ROS 2 ≠ ROS 1**. 
Un package ROS 2 **ne peut interagir qu’avec d’autres packages ROS 2**


---

## Distributions - ROS 2

ROS 2 évolue par **distributions annuelles**, nommées comme Ubuntu (par ordre alphabétique avec adjectif + nom propre).  
Tous les **2 ans**, une version **LTS (Long Term Support)** est publiée, maintenue plus 5 ans.

ROS 1 a atteint sa fin de vie : sa **dernière version**, appelée [**Noetic Ninjemys**](https://wiki.ros.org/noetic), était maintenue jusqu’en 2025.  

Une majorité de packages ROS 2 ont été nommés comme leur équivalent ROS 1 mais avec l'ajout du 2, par exemple [**Nav 2**](https://nav2.org) ou [**MoveIt 2**](https://moveit.ai).

--- 

## Distributions - ROS 2

- **Lyrical Luth** *(prévue pour 2026 – LTS)* : prochaine version à support long terme  
- [Rolling Ridley](https://docs.ros.org/en/rolling/Releases/Release-Rolling-Ridley.html) : version à **développement continu**, toujours à jour, mais non stable ([REP 2002](https://www.ros.org/reps/rep-2002.html)).

![bg right:50% 95%](./images/introduction/distribution.png)

---

## Avantages de ROS 2

- **Gain de temps d’ingénierie** grâce à des briques logicielles existantes et éprouvées  
- **Écosystème riche** : outils compatibles, bibliothèques, standards reconnus  
- **Architecture modulaire** : composants interchangeables, dette technique réduite  
- **Interopérabilité** : facilitation de l’intégration via des formats standardisés (URDF, messages, etc.)  
- **Facilité d’extension** : matériel ou logiciel, pour intégrateurs ou chercheurs  
- **Liberté vis-à-vis des fournisseurs de logiciels** : ROS évite le **vendor lock-in**  
- **Support communautaire** (forums, GitHub) et **support professionnel** (via Open Robotics et entreprises partenaires)

---

## Limites et inconvénients de ROS 2

- **Standards parfois trop rigides** pour des cas spécifiques ou atypiques (Robocup SSL) 
- **Courbe d’apprentissage non négligeable**, surtout pour les débutants en robotique logicielle  
- **Compatibilité limitée hors Linux** : Docker, Windows et macOS partiellement pris en charge seulement  
- **Cycles de développement rapides** : certaines APIs peuvent devenir obsolètes rapidement, nécessitant une veille technique

---

## Langages supportés

- **Python** (`rclpy`) : simple à utiliser, idéal pour les scripts, le prototypage rapide, et les démonstrations
- **C++** (`rclcpp`) : plus performant, utilisé pour les composants critiques et les drivers
- D'autres langages sont accessibles via des **bindings** :
  - **Rust** (via `rclrs`)
  - **Java**, **Ada**, etc.

> Python et C++ sont les langages **officiels et pleinement supportés** par ROS 2.

--- 

## Types de robots compatibles

- **Robots à roues** (AGV, AMR)
- **Robots volants** (drones, UAV)
- **Cobots** et bras manipulateurs industriels
- **Robots à pattes** et humanoïdes
- **Capteurs ou actionneurs autonomes** intégrés à un réseau ROS

Pour qu’un robot soit compatible ROS :
> Il doit disposer d’un **driver ROS** (paquet logiciel) développé par le **constructeur**, un **laboratoire**, ou la **communauté**.

🔗 Liste officielle des robots ROS : [robots.ros.org](https://robots.ros.org)

---

# Ecosystème de ROS 2

---

## Middleware – RMW (ROS Middleware Interface)

ROS 2 repose sur une **abstraction de middleware** appelée **RMW**, qui joue un rôle essentiel dans la communication entre les composants logiciels.

- Assure la **communication entre les nœuds** via réseau Ethernet ou Wi-Fi
- Fournit une **interface unifiée** entre ROS 2 et divers middlewares DDS

> RMW permet à ROS 2 d’être **modulaire**, **distribué**, et **orienté temps réel**

---

## Modalités de communication via RMW

Le RMW prend en charge plusieurs **types de communication** entre nœuds ROS :

- **Topics** : messages en mode **publieur-souscripteur** (asynchrone)
- **Services** : appels **requête-réponse** (synchrone)
- **Paramètres** : variables externes pour configurer dynamiquement un nœud

> Ces modes sont essentiels pour concevoir des systèmes robotiques flexibles et interactifs.

---

## Fonctionnalités avancées du RMW

Le middleware ROS 2 permet des fonctionnalités avancées grâce à DDS (Data Distribution Service) :

- **QoS (Qualité de service)** : choix du niveau de fiabilité, de délai, de persistance...
- **Sécurité** avec `sros2` : **authentification**, **chiffrement**, contrôle d'accès
- **Interopérabilité** DDS : choix entre plusieurs implémentations (Fast DDS, Cyclone DDS, Connext...)

> Ces options rendent ROS 2 utilisable dans des contextes **industriels critiques**

---

## Gazebo – Simulation robotique

- Environnement de **simulation physique 3D** pour tester les robots virtuellement
- Supporte les capteurs (LiDAR, caméra, IMU…), moteurs, obstacles...

> Permet de tester les algorithmes de navigation, contrôle et SLAM **sans robot physique**

![bg right:50% 95%](./images/introduction/gazebo.png)

--- 

## Visualisation – RViz et rqt*

- 🧭 **RViz** : visualiseur 3D interactif des données ROS (lidar, caméra, trajectoire, etc.)
- 🧩 **rqt*** : suite d’outils graphiques modulaires (rqt_graph, rqt_console, rqt_plot...)

🛠️ Utile pour :
- Visualiser les capteurs en temps réel
- Comprendre les interactions entre nœuds
- Debuguer facilement son système ROS

--- 

## Foxglove Studio (Optionnel)

**Foxglove** est un outil moderne de visualisation de données ROS, alternatif ou complémentaire à RViz.

- Visualisation graphique de topics, logs, et messages en temps réel ou enregistrés
- Compatible ROS 2, WebSocket, rosbag2, JSON...
- Interface web ou application de bureau

🔗 [https://foxglove.dev](https://foxglove.dev)

---

## NAV2 – Navigation autonome

NAV2 (Navigation 2) est le système de navigation ROS 2, successeur de **move_base** (ROS 1).

- Construction de carte, localisation (AMCL), planification globale et locale
- Évitement d'obstacles
- Suivi de trajectoire jusqu'à une cible

> Utilisé pour les robots mobiles autonomes (AGV, AMR, drones au sol)

🔗 [https://nav2.org](https://nav2.org)

---
## MoveIt 2 – Manipulation robotique

- Planification de mouvement pour **bras manipulateurs** (cobots, robots industriels)
- Résolution de la cinématique inverse et collision checking
- Intégration avec perception (capteurs) et navigation

> Utilisé avec des robots comme UR, Franka Emika, Kinova, etc.

🔗 [https://moveit.ai](https://moveit.ai)


--- 

## ROS 2 Control – Boucles de contrôle temps réel

- Interface d'abstraction pour le **contrôle bas niveau** (moteurs, joints, capteurs)
- Séparation entre contrôleurs et interfaces matériel (hardware abstraction layer)
- Compatible avec MoveIt2, NAV2, etc.

> Objectif : Rendre le logiciel indépendant du modèle hardware du robot.

---

![bg 80%](./images/introduction/ros2_control.png)

---

## Arbres de comportement (Behavior Trees)

- Modèle de décision basé sur une **arborescence d'actions**
- Remplace les machines à états (FSM) dans la navigation ou la manipulation
- Utilisé par **NAV2**, **MoveIt Task Constructor**, et d'autres projets
- Possibilité d'utiliser une UI (Groot 2)

🔗 [ROS2 Integration | Behavior Tree](https://www.behaviortree.dev/docs/ros2_integration/)

![bg right:50% fit ](./images/introduction/groot.png)

--- 

## Projets connexes à ROS 2

- **Autoware** : middleware de conduite autonome, basé sur ROS 2  
- **ROS-Industrial** : standardisation ROS pour la robotique industrielle (ABB, Fanuc, UR...)

> ROS 2 est un socle pour **de nombreux projets open-source** dans la robotique moderne

---

## Des conventions partagées

ROS définit des **conventions communes** pour garantir l’interopérabilité :

- 📏 **Unités physiques** : mètre, seconde, radian, newton, etc. (SI)
- 📨 **Messages standardisés** : `geometry_msgs`, `sensor_msgs`, `std_msgs`, ...
- 🧩 **Nommage des topics/services** : `/joint_states`, `/scan`, `/cmd_vel`, ...
- 📂 **Formats descriptifs** : `URDF`, `SRDF`, `YAML` pour les paramètres

> Cela permet à tous les développeurs de "parler le même langage"

--- 

## Une boîte à outils du roboticien

Parmi les outils clés ROS :

- 🧩 **URDF** : description du robot (géométrie, liens, articulations)
- 🔄 **tf2** : transformations entre repères datées
- 🎥 **rosbag2** : enregistrement / rejeu de données
- 📈 **rqt_plot**, **PlotJuggler** : affichage temps réel de courbes
- 📊 **rqt_graph** : vue des nœuds et communications
- 🧭 **view_frames** : représentation des repères

> Outils légers, activables à la demande selon les besoins

--- 

# Concepts de base ROS 2

---

## Nœuds

- Un **nœud** est une unité de calcul, typiquement un exécutable (C++, Python...)
- Chaque nœud exécute une tâche précise 
- Les nœuds communiquent entre eux via des **topics,** des **services** ou des **actions**

##### Exemple de système à 3 nœuds

- 🧠 **Nœud 1 (Python)** : Analyse de l’image de la caméra (OpenCV)
- 📍 **Nœud 2 (Python)** : Calcul de la trajectoire pour aller à l'objectif
- ⚙️ **Nœud 3 (C++)** : Pilotage des moteurs du robot

> Un système ROS 2 est composé de **plusieurs nœuds coopérants**

---

![bg cover](./images/introduction/nodes.gif)

---

## Topics & Messages

- Les **topics** sont des canaux de communication utilisés pour les échanges **asynchrones**
- Modèle **Publish / Subscribe**
  - Un ou plusieurs nœuds publie un message sur un topic
  - Un ou plusieurs nœuds peuvent s’y abonner

Exemple : 
> `/camera/image_raw` transporte des images  
> Type du message : `sensor_msgs/msg/Image`

---

![bg cover](./images/introduction/topics.gif)

---


## Services

- Permettent une **communication synchrone** (requête ↔ réponse)
- Exemple : demander la position actuelle d’un robot
- Modèle : un client envoie une **requête**, un serveur répond

> Un service ne peut avoir **qu’un seul fournisseur**, mais plusieurs clients

---

![bg cover](./images/introduction/services.gif)

---

## Actions

- Pour les **tâches longues** : navigation, manipulation...
- Basé sur 3 éléments :
  - 🎯 Un objectif
  - 🔄 Un retour intermédiaire (feedback)
  - ✅ Un résultat

Exemple : atteindre une destination en renvoyant l’avancement à chaque étape

---

![bg cover](./images/introduction/actions.gif)

---


## Paramètres

- Variables **configurables dynamiquement** pour un nœud
- Accessibles via le code ou en ligne de commande

Exemples :
- Vitesse maximale
- Nom du robot
- Choix du contrôleur

🔧 Utiles pour personnaliser un comportement **sans modifier le code**

---

## Packages ROS 2

- Un **package** est une unité de base dans un projet ROS 2
- Il regroupe tous les fichiers liés à une fonctionnalité :
  - Code source des **nœuds** (Python ou C++)
  - Fichiers de configuration (YAML, launch, param...)
  - Ressources : URDF, images, bagfiles...

> Un package = un **dossier structuré**, versionnable et réutilisable

---

## Workspace ROS 2

Un **workspace** est un dossier qui regroupe vos **packages en développement**.

Il contient :
- 📂 Un sous-dossier `src/` où vivent vos packages
- ⚙️ Les dossiers `build/`, `install/` et `log/` générés après compilation

> Un workspace permet de **compiler, tester et exécuter** vos packages localement

---

## Travaux pratiques

- [Installation ROS 2 - Jazzy (PC)](https://ros2.etienne-schmitz.com/docs/install/pc)
- [TP 1 - Introduction ROS 2](https://ros2.etienne-schmitz.com/docs/introduction/tp)
- Si vous avez le temps, débuter la deuxième journée par l'installation du robot [TurtleBot 3](https://ros2.etienne-schmitz.com/docs/install/turtlebot).

---

## Ressources

---

## TODO :

- Donnée des liens vers les ressources
- Système de REP
- Avantages de ROS 2 : Réecrire une partie
- Chiffre sur ROS 2
- Ajouter un lien vers les images de la distributions
- ROS Domain ID
- Partie MiddleWare : On ne comprends bien ce qu’est le dds ? Où sont les actions ? Si rmw ?
- Slide RWM avant l'écosystème
- Launch files

--- 

# Liens utilisés

- Image RVIZ : Pütz, Sebastian & Wiemann, Thomas & Hertzberg, Joachim. (2019). Tools for Visualizing, Annotating and Storing Triangle Meshes in ROS and RViz. 1-6. 10.1109/ECMR.2019.8870953. 
- 