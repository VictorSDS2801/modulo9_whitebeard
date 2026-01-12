const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 0
    },
    genre: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model("movie", movieSchema)

module.exports = Movie