/**
 * ------------------------------------------------------------------
 * Fichier : sensorController.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier contient la logique métier de l'application.
 *
 * Il est chargé de traiter les requêtes envoyées par les routes
 * de l'API REST.
 *
 * Les principales opérations disponibles sont :
 *
 * - récupérer toutes les mesures
 * - récupérer la dernière mesure
 * - compter les mesures
 * - supprimer toutes les mesures
 * ------------------------------------------------------------------
 */

// Importation du modèle Mongoose
const SensorData = require("../models/senso_data");

/**
 * ==============================================================
 * Retourner toutes les mesures enregistrées
 * ==============================================================
 */
exports.getAllSensors = async (req, res) => {

    try {

        /**
         * Recherche de toutes les mesures.
         *
         * sort({ createdAt: -1 })
         * permet de classer les mesures
         * de la plus récente à la plus ancienne.
         */
        const sensors = await SensorData
            .find()
            .sort({ createdAt: -1 });

        /**
         * Envoi de la réponse au client.
         */
        res.status(200).json({

            success: true,

            total: sensors.length,

            data: sensors

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * ==============================================================
 * Retourner uniquement la dernière mesure
 * ==============================================================
 */
exports.getLastSensor = async (req, res) => {

    try {

        /**
         * Recherche du document
         * le plus récemment enregistré.
         */
        const sensor = await SensorData
            .findOne()
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            data: sensor

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * ==============================================================
 * Supprimer toutes les mesures
 * ==============================================================
 */
exports.deleteAllSensors = async (req, res) => {

    try {

        /**
         * deleteMany({})
         * supprime tous les documents
         * de la collection.
         */
        await SensorData.deleteMany({});

        res.status(200).json({

            success: true,

            message: "Toutes les mesures ont été supprimées."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * ==============================================================
 * Compter le nombre total de mesures
 * ==============================================================
 */
exports.countSensors = async (req, res) => {

    try {

        /**
         * countDocuments()
         * retourne le nombre total
         * de documents présents dans
         * la collection.
         */
        const total = await SensorData.countDocuments();

        res.status(200).json({

            success: true,

            total

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};