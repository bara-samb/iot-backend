/**
 * ------------------------------------------------------------------
 * Fichier : db.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier est responsable de la connexion entre l'application
 * Node.js et la base de données MongoDB.
 *
 * Il utilise la bibliothèque Mongoose afin de simplifier les échanges
 * avec MongoDB.
 *
 * La chaîne de connexion est récupérée depuis le fichier .env grâce à
 * la variable d'environnement MONGO_URI.
 * ------------------------------------------------------------------
 */

// Importation de la bibliothèque Mongoose
const mongoose = require("mongoose");

/**
 * Fonction asynchrone permettant d'établir la connexion à MongoDB.
 */
const connectDB = async () => {

    try {

        // Connexion à la base de données
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connecté avec succès !");

    } catch (error) {

        // Affichage de l'erreur en cas d'échec
        console.error("Erreur de connexion :", error.message);

        // Arrêt du serveur
        process.exit(1);
    }
};

// Exportation de la fonction afin de pouvoir l'utiliser dans server.js
module.exports = connectDB;