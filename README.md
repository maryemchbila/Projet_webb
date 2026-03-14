# 🌍 GlobalPath - Plateforme Internationale

## 📋 Description du Projet
GlobalPath est une plateforme web permettant aux étudiants et professionnels de découvrir des opportunités internationales (études, stages, emplois).

## 🚀 Fonctionnalités Développées

### Frontend (React)
- ✅ **Pages dynamiques** : Accueil, À propos, Dashboard
- ✅ **Système d'authentification** : Inscription et connexion
- ✅ **Interface moderne** et responsive
- ✅ **Modals interactives** pour l'authentification

### Backend (Node.js/Express)
- ✅ **API RESTful** avec endpoints d'authentification
- ✅ **Base de données MongoDB** avec Mongoose
- ✅ **Sécurité** : Hashage bcrypt + JWT
- ✅ **Validation des données** avec express-validator

## 🛠️ Technologies Utilisées

### Frontend
- **React** 18+ - Framework UI moderne
- **CSS3** - Styling et responsive design
- **JavaScript ES6+** - Logique applicative

### Backend  
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification token-based
- **bcryptjs** - Hashage des mots de passe

## 📁 Structure du Projet
Projet_Web_Objectif3/
├── client/ # Application React
├── server/ # API Node.js/Express
└── docs/ # Documentation

## 🏃‍♂️ Installation et Lancement

### Prérequis
- Node.js 16+
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend
```bash
cd server
npm install
cp .env.example .env
# Éditer .env avec vos configurations MongoDB
npm run dev
API disponible sur : http://localhost:5000
🔌 API Endpoints
Authentification
POST /api/auth/register - Inscription utilisateur

POST /api/auth/login - Connexion utilisateur

Pages
GET / - Page d'accueil

GET /api/test - Route de test