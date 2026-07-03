/**
 * ------------------------------------------------------------------
 * Fichier : senso_data.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier définit le modèle (Model) Mongoose représentant les
 * données envoyées par le capteur DHT11.
 *
 * Un modèle est une représentation d'une collection MongoDB.
 * Chaque document enregistré dans la collection "senso_data"
 * respectera la structure définie par ce schéma.
 *
 * Les informations enregistrées sont :
 *  - la température
 *  - l'humidité
 *  - l'état de la salle
 *  - la date de création
 *  - la date de modification
 * ------------------------------------------------------------------
 */

// Importation de Mongoose
const mongoose = require("mongoose");

/**
 * Création du schéma des données du capteur.
 *
 * Chaque propriété représente un champ qui sera enregistré
 * dans la base de données MongoDB.
 */
const sensorSchema = new mongoose.Schema({

    /**
     * Température mesurée par le capteur DHT11.
     * Type : Number
     * Obligatoire.
     */
    temperature: {
        type: Number,
        required: true
    },

    /**
     * Humidité mesurée par le capteur DHT11.
     * Type : Number
     * Obligatoire.
     */
    humidite: {
        type: Number,
        required: true
    },

    /**
     * Etat de la salle.
     * Exemple :
     * - Salle froide
     * - Température normale
     * - Salle chaude
     */
    status: {
        type: String,
        required: true
    }

},

/**
 * timestamps:true demande à Mongoose d'ajouter automatiquement
 * deux champs :
 *
 * createdAt → date de création du document
 * updatedAt → date de la dernière modification
 */
{
    timestamps: true
});

/**
 * Création puis exportation du modèle.
 *
 * Paramètres :
 * 1. Nom du modèle : SensorData
 * 2. Schéma utilisé : sensorSchema
 * 3. Nom réel de la collection MongoDB : senso_data
 */
module.exports = mongoose.model(
    "SensorData",
    sensorSchema,
    "senso_data"
);