const Student = require("../routes e schemas/students.schema")

const createStudent = async (name, registration, course, year) => {
    try {
        if (!name || registration === undefined || !course || year === undefined) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newStudent = new Student({name, registration, course, year})
        return await newStudent.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o estudante:", error)
        throw e
    }
}
module.exports = createStudent