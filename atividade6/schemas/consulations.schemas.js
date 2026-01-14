const mongoose = require("mongoose")

const consulationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    idDoctor: {
        type: String,
        required: true
    },
    idPacient: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Consulation = mongoose.model("consulation", consulationSchema)

module.exports = Consulation