/**
 * ------------------------------------------------------------------
 * Fichier : serialReader.js
 * ------------------------------------------------------------------
 * Rôle :
 * Ce fichier permet de communiquer avec la carte Arduino via
 * le port série.
 *
 * Son fonctionnement est le suivant :
 *
 * Arduino
 *      │
 *      ▼
 * Port Série (COM3)
 *      │
 *      ▼
 * SerialPort
 *      │
 *      ▼
 * ReadlineParser
 *      │
 *      ▼
 * JSON.parse()
 *      │
 *      ▼
 * Mongoose
 *      │
 *      ▼
 * MongoDB
 *
 * Chaque fois que l'Arduino envoie une nouvelle mesure,
 * celle-ci est convertie en objet JavaScript puis enregistrée
 * automatiquement dans MongoDB.
 * ------------------------------------------------------------------
 */

// Bibliothèque permettant de communiquer avec un port série
const { SerialPort } = require("serialport");

// Permet de lire les données ligne par ligne
const { ReadlineParser } = require("@serialport/parser-readline");

// Importation du modèle Mongoose
const SensorData = require("../models/senso_data");

/**
 * Configuration du port série.
 *
 * path :
 * correspond au port COM utilisé par l'Arduino.
 *
 * baudRate :
 * vitesse de communication.
 * Elle doit être identique à celle utilisée dans
 * Serial.begin() du programme Arduino.
 */
const port = new SerialPort({

    path: "COM3",

    baudRate: 9600

});

/**
 * Création d'un parser.
 *
 * Chaque ligne envoyée par l'Arduino est considérée
 * comme une mesure complète.
 */
const parser = port.pipe(

    new ReadlineParser({

        delimiter: "\r\n"

    })

);

/**
 * Evènement déclenché automatiquement
 * lorsqu'une nouvelle ligne est reçue
 * depuis l'Arduino.
 */
parser.on("data", async (data) => {

    try {

        console.log("Données reçues :", data);

        /**
         * Conversion du texte JSON reçu
         * en objet JavaScript.
         */
        const mesure = JSON.parse(data);

        console.log(mesure);

        /**
         * Création d'un nouveau document
         * à enregistrer dans MongoDB.
         */
        const nouvelleMesure = new SensorData({

            temperature: mesure.temperature,

            humidite: mesure.humidity,

            status: mesure.status

        });

        /**
         * Enregistrement de la mesure
         * dans la base de données.
         */
        await nouvelleMesure.save();

        console.log("Mesure enregistrée dans MongoDB");

    }

    catch (err) {

        console.error("Erreur lors de l'enregistrement :");

        console.error(err);

    }

});