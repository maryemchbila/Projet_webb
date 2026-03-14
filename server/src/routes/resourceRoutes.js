// SERVER/src/routes/resourceRoutes.js
const express = require("express");
const Resource = require("../models/Resources.js"); // ⚠️ SINGULIER

const router = express.Router();

// GET toutes les ressources
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (featured === "true") filter.isFeatured = true;

    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET catégories disponibles
router.get("/categories", async (req, res) => {
  try {
    const categories = await Resource.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET statistiques des ressources
router.get("/stats", async (req, res) => {
  try {
    const total = await Resource.countDocuments();
    const byCategory = await Resource.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      total,
      byCategory,
      featured: await Resource.countDocuments({ isFeatured: true }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET une ressource par ID
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Ressource non trouvée" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer une nouvelle ressource
router.post("/", async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
