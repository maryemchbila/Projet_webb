// src/components/Dashboard/data.js
// Données fictives pour le Dashboard

export const opportunitiesData = [
  {
    id: 1,
    title: "Stage PFE – Développement & Réseaux",
    subtitle:
      "Développement d'infrastructures réseaux en environnement industriel et international",
    company: "Siemens France",
    location: "France / Alternance",
    duration: "6 mois",
    type: "Stage",
    mode: "Hybride",
    description:
      "Mise en place de solutions de sécurité réseaux (VPN, Firewall, IDS).",
    isNew: true,
  },
  {
    id: 2,
    title: "Stage PFE – IoT & Systèmes embarqués",
    company: "Société industrielle / R&D",
    duration: "5 mois",
    mode: "Présentiel",
    description:
      "Développement d'un système IoT pour la collecte et la transmission de données via microcontrôleurs.",
    isNew: false,
  },
  {
    id: 3,
    title: "Stage PFE – Machine Learning & Data",
    subtitle: "Analyse intelligente de données à grande volumétrie",
    company: "Google",
    location: "Canada",
    duration: "6 mois",
    type: "Stage",
    mode: "Présentiel / Hybride",
    description:
      "Développement de modules de machine learning pour la prédiction et l'analyse.",
    isNew: false,
  },
];

export const coursesData = [
  {
    id: 1,
    title: "Préparation TOEIC",
    subtitle: "Amélioration du score en anglais professionnel",
    progress: 65,
    completedModules: 12,
    totalModules: 20,
    lastActivity: "il y a 2 jours",
    status: "En cours",
  },
  {
    id: 2,
    title: "Préparation TOEFL",
    subtitle: "Module de l'épreuve académique",
    progress: 40,
    completedModules: 8,
    totalModules: 20,
    lastActivity: "il y a 5 jours",
    status: "En cours",
  },
];

export const userData = {
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  university: "Université Paris-Saclay",
  field: "Informatique",
  level: "Master 2",
};

// Exports alternatifs (compatibilité)
export const coursesMock = coursesData;
export const opportunitiesMock = opportunitiesData;
