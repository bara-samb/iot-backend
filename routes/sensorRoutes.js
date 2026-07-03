/**
 * ------------------------------------------------------------------
 * Fichier : sensorRoutes.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier définit les différentes routes de l'API REST.
 *
 * Chaque route est associée à une fonction du contrôleur.
 * ------------------------------------------------------------------
 */

const express = require("express");

// Création d'un routeur Express
const router = express.Router();

// Importation des fonctions du contrôleur
const {
    getAllSensors,
    getLastSensor,
    deleteAllSensors,
    countSensors
} = require("../controllers/sensorController");

/**
 * GET /
 * Retourne toutes les mesures enregistrées.
 */
router.get("/", getAllSensors);

/**
 * GET /last
 * Retourne uniquement la dernière mesure.
 */
router.get("/last", getLastSensor);

/**
 * GET /count
 * Retourne le nombre total de mesures.
 */
router.get("/count", countSensors);

/**
 * DELETE /
 * Supprime toutes les mesures de la base de données.
 */
router.delete("/", deleteAllSensors);

// Exportation du routeur
module.exports = router;