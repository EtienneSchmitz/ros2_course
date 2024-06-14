# Installation

Installer les paquets suivants :

```bash
sudo apt install ros-humble-moveit ros-${ROS_DISTRO}-urdf-tutorial
sudo apt install curl
curl 'https://raw.githubusercontent.com/Interbotix/interbotix_ros_manipulators/main/interbotix_ros_xsarms/install/amd64/xsarm_amd64_install.sh' > xsarm_amd64_install.sh
chmod +x xsarm_amd64_install.sh
./xsarm_amd64_install.sh -d humble -n
```

Dans le ̀`.bashrc`, pour que gazebo se lance bien, il faut mettre les lignes suivantes :
```bash
stat /usr/share/gazebo/setup.sh &> /dev/null
if [ $? -eq 0 ]; then
    source /usr/share/gazebo/setup.sh
fi
```

Lancer la commande suivante pour que les modifications soient prise en compte : 
```bash
source ~/.bashrc
``̀ 