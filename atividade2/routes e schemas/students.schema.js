const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registration: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const Student = mongoose.model("student", studentSchema)

module.exports = Student