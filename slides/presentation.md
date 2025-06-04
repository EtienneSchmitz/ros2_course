---
marp: true
paginate: true
theme: gaia
footer : 'ROS 2 - Etienne Schmitz'
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
 
# ROS 2 - Présentation du déroulement du workshop

## Etienne Schmitz

---

## 👤 À propos de moi

- Ingénieur en informatique spécialisé en robotique, diplômé de l’ENSEIRB-MATMECA (promo 2021)
- Enseignant permanent en informatique et responsable du E-Smart Lab à l’ESME Bordeaux
- Ancien chef d’équipe de NAMeC SSL, équipe participant à la RoboCup Small Size League (robotique compétitive)
- Formateur indépendant sur ROS 2, avec des workshops dispensés notamment à l’IMERIR (depuis 2022)

---

<!-- _class: lead -->

## Sommaire

- Déroulé de la semaine
- Organisation d’une séance
- Consignes (Projets)
- Notes
- Matériels utilisés
- Divers

---

## 🗓️ Déroulé de la semaine

**Jour 1** : Installation & Introduction à ROS 2  
**Jour 2** : Navigation  
**Jour 3** : Manipulation  
**Jour 4** : Vision & Intelligence Artificielle  
**Jour 5** : Intégration  
**Jour 6** : Intégration (matin) / Oraux (après-midi)

Horaires : **8h15 – 17h15** avec une pause déjeuner de **12h00 – 13h30**

---

## 📅 Organisation d’une séance

- Quiz en début de séance sur la journée précédente 
    - Introduction à ROS 2
    - Navigation
    - Manipulation
    - Vision
- Présentation théorique (30 min à 1h) par l'enseignant.
- Travail libre sur l'activité de la journée, le projet et ou les activités précédentes.

--- 

## 📝 Système de notation

- 🎯 Évaluations individuelles
    - **Quiz** : QCM, QCU sous Moodle
    - **Assiduité et participation** : implication, questions, entraide
- 👥 Évaluations en groupe
    - Atteinte des **objectifs techniques** des journées **navigation** (Jour 2) et **manipulation** (Jour 3)
    - 🗣️ Évaluation orale (Jour 6 après-midi) : Présentation synthétique du projet et démonstration
    - **Rapport PDF** présentant l’ensemble des étapes du projet


---

## 🛠️ Projet final

L’objectif est de concevoir un **système robotique intelligent complet** avec ROS 2.
1. **Analyse d’objet par caméra**  
   → Reconnaissance d’un objet ou d’un cube numéroté via IA

2. **Manipulation (simulation bras robotique)**  
   → Le bras saisit l’objet analysé et le dépose à une position cible

3. **Navigation (TurtleBot 3)**  
   → Le robot mobile récupère l’objet et le transporte à un point donnée.

---

## 🧪 Contraintes techniques

- PC avec Ubuntu 24.04 ou Docker + ROS 2 Jazzy.
- Utilisation exclusive des composants (topics, services, ...) et des outils (RViz, Gazebo, ROS 2 CLI, ...) de **ROS 2 Jazzy**.
- Turtlebot 3 (Réel) et OpenMANIPULATOR-X (Simulation). 

---

## ℹ️ Divers

- Le workshop est accessible en ligne :  
  👉 **https://ros2.etienne-schmitz.com**
- Certaines journées sont plus chargées (ex : Navigation)  
  → Vous pouvez y revenir plus tard si nécessaire
- Vous êtes encouragés à ajouter des éléments bonus pour personnaliser et enrichir votre projet.
- Le projet peut être réalisé entièrement en simulation.


---
<!-- _class: lead -->

## 🧭 Légende des pictogrammes du site

| Icône | Signification                                         |
| :---: | ----------------------------------------------------- |
|   💻  | Action à réaliser sur votre machine Ubuntu ou Docker  |
|   🤖  | Action à réaliser sur le robot via SSH                |
|   🌐  | Lien web utile ou documentation                       |
|   🐍  | Code Python à exécuter localement                     |
|   📥  | Ressource à télécharger                               |

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## 🎤 Bonne chance à tous !

Soyez curieux, testez, explorez…  
Et surtout, **amusez-vous avec ROS 2 !**


