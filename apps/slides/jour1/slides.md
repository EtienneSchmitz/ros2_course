---
theme: ../../../packages/theme-bootcamp/src/slidev
title: ROS 2 — Bootcamp — Jour 1 Introduction
author: Etienne Schmitz
info: |
  Deck Jour 1 — Introduction à ROS 2 (écosystème, concepts, organisation projet, CLI).
  Portage Slidev du deck 2025, adapté Kilted + robots LeKiwi/SO-101.
mdc: true
layout: cover
day: 1
---

# Jour 1 — Introduction

::subtitle::
ROS 2 · écosystème · concepts · CLI

---
layout: default
---

# Au programme

<ul class="bc-agenda">
<li><span>Ce qu'est ROS 2 et son <strong>écosystème</strong></span></li>
<li><span>L'<strong>architecture</strong> : graphe de nœuds, RMW, DDS</span></li>
<li><span>Les <strong>concepts</strong> : nodes, topics, services, actions, paramètres</span></li>
<li><span>L'<strong>organisation</strong> d'un projet : packages, workspace, launch, CLI</span></li>
<li><span>La <strong>mise en pratique</strong> : découverte des tutoriels ROS 2 + préparation du projet</span></li>
</ul>

---
layout: section
eyebrow: Partie 01 · Présentation
---

# Un écosystème open-source

::note::
Middleware, distributions et communication : le socle de ROS 2.

---
layout: default
---

# Qu'est-ce que ROS 2 ?

**ROS** = **R**obot **O**perating **S**ystem.

Mais malgré son nom, **ce n'est pas un système d'exploitation** : ROS 2 est un
**middleware** + un **écosystème d'outils** pour construire des applications robotiques.

<v-clicks>

- 🧩 un robot = plusieurs programmes (**nœuds**) : perception, décision, contrôle
- 🔗 ROS 2 les fait **communiquer** entre eux (topics, services, actions)
- ♻️ et fournit des **briques réutilisables** : on ne réécrit pas tout pour chaque robot

</v-clicks>

<v-click>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">💡</div>
<div class="bc-callout__body">
<div class="bc-callout__title">En une phrase</div>
<p>ROS 2 = un <strong>langage commun</strong> + une <strong>boîte à outils</strong> pour passer du prototype au robot industriel.</p>
</div>
</div>

</v-click>

---
layout: default
---

# Ce que ROS 2 fournit

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">🧰 Bibliothèques</div><p>API C++/Python (<code>rclcpp</code>, <code>rclpy</code>), <code>tf2</code>, calcul de trajectoires, <code>ros2_control</code></p></div>
<div class="bc-card" v-click><div class="bc-card__title">🖥️ Outils</div><p>Simulation (Gazebo), visualisation (RViz, Foxglove), enregistrement (<code>rosbag2</code>), build (<code>colcon</code>)</p></div>
<div class="bc-card" v-click><div class="bc-card__title">📐 Conventions</div><p>Messages standard (<code>sensor_msgs</code>…), URDF/SDF, unités SI, nommage des topics</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🌍 Communauté</div><p>Des milliers de packages open-source, docs, ROS Discourse, drivers constructeurs</p></div>
</div>

---
layout: default
---

# Où l'utilise-t-on ?

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">🧪 Recherche</div><p>Prototypage rapide et expérimentation en laboratoire</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🏭 Industrie</div><p>Cobots, automatisation, lignes de production</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🚗 Mobilité</div><p>Véhicules autonomes, drones, AMR</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🦾 Manipulation</div><p>Bras manipulateurs et robots de service</p></div>
</div>

<v-click>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🚀</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Des projets phares construits sur ROS 2</div>
<p><strong>Autoware</strong> pour la conduite autonome, <strong>ROS-Industrial</strong> pour l'usine (ABB, Fanuc, UR…) — on y revient en fin de partie.</p>
</div>
</div>

</v-click>

---
layout: two-cols
---

# Historique

