const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1450
    },
    genre: {
        type: String,
        required: true
    }
})

const Book = mongoose.model("book", bookSchema)

module.exports = Book