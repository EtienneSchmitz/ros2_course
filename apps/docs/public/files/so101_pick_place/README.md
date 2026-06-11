# so101_pick_place — pick & place (squelette)

Package de départ pour la partie pick & place du Jour 3 (manipulation). Vous complétez les
blocs `# TODO` de `so101_pick_place/pick_and_place.py`.

## Installation

```bash
# Copiez ce dossier dans votre workspace
cp -r so101_pick_place ~/ros2_bootcamp_ws/src/
cd ~/ros2_bootcamp_ws
colcon build --packages-select so101_pick_place
source install/setup.bash
```

## Lancer

Dans deux terminaux séparés :

```bash
ros2 launch so101_bringup gazebo.launch.py
ros2 launch so101_moveit_config move_group.launch.py
```

Puis votre node :

```bash
ros2 launch so101_pick_place pick_and_place.launch.py
```

## Objectif

Implémenter la séquence : approche → descente → préhension → retrait → dépôt.
Poses nommées disponibles dans le SRDF : `home`, `ready` (groupe `arm`),
`gripper_open`, `gripper_close` (groupe `gripper`).