<ul class="bc-timeline">
<li><span class="bc-timeline__year">2010</span> ROS 1 (Willow Garage, robot PR2)</li>
<li><span class="bc-timeline__year">2012</span> ROS-Industrial + création OSRF → Open Robotics</li>
<li><span class="bc-timeline__year">2017</span> ROS 2 : <strong>réécriture complète</strong> (temps réel, sécurité, DDS)</li>
<li><span class="bc-timeline__year">2020</span> Noetic — <strong>dernière</strong> distribution ROS 1</li>
<li><span class="bc-timeline__year">2025</span> Noetic en <strong>fin de vie</strong> · Kilted Kaiju, distribution de cette session</li>
</ul>

::right::

<div class="bc-media">
<img src="./img/pr2_robot.jpg" alt="Robot PR2" />
</div>

---
layout: default
---

# De ROS 1 à ROS 2

Réécriture complète pour les besoins modernes de la robotique :

<v-clicks>

- ⏱️ **temps réel** mieux géré (middleware **DDS**)
- 🔐 **sécurité** renforcée (chiffrement, authentification)
- 🧩 **modularité** accrue, architecture propre
- ↔️ architecture **centralisée → distribuée** (plus de `roscore`)

</v-clicks>

<v-click>

<div class="bc-callout bc-callout--warn">
<div class="bc-callout__icon">⚠️</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Pas de rétrocompatibilité</div>
<p>Un package ROS 2 ne communique qu'avec ROS 2. Des <em>bridges</em> (<code>ros1_bridge</code>) permettent de relier ponctuellement les deux mondes — sans plus.</p>
</div>
</div>

</v-click>

---
layout: default
---

# Le cycle des distributions

<div class="bc-cards">
<div class="bc-card"><div class="bc-card__title">📅 Une par an</div><p>Une nouvelle version chaque <strong>23 mai</strong> (World Turtle Day)</p></div>
<div class="bc-card"><div class="bc-card__title">🐢 Nom de tortue</div><p>Adjectif + tortue, dans l'ordre <strong>alphabétique</strong></p></div>
<div class="bc-card"><div class="bc-card__title">🛡️ LTS tous les 2 ans</div><p>Support <strong>5 ans</strong> (sinon ~1,5 an)</p></div>
<div class="bc-card"><div class="bc-card__title">🐧 Calée sur Ubuntu</div><p>Chaque distro cible une version d'Ubuntu et <strong>suit son support</strong> (ex. Kilted ↔ Ubuntu 24.04)</p></div>
</div>

<div class="bc-callout bc-callout--info">
<img src="./distros/rolling.png" alt="Rolling Ridley" style="height:3.6rem" />
<div class="bc-callout__body">
<div class="bc-callout__title">Rolling Ridley — la branche de tête</div>
<p><strong>Développement continu</strong> : toujours à jour, jamais figée, <strong>sans fin de vie</strong> — mais <strong>non stable</strong>. À réserver aux tests, pas à la production.</p>
</div>
</div>

---
layout: default
---

# Les versions actives

<table class="bc-distros">
<thead>
<tr><th></th><th>Distribution</th><th>Sortie</th><th>Fin de vie</th><th>Type</th></tr>
</thead>
<tbody>
<tr><td></td><td class="bc-distros__name">Makoa Mata-mata</td><td>mai 2027</td><td>déc. 2028</td><td><span class="bc-badge">à venir</span></td></tr>
<tr><td><img src="./distros/lyrical.png" alt="" /></td><td class="bc-distros__name">Lyrical Luth</td><td>mai 2026</td><td>mai 2031</td><td><span class="bc-badge bc-badge--lts">LTS</span></td></tr>
<tr class="is-current"><td><img src="./distros/kilted.png" alt="" /></td><td class="bc-distros__name">Kilted Kaiju</td><td>mai 2025</td><td>déc. 2026</td><td><span class="bc-badge">cette session</span></td></tr>
<tr><td><img src="./distros/jazzy.png" alt="" /></td><td class="bc-distros__name">Jazzy Jalisco</td><td>mai 2024</td><td>mai 2029</td><td><span class="bc-badge bc-badge--lts">LTS</span></td></tr>
<tr><td><img src="./distros/humble.png" alt="" /></td><td class="bc-distros__name">Humble Hawksbill</td><td>mai 2022</td><td>mai 2027</td><td><span class="bc-badge bc-badge--lts">LTS</span></td></tr>
</tbody>
</table>

