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

### 2. Téléopération du robot

🎮 La première étape pour piloter votre robot consiste à vérifier que votre poste de travail peut effectivement prendre le contrôle du Turtlebot, en le téléopérant via les touches du clavier.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour controler le robot avec le clavier grâce aux touches indiquées. Vérifiez que vous pouvez avancer, reculer, tourner à gauche et à droite. Vous pouvez tuer ce dernier avec Ctrl+C lorsque vous avez terminé.

### 3. Cartographie

🗺️ Nous allons désormais créer la carte de l'environnement dans lequel votre Turtlebot évoluera lorsqu'il naviguera de manière autonome.

💻 Lancez le commande `ros2 launch turtlebot3_cartographer cartographer.launch.py`. RViz se lance et vous devriez apercevoir le robot, les scans du LIDAR et la carte en construction.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour contrôler le robot avec le clavier comme précédemment. Cependant cette fois-ci, votre carte est en cours d'enregistrement. Quand la carte est terminée **ne quittez ni RViz ni le terminal de la cartographie**.

💾 La commande qui va suivre va supprimer la carte précédente s'il y en a une, le cas échéant faites-en une copie si vous souhaitez la conserver.  
Lancez la commande `mkdir ~/map` et `ros2 run nav2_map_server map_saver_cli -f ~/map/map_workshop` qui va sauvegarder la carte dans le dossier `$HOME/.map` (fichiers maps.yaml et maps.pgm).

### 4. Navigation

Arrêtez l'ensemble des terminaux hormis le bringup du robot.

💻 Lancez le commande `ros2 launch turtlebot3_navigation2 navigation2.launch.py map:=$HOME/map/map_workshop.yaml` pour lancer la localisation et la navigation autonome.

👀 Sur RViz vous devez voir le robot, les scans du LIDAR, les particules de AMCL et la carte que vous avez enregistrée.

📍 Si le robot est mal localisé, utilisez l'outil *2D Pose Estimate* sur RViz. Cliquez et Glissez avec la souris pour positionner le robot sur la carte.

📍 Pour donner des ordres de navigation, utilisez l'outil *Nav2 Goal* sur RViz. Cliquez et Glissez avec la souris sur la carte là où le robot doit aller.

### 5. Scenario de navigation

🚗 L'objectif final du TP est de faire passer le robot par une suite de 2 ou 3 points de passage, comme pour une patrouille, avec un retour au point de départ. Si cela n'est pas déjà fait, choisissez plusieurs points de passage faciles à mesurer avec un mètre depuis le point de départ, avec un grand nombre d'obstacles sur le chemin. Si l'environnement a fortement changé, pensez à enregistrer une nouvelle carte.

Pour réaliser cet objectif, suivez les étapes ci-dessous :

1. Créez un nouvel espace de travail ROS, que vous pouvez nommer `workshop_ws` par exemple. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
mkdir -p ~/workshop_ws/src
```

2. Créez un nouveau package Python nommé `simple_navigation_goals` avec le fichier principale `simple_navigation_goals`. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/src
ros2 pkg create --build-type ament_python simple_navigation_goals --node-name simple_navigation_goals
```

3. Dans le dossier `simple_navigation_goals` du package, ajouter le fichier [`robot_navigator.py`](./assets/robot_navigator.py). 

4. Ouvrez le fichier `simple_navigation_goal` dans un éditeur de texte et copiez les lignes de code fournies. 

