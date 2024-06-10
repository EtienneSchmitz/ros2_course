# Atelier - Navigation (TurtleBot 3) avec ROS 2

## Robot réel

🔍 Avant de commencer, assurez-vous que la configuration réseau de ROS 2 sur votre PC et sur le TB3 est correcte. La variable d'environnement `ROS_DOMAIN_ID` doit être définie de manière unique pour chaque robot pour éviter les conflits de communication. Vous pouvez le faire en ajoutant la ligne suivante à votre fichier `.bashrc` :

```bash
export ROS_DOMAIN_ID=<votre_numéro_de_groupe>
```

De plus, il est important de vérifier que le hostname de votre robot est unique, surtout si vous travaillez dans un environnement avec plusieurs groupes dans le même wifi. 

🤖 Vous pouvez modifier le hostname en utilisant la commande suivante :
```bash
sudo hostnamectl set-hostname <nouveau_hostname>
```

Remplacez <nouveau_hostname> par le nouveau nom d'hôte que vous souhaitez utiliser pour votre robot. Par exemple, si vous êtes dans le groupe 8, vous pourriez choisir burger8 comme hostname.

### 1. Bringup du robot

🤖 En ssh sur le TB3 lancez la commande `ros2 launch turtlebot3_bringup robot.launch.py`.  
Le programme doit rester ouvert pendant toute la durée de la manipulation. S'il n'y a aucune erreur vous êtes prêt à piloter le robot depuis votre poste de travail, que ce soit pour la téléopération, la cartographie ou la navigation autonome.

### 2. Téléopération du robot

🎮 La première étape pour piloter votre robot consiste à vérifier que votre poste de travail peut effectivement prendre le contrôle du Turtlebot, en le téléopérant via les touches du clavier.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour controler le robot avec le clavier grâce aux touches indiquées. Vérifiez que vous pouvez avancer, reculer, tourner à gauche et à droite. Vous pouvez tuer ce dernier avec Ctrl+C lorsque vous avez terminé.

### 3. Cartographie

🗺️ Nous allons désormais créer la carte de l'environnement dans lequel votre Turtlebot évoluera lorsqu'il naviguera de manière autonome.

💻 Lancez le commande `ros2 launch turtlebot3_cartographer cartographer.launch.py`. RViz se lance et vous devriez apercevoir le robot, les scans du LIDAR et la carte en construction.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour contrôler le robot avec le clavier comme précédemment. Cependant cette fois-ci, votre carte est en cours d'enregistrement. Quand la carte est terminée **ne quittez ni RViz ni le terminal de la cartographie**.

💾 La commande qui va suivre va supprimer la carte précédente s'il y en a une, le cas échéant faites-en une copie si vous souhaitez la conserver. Lancez la commande `ros2 run nav2_map_server map_saver_cli -f ~/map` qui va sauvegarder la carte dans le dossier `$HOME/.map` (fichiers maps.yaml et maps.pgm).

### 4. Navigation

💻 Lancez le commande `ros2 launch turtlebot3_navigation2 navigation2.launch.py map:=$HOME/map.yaml` pour lancer la localisation et la navigation autonome.

👀 Sur RViz vous devez voir le robot, les scans du LIDAR, les particules de AMCL et la carte que vous avez enregistrée.

📍 Si le robot est mal localisé, utilisez l'outil *2D Pose Estimate* sur RViz. Cliquez et Glissez avec la souris pour positionner le robot sur la carte.

📍 Pour donner des ordres de navigation, utilisez l'outil *2D Nav Goal* sur RViz. Cliquez et Glissez avec la souris sur la carte là où le robot doit aller.

## Simulation

⚠️ **Attention** la simulation du TB3 n'est à utiliser qu'en dernier recours pour remplacer votre robot s'il ne fonctionne pas. Avant de passer en simulation demandez de l'aide pour réparer votre robot.

