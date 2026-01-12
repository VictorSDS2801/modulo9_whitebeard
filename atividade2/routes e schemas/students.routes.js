const express = require("express")
const router = express.Router()
const createStudent = require("../funções/createStudent")
const getStudents = require("../funções/getStudents")
const updateStudent = require("../funções/updateStudent")
const deleteStudent = require("../funções/deleteStudent")

router.post("/estudantes", async (req, res) => {
    const { name, registration, course, year } = req.body

    const newStudent = await createStudent(name, registration, course, year)
    res.status(201).send({message: "Estudante criado com sucesso!", student: newStudent})
})
router.get("/estudantes", async (req, res) => {
    const students = await getStudents(req.query)
    res.status(200).send(students)
})
router.put("/estudantes/:id", async (req, res) => {
    const { id } = req.params
    const { name, registration, course, year } = req.body

    const updatedStudent = await updateStudent(id, name, registration, course, year)

    res.status(200).send({message: "Estudante atualizado com sucesso", student: updatedStudent})
})
router.delete("/estudantes/:id", async (req, res) => {
    const { id } = req.params
    const deletedStudent = await deleteStudent(id)

    res.status(200).send({message: "Estudante deletado com sucesso!", student: deletedStudent})
})
module.exports = router