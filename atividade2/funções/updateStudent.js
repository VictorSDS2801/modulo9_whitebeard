const Student = require("../routes e schemas/students.schema")

const updateStudent = async (id, name, registration, course, year) => {
    try {
        const updateData = {}

        if (name !== undefined) updateData.name = name
        if (registration !== undefined) updateData.registration = registration
        if (course !== undefined) updateData.course = course
        if (year !== undefined) updateData.year = year

        if (Object.keys(updateData).length === 0) {
            const error = new Error("Nenhum campo enviado para atualizar")
            error.status = 400
            throw error
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, runValidators: true}
        )

        if (!updatedStudent) {
            const error = new Error("Estudante não encontrado")
            error.status = 404
            throw error
        }

        return updatedStudent
    } catch (error) {
        if (error.name === "CastError") {
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao atualizar o estudante:", error)
        throw e
    }
}
module.exports = updateStudent