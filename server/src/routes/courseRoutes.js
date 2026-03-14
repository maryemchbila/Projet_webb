// SERVER/src/routes/courseRoutes.js
const express = require("express");
const Course = require("../models/Course.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET tous les cours (public)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET cours d'un utilisateur spécifique (protégé)
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const courses = await Course.find({ enrolledBy: req.params.userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un cours par ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer un nouveau cours (admin seulement)
router.post("/", auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour la progression d'un cours (protégé)
router.put("/:id/progress", auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    // Vérifier si l'utilisateur est inscrit au cours
    if (!course.enrolledBy.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas inscrit à ce cours" });
    }

    course.progress = progress;
    course.lastActivity = new Date();
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT s'inscrire à un cours
router.put("/:id/enroll", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    // Ajouter l'utilisateur s'il n'est pas déjà inscrit
    if (!course.enrolledBy.includes(req.user.id)) {
      course.enrolledBy.push(req.user.id);
      await course.save();
    }

    res.json({ message: "Inscription réussie", course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
