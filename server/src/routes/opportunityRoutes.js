// SERVER/src/routes/opportunityRoutes.js
const express = require("express");
const Opportunity = require("../models/Opportunities.js"); // ⚠️ SINGULIER

const router = express.Router();

// GET toutes les opportunités avec filtres
router.get("/", async (req, res) => {
  try {
    const { type, country, search, page = 1, limit = 10 } = req.query;

    // Construire le filtre
    const filter = {};
    if (type) filter.type = type;
    if (country) filter.country = country;

    // Filtre de recherche
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const opportunities = await Opportunity.find(filter)
      .sort({ date: -1, isNew: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Opportunity.countDocuments(filter);

    res.json({
      opportunities,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalOpportunities: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET filtres disponibles
router.get("/filters", async (req, res) => {
  try {
    const types = await Opportunity.distinct("type");
    const countries = await Opportunity.distinct("country");

    res.json({
      types: types.filter(Boolean),
      countries: countries.filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET une opportunité par ID
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunité non trouvée" });
    }
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer une nouvelle opportunité (admin/partner)
router.post("/", async (req, res) => {
  try {
    const opportunity = new Opportunity({
      ...req.body,
      date: new Date(),
    });
    const savedOpportunity = await opportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour une opportunité
router.put("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunité non trouvée" });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE supprimer une opportunité
router.delete("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunité non trouvée" });
    }

    res.json({ message: "Opportunité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
