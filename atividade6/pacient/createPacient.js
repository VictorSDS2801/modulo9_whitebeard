const Pacient = require("../schemas/pacients.shemas")

const createPacient = async (name, birthDate) => {
    try {
        if (!name || !birthDate ) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newPacient = new Pacient({name, birthDate})
        return await newPacient.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o paciente:", error)
        throw e
    }
}
module.exports = createPacient