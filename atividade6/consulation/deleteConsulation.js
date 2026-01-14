const Consulation = require("../schemas/consulations.schemas")

const deleteConsulation = async (id) => {
    try {   
        const deletedConsulation = await Consulation.findByIdAndDelete(id)

        if (!deletedConsulation) {
            const error = new Error("Consulta não encontrada")
            error.status = 404
            throw error
        }

        return deletedConsulation
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar consulta:", error)
        throw e
    }
}
module.exports = deleteConsulation