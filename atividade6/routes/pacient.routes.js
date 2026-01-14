const express = require("express")
const router = express.Router()
const createPacient = require("../pacient/createPacient")
const getPacients = require("../pacient/getPacients")
const updatePacient = require("../pacient/updatePacient")
const deletePacient = require("../pacient/deletePacient")

router.post("/paciente", async (req, res) => {
    const { name, birthDate } = req.body

    const newPacient = await createPacient(name, birthDate)
    res.status(201).send({message: "Paciente criado com sucesso!", pacient: newPacient})
})
router.get("/paciente", async (req, res) => {
    const pacientes = await getPacients(req.query)
    res.status(200).send(pacientes)
})
router.put("/paciente/:id", async (req, res) => {
    const { id } = req.params
    const { name, birthDate } = req.body

    const updatedPacient = await updatePacient(id, name, birthDate)

    res.status(200).send({message: "Paciente atualizado com sucesso", pacient: updatedPacient})
})
router.delete("/paciente/:id", async (req, res) => {
    const { id } = req.params
    const deletedPacient = await deletePacient(id)

    res.status(200).send({message: "Paciente deletado com sucesso!", pacient: deletedPacient})
})
module.exports = router
