---
theme: ../../../packages/theme-bootcamp/src/slidev
title: ROS 2 — Bootcamp — Présentation
author: Etienne Schmitz
info: |
  Deck de présentation — l'intervenant et les projets du cours ROS 2.
  À lancer en ouverture de bootcamp.
mdc: true
layout: cover
---

# ROS 2 — Bootcamp

::subtitle::
Présentation · l'intervenant · les projets du cours

---
layout: default
---

# Qui suis-je ?

**Etienne SCHMITZ** — votre formateur ROS 2.

<v-clicks>

- 🎓 **Ingénieur** en informatique spécialisé en robotique (ENSEIRB-MATMECA, 2021)
- 👨‍🏫 **Enseignant** permanent en informatique & responsable du **E-Smart Lab** (ESME Bordeaux)
- 🤖 J'**encadre des stages** autour de la **robotique**
- 🏆 Ancien chef d'équipe **NAMeC SSL** (RoboCup Small Size League)
- 🖨️ **Maker dans l'âme** — possesseur d'imprimante 3D
- 📱 **Concepteur d'applications** mobile et web

</v-clicks>

<style>
.slidev-layout ul {
  list-style: disc;
  padding-left: 2rem;
  margin-top: 1.6rem;
}
.slidev-layout ul li {
  padding-left: 0.6rem;
  margin-bottom: 1.1rem;
}
</style>

---
layout: default
---

# L'esprit du bootcamp

<div class="bc-cards bc-cards--3">
<div class="bc-card" v-click><div class="bc-card__title">🛠️ Pratique d'abord</div><p>Théorie courte, puis on code. On apprend ROS 2 en <strong>construisant</strong> de vrais robots.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🔁 Itératif</div><p>On essaie, on casse, on corrige. <strong>L'erreur fait partie du jeu</strong> — c'est comme ça qu'on progresse.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🤝 Collaboratif</div><p>On avance <strong>en équipe</strong> : questions bienvenues, entraide encouragée, on partage ce qu'on découvre.</p></div>
</div>

<div class="bc-callout bc-callout--info" v-click>
<div class="bc-callout__icon">👋</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Le fil conducteur</div>
<p><strong>On construit, on simule, on déploie</strong> — comme en vrai projet robotique. Visez l'excellence et, surtout, prenez du plaisir !</p>
</div>
</div>

---
layout: section
eyebrow: Le fil rouge
---

# Les projets du cours

::note::
Un parcours progressif : de l'introduction au système robotique complet.

---
layout: default
---

# Le parcours en un coup d'œil

<ul class="bc-agenda">
<li><span><strong>Jour 1</strong> — Introduction à ROS 2 : écosystème, concepts, CLI</span></li>
<li><span><strong>Jour 2</strong> — Navigation : base mobile <strong>LeKiwi</strong>, SLAM, Nav2</span></li>
<li><span><strong>Jour 3</strong> — Manipulation : bras <strong>SO-101</strong>, MoveIt 2, pick &amp; place</span></li>
<li><span><strong>Jour 4</strong> — Vision &amp; <strong>Intelligence Artificielle</strong></span></li>
<li><span><strong>Jours 5-6</strong> — Intégration : le <strong>projet final</strong> de bout en bout</span></li>
</ul>

---
layout: default
---

# Les briques à construire

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">🧩 Fondations</div><p>Nodes, topics, services, actions, packages & workspace — le langage commun de ROS 2</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🛞 Navigation</div><p>Base holonome LeKiwi : téléop, cartographie SLAM (<code>slam_toolbox</code>) et navigation autonome avec Nav2</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🦾 Manipulation</div><p>Bras SO-101 6 DoF : <code>ros2_control</code>, MoveIt 2, cinématique directe/inverse et pick &amp; place</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🎯 Intégration</div><p>Pipeline complet perception → manipulation → navigation, conclu par une soutenance + rapport</p></div>
</div>

---
layout: section
eyebrow: Le cours
---

# Les robots du cours

::subtitle::
Tout le cours se déroule **en simulation** \*

::note::
Deux robots open-source, imprimables en 3D, pilotés sous ROS 2. Tout se fait en simulation (Gazebo / RViz) — aucun matériel requis.

---
layout: default
---

# Tout en simulation <span style="font-size:.5em; vertical-align:super; opacity:.6">*</span>

L'**ensemble du cours et du projet** se déroule **en simulation** (Gazebo / RViz) — sur votre machine, sans robot physique.

<div class="bc-cards bc-cards--3">
<div class="bc-card" v-click><div class="bc-card__title">💻 Chacun sa machine</div><p>Personne n'attend son tour : tout le monde avance en parallèle, à son rythme.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🔁 Sans risque</div><p>On teste, on casse, on relance. Aucun robot abîmé, on recommence à l'infini.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🎯 Concentré sur ROS 2</div><p>Pas de soucis matériel : on se focalise sur le code et l'architecture.</p></div>
</div>

<p style="opacity:.55; font-size:.78em; margin-top:2rem">* un passage sur robot réel reste possible en démo, selon la disponibilité du matériel.</p>

---
layout: two-cols
---

# 🛞 La base mobile LeKiwi

Une base **holonome** (roues kiwi à 120°) : elle se déplace dans **toutes les directions** sans tourner sur elle-même.

<v-clicks>

