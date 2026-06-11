#!/usr/bin/env python3
"""Client Nav2 minimal — envoie un goal de navigation au LeKiwi.

Ce nœud envoie une pose cible unique à Nav2 via l'action `navigate_to_pose`,
suit la distance restante, puis affiche le résultat. C'est un point de départ
pour les exercices du Jour 2 (navigation) et la préparation au Jour 5
(intégration).

À recopier dans un package ROS 2 (par ex. `lekiwi_navigation`) avec un point
d'entrée déclaré pour `main()` dans le `setup.py` :

    entry_points={
        "console_scripts": [
            "go_to = lekiwi_navigation.go_to:main",
        ],
    },

Puis, une fois la navigation lancée :

    ros2 run lekiwi_navigation go_to
"""

import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node

from geometry_msgs.msg import PoseStamped
from nav2_msgs.action import NavigateToPose


# Coordonnées du goal dans le repère `map`, à adapter à votre carte
# `lekiwi_world`. Valeurs provisoires : un point accessible d'une carte ~10x10 m.
GOAL_X = 1.0
GOAL_Y = 1.0
# Orientation cible (quaternion). (z=0, w=1) = cap neutre, face à +X.
GOAL_YAW_Z = 0.0
GOAL_YAW_W = 1.0


class GoToNode(Node):
    """Envoie un unique goal `NavigateToPose` et suit son exécution."""

    def __init__(self):
        super().__init__("go_to")
        self._client = ActionClient(self, NavigateToPose, "navigate_to_pose")

    def send_goal(self):
        # Attendre le serveur d'action exposé par Nav2 (bt_navigator).
        self.get_logger().info("Attente du serveur navigate_to_pose…")
        self._client.wait_for_server()

        goal = NavigateToPose.Goal()
        goal.pose = self._make_pose()

        self.get_logger().info(
            f"Envoi du goal : x={GOAL_X:.2f}, y={GOAL_Y:.2f} (frame map)"
        )
        send_future = self._client.send_goal_async(
            goal, feedback_callback=self._on_feedback
        )
        send_future.add_done_callback(self._on_goal_response)

    def _make_pose(self) -> PoseStamped:
        pose = PoseStamped()
        pose.header.frame_id = "map"
        pose.header.stamp = self.get_clock().now().to_msg()
        pose.pose.position.x = GOAL_X
        pose.pose.position.y = GOAL_Y
        pose.pose.orientation.z = GOAL_YAW_Z
        pose.pose.orientation.w = GOAL_YAW_W
        return pose

    def _on_feedback(self, feedback):
        remaining = feedback.feedback.distance_remaining
        self.get_logger().info(f"Distance restante : {remaining:.2f} m")

    def _on_goal_response(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().warn("Goal refusé par Nav2.")
            rclpy.shutdown()
            return
        self.get_logger().info("Goal accepté, navigation en cours…")
        result_future = goal_handle.get_result_async()
        result_future.add_done_callback(self._on_result)

    def _on_result(self, future):
        status = future.result().status
        self.get_logger().info(f"Navigation terminée (status={status}).")
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)
    node = GoToNode()
    node.send_goal()
    rclpy.spin(node)
    node.destroy_node()


if __name__ == "__main__":
    main()
