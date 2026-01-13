const express = require("express")
const router = express.Router()
const createEmployee = require("../funções/createEmployee")
const getEmployees = require("../funções/getEmployees")
const updateEmployee = require("../funções/updateEmployee")
const deleteEmployee = require("../funções/deleteEmployee")

router.post("/funcionario", async (req, res) => {
    const { name, position, department, salary } = req.body

    const newEmployee = await createEmployee(name, position, department, salary)
    res.status(201).send({message: "Funcionário criado com sucesso!", employee: newEmployee})
})
router.get("/funcionario", async (req, res) => {
    const funcionarios = await getEmployees(req.query)
    res.status(200).send(funcionarios)
})
router.put("/funcionario/:id", async (req, res) => {
    const { id } = req.params
    const { name, position, department, salary } = req.body

    const updatedEmployee = await updateEmployee(id, name, position, department, salary)

    res.status(200).send({message: "Funcionários atualizado com sucesso", employee: updatedEmployee})
})
router.delete("/funcionario/:id", async (req, res) => {
    const { id } = req.params
    const deletedEmployee = await deleteEmployee(id)

    res.status(200).send({message: "Funcionário deletado com sucesso!", employee: deletedEmployee})
})
module.exports = router