``` python
#! /usr/bin/env python3
# Copyright 2021 Samsung Research America
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Modified by AutomaticAddison.com

import time  # Time library
 
from geometry_msgs.msg import PoseStamped # Pose with ref frame and timestamp
from rclpy.duration import Duration # Handles time for ROS 2
import rclpy # Python client library for ROS 2
 
from .robot_navigator import BasicNavigator, NavigationResult # Helper module
 
'''
Navigates a robot from an initial pose to a goal pose.
'''
def main():
 
  # Start the ROS 2 Python Client Library
  rclpy.init()
 
  # Launch the ROS 2 Navigation Stack
  navigator = BasicNavigator()
 
  # Set the robot's initial pose if necessary
  # initial_pose = PoseStamped()
  # initial_pose.header.frame_id = 'map'
  # initial_pose.header.stamp = navigator.get_clock().now().to_msg()
  # initial_pose.pose.position.x = 0.0
  # initial_pose.pose.position.y = 0.0
  # initial_pose.pose.position.z = 0.0
  # initial_pose.pose.orientation.x = 0.0
  # initial_pose.pose.orientation.y = 0.0
  # initial_pose.pose.orientation.z = 0.0
  # initial_pose.pose.orientation.w = 1.0
  # navigator.setInitialPose(initial_pose)
 
  # Activate navigation, if not autostarted. This should be called after setInitialPose()
  # or this will initialize at the origin of the map and update the costmap with bogus readings.
  # If autostart, you should `waitUntilNav2Active()` instead.
  # navigator.lifecycleStartup()
 
  # Wait for navigation to fully activate. Use this line if autostart is set to true.
  navigator.waitUntilNav2Active()
 
  # If desired, you can change or load the map as well
  # navigator.changeMap('/path/to/map.yaml')
 
  # You may use the navigator to clear or obtain costmaps
  # navigator.clearAllCostmaps()  # also have clearLocalCostmap() and clearGlobalCostmap()
  # global_costmap = navigator.getGlobalCostmap()
  # local_costmap = navigator.getLocalCostmap()
 
  # Set the robot's goal pose
  goal_pose = PoseStamped()
  goal_pose.header.frame_id = 'map'
  goal_pose.header.stamp = navigator.get_clock().now().to_msg()
  goal_pose.pose.position.x = 0.50
  goal_pose.pose.position.y = -0.8
  goal_pose.pose.position.z = 0.0
  goal_pose.pose.orientation.x = 0.0
  goal_pose.pose.orientation.y = 0.0
  goal_pose.pose.orientation.z = 0.0
  goal_pose.pose.orientation.w = 1.0
 
  # sanity check a valid path exists
  # path = navigator.getPath(initial_pose, goal_pose)
 
  # Go to the goal pose
  navigator.goToPose(goal_pose)
 
  i = 0
 
  # Keep doing stuff as long as the robot is moving towards the goal
  while not navigator.isNavComplete():
    ################################################
    #
    # Implement some code here for your application!
    #
    ################################################
 
    # Do something with the feedback
    i = i + 1
    feedback = navigator.getFeedback()
    if feedback and i % 5 == 0:
      print('Distance remaining: ' + '{:.2f}'.format(
            feedback.distance_remaining) + ' meters.')
 
      # Some navigation timeout to demo cancellation
      if Duration.from_msg(feedback.navigation_time) > Duration(seconds=600.0):
        navigator.cancelNav()
 
      # Some navigation request change to demo preemption
      if Duration.from_msg(feedback.navigation_time) > Duration(seconds=120.0):
        goal_pose.pose.position.x = -3.0
        navigator.goToPose(goal_pose)
 
  # Do something depending on the return code
  result = navigator.getResult()
  if result == NavigationResult.SUCCEEDED:
      print('Goal succeeded!')
  elif result == NavigationResult.CANCELED:
      print('Goal was canceled!')
  elif result == NavigationResult.FAILED:
      print('Goal failed!')
  else:
      print('Goal has an invalid return status!')
 
  # Shut down the ROS 2 Navigation Stack
  navigator.lifecycleShutdown()
 
  exit(0)
 
if __name__ == '__main__':
  main()
```

5. Assurez-vous de remplacer les valeurs de x, y et z pour correspondre à une valeur que vous avez définie.

