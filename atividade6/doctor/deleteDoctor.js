const Doctor = require("../schemas/doctors.schemas")

const deleteDoctor = async (id) => {
    try {   
        const deletedDoctor = await Doctor.findByIdAndDelete(id)

        if (!deletedDoctor) {
            const error = new Error("Médico não encontrado")
            error.status = 404
            throw error
        }

        return deletedDoctor
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar médico:", error)
        throw e
    }
}
module.exports = deleteDoctor