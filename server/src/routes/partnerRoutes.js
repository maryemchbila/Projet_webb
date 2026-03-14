// SERVER/src/routes/partnerRoutes.js
const express = require("express");
const Partner = require("../models/Partner.js");

const router = express.Router();

// GET tous les partenaires
router.get("/", async (req, res) => {
  try {
    const { type, search } = req.query;

    const filter = {};
    if (type) filter.type = type;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { specialties: { $regex: search, $options: "i" } },
      ];
    }

    const partners = await Partner.find(filter).sort({
      rating: -1,
      members: -1,
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET statistiques des partenaires
router.get("/stats", async (req, res) => {
  try {
    const total = await Partner.countDocuments();
    const universities = await Partner.countDocuments({ type: "university" });
    const companies = await Partner.countDocuments({ type: "company" });
    const totalMembers = await Partner.aggregate([
      { $group: { _id: null, total: { $sum: "$members" } } },
    ]);

    res.json({
      total,
      universities,
      companies,
      totalMembers: totalMembers[0]?.total || 0,
      averageRating: await Partner.aggregate([
        { $group: { _id: null, avg: { $avg: "$rating" } } },
      ]),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un partenaire par ID
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Partenaire non trouvé" });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer un nouveau partenaire
router.post("/", async (req, res) => {
  try {
    const partner = new Partner(req.body);
    const savedPartner = await partner.save();
    res.status(201).json(savedPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
