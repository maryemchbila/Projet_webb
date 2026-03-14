// SERVER/src/seed/seedDatabase.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const Course = require("../models/Course.js");
const Opportunity = require("../models/Opportunities.js");
const Resource = require("../models/Resources.js");
const Partner = require("../models/Partner.js");
const UserProgress = require("../models/UserProgress.js");
require("dotenv").config();

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/globalpath"
    );
    console.log("✅ Connecté à MongoDB");

    // Nettoyer la base existante
    console.log("🧹 Nettoyage de la base...");
    await User.deleteMany({});
    await Course.deleteMany({});
    await Opportunity.deleteMany({});
    await Resource.deleteMany({});
    await Partner.deleteMany({});
    await UserProgress.deleteMany({});

    // 1. Créer les utilisateurs
    console.log("👥 Création des utilisateurs...");
    const users = [
      {
        name: "Ahmed Benali",
        email: "ahmed@example.com",
        password: "password123",
        role: "student",
        degree: "Étudiant en Informatique",
        country: "Maroc",
        city: "Casablanca",
        educationLevel: "licence",
        fieldOfInterest: "Développement Web & IA",
        languages: ["Français", "Anglais", "Arabe"],
        currentInstitution: "Université Hassan II",
        gpa: "15.5/20",
        projects: "Développement d'une plateforme e-learning",
        interests: {
          studyAbroad: true,
          technicalCertifications: true,
          internshipsJobs: true,
          researchPhd: false,
          scholarships: true,
        },
        goals: {
          shortTerm: "Obtenir une certification AWS",
          longTerm: "Travailler comme ingénieur logiciel en Europe",
        },
        timeline: {
          currentYear: "2024",
          targetYear: "2026",
        },
      },
      {
        name: "Fatima Zohra",
        email: "fatima@example.com",
        password: "password123",
        role: "mentor",
        degree: "Docteur en Informatique",
        country: "France",
        city: "Paris",
        educationLevel: "doctorat",
        fieldOfInterest: "Machine Learning",
        languages: ["Français", "Anglais", "Espagnol"],
        currentInstitution: "Sorbonne Université",
      },
      {
        name: "Karim Tech",
        email: "karim@example.com",
        password: "password123",
        role: "partner",
        degree: "CEO",
        country: "Canada",
        city: "Montréal",
        educationLevel: "master",
        fieldOfInterest: "Recrutement Tech",
      },
    ];

    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      await user.save();
      createdUsers.push(user);
      console.log(`   Créé: ${user.name} (${user.email})`);
    }

    // 2. Créer les cours (pour Dashboard)
    console.log("📚 Création des cours...");
    const courses = [
      {
        title: "Anglais Professionnel",
        subtitle: "Préparation TOEFL/IELTS",
        description:
          "Maîtrisez l'anglais professionnel pour réussir vos certifications internationales",
        category: "language",
        progress: 65,
        completedModules: 13,
        totalModules: 20,
        lastActivity: new Date("2024-12-20"),
        status: "in_progress",
        enrolledBy: [createdUsers[0]._id],
      },
      {
        title: "Développement Fullstack",
        subtitle: "React, Node.js, MongoDB",
        description:
          "Devenez développeur fullstack avec les technologies modernes",
        category: "technical",
        progress: 45,
        completedModules: 9,
        totalModules: 20,
        lastActivity: new Date("2024-12-18"),
        status: "in_progress",
        enrolledBy: [createdUsers[0]._id],
      },
      {
        title: "Intelligence Artificielle",
        subtitle: "Machine Learning & Deep Learning",
        description: "Introduction aux concepts fondamentaux de l'IA",
        category: "technical",
        progress: 20,
        completedModules: 4,
        totalModules: 20,
        lastActivity: new Date("2024-12-15"),
        status: "in_progress",
        enrolledBy: [createdUsers[0]._id],
      },
    ];

    const createdCourses = [];
    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
      createdCourses.push(course);
    }

    // 3. Créer les opportunités (exactement comme dans votre code)
    console.log("🎯 Création des opportunités...");
    const opportunities = [
      {
        type: "STAGE",
        title: "Stage - Réseaux à l'événementiel",
        subtitle:
          "Découvrir des infrastructures réseau en milieu professionnel",
        description:
          "Ce stage se déroule au sein d'une entreprise technologique à l'étranger et vise à initier l'étudiant aux bases de la configuration et de la supervision des réseaux.",
        country: "France",
        duration: "2 mois",
        detailsType: "Durée",
        isNew: true,
        date: new Date("2024-04-15"),
        company: "TechEvents SARL",
        location: "Paris",
        mode: "Présentiel",
      },
      {
        type: "STAGE PFE",
        title: "Stage PFE - Cybersécurité",
        subtitle:
          "Sécurisation des systèmes d'information dans un contexte international",
        description:
          "Ce stage de Projet de Fin d'Études est proposé par une entreprise internationale spécialisée en cybersécurité.",
        country: "Allemagne",
        duration: "6 mois",
        detailsType: "Durée",
        isNew: false,
        date: new Date("2024-03-20"),
        company: "SecureCorp GmbH",
        location: "Berlin",
        mode: "Hybride",
      },
      {
        type: "EMPLOI",
        title: "Ingénieur Réseaux Junior",
        subtitle: "Gestion et optimisation des réseaux d'entreprise",
        description:
          "Cette opportunité d'emploi à l'étranger s'adresse aux jeunes diplômés souhaitant débuter leur carrière dans un environnement international.",
        country: "Canada",
        contract: "CDI",
        detailsType: "Type",
        isNew: true,
        date: new Date("2024-04-10"),
        company: "NetSolutions Inc.",
        location: "Montréal",
        mode: "Présentiel",
      },
      {
        type: "ÉTUDES",
        title: "Master en Intelligence Artificielle",
        subtitle: "Formation approfondie en IA et technologies innovantes",
        description:
          "Ce programme de master est proposé par une université reconnue à l'international.",
        country: "France",
        diploma: "Master",
        duration: "2 ans",
        detailsType: "Diplôme",
        isNew: false,
        date: new Date("2024-02-28"),
        company: "Université Paris-Saclay",
        location: "Paris",
        mode: "Présentiel",
      },
    ];

    for (const oppData of opportunities) {
      const opportunity = new Opportunity(oppData);
      await opportunity.save();
    }

    // 4. Créer les ressources (exactement comme dans votre code)
    console.log("📁 Création des ressources...");
    const resources = [
      {
        category: "language-tests",
        title: "Tests de Langue",
        description:
          "Certifiez votre niveau dans les langues les plus demandées pour études et immigration.",
        icon: "🌐",
        color: "blue",
        items: 6,
        tags: ["IELTS", "TOEFL", "DELF", "anglais", "français"],
      },
      {
        category: "skills-tests",
        title: "Tests de Compétences",
        description:
          "Évaluez vos capacités cognitives et découvrez vos forces.",
        icon: "🧠",
        color: "purple",
        items: 3,
        tags: ["aptitude", "logique", "technique"],
      },
      {
        category: "ai-certifications",
        title: "Intelligence Artificielle",
        description:
          "Formations et certifications IA reconnues par les plus grandes entreprises tech.",
        icon: "🤖",
        color: "orange",
        items: 7,
        isFeatured: true,
        tags: ["IA", "machine learning", "deep learning"],
      },
      {
        category: "cv-applications",
        title: "CV & Candidatures",
        description: "Créez un CV professionnel qui se démarque.",
        icon: "📄",
        color: "green",
        items: 6,
        tags: ["CV", "lettre de motivation", "entretien"],
      },
      {
        category: "post-bac",
        title: "Orientation Post-Bac",
        description:
          "Guides complets pour réussir votre orientation après le baccalauréat.",
        icon: "🎓",
        color: "red",
        items: 4,
        tags: ["orientation", "bac", "université"],
      },
      {
        category: "masters-doctorat",
        title: "Masters & Doctorat",
        description:
          "Tout savoir sur les programmes de master et MBA internationaux.",
        icon: "📚",
        color: "indigo",
        items: 6,
        tags: ["master", "doctorat", "MBA", "recherche"],
      },
    ];

    const createdResources = [];
    for (const resourceData of resources) {
      const resource = new Resource(resourceData);
      await resource.save();
      createdResources.push(resource);
    }

    // 5. Créer les partenaires (exactement comme dans votre code)
    console.log("🏢 Création des partenaires...");
    const partners = [
      {
        type: "university",
        name: "Université Paris-Sorbonne",
        location: "Paris, France",
        description:
          "L'une des universités les plus prestigieuses de France, reconnue mondialement pour ses programmes en sciences humaines, lettres et arts.",
        members: 1250,
        rating: 4.8,
        specialties: ["Lettres", "Histoire", "Philosophie", "Arts"],
        founded: 1257,
        website: "https://www.sorbonne-universite.fr",
      },
      {
        type: "university",
        name: "Technical University Munich",
        location: "Munich, Allemagne",
        description:
          "Leader européen en ingénierie et technologie, reconnue pour son excellence en recherche et innovation.",
        members: 1850,
        rating: 4.7,
        specialties: [
          "Ingénierie",
          "Informatique",
          "Physique",
          "Mathématiques",
        ],
        founded: 1868,
        website: "https://www.tum.de",
      },
      {
        type: "company",
        name: "Google International",
        location: "Mountain View, États-Unis",
        description:
          "Géant technologique mondial offrant des opportunités de stage et d'emploi dans l'innovation et le développement.",
        members: 890,
        rating: 4.6,
        specialties: [
          "Stages Tech",
          "Mentorat",
          "Formation Continue",
          "Innovation",
        ],
        founded: 1998,
        website: "https://careers.google.com",
      },
      {
        type: "company",
        name: "Airbus Group",
        location: "Toulouse, France",
        description:
          "Leader mondial de l'aéronautique et de l'espace, offrant des programmes de formation et des opportunités de carrière internationale.",
        members: 650,
        rating: 4.5,
        specialties: [
          "Ingénierie Aérospatiale",
          "Stages",
          "Graduate Program",
          "Recherche",
        ],
        founded: 1970,
        website: "https://www.airbus.com",
      },
    ];

    for (const partnerData of partners) {
      const partner = new Partner(partnerData);
      await partner.save();
    }

    // 6. Créer les progressions utilisateur
    console.log("📊 Création des progressions...");
    const progressions = [
      {
        userId: createdUsers[0]._id,
        resourceName: "IELTS - Test blanc",
        progress: 65,
        score: "6.5",
      },
      {
        userId: createdUsers[0]._id,
        resourceName: "Google AI Certificate",
        progress: 45,
      },
      {
        userId: createdUsers[0]._id,
        resourceName: "TOEFL Préparation",
        progress: 20,
      },
    ];

    for (const progData of progressions) {
      const progression = new UserProgress(progData);
      await progression.save();
    }

    console.log("\n🎉 BASE DE DONNÉES PEUPLÉE AVEC SUCCÈS !");
    console.log("==========================================");
    console.log(`👥 Utilisateurs: ${createdUsers.length}`);
    console.log(`📚 Cours: ${createdCourses.length}`);
    console.log(`🎯 Opportunités: ${opportunities.length}`);
    console.log(`📁 Ressources: ${createdResources.length}`);
    console.log(`🏢 Partenaires: ${partners.length}`);
    console.log(`📊 Progressions: ${progressions.length}`);
    console.log("\n🔗 Pour vous connecter:");
    console.log("   Email: ahmed@example.com");
    console.log("   Mot de passe: password123");
    console.log("\n🚀 Votre frontend est maintenant prêt à être connecté !");
  } catch (error) {
    console.error("❌ Erreur lors du peuplement:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion de MongoDB");
    process.exit(0);
  }
}

// Exécuter le script
seedDatabase();