6. Une fois que vous avez terminé, n'oubliez pas de reconstruire votre espace de travail ROS en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/
colcon build --symlink-install --parallel-workers 1
```

7. En analysant le code donnée, modifier votre programme pour faire l'objectif du TP.

## 🧳 Challenge additionnel : Carry my luggage

Challenge inspiré de l'épreuve "Carry my luggage" de la RoboCup @Home.
Pour info, le réglement de la compétition se trouve ici (mais ça n'apporte rien pour votre projet) :
<https://athome.robocup.org/wp-content/uploads/2019_rulebook.pdf>

🗺️ **Prérequis :** avoir une carte représentative de l'environnement.

### ➡️ Phase 1 : Follow me

Vous avez toute liberté pour préparer le début de l'épreuve (ex. comment faire que le robot soit bien localisé dès le début ?).

Le robot part d'un point connu et doit suivre un humain qui va à un endroit inconnu par le robot (mais à l'intérieur de la carte). L'humain commence l'épreuve en étant en face du robot à une distance de 50 cm.

Le robot doit suivre l'humain en maintenant une distance comprise entre 20cm minimum et 1m maximum.

Pour être valide, l'humain doit avoir un déplacement non trivial : il ne va pas toujours tout droit et il fait varier sa vitesse de marche dans la limite du raisonnable. Distance minimum de marche demandée 4 mètres (mais vous êtes libres de faire plus si ça vous arrange, ça n'impactera pas directement la note). Il faut obligatoirement que le robot traverse une porte.

Lorsque l'humain est arrivé à sa destination, il s'arrête pendant une durée d'au moins 3 secondes. Le robot doit alors comprendre que la phase 1 est terminée et passer à la phase 2.

### ↩️ Phase 2 : Go home

Le robot doit repartir et naviguer en totale autonomie jusqu'à son point de départ. Sur le retour, vous rajouterez jusqu'à :

* 1 obstacle statique sur son chemin de retour
* 1 obstacle dynamique (typiquement un humain qui lui coupe la route)
* 1 obstacle qui bloque complètement le passage prévu par le robot (il faut qu'il ait la possiblité d'arriver à destination par un autre chemin)

Si le robot arrive à destination (à +-20cm, +-15°) la phase 2 est validée.

### ↙️ Phase 3 : Dock
Si le robot arrive à destination (à +-20cm, +-15°) la phase 2 est validée.

Le robot doit chercher où se trouve sa base et s'y accoster. La position grossière de la base est connue mais cette partie n'est validée que si le robot réussi un accostage précis sans contact : la distance entre le robot et la base soit être supériere à 5mm et inférieure à 2cm.

Vous avez toute liberté pour choisir un objet qui représentera la base du robot. Un pot de peinture par exemple serait un choix pertinent (la symétrie radiale peut simplifier la détection).


## Simulation

⚠️ **Attention** la simulation du TB3 n'est à utiliser qu'en dernier recours pour remplacer votre robot s'il ne fonctionne pas. Avant de passer en simulation demandez de l'aide pour réparer votre robot.

Dans le ̀ .bashrc`, pour que gazebo se lance bien, il faut mettre les lignes suivantes :
```bash
stat /usr/share/gazebo/setup.sh &> /dev/null
if [ $? -eq 0 ]; then
    source /usr/share/gazebo/setup.sh
fi
```

### 1. Lancement de la simulation

Le paquet `Turtlebot3` propose plusieurs environnement de simulation.

💻 Lancer une des deux commandes suivantes en fonction de l'environnement que vous voulez lancer.
- Monde simple : `ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py`
- Warehouse : `ros2 launch turtlebot3_gazebo turtlebot3_house.launch.py`

Le simulateur gazebo doit rester ouvert pendant toute la durée de la manipulation. S'il n'y a aucune erreur vous êtes prêt à piloter le robot depuis votre poste de travail, que ce soit pour la téléopération, la cartographie ou la navigation autonome.

### 2. Téléopération du robot

