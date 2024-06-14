# Installation

Installer les paquets suivants :

```bash
sudo apt install ros-humble-moveit ros-${ROS_DISTRO}-urdf-tutorial
sudo apt install curl
curl 'https://raw.githubusercontent.com/Interbotix/interbotix_ros_manipulators/main/interbotix_ros_xsarms/install/amd64/xsarm_amd64_install.sh' > xsarm_amd64_install.sh
chmod +x xsarm_amd64_install.sh
./xsarm_amd64_install.sh -d humble -n
```

## Ressources

- [Documentation du bras](https://docs.trossenrobotics.com/interbotix_xsarms_docs/index.html)
- [Documentation du bras - ROS 2 Interface](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros2.html)
- [Documentation du bras - ROS 2 Python ROS Interface](https://docs.trossenrobotics.com/interbotix_xsarms_docs/python_ros_interface.html)
- [Documentation du bras - ROS2](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros2_packages.html)
- [Demo python robot](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros2_packages/python_demos.html)