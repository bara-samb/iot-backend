/**
 * ------------------------------------------------------------------
 * Fichier : server.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier constitue le point d'entrée principal de l'application.
 *
 * Il est chargé de :
 *  - charger les variables d'environnement ;
 *  - établir la connexion à MongoDB ;
 *  - démarrer la communication avec l'Arduino ;
 *  - créer le serveur Express ;
 *  - configurer les middlewares ;
 *  - déclarer les routes de l'API REST ;
 *  - lancer le serveur HTTP.
 * ------------------------------------------------------------------
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Importation de la connexion MongoDB
const connectDB = require("./config/db");

// Importation des routes de l'API
const sensorRoutes = require("./routes/sensorRoutes");

// Chargement des variables d'environnement (.env)
dotenv.config();

// Connexion à MongoDB
connectDB();

// Démarrage de la lecture du port série (Arduino)
require("./serial/serialReader");

// Création de l'application Express
const app = express();

/**
 * ==========================
 * Configuration des middlewares
 * ==========================
 */

// Autorise les requêtes provenant d'autres applications
app.use(cors());

// Permet de recevoir les données JSON
app.use(express.json());

/**
 * ==========================
 * Déclaration des routes
 * ==========================
 */

// Toutes les routes commenceront par /api/sensors
app.use("/api/sensors", sensorRoutes);

/**
 * Route de test
 * Permet de vérifier rapidement que le serveur fonctionne.
 */
app.get("/", (req, res) => {

    res.send("Bienvenue sur le serveur IoT !");

});

// Port utilisé par le serveur
const PORT = process.env.PORT || 3000;

/**
 * Démarrage du serveur
 */
app.listen(PORT, () => {

    console.log(`Serveur lancé sur le port ${PORT}`);

});