🎮 La première étape pour piloter votre robot consiste à vérifier que votre poste de travail peut effectivement prendre le contrôle du Turtlebot, en le téléopérant via les touches du clavier.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour controler le robot avec le clavier grâce aux touches indiquées. Vérifiez que vous pouvez avancer, reculer, tourner à gauche et à droite. Vous pouvez tuer ce dernier avec Ctrl+C lorsque vous avez terminé.

### 3. Cartographie

🗺️ Nous allons désormais créer la carte de l'environnement dans lequel votre Turtlebot évoluera lorsqu'il naviguera de manière autonome.

💻 Lancez le commande `ros2 launch turtlebot3_cartographer cartographer.launch.py use_sim_time:=True`. RViz se lance et vous devriez apercevoir le robot, les scans du LIDAR et la carte en construction.

💻 Dans un nouveau terminal lancez la commande `ros2 run turtlebot3_teleop teleop_keyboard` et gardez le focus sur le terminal pour contrôler le robot avec le clavier comme précédemment. Cependant cette fois-ci, votre carte est en cours d'enregistrement. Quand la carte est terminée **ne quittez ni RViz ni le terminal de la cartographie**.

💾 La commande qui va suivre va supprimer la carte précédente s'il y en a une, le cas échéant faites-en une copie si vous souhaitez la conserver. Lancez la commande `mkdir ~/map` puis `ros2 run nav2_map_server map_saver_cli -f ~/map/map_workshop` qui va sauvegarder la carte dans le dossier `$HOME/.map` (fichiers maps.yaml et maps.pgm).

### 4. Navigation

Arrêtez l'ensemble des terminaux hormis la simulation.

💻 Lancez le commande `ros2 launch turtlebot3_navigation2 navigation2.launch.py use_sim_time:=True map:=$HOME/map/map_workshop.yaml` pour lancer la localisation et la navigation autonome.

👀 Sur RViz vous devez voir le robot, les scans du LIDAR, les particules de AMCL et la carte que vous avez enregistrée.

📍 Si le robot est mal localisé, utilisez l'outil *2D Pose Estimate* sur RViz. Cliquez et Glissez avec la souris pour positionner le robot sur la carte.

📍 Pour donner des ordres de navigation, utilisez l'outil *Nav2 Goal* sur RViz. Cliquez et Glissez avec la souris sur la carte là où le robot doit aller.

### 5. Scenario de navigation

🚗 L'objectif final du TP est de faire passer le robot par une suite de 2 ou 3 points de passage, comme pour une patrouille, avec un retour au point de départ. Si cela n'est pas déjà fait, choisissez plusieurs points de passage faciles à mesurer avec un mètre depuis le point de départ, avec un grand nombre d'obstacles sur le chemin. Si l'environnement a fortement changé, pensez à enregistrer une nouvelle carte.

Pour réaliser cet objectif, suivez les étapes ci-dessous :

1. Créez un nouvel espace de travail ROS, que vous pouvez nommer `workshop_ws` par exemple. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
mkdir -p ~/workshop_ws/src
```

2. Créez un nouveau package Python nommé `simple_navigation_goals` avec le fichier principale `simple_navigation_goals`. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/src
ros2 pkg create --build-type ament_python simple_navigation_goals --node-name simple_navigation_goals
```

3. Dans le dossier `simple_navigation_goals` du package, ajouter le fichier [`robot_navigator.py`](./assets/robot_navigator.py). 

4. Ouvrez le fichier `simple_navigation_goal` dans un éditeur de texte et copiez les lignes de code fournies. 

