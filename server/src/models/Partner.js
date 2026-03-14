// SERVER/src/models/Partner.js
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["university", "company"],
    required: true,
  },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  specialties: [String],
  founded: Number,
  website: String,
  email: String,
  logo: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Partner", partnerSchema);
