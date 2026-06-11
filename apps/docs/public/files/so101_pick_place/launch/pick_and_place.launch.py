"""Lance le node pick_and_place avec la config MoveIt 2 du SO-101.

Pré-requis : la simulation et move_group doivent tourner dans d'autres terminaux :
    ros2 launch so101_bringup gazebo.launch.py
    ros2 launch so101_moveit_config move_group.launch.py
"""

from launch import LaunchDescription
from launch_ros.actions import Node
from moveit_configs_utils import MoveItConfigsBuilder


def generate_launch_description():
    moveit_config = (
        MoveItConfigsBuilder("so101", package_name="so101_moveit_config")
        .to_moveit_configs()
    )

    pick_and_place = Node(
        package="so101_pick_place",
        executable="pick_and_place",
        output="screen",
        parameters=[moveit_config.to_dict()],
        # Contourne la régression de locale MoveIt 2 Kilted en fr_FR.
        additional_env={"LC_NUMERIC": "C.UTF-8"},
    )

    return LaunchDescription([pick_and_place])
