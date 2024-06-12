# Ateliers - PyTorch

Torch est une bilbiothèque opensource d’apprentissage machine et en particulier d’apprentissage profond. Depuis 2018 seule sa version Python nommée PyTorch est maintenue. Nous allons l’utiliser ici sur des imagettes sur lesquelles sont inscrites des chiffres marqués manuellement au feutre avec différentes calligraphies. Le réseau de neurones que vous allez créer devra apprendre lui-même à déterminer quel chiffre est marqué, ce que l’on appelle classifier.

Pour effectuer cet atelier, vous devez installer quelques packages :
```bash
pip install torchvision
```

## Entraînement de l'IA 

### 1. Importation des Bibliothèques et Téléchargement des Données

```python
from torchvision import datasets
from torchvision.transforms import ToTensor
# Ignore deprecated warnings
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

train_data = datasets.MNIST(
    root = 'data',
    train = True,
    transform = ToTensor(),
    download = True
)

test_data = datasets.MNIST(
    root = 'data',
    train = False,
    transform = ToTensor(),
    download = True
)

print(train_data)
print(test_data)
print(train_data.data.shape)
print(test_data.data.shape)
print(train_data.targets.shape)
print(train_data.targets)
```

Quelles sont les données affichés via les `print` ?

### 2. Chargement des Données avec DataLoader

```python
from torch.utils.data import DataLoader

loaders = {
    'train' : DataLoader(train_data,
                         batch_size=100,
                         shuffle=True,
                         num_workers=1),
    'test' : DataLoader(test_data,
                        batch_size=100,
                        shuffle=True,
                        num_workers=1)
}

print(loaders)
```

### 3. Définition du Modèle CNN

```python
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

class CNN(nn.Module):

    def __init__(self):
        super(CNN, self).__init__()
        
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)

        return F.softmax(x)
```

### 4. Configuration du Dispositif, du Modèle, de l'Optimiseur et de la Fonction de Perte

```python
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CNN().to(device)
optimizer = optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.CrossEntropyLoss()
```

### 5. Définition des Fonctions d'Entraînement et de Test

```python
def train(epoch):
    model.train()
    for batch_idx, (data, target) in enumerate(loaders['train']):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()
        if batch_idx % 20 == 0:
            print(f"Train Epoch: {epoch} [{batch_idx * len(data)} / {len(loaders['train'].dataset)} ({100 * batch_idx / len(loaders['train']):0f}%)]\t{loss.item():.6f}")


def test():
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in loaders['test']:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += loss_fn(output, target).item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()
    test_loss /= len(loaders['test'].dataset)
    print(f"\nTest set: Average loss: {test_loss: 0.4f}, Accuracy {correct}/{len(loaders['test'].dataset)}  ({100 * correct / len(loaders['test'].dataset):.0f}%\n")
```

### 6. Entraînement et Évaluation du Modèle

```python
for epoch in range(1, 10):
    train(epoch)
    test()
```

### 7. Sauvegarde du Modèle Entraîné

```python
torch.save(model.state_dict(), 'mnist_cnn.pth')
``` 

## Utilisation de l'IA entrainé

### 1. Importation des Bibliothèques et Téléchargement des Données

```python
from torchvision import datasets
from torchvision.transforms import ToTensor
from torch.utils.data import DataLoader
import torch
import matplotlib.pyplot as plt
import numpy as np
import cv2

# Ignore deprecated warnings
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

test_data = datasets.MNIST(
    root='data',
    train=False,
    transform=ToTensor(),
    download=True
)

test_loader = DataLoader(test_data, batch_size=100, shuffle=True, num_workers=1)

print(test_data)
print(test_data.data.shape)
print(test_data.targets.shape)
```

## Définition du Modèle CNN

```python
import torch.nn as nn
import torch.nn.functional as F

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)
```

### 3. Chargement du modèle entraîné

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Créer une instance du modèle
model = CNN().to(device)

# Charger l'état du modèle
model.load_state_dict(torch.load('mnist_cnn.pth'))

# S'assurer que le modèle est en mode évaluation
model.eval()
```

### 4. Prédiction et Visualisation

```python
# Example code to test the loaded model
test_data = datasets.MNIST(
    root='data',
    train=False,
    transform=ToTensor(),
    download=True
)

test_loader = DataLoader(test_data, batch_size=100, shuffle=True, num_workers=1)

# Get a batch of test data
data, target = next(iter(test_loader))
data, target = data.to(device), target.to(device)

# Perform prediction
output = model(data)
predictions = output.argmax(dim=1, keepdim=True)

# Number of images to display
num_images = 10

# Plot the selected images
for i in range(num_images):
    image = data[i].cpu().squeeze(0).numpy()
    plt.figure()
    plt.imshow(image, cmap='gray')
    plt.title(f"Prediction: {predictions[i].item()}")
    plt.show()

``` 

## Intégration avec ROS

Pour intégrer la détection de cube numéroté à ROS 2 en utilisant l'image de la caméra de votre ordinateur ou une image statique, vous pouvez créer un nœud ROS qui offre un service. Ce service prendra en entrée un string indiquant la source de l'image (caméra ou image statique) et renverra la position et le label du cube détecté.  
Pour détecter la position du cube, utiliser l'activité précédente avec la méthode `find_contours`.

Voici comment vous pouvez le faire :

1. Créez un nouveau package ROS nommé color_cube_detection. Vous pouvez le faire en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/src
ros2 pkg create --build-type ament_python cube_pytorch --node-name cube_pytorch
```

2. Ouvrez le fichier cube_pytorch.py dans un éditeur de texte et ajoutez le code pour créer un nœud ROS qui offre un service. Le service doit prendre en entrée un string indiquant la source de l'image (caméra ou image statique) et renvoyer la position et le label du cube détecté.

3. Une fois que vous avez terminé, n'oubliez pas de reconstruire votre espace de travail ROS en utilisant la commande suivante dans le terminal :

```bash
cd ~/workshop_ws/
colcon build --symlink-install
```

Maintenant, vous devriez être prêt à lancer votre nœud color_cube_detector et à voir votre robot détecter des cubes colorés.