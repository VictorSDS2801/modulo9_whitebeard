const Student = require("../routes e schemas/students.schema")

const deleteStudent = async (id) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(id)

        if (!deletedStudent) {
            const error = new Error("Estudante não encontrado")
            error.status = 404
            throw error
        }

        return deletedStudent
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar estudante:", error)
        throw e
    }
}
module.exports = deleteStudent