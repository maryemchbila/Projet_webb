// SERVER/src/models/Resource.js
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "language-tests",
      "skills-tests",
      "ai-certifications",
      "cv-applications",
      "post-bac",
      "masters-doctorat",
    ],
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  link: String,
  icon: String,
  color: {
    type: String,
    enum: ["blue", "purple", "orange", "green", "red", "indigo"],
  },
  items: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
