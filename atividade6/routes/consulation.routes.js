const express = require("express")
const router = express.Router()
const createConsulation = require("../consulation/createConsulation")
const getConsulations = require("../consulation/getConsulations")
const updateConsulation = require("../consulation/updateConsulation")
const deleteConsulation = require("../consulation/deleteConsulation")

router.post("/consulta", async (req, res) => {
    const { date, idDoctor, idPacient, description } = req.body

    const newConsulation = await createConsulation(date, idDoctor, idPacient, description)
    res.status(201).send({message: "Consulta criado com sucesso!", consulation: newConsulation})
})
router.get("/consulta", async (req, res) => {
    const consulations = await getConsulations(req.query)
    res.status(200).send(consulations)
})
router.put("/consulta/:id", async (req, res) => {
    const { id } = req.params
    const { date, idDoctor, idPacient, description } = req.body

    const updatedConsulation = await updateConsulation(id, date, idDoctor, idPacient, description)

    res.status(200).send({message: "Consultas atualizado com sucesso", consulation: updatedConsulation})
})
router.delete("/consulta/:id", async (req, res) => {
    const { id } = req.params
    const deletedConsulation = await deleteConsulation(id)

    res.status(200).send({message: "Consulta deletado com sucesso!", consulation: deletedConsulation})
})
module.exports = router
