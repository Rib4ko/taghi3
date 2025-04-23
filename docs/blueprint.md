# **App Name**: JiexTrading Catalog

## Core Features:

- Product Catalog: Display of products with filtering and search capabilities, focusing on a streamlined browsing experience.
- Product Details Page: A simplified product display for buyers.
- Language Selector: Language toggle to switch the display between French and English.

## Style Guidelines:

- Primary color: Shades of blue, creating a professional and trustworthy feel.
- Secondary colors: White and gray to provide a clean and simple backdrop.
- Accent: A brighter, complementary blue (#3498db) to highlight key interactive elements and calls to action.
- Clean and intuitive layout with clear sections for easy navigation.
- Use of clear and professional icons for categories and product features.

## Original User Request:
JiexTrading
🎯 Objectif :
Développer une plateforme e-commerce B2B professionnelle nommée JiexTrading, spécialisée dans la vente en gros de pièces automobiles (huiles moteur, filtres, batteries, etc.). Le site vise à offrir une expérience fluide pour les acheteurs professionnels, les vendeurs, et un tableau de bord puissant pour l'administrateur.

🧪 Technologies demandées :
Frontend : React.js + Tailwind CSS (UI responsive, design moderne)

Backend : Node.js + Express.js

Base de données : MySQL

Séparation stricte frontend/backend

Multilingue : Français 🇫🇷 et Anglais 🇬🇧

🎨 Design (inspiré d'une maquette fournie) :
Thème principal basé sur un dégradé de bleu (tous les tons du bleu), accompagné de blanc et gris pour une esthétique sobre et professionnelle.

Page d’accueil comportant :

Logo JiexTrading

Slogan : "Votre fournisseur de confiance en pièces automobiles en gros"

Deux boutons centraux : “Découvrir les produits” et “Créer un compte”

Barre de navigation : Accueil, Produits, Catégories, Connexion / Inscription, Sélecteur de langue

Section "Catégories populaires"

👥 Rôles utilisateur (interfaces séparées) :
Administrateur

Vendeur (Seller)

Acheteur (Buyer)

Chaque rôle a un espace dédié sécurisé avec routage spécifique :

Admin : /admin/dashboard

Seller : /seller/dashboard

Buyer : /buyer/home

🔐 Accès Admin :
Email : hassanzaghmane30@gmail.com

Mot de passe : hasszagh3006

🧩 Fonctionnalités principales :
👑 Espace ADMIN :
Tableau de bord avec statistiques détaillées :

Chiffre d’affaires global et par vendeur

Nombre total de commandes / commandes par période

Produits les plus et les moins vendus

Clients actifs / inactifs

Clients fidèles (répétition d’achats)

Paiements partiels ou dus

Répartition des paiements (PayPal vs à la livraison)

État des stocks (alerte faible ou rupture)

Taux de conversion visiteurs → acheteurs

Valeur client moyenne (CLV)

Panier moyen

Évolution des ventes (graphes)

Zakat :

Module de calcul intégré

Permet d’ajouter d’autres revenus externes et crédits personnels

Calcul automatique :

ini
Copier
Modifier
Zakat = 2.5% de [(Revenus business + autres revenus) - dettes]
Export en PDF

Gestion utilisateurs :

Activation / désactivation des comptes acheteurs

Visualisation de l'historique de commande de chaque client

Export des données en CSV ou PDF

Gestion produit :

Ajout / suppression des catégories

Recherche avancée par mots-clés (titre, description, référence, marque)

🛒 Espace CLIENT (Buyer) :
Parcours produits avec filtre et recherche

Paiement via PayPal ou à la livraison

Réception automatique d’un bon de commande en PDF après achat

Historique des commandes et factures

Interface utilisateur simple, rapide et claire

🛍️ Espace VENDEUR (Seller) :
Gestion de ses propres produits (ajout, édition, suppression)

Suivi de ses ventes et commandes clients

Statistiques personnelles
  