#!/usr/bin/env python3
"""Exercice — Pick & place du SO-101 avec MoveIt 2.

Squelette à compléter : remplissez les blocs marqués « TODO ».
La séquence à implémenter :

    1. Approche  : 5 cm au-dessus de l'objet, pince ouverte
    2. Descente  : trajectoire cartésienne jusqu'à l'objet
    3. Préhension: fermeture de la pince
    4. Retrait   : remontée de 10 cm
    5. Dépôt     : aller à la pose de dépôt puis ouvrir la pince

Pré-requis (dans deux autres terminaux) :
    ros2 launch so101_bringup gazebo.launch.py
    ros2 launch so101_moveit_config move_group.launch.py
"""

import time

import rclpy
from rclpy.logging import get_logger

from geometry_msgs.msg import PoseStamped
from moveit.planning import MoveItPy

# --- Repères de la scène (à ajuster selon votre monde) ----------------------
BASE_FRAME = "base_link"
EE_LINK = "gripper_link"           # repère de la pince (TCP)

# Pose de l'objet à saisir (dans base_link)
OBJECT_XYZ = (0.20, 0.0, 0.05)
# Pose de dépôt
PLACE_XYZ = (0.0, 0.20, 0.05)

APPROACH_HEIGHT = 0.05             # 5 cm au-dessus pour l'approche
RETREAT_HEIGHT = 0.10              # 10 cm de remontée après préhension


def make_pose(x, y, z):
    """Construit un PoseStamped, pince orientée vers le bas (à compléter au besoin)."""
    pose = PoseStamped()
    pose.header.frame_id = BASE_FRAME
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = float(z)
    # Orientation neutre ; pour un vrai pick, imposez la pince vers le bas.
    pose.pose.orientation.w = 1.0
    return pose


def plan_and_execute(robot, component, logger, sleep_time=0.0):
    """Planifie depuis l'état courant puis exécute. Retourne True si OK."""
    logger.info("Planification…")
    plan_result = component.plan()
    if plan_result:
        robot.execute(plan_result.trajectory, controllers=[])
    else:
        logger.error("Échec de planification.")
    time.sleep(sleep_time)
    return bool(plan_result)


def main():
    rclpy.init()
    logger = get_logger("pick_and_place")

    # Connexion à MoveIt 2
    moveit = MoveItPy(node_name="pick_and_place")
    arm = moveit.get_planning_component("arm")
    gripper = moveit.get_planning_component("gripper")
    logger.info("MoveItPy prêt — groupes 'arm' et 'gripper'.")

    # 0. Position de départ : pose nommée 'home'
    arm.set_start_state_to_current_state()
    arm.set_goal_state(configuration_name="home")
    plan_and_execute(moveit, arm, logger, sleep_time=1.0)

    # 1. APPROCHE — 5 cm au-dessus de l'objet, pince ouverte
    # TODO: ouvrir la pince (gripper.set_goal_state(configuration_name="gripper_open"))
    #       puis planifier/exécuter le groupe gripper.
    # TODO: construire la pose d'approche avec make_pose(... z + APPROACH_HEIGHT)
    #       arm.set_goal_state(pose_stamped_msg=approach, pose_link=EE_LINK)
    #       puis plan_and_execute(moveit, arm, logger).

    # 2. DESCENTE — trajectoire cartésienne jusqu'à l'objet
    # TODO: viser make_pose(*OBJECT_XYZ) et exécuter.
    #       (Bonus : utiliser une trajectoire cartésienne plutôt qu'un plan libre.)

    # 3. PRÉHENSION — fermer la pince
    # TODO: gripper.set_goal_state(configuration_name="gripper_close") puis exécuter.

    # 4. RETRAIT — remonter de 10 cm
    # TODO: viser make_pose(object_x, object_y, object_z + RETREAT_HEIGHT) et exécuter.

    # 5. DÉPÔT — aller à la pose de dépôt puis ouvrir la pince
    # TODO: viser make_pose(*PLACE_XYZ) et exécuter.
    # TODO: gripper.set_goal_state(configuration_name="gripper_open") puis exécuter.

    logger.info("Séquence terminée (complétez les TODO ci-dessus).")
    moveit.shutdown()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
