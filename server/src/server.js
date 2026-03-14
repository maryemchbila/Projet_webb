// SERVER/src/server.js
const app = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server GlobalPath démarré sur le port", PORT);
  console.log("📡 Routes disponibles:");
  console.log("   AUTH:");
  console.log("     POST /api/auth/register");
  console.log("     POST /api/auth/login");
  console.log("     GET  /api/auth/me");
  console.log("     GET  /api/auth/logout");
  console.log("   USERS (temporaires):");
  console.log("     GET  /api/users/:id/profile");
  console.log("     POST /api/users/:id/onboarding/complete");
  console.log("     GET  /api/users/:id/dashboard");
  console.log("   COURSES:");
  console.log("     GET  /api/courses");
  console.log("     GET  /api/courses/user/:userId");
  console.log("   OPPORTUNITIES:");
  console.log("     GET  /api/opportunities");
  console.log("     GET  /api/opportunities/filters");
  console.log("     GET  /api/opportunities/:id");
  console.log("   RESOURCES:");
  console.log("     GET  /api/resources");
  console.log("   PARTNERS:");
  console.log("     GET  /api/partners");
  console.log("     GET  /api/partners/:id");
  console.log("   PROFILE:");
  console.log("     GET  /api/profile/me");
  console.log("     PUT  /api/profile/update");
  console.log("     GET  /api/profile/:userId");
  console.log("   HEALTH:");
  console.log("     GET  /");
  console.log("     GET  /api/health");
  console.log("     GET  /api/test");
  console.log("\n✨ Routes onboarding disponibles:");
  console.log("   POST /api/users/:id/onboarding/complete");
  console.log("   GET  /api/users/:id/profile");
  console.log("   GET  /api/users/:id/dashboard");
});
