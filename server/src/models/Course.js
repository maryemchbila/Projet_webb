// SERVER/src/models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  category: {
    type: String,
    enum: ["language", "technical", "academic", "professional"],
  },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  completedModules: { type: Number, default: 0 },
  totalModules: { type: Number, required: true },
  lastActivity: Date,
  status: {
    type: String,
    enum: ["in_progress", "completed", "not_started"],
    default: "not_started",
  },
  enrolledBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
