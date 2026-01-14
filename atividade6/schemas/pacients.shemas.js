const mongoose = require("mongoose")

const pacientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    }
})

const Pacient = mongoose.model("pacient", pacientSchema)

module.exports = Pacient