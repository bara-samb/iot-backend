const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");


// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();
require("./serial/serialReader");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
    res.send("Bienvenue sur le serveur IoT !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});