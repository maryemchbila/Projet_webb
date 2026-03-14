// SERVER/src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// IMPORT DES ROUTES (CommonJS)
const authRoutes = require("./routes/auth.js");
const courseRoutes = require("./routes/courseRoutes.js");
const opportunityRoutes = require("./routes/opportunityRoutes.js");
const resourceRoutes = require("./routes/resourceRoutes.js");
const partnerRoutes = require("./routes/partnerRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const userProgressRoutes = require("./routes/userProgressRoutes.js");

const app = express();

// Connexion DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log("❌ Erreur MongoDB:", err));

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5178",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// ==================== ROUTES TEMPORAIRES POUR L'ONBOARDING ====================
// Ces routes DOIVENT être définies AVANT les autres routes

// Route GET pour récupérer le profil
app.get("/api/users/:id/profile", (req, res) => {
  console.log("GET profile for user:", req.params.id);
  res.json({
    success: true,
    profile: {
      onboardingCompleted: false,
      profileCompletion: 30,
      educationLevel: "",
      fieldOfStudy: "",
      primaryGoal: "",
      targetCountries: [],
      skills: [],
      languages: ["fr"],
      opportunityTypes: [],
      preferredIndustries: [],
    },
    user: {
      name: "Utilisateur Test",
      email: "test@example.com",
    },
  });
});

// Route POST pour compléter l'onboarding
app.post("/api/users/:id/onboarding/complete", (req, res) => {
  console.log(
    "Complete onboarding for user:",
    req.params.id,
    "Data:",
    req.body
  );

  try {
    // Validation des données
    if (
      !req.body.educationLevel ||
      !req.body.fieldOfStudy ||
      !req.body.primaryGoal
    ) {
      return res.status(400).json({
        success: false,
        error: "Champs requis manquants",
        required: ["educationLevel", "fieldOfStudy", "primaryGoal"],
      });
    }

    res.json({
      success: true,
      message: "Onboarding complété avec succès",
      profile: {
        ...req.body,
        onboardingCompleted: true,
        onboardingDate: new Date().toISOString(),
        profileCompletion: 100,
      },
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error("Error in onboarding route:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
});

// Route pour le dashboard
app.get("/api/users/:id/dashboard", (req, res) => {
  console.log("GET dashboard for user:", req.params.id);
  res.json({
    success: true,
    data: {
      user: {
        name: "Utilisateur Test",
        email: "test@example.com",
        profileCompletion: 100,
      },
      opportunities: [
        {
          _id: "1",
          title: "Stage - Développeur Full Stack",
          company: "TechStart",
          location: "Paris, France",
          type: "internship",
          duration: "6 mois",
          salary: "1200€/mois",
          matchScore: 85,
          description: "Stage en développement web avec React et Node.js",
          isNew: true,
        },
      ],
      courses: [
        {
          _id: "1",
          title: "Introduction à la Programmation",
          subtitle: "Apprendre les bases de la programmation avec Python",
          progress: 65,
          completedModules: 4,
          totalModules: 6,
          lastActivity: "Hier",
          status: "En cours",
        },
      ],
      stats: {
        totalOpportunities: 5,
        applications: 0,
        matchScore: 75,
        profileCompletion: 100,
      },
      recommendations: [
        {
          type: "course",
          title: "Guide d'orientation post-bac",
          description: "Trouvez la formation qui correspond à votre profil",
          icon: "🎓",
          link: "/resources/orientation-post-bac",
          actionText: "Consulter le guide",
        },
      ],
    },
  });
});

// MONTER TOUTES LES ROUTES PRINCIPALES
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progress", userProgressRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API GlobalPath Server is running!",
    version: "1.0.0",
    routes: {
      auth: "/api/auth",
      courses: "/api/courses",
      opportunities: "/api/opportunities",
      resources: "/api/resources",
      partners: "/api/partners",
      profile: "/api/profile",
      progress: "/api/progress",
      users: "/api/users/:id/* (temporaires)",
    },
  });
});

// Route test pour vérifier le montage
app.get("/api/test", (req, res) => {
  res.json({
    message: "Route /api/test fonctionne!",
    timestamp: new Date().toISOString(),
  });
});

// Route de santé
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "globalpath-api",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route non trouvée",
    path: req.originalUrl,
    method: req.method,
  });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err.stack);
  res.status(500).json({
    success: false,
    error: "Erreur interne du serveur",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ⚠️ IMPORTANT : module.exports au lieu de export default
module.exports = app;
