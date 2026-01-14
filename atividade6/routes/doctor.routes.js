const express = require("express")
const router = express.Router()
const createDoctor = require("../doctor/createDoctor")
const getDoctors = require("../doctor/getDoctors")
const updateDoctor = require("../doctor/updateDoctor")
const deleteDoctor = require("../doctor/deleteDoctor")

router.post("/medico", async (req, res) => {
    const { name, speciality } = req.body

    const newDoctor = await createDoctor(name, speciality)
    res.status(201).send({message: "Médico criado com sucesso!", doctor: newDoctor})
})
router.get("/medico", async (req, res) => {
    const doctors = await getDoctors(req.query)
    res.status(200).send(doctors)
})
router.put("/medico/:id", async (req, res) => {
    const { id } = req.params
    const { name, speciality } = req.body

    const updatedDoctor = await updateDoctor(id, name, speciality)

    res.status(200).send({message: "Médico atualizado com sucesso", doctor: updatedDoctor})
})
router.delete("/medico/:id", async (req, res) => {
    const { id } = req.params
    const deletedDoctor = await deleteDoctor(id)

    res.status(200).send({message: "Médico deletado com sucesso!", doctor: deletedDoctor})
})
module.exports = router
