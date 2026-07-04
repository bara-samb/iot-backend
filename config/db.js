/**
 * ============================================================
 * Configuration de la connexion à MongoDB
 * ------------------------------------------------------------
 * Ce module établit la connexion entre l'application Node.js
 * et la base de données MongoDB Atlas.
 *
 * La chaîne de connexion est stockée dans le fichier .env
 * afin de ne jamais exposer les informations sensibles.
 * ============================================================
 */

const mongoose = require("mongoose");

/**
 * Fonction de connexion à MongoDB
 */
const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("=======================================");
        console.log(" MongoDB connecté avec succès");
        console.log("=======================================");

    }

    catch (error) {

        console.error("=======================================");
        console.error("Erreur de connexion MongoDB");
        console.error(error.message);
        console.error("=======================================");

        process.exit(1);

    }

};

module.exports = connectDB;