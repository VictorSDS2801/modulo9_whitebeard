const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000
app.use(express.json())

app.use(require("./routes e schemas/students.routes"))

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})

mongoose.connect(
    "mongodb+srv://victordiogo2801_db_user:victor2801@cluster0.d4xde7i.mongodb.net/students"
)
mongoose.connection.once("open", () => {
    console.log("Conectado ao mongoDB")
})
mongoose.connection?.on("error", (err) => {
    console.error(`Error to connect - MongoDB: Error: ${err.message}`)
})
