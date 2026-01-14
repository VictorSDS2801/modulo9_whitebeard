const express = require("express")
const router = express.Router()

const Doctor = require("../schemas/doctors.schemas")
const Pacient = require("../schemas/pacients.shemas")
const Consulation = require("../schemas/consulations.schemas")

router.get("/relatorios/consultas/medico/:idDoctor", async (req, res) => {
  try {
    const { idDoctor } = req.params

    const consultations = await Consulation.find({ idDoctor })

    res.json(consultations)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar consultas" })
  }
})

router.get("/relatorios/pacientes/medico/:idDoctor", async (req, res) => {
  try {
    const { idDoctor } = req.params

    const consultations = await Consulation.find({ idDoctor })

    const pacientIds = [...new Set(
      consultations.map(c => c.idPacient)
    )]

    const pacients = await Pacient.find({
      _id: { $in: pacientIds }
    })

    res.json(pacients)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pacientes" })
  }
})

router.get("/relatorios/medicos/paciente/:idPacient", async (req, res) => {
  try {
    const { idPacient } = req.params

    const consultations = await Consulation.find({ idPacient })

    const doctorIds = [...new Set(
      consultations.map(c => c.idDoctor)
    )]

    const doctors = await Doctor.find({
      _id: { $in: doctorIds }
    })

    res.json(doctors)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar médicos" })
  }
})

router.get("/relatorios/consultas/mes/:mes", async (req, res) => {
  try {
    const mes = req.params.mes.padStart(2, "0")

    if (Number(mes) < 1 || Number(mes) > 12) {
      return res.status(400).json({ error: "Mês inválido" })
    }

    const consultations = await Consulation.find()

    const resultado = consultations.filter(c => {
      const [, mesConsulta] = c.date.split("/")
      return mesConsulta === mes
    })

    res.json(resultado)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar consultas por mês" })
  }
})

module.exports = router
