// SERVER/src/models/Opportunity.js
const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["STAGE", "STAGE PFE", "EMPLOI", "ÉTUDES"],
    required: true,
  },
  title: { type: String, required: true },
  subtitle: String,
  description: { type: String, required: true },
  country: { type: String, required: true },
  duration: String,
  contract: String, // Pour emplois
  diploma: String, // Pour études
  detailsType: {
    type: String,
    enum: ["Durée", "Type", "Diplôme"],
  },
  isNew: { type: Boolean, default: false },
  date: Date,
  company: String,
  location: String,
  mode: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
