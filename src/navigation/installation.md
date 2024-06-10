# Installation - Turtlebot 3

## Assemblage du Turtlebot (avec un robot réel)

⚠️ **Attention** : vous ne pourrez faire aucune erreur de câblage sauf avec le câble d'alimentation de la Raspberry Pi qui doit impérativement être branché comme sur le schéma ci-dessous **au risque de déteriorer définitivement le matériel**.

<p align="center">
  <img src="./images/tb3_power_cable.png" alt="Attention au câble d'alimentation"/>
</p>

🌐 Suivez ce tutoriel pour assembler votre Turtlebot Burger : [https://emanual.robotis.com/docs/en/platform/turtlebot3/hardware_setup/#hardware-assembly](https://emanual.robotis.com/docs/en/platform/turtlebot3/hardware_setup/#hardware-assembly)

## Installation - Robot

### Flashage de la carte SD

Pour installer l'image sur votre Raspberry Pi, vous pouvez utiliser l'un des deux outils suivants : [Raspberry Pi Imager](https://www.raspberrypi.com/software/) ou [Balena Etcher](https://etcher.balena.io/).  
L'image à flasher sera fournie par votre enseignant.

Si vous préférez procéder à l'installation complète par vous-même, vous pouvez suivre les instructions détaillées disponibles sur les liens suivants :
- [Configuration du Single Board Computer (SBC)](https://emanual.robotis.com/docs/en/platform/turtlebot3/sbc_setup/#sbc-setup)
- [Configuration de l'OpenCR](https://emanual.robotis.com/docs/en/platform/turtlebot3/opencr_setup/#opencr-setup)

### WIFI 

Pour configurer le WiFi sur votre système Ubuntu via le fichier 50-cloud-init.yaml, suivez les étapes ci-dessous :

1. Ouvrez le fichier 50-cloud-init.yaml dans un éditeur de texte avec des privilèges d'administrateur. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
sudo nano /media/$(whoami)/writable/etc/netplan
``` 

2. Ajoutez les informations de configuration de votre réseau WiFi à la fin du fichier. Cela devrait ressembler à ceci :
```yaml
network:
    ethernets:
        eth0:
            dhcp4: true
            optional: true
    version: 2
    wifis:
        wlan0:
            dhcp4: true
            optional: true
            access-points:
                "your_wifi_ssid":
                    password: "your_wifi_password"
```

3. Remplacez "your_wifi_ssid" par le SSID de votre réseau WiFi et "your_wifi_password" par le mot de passe de votre réseau WiFi.

4. Enregistrez le fichier et quittez l'éditeur de texte. Si vous utilisez nano comme dans l'exemple ci-dessus, vous pouvez le faire en appuyant sur Ctrl+X, puis en appuyant sur Y pour confirmer l'enregistrement des modifications, et enfin en appuyant sur Enter pour quitter.

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

