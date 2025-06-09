---
marp: true
title: Introduction à ROS 2
theme: default
paginate: true
footer : 'ROS 2 - Étienne Schmitz'
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

<!-- # Objectifs

- Comprendre les principes fondamentaux de ROS 2
- Explorer les composants de l’écosystème ROS
- Identifier les cas d’usage et les limitations
- Préparer son environnement de développement

--- -->

<!-- _class: lead -->

# ROS 2 : un écosystème open-source pour la robotique

---
## Qu'est-ce que ROS 2 ?

**ROS 2 (Robot Operating System 2)** est une suite logicielle (*middleware*) open-source conçue pour simplifier le développement de systèmes robotiques complexes.  
Plutôt que de multiplier les SDKs pour chaque robot, ROS 2 propose une infrastructure unifiée, modulaire et réutilisable.

**ROS 2 est utilisé dans de nombreux domaines** : recherche académique, industrie, robotique mobile, bras manipulateurs, véhicules autonomes, etc.

--- 

## Les principales fonctionnalités de ROS 2

Voici **quelques fonctionnalités principaux** de ROS 2 :

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
- Architecture **distribuée (ROS 2)** vs **centralisée Master-Slave (ROS 1)**  
- Meilleure gestion du **temps réel** grâce au middleware DDS  
- **Rétrocompatibilité partielle** : des ponts existent, mais **ROS 2 ≠ ROS 1**  
  → Un package ROS 2 fonctionne uniquement avec d'autres packages ROS 2

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

![bg left:50% 95%](./images/introduction/distribution.png)

---

## TODO :

- Ajouter le Python / C++
- Ecosystème ROS 2
- Donnée des liens vers les ressources
- Système de REP