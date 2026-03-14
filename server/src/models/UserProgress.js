// SERVER/src/models/UserProgress.js
const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  },
  resourceName: String,
  progress: { type: Number, min: 0, max: 100, default: 0 },
  score: String,
  lastAccessed: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
