#!/usr/bin/env python3
"""SOLUTION DE RÉFÉRENCE — Pick & place du SO-101 avec MoveIt 2.

⚠️ À consulter APRÈS avoir tenté l'exercice. L'objectif est de coder la
séquence vous-même dans le squelette `so101_pick_place`.

Séquence : home → ouvrir pince → approche → descente → fermer pince →
retrait → dépôt → ouvrir pince.

Pré-requis (dans deux autres terminaux) :
    ros2 launch so101_bringup gazebo.launch.py
    ros2 launch so101_moveit_config move_group.launch.py
"""

import time

import rclpy
from rclpy.logging import get_logger

from geometry_msgs.msg import PoseStamped
from moveit.planning import MoveItPy

BASE_FRAME = "base_link"
EE_LINK = "gripper_link"

OBJECT_XYZ = (0.20, 0.0, 0.05)
PLACE_XYZ = (0.0, 0.20, 0.05)
APPROACH_HEIGHT = 0.05
RETREAT_HEIGHT = 0.10


def make_pose(x, y, z):
    """PoseStamped dans base_link, orientation neutre (pince vers le bas simplifiée)."""
    pose = PoseStamped()
    pose.header.frame_id = BASE_FRAME
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = float(z)
    pose.pose.orientation.w = 1.0
    return pose


def plan_and_execute(robot, component, logger, sleep_time=0.5):
    """Planifie depuis l'état courant puis exécute. Retourne True si OK."""
    plan_result = component.plan()
    if plan_result:
        robot.execute(plan_result.trajectory, controllers=[])
    else:
        logger.error("Échec de planification.")
    time.sleep(sleep_time)
    return bool(plan_result)


def move_arm_to_pose(moveit, arm, pose, logger):
    """Amène le repère EE_LINK sur `pose`."""
    arm.set_start_state_to_current_state()
    arm.set_goal_state(pose_stamped_msg=pose, pose_link=EE_LINK)
    return plan_and_execute(moveit, arm, logger)


def move_arm_to_named(moveit, arm, name, logger):
    arm.set_start_state_to_current_state()
    arm.set_goal_state(configuration_name=name)
    return plan_and_execute(moveit, arm, logger)


def set_gripper(moveit, gripper, name, logger):
    """name ∈ {'gripper_open', 'gripper_close'}."""
    gripper.set_start_state_to_current_state()
    gripper.set_goal_state(configuration_name=name)
    return plan_and_execute(moveit, gripper, logger)


def main():
    rclpy.init()
    logger = get_logger("pick_and_place")

    moveit = MoveItPy(node_name="pick_and_place")
    arm = moveit.get_planning_component("arm")
    gripper = moveit.get_planning_component("gripper")
    logger.info("MoveItPy prêt.")

    ox, oy, oz = OBJECT_XYZ

    # 0. Position de départ
    move_arm_to_named(moveit, arm, "home", logger)

    # 1. APPROCHE — au-dessus de l'objet, pince ouverte
    set_gripper(moveit, gripper, "gripper_open", logger)
    move_arm_to_pose(moveit, arm, make_pose(ox, oy, oz + APPROACH_HEIGHT), logger)

    # 2. DESCENTE — jusqu'à l'objet
    move_arm_to_pose(moveit, arm, make_pose(ox, oy, oz), logger)

    # 3. PRÉHENSION
    set_gripper(moveit, gripper, "gripper_close", logger)

    # 4. RETRAIT
    move_arm_to_pose(moveit, arm, make_pose(ox, oy, oz + RETREAT_HEIGHT), logger)

    # 5. DÉPÔT
    px, py, pz = PLACE_XYZ
    move_arm_to_pose(moveit, arm, make_pose(px, py, pz + APPROACH_HEIGHT), logger)
    move_arm_to_pose(moveit, arm, make_pose(px, py, pz), logger)
    set_gripper(moveit, gripper, "gripper_open", logger)

    # Retour home
    move_arm_to_named(moveit, arm, "home", logger)

    logger.info("Pick & place terminé.")
    moveit.shutdown()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
