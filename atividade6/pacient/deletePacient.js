const Pacient = require("../schemas/pacients.shemas")

const deletePacient = async (id) => {
    try {   
        const deletedPacient = await Pacient.findByIdAndDelete(id)

        if (!deletedPacient) {
            const error = new Error("Paciente não encontrado")
            error.status = 404
            throw error
        }

        return deletedPacient
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar paciente:", error)
        throw e
    }
}
module.exports = deletePacient