---
layout: two-cols
---

# Kilted Kaiju (2025)

La distribution **non-LTS** de cette session, sur **Ubuntu 24.04**.

<v-clicks>

- 📦 beaucoup de packages reprennent leur nom ROS 1 suivi d'un **« 2 »** : `Nav2`, `MoveIt 2`
- 🐢 sortie le **23 mai 2025**, support jusqu'à **déc. 2026**
- 🔄 ROS 1 (Noetic) est en **fin de vie** depuis mai 2025

</v-clicks>

::right::

<div class="bc-media">
<img src="./distros/kilted-hd.webp" alt="Mascotte Kilted Kaiju" style="width:26rem; border-radius: 12px" />
</div>

---
layout: default
---

# REP — ROS Enhancement Proposals

Des documents qui **standardisent** ROS (inspirés des **PEP** de Python) :

<v-clicks>

- 📦 organisation des distributions et des packages
- 📨 formats de messages, fichiers, conventions de nommage
- 🔧 évolutions du middleware (DDS, RMW…)

</v-clicks>

<v-click>

> 🧠 Les REP assurent une **gouvernance ouverte** et une **cohérence technique**.
> Ex : [REP 2000](https://www.ros.org/reps/rep-2000.html) (publication), [REP 2002](https://www.ros.org/reps/rep-2002.html) (rolling).

</v-click>

---
layout: default
---

# Avantages

<div class="bc-cards bc-cards--3">
<div class="bc-card" v-click><div class="bc-card__title">⏱️ Gain d'ingénierie</div><p>Des briques éprouvées (navigation, perception, contrôle) prêtes à l'emploi</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🧩 Modularité</div><p>Architecture en nœuds : remplacer un composant sans tout casser</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🔓 Pas de lock-in</div><p>Standards ouverts, multi-fournisseurs, aucune dépendance constructeur</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🌍 Écosystème riche</div><p>Des milliers de packages, simulateurs et outils de debug</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🤝 Communauté</div><p>Forums, GitHub, ROS Discourse + support professionnel (intégrateurs)</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🔁 Du simu au réel</div><p>Le même code du simulateur au robot, du prototype à l'industrie</p></div>
</div>

---
layout: default
---

# Du simu au réel : un piège classique

Le **même code** passe du simulateur au robot — c'est un vrai atout. Mais ⚠️ **attention** :

<div class="bc-callout bc-callout--warn">
<div class="bc-callout__icon">⚠️</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Le sim-to-real gap</div>
<p>La simulation <strong>ne reproduit pas tout</strong>. Le réel ajoute <strong>friction</strong>, <strong>bruit des capteurs</strong>, <strong>latences</strong> et <strong>calibration</strong>. Un système qui marche en simu demande <strong>toujours</strong> une phase d'ajustement sur le vrai robot.</p>
</div>
</div>

---
layout: default
---

# Limites

<div class="bc-cards bc-cards--3">
<div class="bc-card" v-click><div class="bc-card__title">📘 Apprentissage</div><p>Concepts denses (DDS, QoS, tf2, colcon) à assimiler</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🐧 Surtout Linux</div><p>Support Windows/macOS partiel ; Docker souvent nécessaire</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🔄 Évolution rapide</div><p>APIs et distributions changent vite → veille nécessaire</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🧱 Standards rigides</div><p>Parfois inadaptés à des cas très spécifiques</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🐢 Latence</div><p>La couche middleware ajoute un coût ; tuning QoS requis</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🧩 Mise en place</div><p>Configurer un système complet reste long et technique</p></div>
</div>

---
layout: default
---

# Langages supportés

Deux langages **officiels** :

- 🐍 **Python** (`rclpy`) — scripts, prototypage, démos pédagogiques
- ⚙️ **C++** (`rclcpp`) — drivers, nœuds critiques, performance

Autres via *bindings* : 🦀 Rust (`rclrs`), ☕ Java, Ada…

<v-click>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🔬</div>
<div class="bc-callout__body">
<div class="bc-callout__title">micro-ROS</div>
<p>Une version allégée de ROS 2 pour les <strong>microcontrôleurs</strong> (ESP32, STM32…) : un capteur ou un actionneur rejoint directement le graphe ROS 2.</p>
</div>
</div>

</v-click>

---
layout: default
---

# Robots compatibles

- 🚗 Robots à roues : AGV, AMR (ex. **LeKiwi**)
- 🦾 Cobots et bras manipulateurs (ex. **SO-101**)
- 🚁 Robots volants : drones, UAV
- 🦿 Robots à pattes et humanoïdes

<v-click>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🔌</div>
<div class="bc-callout__body">
<div class="bc-callout__title">C'est quoi un driver ROS ?</div>
<p>Le <strong>pont logiciel</strong> entre le matériel et le graphe : il publie les données des capteurs en <em>topics</em> et exécute les commandes reçues. Fourni par le constructeur, un labo ou la communauté — catalogue sur <a href="https://robots.ros.org">robots.ros.org</a>.</p>
</div>
</div>

</v-click>

---
layout: two-cols
---

# Architecture en couches

De votre **code applicatif** jusqu'au **réseau**, ROS 2 s'organise en **5 couches**
empilées : chacune masque la complexité de la suivante.

> On détaille chaque couche dans les slides suivantes.

::right::

<div class="bc-media bc-media--frame">
<img src="./img/ros-architecture.jpg" alt="ROS 2 Architecture Overview" />
</div>

---
layout: two-cols
---

# Architecture en couches

De votre code jusqu'au réseau, ROS 2 empile **5 couches**.

**Couche 1 / 5 — 🧩 Vos nœuds**

Votre **code applicatif**. Chaque nœud (C++ ou Python) réalise une tâche :
perception, décision, contrôle. C'est la **seule couche que vous écrivez**.

::right::

<div class="bc-layers">
<div class="bc-layers__item is-active"><div class="bc-layers__name">🧩 Vos nœuds</div><div class="bc-layers__desc">votre code applicatif (C++ / Python)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐍 rclcpp / rclpy</div><div class="bc-layers__desc">l'API ROS 2 (au-dessus de rcl, en C)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🔌 RMW</div><div class="bc-layers__desc">masque le middleware réseau</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🛰️ DDS</div><div class="bc-layers__desc">le transport réseau réel</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐧 OS</div><div class="bc-layers__desc">Linux (Windows / macOS partiels)</div></div>
</div>

---
layout: two-cols
---

# Architecture en couches

**Couche 2 / 5 — 🐍 rclcpp / rclpy**

L'**API ROS 2**. `rclcpp` (C++) et `rclpy` (Python) exposent nœuds, topics,
services… Les deux s'appuient sur **`rcl`**, une base commune en C → un
**comportement identique** entre les langages.

::right::

<div class="bc-layers">
<div class="bc-layers__item"><div class="bc-layers__name">🧩 Vos nœuds</div><div class="bc-layers__desc">votre code applicatif (C++ / Python)</div></div>
<div class="bc-layers__item is-active"><div class="bc-layers__name">🐍 rclcpp / rclpy</div><div class="bc-layers__desc">l'API ROS 2 (au-dessus de rcl, en C)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🔌 RMW</div><div class="bc-layers__desc">masque le middleware réseau</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🛰️ DDS</div><div class="bc-layers__desc">le transport réseau réel</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐧 OS</div><div class="bc-layers__desc">Linux (Windows / macOS partiels)</div></div>
</div>

---
layout: two-cols
---

# Architecture en couches

**Couche 3 / 5 — 🔌 RMW**

*ROS MiddleWare interface* : un **adaptateur universel** entre ROS 2 et le DDS.

Chaque DDS a sa propre API → le RMW expose une **interface unique** par-dessus.

→ Changer de DDS = une variable (`RMW_IMPLEMENTATION`), **sans toucher au code**.

::right::

<div class="bc-layers">
<div class="bc-layers__item"><div class="bc-layers__name">🧩 Vos nœuds</div><div class="bc-layers__desc">votre code applicatif (C++ / Python)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐍 rclcpp / rclpy</div><div class="bc-layers__desc">l'API ROS 2 (au-dessus de rcl, en C)</div></div>
<div class="bc-layers__item is-active"><div class="bc-layers__name">🔌 RMW</div><div class="bc-layers__desc">masque le middleware réseau</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🛰️ DDS</div><div class="bc-layers__desc">le transport réseau réel</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐧 OS</div><div class="bc-layers__desc">Linux (Windows / macOS partiels)</div></div>
</div>

---
layout: two-cols
---

# Architecture en couches

**Couche 4 / 5 — 🛰️ DDS**

Le **transport réel** : découverte des nœuds, fiabilité et **QoS**. Standard ouvert
publié par l'**OMG** (*Object Management Group*, qui maintient aussi UML) → plusieurs
implémentations **interchangeables** : **Fast DDS** (défaut), **Cyclone DDS**…

::right::

<div class="bc-layers">
<div class="bc-layers__item"><div class="bc-layers__name">🧩 Vos nœuds</div><div class="bc-layers__desc">votre code applicatif (C++ / Python)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐍 rclcpp / rclpy</div><div class="bc-layers__desc">l'API ROS 2 (au-dessus de rcl, en C)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🔌 RMW</div><div class="bc-layers__desc">masque le middleware réseau</div></div>
<div class="bc-layers__item is-active"><div class="bc-layers__name">🛰️ DDS</div><div class="bc-layers__desc">le transport réseau réel</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐧 OS</div><div class="bc-layers__desc">Linux (Windows / macOS partiels)</div></div>
</div>

---
layout: two-cols
---

# Architecture en couches

**Couche 5 / 5 — 🐧 OS**

Le **système d'exploitation**. ROS 2 tourne surtout sous **Linux (Ubuntu)** ;
support Windows/macOS partiel. C'est par le réseau de l'OS que **DDS** fait
transiter les messages.

::right::

<div class="bc-layers">
<div class="bc-layers__item"><div class="bc-layers__name">🧩 Vos nœuds</div><div class="bc-layers__desc">votre code applicatif (C++ / Python)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🐍 rclcpp / rclpy</div><div class="bc-layers__desc">l'API ROS 2 (au-dessus de rcl, en C)</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🔌 RMW</div><div class="bc-layers__desc">masque le middleware réseau</div></div>
<div class="bc-layers__item"><div class="bc-layers__name">🛰️ DDS</div><div class="bc-layers__desc">le transport réseau réel</div></div>
<div class="bc-layers__item is-active"><div class="bc-layers__name">🐧 OS</div><div class="bc-layers__desc">Linux (Windows / macOS partiels)</div></div>
</div>

---
layout: default
---

# DDS — le moteur réseau

Sous le RMW, ROS 2 utilise **DDS** (*Data Distribution Service*), middleware réseau
standardisé par l'**OMG** (qui maintient aussi UML).

<v-clicks>

- 🛠️ **QoS** (*Quality of Service*) : règle la **fiabilité**, le **débit**, l'**historique** et la durée de vie des échanges
- 🔒 **sécurité** (`sros2`) : chiffrement, authentification, contrôle d'accès
- 🔄 **interopérabilité** : Fast DDS, Cyclone DDS, Connext…

</v-clicks>

<v-click>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🔁</div>
<div class="bc-callout__body">
<div class="bc-callout__title">« Changer de DDS », ça veut dire quoi ?</div>
<p>Toutes ces implémentations suivent le <strong>même standard OMG</strong>. On bascule de l'une à l'autre via la variable <code>RMW_IMPLEMENTATION</code>, <strong>sans toucher à votre code</strong> — pour des raisons de licence, de performance, de temps réel ou d'embarqué.</p>
</div>
</div>

</v-click>

---
layout: section
eyebrow: Partie 02 · Boîte à outils
---

# La boîte à outils

::note::
Simulation, visualisation et briques applicatives.

---
layout: two-cols
---

# Simulation & visualisation

- 🌍 **Gazebo** — simulation physique 3D (capteurs, moteurs)
- 🧭 **RViz** — visualiseur 3D des données ROS
- 🧩 **rqt** — outils graphiques (`rqt_graph`, `rqt_console`)
- 🛰️ **Foxglove** — visualisation moderne (web)

::right::

<div class="bc-media">
<img src="./img/gazebo.png" alt="Gazebo" />
<img src="./img/rviz.png" alt="RViz" />
</div>

---
layout: two-cols
---

# Briques applicatives

- 🚗 **Nav2** — Navigation autonome (Jour 2)
- 🦾 **MoveIt 2** — Manipulation (Jour 3)
- ⚙️ **ros2_control** — Contrôle bas-niveau temps réel
- 🌲 **Behavior Trees** — Décision (Nav2, Groot 2)

> Le logiciel reste **indépendant du hardware** du robot.

::right::

<div class="bc-media">
<img src="./img/ros2_control.png" alt="ros2_control" />
</div>

---
layout: two-cols
---

# Behavior Trees & Groot

- 🌲 modèle de décision en **arborescence d'actions**
- remplace les machines à états (FSM)
- utilisé par **Nav2**, MoveIt Task Constructor
- édition visuelle avec **Groot 2**

🔗 [behaviortree.dev](https://www.behaviortree.dev/docs/ros2_integration/)

::right::

<div class="bc-media">
<img src="./img/groot.png" alt="Groot 2" />
</div>

---
layout: default
---

# Projets connexes

ROS 2 sert de **socle** à de nombreux projets spécialisés :

<div class="bc-cards bc-cards--3">
<div class="bc-card"><div class="bc-card__title">🚗 Autoware</div><p>Conduite autonome open-source (voitures, navettes)</p></div>
<div class="bc-card"><div class="bc-card__title">🏭 ROS-Industrial</div><p>Besoins industriels et bras constructeurs (ABB, Fanuc, UR…)</p></div>
<div class="bc-card"><div class="bc-card__title">🚦 Open-RMF</div><p>Coordination de <strong>flottes</strong> de robots de service (hôpitaux, bâtiments)</p></div>
<div class="bc-card"><div class="bc-card__title">🛰️ Space ROS</div><p>ROS 2 durci pour le <strong>spatial</strong> et les systèmes critiques (NASA)</p></div>
<div class="bc-card"><div class="bc-card__title">🔬 micro-ROS</div><p>ROS 2 sur <strong>microcontrôleurs</strong> (ESP32, STM32…)</p></div>
<div class="bc-card"><div class="bc-card__title">🚁 PX4 / MAVROS</div><p>Pont vers les autopilotes de <strong>drones</strong> et UAV</p></div>
</div>

> 🧩 Un écosystème en pleine expansion dans la robotique moderne.

---
layout: two-cols
---

# Conventions partagées

Tout le monde « parle le même langage » → **interopérabilité**.

- 📏 **Unités SI** : mètre, seconde, radian, newton
- 📨 **Messages standardisés** : `geometry_msgs`, `sensor_msgs`
- 🧩 **Nommage** : `/joint_states`, `/scan`, `/cmd_vel`
- 📂 **Formats** : URDF, SRDF, YAML

::right::

## La boîte à outils associée

- 🧩 **URDF** — description du robot
- 🔄 **tf2** — transformations entre repères datées
- 🎥 **rosbag2** — enregistrement / rejeu
- 📈 **PlotJuggler** — courbes temps réel
- 📊 **rqt_graph** — vue des nœuds

---
layout: section
eyebrow: Partie 03 · Concepts
---

# Les briques de base

::note::
Nœuds, topics, services, actions et paramètres.

---
layout: two-cols
---

# Les nœuds

- Un **nœud** = une unité de calcul (exécutable C++ ou Python)
- Chaque nœud fait **une** tâche précise
- Ils communiquent via **topics / services / actions**
- Exemple : **caméra** → **planif** → **moteurs**

::right::

<div class="bc-media">
<img src="./img/nodes.gif" alt="Graphe de nœuds" />
</div>

---
layout: two-cols
---

# Topics & messages

Le bus **publish / subscribe** : des nœuds publient, d'autres s'abonnent — **sans se connaître**.

- 📡 **asynchrone** : N publishers, N subscribers
- 🏷️ identifié par un **nom** (`/scan`) et un **type** de message
- 🔁 idéal pour les **flux continus** (capteurs, commandes)
- 🕵️ communication **anonyme** et **découplée**

Ex : `/camera/image_raw` → `sensor_msgs/msg/Image`

::right::

<div class="bc-media">
<img src="./img/topics.gif" alt="Topics" />
</div>

---
layout: two-cols
---

# Services

Communication **synchrone** client → serveur, en **requête / réponse**.

- 🙋 le client **envoie une requête** puis **attend** la réponse
- 🧑‍🔧 **un seul** serveur, plusieurs clients possibles
- ⏱️ pour une **tâche courte** avec un résultat immédiat
- ⚠️ bloquant → **à éviter** pour les tâches longues (→ action)

Ex : « remets le robot à l'origine », « prends une photo »

::right::

<div class="bc-media">
<img src="./img/services.gif" alt="Services" />
</div>

---
layout: two-cols
---

# Actions

Pour les **tâches longues**, suivies dans le temps :

- 🎯 le client envoie un **objectif** (goal)
- 📡 le serveur renvoie du **feedback** continu (progression)
- ✅ puis un **résultat** final
- 🛑 **annulable** à tout moment
- 🧱 bâtie sur **topics + services** sous le capot

Ex : « va à cette pose » (Nav2) — on suit la progression, on peut annuler

::right::

<div class="bc-media">
<img src="./img/actions.gif" alt="Actions" />
</div>

---
layout: default
---

# Paramètres

Configurent un nœud **sans recompiler** — chaque nœud expose ses propres paramètres **typés**.

<v-clicks>

- 🎛️ seuils, fréquences, vitesses, repères, couleurs…
- 💻 lus / écrits par le **code** ou la **CLI** (`ros2 param list/get/set`)
- 📄 chargés depuis un **fichier YAML** ou surchargés au **lancement**
- 🔔 un nœud peut **réagir** à un changement (callback)

</v-clicks>

<v-click>

Exporter la configuration complète d'un nœud en YAML :

```bash
ros2 param dump /turtlesim > turtlesim.yaml
```

</v-click>

---
layout: section
eyebrow: Partie 04 · Projet
---

# Organiser son code

::note::
Workspace, packages, launch et CLI.

---
layout: two-cols
---

# Workspace & packages

```text
ros2_bootcamp_ws/
├── src/
│   ├── mission_interfaces/
│   └── mission/
├── build/  install/  log/
```

- **package** = unité de build (`ros2 pkg create`)
- **workspace** = ensemble de packages (`colcon build`)

::right::

# Launch & isolation

```bash
ros2 launch mission mission.launch.py
```

- **launch file** : démarre plusieurs nœuds + params
- `ROS_DOMAIN_ID` : isole votre robot sur le réseau partagé

```bash
export ROS_DOMAIN_ID=42
```

---
layout: default
---

# `ROS_DOMAIN_ID` — isolation réseau

DDS fonctionne par **multidiffusion** sur le réseau local. Pour éviter que les robots se
perturbent, on isole les communications par un identifiant (`0`–`232`).

<v-clicks>

- même `ROS_DOMAIN_ID` sur **le robot et le PC**
- un numéro **unique par groupe** dans la salle
- à définir dans `~/.bashrc`

</v-clicks>

```bash
export ROS_DOMAIN_ID=12
```

---
layout: section
eyebrow: Partie 05 · Pratique
---

# À vous de jouer

::note::
La première brique du projet final.

---
layout: default
---

# Exercices

<ul class="bc-agenda">
<li><span><a href="https://ros2.etienne-schmitz.com/installation/">Installation ROS 2 Kilted</a> (natif ou Docker)</span></li>
<li><span><a href="https://ros2.etienne-schmitz.com/introduction/">Exercice 1 — premiers pas avec ROS 2</a></span></li>
<li><span>Si le temps le permet : préparer les robots <strong>LeKiwi</strong> / <strong>SO-101</strong></span></li>
</ul>

---
layout: end
---
