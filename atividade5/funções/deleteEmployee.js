const Employee = require("../routes e schemas/employees.schema")

const deleteEmployee = async (id) => {
    try {   
        const deletedEmployee = await Employee.findByIdAndDelete(id)

        if (!deletedEmployee) {
            const error = new Error("Funcionário não encontrado")
            error.status = 404
            throw error
        }

        return deletedEmployee
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar funcionário:", error)
        throw e
    }
}
module.exports = deleteEmployee