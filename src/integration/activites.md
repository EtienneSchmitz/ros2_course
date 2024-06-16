# Atelier - Intégration avec ROS 2

L'intégration consiste à intégrer dans une même cellule robotique les 3 briques logicielles travaillées les autres jours, à savoir :

* La manipulation par le bras robotique
* La navigation avec le robot roulant
* La vision avec le réseau de neurones

Le scenario de l'intégration est un système de tri robotisé de cubes dans trois bacs différents selon leur marquage au feutre.


## 1. Actions séquentielles de la cellule robotique

Les actions minimale de la cellule robotique sont les suivantes :

1. Le bras WidowX-250 6DOF est utilisé pour récupérer un cube. Cette action est réalisée par le nœud de manipulation qui contrôle le bras robotique.
2. Le bras effectue une tâche de pick-and-place pour déplacer le cube récupéré vers un emplacement temporaire.

3. Une fois que le cube a été déplacés, le bras récupère un cube chiffré. Le chiffre sur le cube peut varier de 1 à 3, mais il est possible d'aller jusqu'à 9 (via un modulo).  
La détection du chiffre peut être effectuée soit par une webcam, soit par une photo prise en réel.  Cette photo est envoyée au réseau de neurones qui va effectuer une prédiction sur le label marqué à la main.

4. Le nœud de navigation récupère les coordonnées du cube chiffré et son label. Le Turtlebot lit le label du cube et se rend à la case correspondante (1, 2 ou 3). 

5. Il effectue une rotation de 360° pour faire chuter le cube dans la zone de tri à l'aide du mât.

Le robot fais cette opération trois fois (égale au nombre de cube sur la table dans la simulation).

<u>Note importante :</u> Pour une gestion plus efficace et organisée, il est recommandé d'utiliser un fichier `.launch` pour démarrer l'intégralité de la démonstration.

## 2. Présentation Orale

La présentation orale comprendra les éléments suivants :
- Une présentation de 15 minutes, accompagnée d'un diaporama, pour expliquer et illustrer votre travail.
- Une démonstration en direct de 5 minutes pour montrer votre projet en action. Assurez-vous d'avoir une vidéo de sauvegarde prête en cas de problèmes techniques imprévus.
- Une session de questions-réponses de 10 minutes où vous pourrez répondre aux questions et clarifier tout point qui nécessite une explication supplémentaire.



