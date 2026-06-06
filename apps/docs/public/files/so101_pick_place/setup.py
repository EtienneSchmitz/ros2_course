from setuptools import find_packages, setup
import os
from glob import glob

package_name = "so101_pick_place"

setup(
    name=package_name,
    version="0.1.0",
    packages=find_packages(exclude=["test"]),
    data_files=[
        ("share/ament_index/resource_index/packages", ["resource/" + package_name]),
        ("share/" + package_name, ["package.xml"]),
        (os.path.join("share", package_name, "launch"), glob("launch/*.launch.py")),
    ],
    install_requires=["setuptools"],
    zip_safe=True,
    maintainer="Etienne Schmitz",
    maintainer_email="contact@etienne-schmitz.com",
    description="Exercice pick & place SO-101 (squelette étudiant).",
    license="MIT",
    entry_points={
        "console_scripts": [
            "pick_and_place = so101_pick_place.pick_and_place:main",
        ],
    },
)
