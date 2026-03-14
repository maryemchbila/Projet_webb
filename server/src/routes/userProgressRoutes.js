// SERVER/src/routes/userProgressRoutes.js
const express = require("express");
const UserProgress = require("../models/UserProgress.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET progression de l'utilisateur connecté
router.get("/me", auth, async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.user.id }).sort({
      lastAccessed: -1,
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST ajouter/mettre à jour une progression
router.post("/", auth, async (req, res) => {
  try {
    const { resourceName, progress, score } = req.body;

    // Vérifier si la progression existe déjà
    let userProgress = await UserProgress.findOne({
      userId: req.user.id,
      resourceName,
    });

    if (userProgress) {
      // Mettre à jour
      userProgress.progress = progress;
      userProgress.score = score;
      userProgress.lastAccessed = new Date();
    } else {
      // Créer nouvelle
      userProgress = new UserProgress({
        userId: req.user.id,
        resourceName,
        progress,
        score,
        lastAccessed: new Date(),
      });
    }

    await userProgress.save();
    res.status(201).json(userProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour la progression
router.put("/:id", auth, async (req, res) => {
  try {
    const userProgress = await UserProgress.findById(req.params.id);

    if (!userProgress) {
      return res.status(404).json({ message: "Progression non trouvée" });
    }

    // Vérifier que l'utilisateur est propriétaire
    if (userProgress.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    userProgress.progress = req.body.progress;
    userProgress.score = req.body.score;
    userProgress.lastAccessed = new Date();

    await userProgress.save();
    res.json(userProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET statistiques de progression
router.get("/stats", auth, async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.user.id });

    const stats = {
      totalResources: progress.length,
      averageProgress:
        progress.reduce((sum, p) => sum + p.progress, 0) / progress.length || 0,
      completed: progress.filter((p) => p.progress === 100).length,
      inProgress: progress.filter((p) => p.progress > 0 && p.progress < 100)
        .length,
      notStarted: progress.filter((p) => p.progress === 0).length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
