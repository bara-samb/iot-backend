/**
 * ============================================================
 * Modèle MongoDB : SensorData
 * ============================================================
 * Ce fichier définit la structure des données enregistrées
 * dans la collection "sensor_data".
 *
 * Chaque document représente une mesure envoyée par l'ESP32.
 * ============================================================
 */

const mongoose = require("mongoose");

/**
 * Définition du schéma MongoDB
 */
const sensorSchema = new mongoose.Schema(

    {

        /**
         * Identifiant de l'équipement
         * Exemple : ESP32-01
         */
        deviceId: {

            type: String,
            required: true

        },

        /**
         * Nom de la salle
         * Exemple : Salle Informatique
         */
        room: {

            type: String,
            required: true

        },

        /**
         * Température mesurée
         */
        temperature: {

            type: Number,
            required: true

        },

        /**
         * Humidité mesurée
         */
        humidity: {

            type: Number,
            required: true

        },

        /**
         * Seuil défini
         */
        threshold: {

            type: Number,
            required: true

        },

        /**
         * Etat courant
         * NORMAL
         * ALERTE
         */
        status: {

            type: String,

            enum: [

                "NORMAL",
                "ALERTE"

            ],

            required: true

        },

        /**
         * true = alerte
         * false = normal
         */
        alert: {

            type: Boolean,

            default: false

        }

    },

    /**
     * timestamps ajoute automatiquement
     *
     * createdAt
     * updatedAt
     */
    {

        timestamps: true

    }

);

/**
 * Export du modèle
 */

module.exports = mongoose.model(

    "SensorData",

    sensorSchema,

    "sensor_data"

);