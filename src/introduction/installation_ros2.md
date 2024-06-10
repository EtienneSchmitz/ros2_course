# Installation - ROS 2

Selon votre système d'exploitation, vous pouvez suivre l'une des instructions d'installation disponibles à [cette adresse](https://docs.ros.org/en/humble/Installation.html).

Pour le workshop, nous recommandons l'utilisation d'Ubuntu 22.04. Les instructions pour l'installation de ROS 2 sur Ubuntu 22.04 sont disponibles à [ce lien](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html).


## Installation - Ubuntu 22.04

Vous trouverez ici un guide condensé des étapes à suivre pour installer ROS 2 Humble sur Ubuntu 22.04.

```bash
# Ubuntu Universe repository
sudo apt install software-properties-common
sudo add-apt-repository universe

# Add ROS 2 GPG key with apt
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# ROS 2 packages
sudo apt update && sudo apt upgrade

sudo apt install ros-humble-ros-desktop
sudo apt install ros-dev-tools

# Install on our .bashrc (if you use bash)
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```