``` python
#! /usr/bin/env python3
# Copyright 2021 Samsung Research America
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Modified by AutomaticAddison.com

import time  # Time library
 
from geometry_msgs.msg import PoseStamped # Pose with ref frame and timestamp
from rclpy.duration import Duration # Handles time for ROS 2
import rclpy # Python client library for ROS 2
 
from .robot_navigator import BasicNavigator, NavigationResult # Helper module
 
'''
Navigates a robot from an initial pose to a goal pose.
'''
def main():
 
  # Start the ROS 2 Python Client Library
  rclpy.init()
 
  # Launch the ROS 2 Navigation Stack
  navigator = BasicNavigator()
 
  # Set the robot's initial pose if necessary
  # initial_pose = PoseStamped()
  # initial_pose.header.frame_id = 'map'
  # initial_pose.header.stamp = navigator.get_clock().now().to_msg()
  # initial_pose.pose.position.x = 0.0
  # initial_pose.pose.position.y = 0.0
  # initial_pose.pose.position.z = 0.0
  # initial_pose.pose.orientation.x = 0.0
  # initial_pose.pose.orientation.y = 0.0
  # initial_pose.pose.orientation.z = 0.0
  # initial_pose.pose.orientation.w = 1.0
  # navigator.setInitialPose(initial_pose)
 
  # Activate navigation, if not autostarted. This should be called after setInitialPose()
  # or this will initialize at the origin of the map and update the costmap with bogus readings.
  # If autostart, you should `waitUntilNav2Active()` instead.
  # navigator.lifecycleStartup()
 
  # Wait for navigation to fully activate. Use this line if autostart is set to true.
  navigator.waitUntilNav2Active()
 
  # If desired, you can change or load the map as well
  # navigator.changeMap('/path/to/map.yaml')
 
  # You may use the navigator to clear or obtain costmaps
  # navigator.clearAllCostmaps()  # also have clearLocalCostmap() and clearGlobalCostmap()
  # global_costmap = navigator.getGlobalCostmap()
  # local_costmap = navigator.getLocalCostmap()
 
  # Set the robot's goal pose
  goal_pose = PoseStamped()
  goal_pose.header.frame_id = 'map'
  goal_pose.header.stamp = navigator.get_clock().now().to_msg()
  goal_pose.pose.position.x = 0.50
  goal_pose.pose.position.y = -0.8
  goal_pose.pose.position.z = 0.0
  goal_pose.pose.orientation.x = 0.0
  goal_pose.pose.orientation.y = 0.0
  goal_pose.pose.orientation.z = 0.0
  goal_pose.pose.orientation.w = 1.0
 
  # sanity check a valid path exists
  # path = navigator.getPath(initial_pose, goal_pose)
 
  # Go to the goal pose
  navigator.goToPose(goal_pose)
 
  i = 0
 
  # Keep doing stuff as long as the robot is moving towards the goal
  while not navigator.isNavComplete():
    ################################################
    #
    # Implement some code here for your application!
    #
    ################################################
 
    # Do something with the feedback
    i = i + 1
    feedback = navigator.getFeedback()
    if feedback and i % 5 == 0:
      print('Distance remaining: ' + '{:.2f}'.format(
            feedback.distance_remaining) + ' meters.')
 
      # Some navigation timeout to demo cancellation
      if Duration.from_msg(feedback.navigation_time) > Duration(seconds=600.0):
        navigator.cancelNav()
 
      # Some navigation request change to demo preemption
      if Duration.from_msg(feedback.navigation_time) > Duration(seconds=120.0):
        goal_pose.pose.position.x = -3.0
        navigator.goToPose(goal_pose)
 
  # Do something depending on the return code
  result = navigator.getResult()
  if result == NavigationResult.SUCCEEDED:
      print('Goal succeeded!')
  elif result == NavigationResult.CANCELED:
      print('Goal was canceled!')
  elif result == NavigationResult.FAILED:
      print('Goal failed!')
  else:
      print('Goal has an invalid return status!')
 
  # Shut down the ROS 2 Navigation Stack
  navigator.lifecycleShutdown()
 
  exit(0)
 
if __name__ == '__main__':
  main()
```

5. Assurez-vous de remplacer les valeurs de x, y et z pour correspondre à une valeur que vous avez définie.

6. Une fois que vous avez terminé, n'oubliez pas de reconstruire votre espace de travail ROS en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/
colcon build --symlink-install --parallel-workers 1
``` 

7. En analysant le code donnée, modifier votre programme pour faire l'objectif du TP.
