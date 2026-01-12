const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000
app.use(express.json())

app.use(require("./routes e schemas/products.routes"))

mongoose.connect(
    "mongodb+srv://victordiogo2801_db_user:victor2801@cluster0.d4xde7i.mongodb.net/products"
)
.then(() => {
    console.log("Conectado ao MongoDB")
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
})
.catch(err => console.error("Erro ao conectar no MongoDB:", err))
