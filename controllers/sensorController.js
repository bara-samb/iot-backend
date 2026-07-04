/**
 * ==========================================================
 * Contrôleur des données des capteurs
 * ----------------------------------------------------------
 * Ce fichier contient toute la logique métier de l'API.
 * Il communique avec MongoDB via le modèle SensorData.
 * ==========================================================
 */

const SensorData = require("../models/sensor_data");



/**
 * ==========================================================
 * Enregistrer une nouvelle mesure (appelée par l'ESP32)
 * POST /api/sensors
 * ==========================================================
 */
exports.createSensor = async (req, res) => {

    try {

        const sensor = await SensorData.create(req.body);

        res.status(201).json({

            success: true,
            message: "Mesure enregistrée avec succès.",
            data: sensor

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};





/**
 * ==========================================================
 * Retourner toutes les mesures
 * GET /api/sensors
 * ==========================================================
 */
exports.getAllSensors = async (req, res) => {

    try {

        const sensors = await SensorData
            .find()
            .sort({ createdAt: -1 });

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
 * ==========================================================
 * Dernière mesure reçue
 * GET /api/sensors/last
 * ==========================================================
 */
exports.getLastSensor = async (req, res) => {

    try {

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
 * ==========================================================
 * Nombre total de mesures
 * GET /api/sensors/count
 * ==========================================================
 */
exports.countSensors = async (req, res) => {

    try {

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





/**
 * ==========================================================
 * Supprimer toutes les mesures
 * DELETE /api/sensors
 * ==========================================================
 */
exports.deleteAllSensors = async (req, res) => {

    try {

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
 * ==========================================================
 * Toutes les alertes
 * GET /api/sensors/alerts
 * ==========================================================
 */
exports.getAlerts = async (req, res) => {

    try {

        const alerts = await SensorData.find({

            alert: true

        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            total: alerts.length,
            data: alerts

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
 * ==========================================================
 * Retour à la normale
 * GET /api/sensors/normal
 * ==========================================================
 */
exports.getNormal = async (req, res) => {

    try {

        const normal = await SensorData.find({

            alert: false

        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            total: normal.length,
            data: normal

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
 * ==========================================================
 * Filtrer par date
 * Exemple :
 * /api/sensors/date?date=2026-07-01
 * ==========================================================
 */
exports.filterByDate = async (req, res) => {

    try {

        const date = req.query.date;

        const start = new Date(date);

        const end = new Date(date);

        end.setDate(end.getDate() + 1);

        const mesures = await SensorData.find({

            createdAt: {

                $gte: start,
                $lt: end

            }

        });

        res.status(200).json({

            success: true,
            total: mesures.length,
            data: mesures

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
 * ==========================================================
 * Historique Matin / Soir / Nuit
 * ==========================================================
 */
exports.dailyHistory = async (req, res) => {

    try {

        const period = req.params.period;

        let startHour = 0;
        let endHour = 23;

        if (period === "morning") {

            startHour = 6;
            endHour = 12;

        }

        if (period === "evening") {

            startHour = 12;
            endHour = 18;

        }

        if (period === "night") {

            startHour = 18;
            endHour = 23;

        }

        const data = await SensorData.find();

        const result = data.filter(item => {

            const h = new Date(item.createdAt).getHours();

            return h >= startHour && h < endHour;

        });

        res.status(200).json({

            success: true,
            period,
            total: result.length,
            data: result

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
 * ==========================================================
 * Historique hebdomadaire
 * ==========================================================
 */
exports.weekHistory = async (req, res) => {

    try {

        const today = new Date();

        const lastWeek = new Date();

        lastWeek.setDate(today.getDate() - 7);

        const data = await SensorData.find({

            createdAt: {

                $gte: lastWeek

            }

        });

        res.status(200).json({

            success: true,
            total: data.length,
            data

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
 * ==========================================================
 * Historique mensuel
 * ==========================================================
 */
exports.monthHistory = async (req, res) => {

    try {

        const today = new Date();

        const lastMonth = new Date();

        lastMonth.setMonth(today.getMonth() - 1);

        const data = await SensorData.find({

            createdAt: {

                $gte: lastMonth

            }

        });

        res.status(200).json({

            success: true,
            total: data.length,
            data

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};