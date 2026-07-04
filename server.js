/**
 * ============================================================
 * Point d'entrée principal de l'application
 * ------------------------------------------------------------
 * Ce fichier :
 *  - Charge les variables d'environnement
 *  - Initialise Express
 *  - Configure les middlewares
 *  - Connecte MongoDB
 *  - Déclare les routes
 *  - Lance le serveur
 * ============================================================
 */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const sensorRoutes = require("./routes/sensorRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

/*
|--------------------------------------------------------------------------
| Connexion à MongoDB
|--------------------------------------------------------------------------
*/

connectDB();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

// Sécurisation de l'API
app.use(helmet());

// Autoriser les requêtes provenant du Dashboard
app.use(cors());

// Lecture des données JSON
app.use(express.json());

// Journalisation des requêtes HTTP
app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Route de test
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Bienvenue sur l'API IoT ESP32"

    });

});

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
*/

app.use("/api/sensors", sensorRoutes);

/*
|--------------------------------------------------------------------------
| Gestion centralisée des erreurs
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Démarrage du serveur
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("=======================================");
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log("=======================================");

});