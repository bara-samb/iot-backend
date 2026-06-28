const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({

    temperature: {
        type: Number,
        required: true
    },

    humidite: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model(
    "SensorData",
    sensorSchema,
    "senso_data"
);