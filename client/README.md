# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
GlobalPath est une plateforme web innovante qui aide les étudiants à trouver et à préparer leurs opportunités d'études et de carrière à l'étranger. L'application offre des recommandations personnalisées, des fiches pays détaillées et un accompagnement complet pour réussir son projet international.

✨ Fonctionnalités Principales
🎯 Dashboard Personnalisé
Recommandations intelligentes basées sur votre profil

Statistiques personnalisées (opportunités, match score, progression)

Tableau de bord adaptatif qui évolue avec vos objectifs

Onboarding intelligent pour comprendre vos besoins

🌍 Fiche Pays Complète
Informations détaillées sur 20+ pays

Documents et visas nécessaires pour chaque destination

Coût de la vie estimé (étudiant/professionnel)

Contacts utiles et conseils pratiques

Filtres avancés par continent, langue, budget

💼 Opportunités Ciblées
Base de données de stages, emplois et programmes d'études

Matching algorithmique avec votre profil

Filtres multi-critères (localisation, secteur, durée)

Processus de candidature simplifié

📚 Ressources Pédagogiques
Cours en ligne (langues, compétences techniques)

Guides pratiques (CV, entretien, démarches)

Webinars avec des experts internationaux

Ressources téléchargeables

👥 Communauté Active
Partenaires universitaires et entreprises

Événements networking

Forums de discussion

Témoignages d'anciens

🏗️ Architecture Technique
Frontend (Client)
text
src/
├── components/ # Composants React réutilisables
│ ├── Dashboard/ # Tableau de bord et sous-composants
│ ├── FichePays/ # Système de fiches pays
│ ├── Opportunities/ # Gestion des opportunités
│ ├── Profil/ # Gestion du profil utilisateur
│ ├── Resources/ # Ressources pédagogiques
│ └── Community/ # Communauté et partenaires
├── services/ # Services API et authentification
├── assets/ # Images, styles, polices
├── utils/ # Fonctions utilitaires
├── App.jsx # Composant racine et routing
└── index.js # Point d'entrée React
Backend (API Server)
text
backend/
├── src/
│ ├── models/ # Modèles MongoDB (Mongoose)
│ ├── controllers/ # Logique métier des endpoints
│ ├── routes/ # Définition des routes API
│ ├── middleware/ # Authentication, validation
│ └── config/ # Configuration DB, JWT
├── server.js # Serveur Express principal
├── package.json # Dépendances Node.js
└── .env # Variables d'environnement
🚀 Démarrage Rapide
Prérequis
Node.js 16.x ou supérieur

npm 8.x ou supérieur

MongoDB 6.0 ou supérieur

Git

Installation
Cloner le repository

cd globalpath
Installer les dépendances frontend

bash
npm install
Installer et configurer le backend

bash
cd backend
npm install
cp .env.example .env

# Éditer .env avec vos configurations

Configurer les variables d'environnement

Frontend (.env)

env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
Backend (.env)

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/globalpath
JWT_SECRET=votre_secret_jwt
CORS_ORIGIN=http://localhost:3000
Lancer l'application
Démarrer MongoDB

bash

# Windows

net start MongoDB

bash
cd backend
npm run dev

# Serveur accessible sur http://localhost:5000

Démarrer le frontend

bash
cd ..
npm start

# Application accessible sur http://localhost:3000

📡 API Endpoints
Authentification
Méthode Endpoint Description
POST /api/auth/register Inscription d'un nouvel utilisateur
POST /api/auth/login Connexion utilisateur
GET /api/auth/me Récupérer l'utilisateur courant
POST /api/auth/logout Déconnexion
Utilisateurs
Méthode Endpoint Description
GET /api/users/:id Récupérer un utilisateur
PUT /api/users/:id Mettre à jour un utilisateur
GET /api/users/:id/profile Profil complet utilisateur
PUT /api/users/:id/profile Mettre à jour le profil
GET /api/users/:id/dashboard Données dashboard personnalisées
Opportunités
Méthode Endpoint Description
GET /api/opportunities Liste des opportunités
GET /api/opportunities/:id Détails d'une opportunité
POST /api/opportunities/:id/apply Postuler à une opportunité
GET /api/opportunities/filters Filtres disponibles
Fiches Pays
Méthode Endpoint Description
GET /api/countries Liste de tous les pays
GET /api/countries/:id Fiche détaillée d'un pays
GET /api/countries/search Recherche de pays
GET /api/countries/continents Liste des continents
Ressources
Méthode Endpoint Description
GET /api/resources Toutes les ressources
GET /api/resources/courses Cours en ligne
GET /api/resources/guides Guides pratiques
GET /api/resources/webinars Webinars à venir
