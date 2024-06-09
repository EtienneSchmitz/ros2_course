# Installation - Turtlebot 3

## Assemblage du Turtlebot (avec un robot réel)

⚠️ **Attention** : vous ne pourrez faire aucune erreur de câblage sauf avec le câble d'alimentation de la Raspberry Pi qui doit impérativement être branché comme sur le schéma ci-dessous **au risque de déteriorer définitivement le matériel**.

<p align="center">
  <img src="./images/tb3_power_cable.png" alt="Attention au câble d'alimentation"/>
</p>

🌐 Suivez ce tutoriel pour assembler votre Turtlebot Burger : [https://emanual.robotis.com/docs/en/platform/turtlebot3/hardware_setup/#hardware-assembly](https://emanual.robotis.com/docs/en/platform/turtlebot3/hardware_setup/#hardware-assembly)

## Installation - Robot

TODO : Installation de l'image

## Installation - Ordinateur

💻 L'ensemble des procédures est à faire dans le terminal de votre pc.

1. Installer `gazebo`

```bash
sudo apt install ros-humble-gazebo-*
```

2. Installer `cartographer`
```bash
sudo apt install ros-humble-cartographer ros-humble-cartographer-ros
```

3. Installer `navigation2`
```bash
sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup
```

4. Installer les paquets Turtlebot 3
```bash
source ~/.bashrc
sudo apt install ros-humble-dynamixel-sdk ros-humble-turtlebot3-msgs ros-humble-turtlebot3
```

