const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const SensorData = require("../models/senso_data");

const port = new SerialPort({
    path: "COM3", // Remplace par ton port si besoin
    baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", async (data) => {

    try {

        console.log("Données reçues :", data);

        // Transformer le texte JSON reçu en objet JavaScript
        const mesure = JSON.parse(data);

        console.log(mesure);

        const maintenant = new Date();

        const nouvelleMesure = new SensorData({

            temperature: mesure.temperature,

            humidite: mesure.humidity,

            status: mesure.status,

            dateMesure: maintenant.toLocaleDateString("fr-FR"),

            heureMesure: maintenant.toLocaleTimeString("fr-FR")

        });

        await nouvelleMesure.save();

        console.log("Mesure enregistrée dans MongoDB");

    }

    catch (err) {
        console.error("Erreur lors de l'enregistrement :");
        console.error(err);
    }

});