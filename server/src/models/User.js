// SERVER/src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  // Informations de base
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "mentor", "admin", "partner"],
    default: "student",
  },

  // PROFIL ONBOARDING (NOUVEAU)
  profile: {
    // Informations démographiques
    ageGroup: {
      type: String,
      enum: ["18-24", "25-34", "35+", ""],
    },
    nationality: String,
    currentCountry: String,
    currentStatus: {
      type: String,
      enum: ["student", "employed", "unemployed", "seeking", ""],
    },

    // Niveau académique
    educationLevel: {
      type: String,
      enum: ["bac", "licence", "master", "doctorat", "other", ""],
    },
    fieldOfStudy: {
      type: String,
      enum: [
        "informatique",
        "commerce",
        "ingénierie",
        "sciences",
        "arts",
        "sante",
        "droit",
        "education",
        "other",
        "",
      ],
    },
    currentYear: Number,
    university: String,
    gpa: String,

    // Objectifs
    primaryGoal: {
      type: String,
      enum: [
        "study_abroad",
        "job_abroad",
        "local_job",
        "internship",
        "language",
        "career_switch",
        "",
      ],
    },
    targetCountries: [String],
    preferredLanguages: [String],
    timeframe: {
      type: String,
      enum: ["immediate", "3_months", "6_months", "1_year", "flexible", ""],
    },

    // Compétences
    skills: [String],
    certifications: [String],
    interests: [String],

    // Préférences opportunités
    opportunityTypes: [String],
    preferredIndustries: [String],
    remoteWork: { type: Boolean, default: false },
    salaryExpectation: {
      type: String,
      enum: ["low", "medium", "high", "flexible", ""],
    },

    // Métadonnées onboarding
    onboardingCompleted: { type: Boolean, default: false },
    onboardingDate: Date,
    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },

    // Anciens champs (maintenus pour compatibilité)
    degree: String,
    country: String,
    city: String,
    languages: [String],
    currentInstitution: String,
  },

  // Intérêts (maintenu pour compatibilité)
  interests: {
    studyAbroad: { type: Boolean, default: false },
    technicalCertifications: { type: Boolean, default: false },
    internshipsJobs: { type: Boolean, default: false },
    researchPhd: { type: Boolean, default: false },
    scholarships: { type: Boolean, default: false },
  },

  // Objectifs (maintenu pour compatibilité)
  goals: {
    shortTerm: String,
    longTerm: String,
  },

  // Timeline (maintenu pour compatibilité)
  timeline: {
    currentYear: String,
    targetYear: String,
  },

  // Suivi et statistiques
  activity: {
    lastLogin: Date,
    totalLogins: { type: Number, default: 0 },
    resourcesViewed: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
    ],
    opportunitiesApplied: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
    ],
    testScores: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        score: Number,
        date: Date,
      },
    ],
  },

  // Paramètres
  settings: {
    language: { type: String, default: "Français" },
    emailNotifications: { type: String, default: "Toutes" },
  },

  // Dates
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware pour mettre à jour updatedAt
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Calculer le pourcentage de complétion si le profil est modifié
  if (this.isModified("profile") && this.profile) {
    this.profile.profileCompletion = this.calculateProfileCompletion();
  }

  next();
});

// Hacher le mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Méthode pour calculer le pourcentage de complétion du profil
userSchema.methods.calculateProfileCompletion = function () {
  const profile = this.profile || {};
  let completedFields = 0;
  const totalFields = 12;

  // Champs obligatoires pour l'onboarding
  const requiredFields = [
    profile.educationLevel,
    profile.fieldOfStudy,
    profile.primaryGoal,
    profile.targetCountries?.length > 0,
    profile.skills?.length > 0,
    profile.languages?.length > 0,
    profile.opportunityTypes?.length > 0,
    profile.preferredIndustries?.length > 0,
    profile.currentCountry,
    profile.currentStatus,
    profile.timeframe,
    profile.onboardingCompleted,
  ];

  completedFields = requiredFields.filter((field) => {
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === "boolean") return field;
    return field && field !== "";
  }).length;

  return Math.round((completedFields / totalFields) * 100);
};

// Méthode pour mettre à jour le profil
userSchema.methods.updateProfile = async function (profileData) {
  try {
    // Fusionner les données existantes avec les nouvelles
    this.profile = {
      ...this.profile,
      ...profileData,
      // Ne pas écraser la date d'onboarding existante
      onboardingDate: profileData.onboardingDate || this.profile.onboardingDate,
    };

    // Recalculer le pourcentage de complétion
    this.profile.profileCompletion = this.calculateProfileCompletion();

    // Mettre à jour la date de modification
    this.updatedAt = Date.now();

    await this.save();
    return this.profile;
  } catch (error) {
    throw error;
  }
};

// Méthode pour obtenir le profil formaté pour le dashboard
userSchema.methods.getDashboardProfile = function () {
  const profile = this.profile || {};

  return {
    personal: {
      name: this.name,
      email: this.email,
      profileCompletion: profile.profileCompletion || 0,
      onboardingCompleted: profile.onboardingCompleted || false,
    },
    academic: {
      educationLevel: profile.educationLevel,
      fieldOfStudy: profile.fieldOfStudy,
      currentYear: profile.currentYear,
      university: profile.university || this.currentInstitution,
      gpa: profile.gpa,
    },
    goals: {
      primaryGoal: profile.primaryGoal,
      targetCountries: profile.targetCountries || [],
      timeframe: profile.timeframe,
      preferredLanguages: profile.preferredLanguages || this.languages || [],
    },
    skills: {
      languages: profile.languages || this.languages || [],
      skills: profile.skills || [],
      certifications: profile.certifications || [],
      interests: profile.interests || [],
    },
    preferences: {
      opportunityTypes: profile.opportunityTypes || [],
      preferredIndustries: profile.preferredIndustries || [],
      remoteWork: profile.remoteWork || false,
      salaryExpectation: profile.salaryExpectation,
    },
    activity: {
      lastLogin: this.activity?.lastLogin,
      totalLogins: this.activity?.totalLogins || 0,
      resourcesViewed: this.activity?.resourcesViewed?.length || 0,
      opportunitiesApplied: this.activity?.opportunitiesApplied?.length || 0,
    },
  };
};

// Méthode pour formater les données publiques
userSchema.methods.getPublicProfile = function () {
  const profile = this.profile || {};

  return {
    name: this.name,
    academic: {
      educationLevel: profile.educationLevel || this.educationLevel,
      fieldOfStudy: profile.fieldOfStudy || this.fieldOfInterest,
      university: profile.university || this.currentInstitution,
    },
    location: {
      country: profile.currentCountry || this.country,
      city: this.city,
    },
    languages: profile.languages || this.languages || [],
    skills: profile.skills || [],
    interests: profile.interests || [],
    profileCompletion: profile.profileCompletion || 0,
    isProfilePublic: true,
  };
};

module.exports = mongoose.model("User", userSchema);
