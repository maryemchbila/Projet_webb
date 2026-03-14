// SERVER/src/routes/profileRoutes.js
const express = require("express");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET profil de l'utilisateur connecté (protégé) - Version enrichie
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Calculer le pourcentage de complétion du profil
    const profileCompletion =
      user.profile?.profileCompletion ||
      (user.profile?.onboardingCompleted ? 100 : 0);

    // Format de réponse enrichi
    const response = {
      ...user.toObject(),
      profileCompletion,
      onboardingCompleted: user.profile?.onboardingCompleted || false,
      dashboardReady:
        user.profile?.onboardingCompleted && profileCompletion >= 70,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT mettre à jour le profil (protégé) - Version compatible onboarding
router.put("/update", auth, async (req, res) => {
  try {
    const updates = req.body;

    // Ne pas permettre la mise à jour du mot de passe via cette route
    if (updates.password) {
      delete updates.password;
    }

    // Si des données de profil sont fournies, les traiter spécialement
    if (updates.profile) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Utiliser la méthode updateProfile du modèle
      const updatedProfile = await user.updateProfile(updates.profile);

      const updatedUser = await User.findById(req.user.id).select("-password");

      res.json({
        ...updatedUser.toObject(),
        profileCompletion: user.profile.profileCompletion,
        message: "Profil mis à jour avec succès",
      });
    } else {
      // Mise à jour standard des autres champs
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET profil public d'un utilisateur - Version enrichie
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -email -settings -activity -__v"
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Format de réponse publique
    const publicProfile = {
      name: user.name,
      academic: {
        educationLevel: user.profile?.educationLevel || user.educationLevel,
        fieldOfStudy: user.profile?.fieldOfStudy || user.fieldOfInterest,
        university: user.profile?.university || user.currentInstitution,
        currentYear: user.profile?.currentYear || user.timeline?.currentYear,
      },
      location: {
        country: user.profile?.currentCountry || user.country,
        city: user.city,
      },
      languages: user.profile?.languages || user.languages || [],
      skills: user.profile?.skills || [],
      interests: user.profile?.interests || [],
      profileCompletion: user.profile?.profileCompletion || 0,
      isProfilePublic: true,
    };

    res.json(publicProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET état d'onboarding de l'utilisateur
router.get("/:userId/onboarding/status", auth, async (req, res) => {
  try {
    // Vérifier que l'utilisateur accède à son propre profil
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const missingFields = calculateMissingOnboardingFields(user.profile);
    const profileCompletion = user.profile?.profileCompletion || 0;

    res.json({
      onboardingCompleted: user.profile?.onboardingCompleted || false,
      profileCompletion,
      missingFields,
      progress: {
        academic: !!(
          user.profile?.educationLevel && user.profile?.fieldOfStudy
        ),
        goals: !!(
          user.profile?.primaryGoal && user.profile?.targetCountries?.length > 0
        ),
        skills: !!(
          user.profile?.skills?.length > 0 &&
          user.profile?.languages?.length > 0
        ),
        preferences: !!(user.profile?.opportunityTypes?.length > 0),
      },
      nextSteps: generateNextSteps(user.profile),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST compléter l'onboarding
router.post("/:userId/onboarding/complete", auth, async (req, res) => {
  try {
    // Vérifier que l'utilisateur accède à son propre profil
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const profileData = {
      ...req.body,
      onboardingCompleted: true,
      onboardingDate: new Date(),
    };

    // Mettre à jour le profil avec la méthode du modèle
    const updatedProfile = await user.updateProfile(profileData);

    // Mettre à jour la dernière activité
    user.activity.lastLogin = new Date();
    user.activity.totalLogins = (user.activity.totalLogins || 0) + 1;
    await user.save();

    res.json({
      success: true,
      message: "Onboarding complété avec succès !",
      profile: updatedProfile,
      profileCompletion: user.profile.profileCompletion,
      dashboardUrl: "/dashboard",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET tableau de bord personnalisé
router.get("/:userId/dashboard", auth, async (req, res) => {
  try {
    // Vérifier que l'utilisateur accède à son propre profil
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'onboarding est complété
    if (!user.profile?.onboardingCompleted) {
      return res.status(400).json({
        message: "Veuillez compléter l'onboarding d'abord",
        redirectToOnboarding: true,
        profileCompletion: user.profile?.profileCompletion || 0,
      });
    }

    // Générer les données du dashboard
    const dashboardData = await generateDashboardData(user);

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        profileCompletion: user.profile.profileCompletion,
      },
      ...dashboardData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT mettre à jour les intérêts - Version compatible onboarding
router.put("/interests", auth, async (req, res) => {
  try {
    const { interests } = req.body;

    // Si interests est un tableau (nouveau format), l'ajouter au profil
    if (Array.isArray(interests)) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour les intérêts dans le profil
      user.profile.interests = interests;
      user.profile.profileCompletion = user.calculateProfileCompletion();
      await user.save();

      const updatedUser = await User.findById(req.user.id).select("-password");
      res.json({
        ...updatedUser.toObject(),
        profileCompletion: user.profile.profileCompletion,
      });
    } else {
      // Ancien format (compatibilité)
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { interests } },
        { new: true }
      ).select("-password");

      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour les objectifs - Version compatible onboarding
router.put("/goals", auth, async (req, res) => {
  try {
    const { goals } = req.body;

    // Si goals.primaryGoal est présent (nouveau format), l'ajouter au profil
    if (goals?.primaryGoal) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour les objectifs dans le profil
      user.profile.primaryGoal = goals.primaryGoal;
      user.profile.timeframe = goals.timeframe || user.profile.timeframe;
      user.profile.profileCompletion = user.calculateProfileCompletion();
      await user.save();

      const updatedUser = await User.findById(req.user.id).select("-password");
      res.json({
        ...updatedUser.toObject(),
        profileCompletion: user.profile.profileCompletion,
      });
    } else {
      // Ancien format (compatibilité)
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { goals } },
        { new: true }
      ).select("-password");

      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour la timeline - Version compatible onboarding
router.put("/timeline", auth, async (req, res) => {
  try {
    const { timeline } = req.body;

    // Si timeline.currentYear est présent (nouveau format), l'ajouter au profil
    if (timeline?.currentYear) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Mettre à jour la timeline dans le profil
      user.profile.currentYear = timeline.currentYear;
      user.profile.profileCompletion = user.calculateProfileCompletion();
      await user.save();

      const updatedUser = await User.findById(req.user.id).select("-password");
      res.json({
        ...updatedUser.toObject(),
        profileCompletion: user.profile.profileCompletion,
      });
    } else {
      // Ancien format (compatibilité)
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { timeline } },
        { new: true }
      ).select("-password");

      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET statistiques de l'utilisateur
router.get("/:userId/stats", auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupérer les statistiques (à adapter selon vos modèles)
    // const applications = await Application.countDocuments({ userId: user._id });
    // const coursesCompleted = await Course.countDocuments({
    //   enrolledUsers: user._id,
    //   status: 'completed'
    // });

    const stats = {
      profileCompletion: user.profile?.profileCompletion || 0,
      totalLogins: user.activity?.totalLogins || 0,
      lastLogin: user.activity?.lastLogin,
      resourcesViewed: user.activity?.resourcesViewed?.length || 0,
      opportunitiesApplied: user.activity?.opportunitiesApplied?.length || 0,
      // applications,
      // coursesCompleted,
      testScores: user.activity?.testScores?.length || 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== FONCTIONS HELPER ====================

function calculateMissingOnboardingFields(profile) {
  if (!profile) return ["Profil non initialisé"];

  const missing = [];

  if (!profile.educationLevel || profile.educationLevel === "") {
    missing.push("Niveau d'études");
  }

  if (!profile.fieldOfStudy || profile.fieldOfStudy === "") {
    missing.push("Domaine d'études");
  }

  if (!profile.primaryGoal || profile.primaryGoal === "") {
    missing.push("Objectif principal");
  }

  if (!profile.targetCountries || profile.targetCountries.length === 0) {
    missing.push("Pays cibles");
  }

  if (!profile.skills || profile.skills.length === 0) {
    missing.push("Compétences");
  }

  if (!profile.languages || profile.languages.length === 0) {
    missing.push("Langues parlées");
  }

  if (!profile.opportunityTypes || profile.opportunityTypes.length === 0) {
    missing.push("Types d'opportunités recherchés");
  }

  if (
    !profile.preferredIndustries ||
    profile.preferredIndustries.length === 0
  ) {
    missing.push("Secteurs d'activité préférés");
  }

  return missing;
}

function generateNextSteps(profile) {
  const nextSteps = [];

  if (!profile.onboardingCompleted) {
    nextSteps.push({
      id: "complete_onboarding",
      title: "Complétez votre profil",
      description:
        "Répondez à quelques questions pour personnaliser votre expérience",
      priority: "high",
      action: { type: "navigate", path: "/onboarding" },
    });
  }

  if (!profile.targetCountries || profile.targetCountries.length === 0) {
    nextSteps.push({
      id: "add_countries",
      title: "Ajoutez des pays cibles",
      description:
        "Indiquez les pays qui vous intéressent pour étudier ou travailler",
      priority: "medium",
      action: { type: "update_profile", field: "targetCountries" },
    });
  }

  if (!profile.skills || profile.skills.length < 3) {
    nextSteps.push({
      id: "add_skills",
      title: "Ajoutez vos compétences",
      description:
        "Plus vous ajoutez de compétences, plus nos recommandations seront pertinentes",
      priority: "medium",
      action: { type: "update_profile", field: "skills" },
    });
  }

  return nextSteps;
}

async function generateDashboardData(user) {
  // Données fictives en attendant vos modèles
  // À remplacer par vos propres requêtes MongoDB

  const opportunities = [
    {
      _id: "1",
      title: "Stage - Développeur Full Stack",
      company: "TechStart",
      location: "Paris, France",
      type: "internship",
      duration: "6 mois",
      salary: "1200€/mois",
      matchScore: calculateMatchScore(user.profile, {
        location: { country: "France" },
        type: "internship",
        category: "tech",
      }),
      description: "Stage en développement web avec React et Node.js",
      deadline: "2024-03-15",
      isNew: true,
    },
    {
      _id: "2",
      title: "Assistant Marketing Digital",
      company: "MarketingPro",
      location: "Lyon, France",
      type: "full_time",
      duration: "CDI",
      salary: "35k€/an",
      matchScore: calculateMatchScore(user.profile, {
        location: { country: "France" },
        type: "full_time",
        category: "marketing",
      }),
      description:
        "Poste en marketing digital avec gestion des réseaux sociaux",
      deadline: "2024-03-30",
      isNew: false,
    },
  ]
    .filter((opp) => opp.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

  const courses = [
    {
      _id: "1",
      title: "Introduction à la Programmation",
      subtitle: "Apprendre les bases de la programmation avec Python",
      progress: 65,
      completedModules: 4,
      totalModules: 6,
      lastActivity: "Hier",
      status: "En cours",
      estimatedTime: "15h",
      category: "informatique",
      matchScore: user.profile?.skills?.includes("programming") ? 90 : 40,
    },
    {
      _id: "2",
      title: "Préparation au TOEFL",
      subtitle: "Améliorez votre score au test d'anglais",
      progress: 30,
      completedModules: 2,
      totalModules: 8,
      lastActivity: "Il y a 3 jours",
      status: "En cours",
      estimatedTime: "25h",
      category: "langues",
      matchScore: user.profile?.primaryGoal === "study_abroad" ? 88 : 30,
    },
  ]
    .filter((course) => course.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  const recommendations = [
    {
      type: "course",
      title: "Guide d'orientation post-bac",
      description: "Trouvez la formation qui correspond à votre profil",
      icon: "🎓",
      link: "/resources/orientation-post-bac",
      actionText: "Consulter le guide",
    },
    {
      type: "test",
      title: "Passez un test de compétences",
      description: "Découvrez vos points forts et axes d'amélioration",
      icon: "🧪",
      link: "/tests/skills",
      actionText: "Commencer le test",
    },
  ];

  // Ajouter des recommandations basées sur le profil
  if (user.profile?.primaryGoal === "study_abroad") {
    recommendations.push({
      type: "resource",
      title: "Tests de langue requis",
      description: "TOEFL, IELTS, DELF selon votre pays cible",
      icon: "🌐",
      link: "/resources/language-tests",
      actionText: "Voir les tests",
    });
  }

  if (user.profile?.skills?.includes("programming")) {
    recommendations.push({
      type: "resource",
      title: "Certifications tech recommandées",
      description: "AWS, Google Cloud, Microsoft Azure",
      icon: "💻",
      link: "/resources/ai-certifications",
      actionText: "Explorer",
    });
  }

  const stats = {
    totalOpportunities: opportunities.length,
    applications: user.activity?.opportunitiesApplied?.length || 0,
    matchScore:
      opportunities.length > 0
        ? Math.round(
            opportunities.reduce((sum, opp) => sum + opp.matchScore, 0) /
              opportunities.length
          )
        : 0,
    profileCompletion: user.profile?.profileCompletion || 0,
  };

  return {
    opportunities,
    courses,
    stats,
    recommendations,
    recentActivity: user.activity || {},
  };
}

function calculateMatchScore(userProfile, opportunity) {
  let score = 0;

  // Match par pays (30%)
  if (userProfile.targetCountries?.includes(opportunity.location?.country)) {
    score += 30;
  }

  // Match par type d'opportunité (25%)
  if (userProfile.opportunityTypes?.includes(opportunity.type)) {
    score += 25;
  }

  // Match par secteur (20%)
  if (userProfile.preferredIndustries?.includes(opportunity.category)) {
    score += 20;
  }

  // Match par objectif (15%)
  if (
    userProfile.primaryGoal === "study_abroad" &&
    opportunity.type === "scholarship"
  ) {
    score += 15;
  } else if (
    userProfile.primaryGoal === "job_abroad" &&
    opportunity.type === "full_time"
  ) {
    score += 15;
  }

  // Match par compétences (10%)
  if (userProfile.skills && opportunity.requiredSkills) {
    const matchingSkills = userProfile.skills.filter((skill) =>
      opportunity.requiredSkills.includes(skill)
    );
    score += Math.min(
      (matchingSkills.length / userProfile.skills.length) * 10,
      10
    );
  }

  return Math.min(score, 100);
}

module.exports = router;
