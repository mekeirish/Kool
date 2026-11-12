# 🍔 Kool – Plateforme de gestion de commandes et de livraison

[![Démo en ligne](https://img.shields.io/badge/Démo-mekeirish.github.io%2FKool-brightgreen)](https://mekeirish.github.io/Kool/)
[![Licence](https://img.shields.io/badge/Licence-MIT-blue)](./LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-success)](https://mekeirish.github.io/Kool/)
[![APK](https://img.shields.io/badge/APK-workflow-orange)](./.github/workflows/build-apk.yml)

> **Kool** est une application web progressive (PWA) de gestion des commandes pour restaurants, livreurs et administrateurs. Elle centralise le suivi des livraisons, la gestion des menus et le pilotage de la plateforme depuis une interface unique, disponible en ligne et compilable en APK Android.

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Rôles et accès](#-rôles-et-accès)
- [Architecture technique](#-architecture-technique)
- [Installation locale](#-installation-locale)
- [Déploiement](#-déploiement)
- [Compilation APK](#-compilation-apk)
- [Structure du projet](#-structure-du-projet)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## ✨ Fonctionnalités

- **Interface de commande client** : navigation dans les restaurants, ajout de plats au panier et validation de la commande.
- **Gestion des restaurants** : modification de l’image, des informations et des articles proposés.
- **Gestion des livreurs** : suivi des livraisons et attribution des commandes.
- **Panneau d’administration** : vue d’ensemble de la plateforme, gestion des restaurants, livreurs et entités, historique des commandes et outils système.
- **Gestion des identifiants** : création et remplacement de comptes (client, restaurant, livreur) avec contrôle d’accès.
- **Suivi du crédit / abonnement** : ajout de jours de validité, gestion des expirations.
- **PWA installable** : fonctionnement hors ligne partiel, icône et écran de démarrage personnalisés, thème sombre `#0d0d0d`.
- **Compilation APK automatisée** : workflow GitHub Actions pour générer une application Android à partir du code web.

---

## 👥 Rôles et accès

| Rôle | Accès principal |
|------|-----------------|
| **Client** | Consulter les restaurants, composer un panier, passer commande. |
| **Restaurant** | Gérer le menu, les images, les informations et suivre les commandes reçues. |
| **Livreur** | Visualiser les livraisons assignées et mettre à jour leur statut. |
| **Administrateur** | Superviser l’ensemble de la plateforme, gérer les comptes, les crédits et l’historique. |

> L’accès à chaque espace se fait via des identifiants dédiés. Un nouveau compte remplace l’ancien pour un même rôle.

---

## 🛠 Architecture technique

| Élément | Détail |
|---------|--------|
| **Type** | Application web monopage (SPA) / PWA |
| **Fichier principal** | `index.html` (interface complète, styles et logique intégrés) |
| **Manifeste PWA** | `manifest.json` – nom « Kool », mode `standalone`, thème sombre |
| **Icônes** | `icon-192.png`, `icon.png` (512×512, maskable) |
| **Écrans de démarrage** | Plusieurs résolutions (`splash-*.png`) pour un rendu natif sur mobile |
| **Déploiement** | GitHub Pages (branche `main`) |
| **Automatisation** | Workflow GitHub Actions `build-apk.yml` pour la génération d’APK |

---

## 💻 Installation locale

Aucune dépendance ni build n’est nécessaire pour consulter l’application. Il suffit de cloner le dépôt et d’ouvrir `index.html` dans un navigateur.

```bash
git clone https://github.com/mekeirish/Kool.git
cd Kool
# Ouvrir index.html dans votre navigateur
# ou lancer un serveur local (recommandé pour tester la PWA) :
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

---

## 🌐 Déploiement

Le site est automatiquement publié sur **GitHub Pages** à chaque mise à jour de la branche `main` :

👉 **[https://mekeirish.github.io/Kool/](https://mekeirish.github.io/Kool/)**

---

## 📱 Compilation APK

Un workflow GitHub Actions (`build-apk.yml`) est configuré pour produire un fichier APK à partir de l’application web.  
Pour déclencher une compilation :

1. Pousser les modifications sur `main`.
2. Accéder à l’onglet **Actions** du dépôt GitHub.
3. Sélectionner le workflow **build-apk** et lancer l’exécution (ou attendre le déclenchement automatique).
4. Récupérer l’APK généré dans les artefacts de l’exécution.

---

## 📁 Structure du projet

```text
Kool/
├── .github/
│   └── workflows/
│       └── build-apk.yml      # Workflow de compilation APK
├── index.html                 # Application complète (UI + logique)
├── manifest.json              # Manifeste PWA
├── icon.png                   # Icône 512×512
├── icon-192.png               # Icône 192×192
├── splash-*.png               # Écrans de démarrage mobiles
├── Poster.png                 # Visuel de présentation
└── README.md
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues !  
Pour proposer une amélioration ou signaler un bug :

1. Ouvrez une **issue** en décrivant clairement le problème ou la suggestion.
2. Forkez le dépôt, créez une branche (`feature/ma-fonctionnalite`) et soumettez une **pull request**.
3. Assurez-vous que les modifications restent compatibles avec le déploiement GitHub Pages et la PWA.

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**.  
Voir le fichier [`LICENSE`](./LICENSE) pour plus de détails.

---

**Kool** – Une solution simple et centralisée pour digitaliser la gestion des commandes et des livraisons de restaurants.