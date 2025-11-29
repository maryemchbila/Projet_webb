// server/src/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour parser le JSON et gérer CORS
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("🚀 API GlobalPath fonctionne !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});

