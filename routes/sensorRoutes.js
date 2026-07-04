/**
 * ============================================================
 * Routes de l'API des capteurs
 * ------------------------------------------------------------
 * Ce fichier définit toutes les routes HTTP disponibles.
 *
 * Chaque route appelle une fonction du contrôleur.
 * ============================================================
 */

const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation des fonctions du contrôleur
const {

    createSensor,

    getAllSensors,

    getLastSensor,

    countSensors,

    deleteAllSensors,

    getAlerts,

    getNormal,

    filterByDate,

    dailyHistory,

    weekHistory,
    

    monthHistory

} = require("../controllers/sensorController");


/**
 * ============================================================
 * Enregistrer une nouvelle mesure
 * POST /api/sensors
 * ============================================================
 */
router.post("/", createSensor);


/**
 * ============================================================
 * Récupérer toutes les mesures
 * GET /api/sensors
 * ============================================================
 */
router.get("/", getAllSensors);


/**
 * ============================================================
 * Récupérer la dernière mesure
 * GET /api/sensors/last
 * ============================================================
 */
router.get("/last", getLastSensor);


/**
 * ============================================================
 * Nombre total de mesures
 * GET /api/sensors/count
 * ============================================================
 */
router.get("/count", countSensors);


/**
 * ============================================================
 * Toutes les alertes
 * GET /api/sensors/alerts
 * ============================================================
 */
router.get("/alerts", getAlerts);


/**
 * ============================================================
 * Tous les retours à la normale
 * GET /api/sensors/normal
 * ============================================================
 */
router.get("/normal", getNormal);


/**
 * ============================================================
 * Filtrer par date
 * Exemple :
 *
 * /api/sensors/date?date=2026-07-04
 *
 * ============================================================
 */
router.get("/date", filterByDate);


/**
 * ============================================================
 * Historique journalier
 *
 * morning
 * afternoon
 * evening
 * night
 *
 * Exemple :
 *
 * /api/sensors/history/morning
 *
 * ============================================================
 */
router.get("/history/:period", dailyHistory);


/**
 * ============================================================
 * Historique hebdomadaire
 *
 * GET /api/sensors/week
 * ============================================================
 */
router.get("/week", weekHistory);


/**
 * ============================================================
 * Historique mensuel
 *
 * GET /api/sensors/month
 * ============================================================
 */
router.get("/month", monthHistory);


/**
 * ============================================================
 * Supprimer toutes les mesures
 *
 * DELETE /api/sensors
 * ============================================================
 */
router.delete("/", deleteAllSensors);


/**
 * Export du routeur
 */
module.exports = router;