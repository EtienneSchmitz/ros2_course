# Image du bootcamp ROS 2 — Kilted Kaiju + Gazebo Ionic
# Part de l'image officielle ROS 2 Kilted (desktop) et ajoute Gazebo Ionic,
# le bridge ros_gz et les outils workspace utilisés tout au long du cours.
#
# Build :  docker build -t ros2-bootcamp .
# Voir :   https://ros2.etienne-schmitz.com/installation/02-docker/

FROM osrf/ros:kilted-desktop

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=en_US.UTF-8

# Locale UTF-8 (ROS 2 en a besoin) — en_US pour éviter la virgule décimale fr_FR
RUN apt-get update && apt-get install -y --no-install-recommends \
      locales curl gnupg lsb-release \
    && locale-gen en_US en_US.UTF-8 \
    && update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# Dépôt Gazebo OSRF + Gazebo Ionic
RUN curl -sSL https://packages.osrfoundation.org/gazebo.gpg \
      -o /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] \
http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" \
      | tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null \
    && apt-get update && apt-get install -y --no-install-recommends \
      gz-ionic \
    && rm -rf /var/lib/apt/lists/*

# Bridge ros_gz + outils workspace + utilitaires du cours
RUN apt-get update && apt-get install -y --no-install-recommends \
      ros-kilted-ros-gz \
      ros-kilted-joint-state-publisher \
      ros-kilted-joint-state-publisher-gui \
      python3-colcon-common-extensions \
      python3-rosdep \
      python3-vcstool \
      git wget \
    && rm -rf /var/lib/apt/lists/*

# rosdep est déjà initialisé dans l'image officielle ; on rafraîchit l'index
RUN rosdep update

# Sourcing automatique de ROS dans les shells interactifs
RUN echo "source /opt/ros/kilted/setup.bash" >> /root/.bashrc \
    && echo "[ -f /root/ros2_bootcamp_ws/install/setup.bash ] && source /root/ros2_bootcamp_ws/install/setup.bash" \
       >> /root/.bashrc

WORKDIR /root/ros2_bootcamp_ws

CMD ["bash"]
