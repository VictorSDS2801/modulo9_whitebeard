 const Employee = require("../routes e schemas/employees.schema")

const createEmployee = async (name, position, department, salary) => {
    try {
        if (!name || !position || !department || salary === undefined) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newEmployee = new Employee({name, position, department, salary})
        return await newEmployee.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o funcionário:", error)
        throw e
    }
}
module.exports = createEmployee