- 🗺️ Cartographie de l'environnement (**SLAM**)
- 🧭 Navigation autonome vers un point cible (**Nav2**)
- 📦 Rôle dans le projet : **transporter** l'objet

</v-clicks>

::right::

<div class="bc-media">
<img src="./img/lekiwi.png" alt="Base mobile LeKiwi" />
</div>

---
layout: two-cols
---

# 🦾 Le bras SO-101

Un bras manipulateur **6 DoF** open-source, piloté via `ros2_control` et **MoveIt 2**.

<v-clicks>

- 🎯 Planification de trajectoire (cinématique inverse)
- ✊ Préhension : **pick & place**
- 🤖 Rôle dans le projet : **saisir et déposer** l'objet

</v-clicks>

::right::

<div class="bc-media">
<img src="./img/so101.jpg" alt="Bras SO-101" />
</div>

---
layout: section
eyebrow: Le fil rouge
---

# Le projet final

::note::
Le but de la semaine : un système robotique complet, de la perception à la navigation.

---
layout: default
---

# La séquence

Assembler un **système robotique complet** : des robots qui coopèrent sous ROS 2.

<ul class="bc-agenda">
<li><span>👁️ <strong>Perception</strong> — analyser l'objet (couleur, forme, IA…)</span></li>
<li><span>🦾 <strong>Manipulation</strong> — le <strong>saisir</strong> et le déposer à une position cible</span></li>
<li><span>🛞 <strong>Navigation</strong> — le <strong>transporter</strong> de façon autonome jusqu'au point voulu</span></li>
</ul>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🎯</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Objectif</div>
<p>Enchaîner perception → manipulation → navigation de bout en bout, puis le défendre en soutenance.</p>
</div>
</div>

---
layout: default
---

# Et si vous aviez d'autres idées ?

Le scénario perception → manipulation → navigation est la **trame proposée**… mais ce n'est pas la seule !

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">🔄 Adaptez le scénario</div><p>Autre séquence d'actions, autre mission, autres objets : tant que ça raconte une histoire robotique cohérente.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🤖 Autres robots / capteurs</div><p>Un autre robot, un drone, un autre bras, un capteur différent… en simulation ou en réel.</p></div>
</div>

<div class="bc-callout bc-callout--warn" v-click>
<div class="bc-callout__icon">✅</div>
<div class="bc-callout__body">
<div class="bc-callout__title">La seule règle</div>
<p>Votre projet doit être construit <strong>avec ROS 2</strong>. Le reste, c'est votre terrain de jeu — venez en discuter !</p>
</div>
</div>

---
layout: section
eyebrow: Organisation
---

# Les modalités

::note::
Déroulé d'une séance et système de notation.

---
layout: default
---

# Organisation d'une séance

<ul class="bc-agenda">
<li><span>🧠 <strong>Quiz</strong> en début de séance sur la journée précédente</span></li>
<li><span>📊 <strong>Présentation théorique</strong> (30 min à 1 h) par l'enseignant</span></li>
<li><span>🛠️ <strong>Travail libre</strong> sur l'activité du jour, le projet et/ou les activités précédentes</span></li>
</ul>

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🕗</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Horaires</div>
<p><strong>9h00 – 12h30</strong> · pause déjeuner · <strong>13h30 – 17h00</strong>.</p>
</div>
</div>

---
layout: default
---

# Système de notation

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">🎯 Individuel</div><p><strong>Quiz</strong> (QCM/QCU) · <strong>assiduité &amp; participation</strong> : implication, questions, entraide</p></div>
<div class="bc-card" v-click><div class="bc-card__title">👥 En groupe</div><p><strong>Objectifs techniques</strong> Navigation (J2) &amp; Manipulation (J3) · <strong>oral</strong> (J6) · <strong>rapport PDF</strong> du projet</p></div>
</div>

<div class="bc-callout bc-callout--warn" v-click>
<div class="bc-callout__icon">🗣️</div>
<div class="bc-callout__body">
<div class="bc-callout__title">L'oral (J6) — les règles</div>
<p><strong>Tous les membres</strong> du groupe doivent <strong>prendre la parole</strong> · démonstration en direct · chacun doit savoir expliquer <strong>n'importe quelle partie</strong> du projet.</p>
</div>
</div>

<style>
.slidev-layout .bc-card__title {
  margin-bottom: 0.9rem;
}
.slidev-layout .bc-card p {
  line-height: 1.7;
}
</style>

---
layout: default
---

# Et l'IA dans tout ça ?

<div class="bc-callout bc-callout--info">
<div class="bc-callout__icon">🤖</div>
<div class="bc-callout__body">
<div class="bc-callout__title">Autorisée — sans modération</div>
<p>Copilot, ChatGPT, Claude… utilisez les outils que vous voulez pour avancer plus vite.</p>
</div>
</div>

<div class="bc-cards bc-cards--2">
<div class="bc-card" v-click><div class="bc-card__title">✅ La condition</div><p>Vous devez <strong>comprendre ce que vous écrivez</strong>. Si vous ne savez pas l'expliquer, ne le collez pas.</p></div>
<div class="bc-card" v-click><div class="bc-card__title">🎤 Le test</div><p>À l'oral, on peut vous demander de <strong>justifier n'importe quelle ligne</strong> — l'IA ne passera pas la soutenance à votre place.</p></div>
</div>

---
layout: end
---

# Prêts à démarrer ?
