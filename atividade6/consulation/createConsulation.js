const Consulation = require("../schemas/consulations.schemas")

const createConsulation = async (date, idDoctor, idPacient, description) => {
    try {
        if (!date || idDoctor === undefined || idPacient === undefined || !description) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newConsulation = new Consulation({date, idDoctor, idPacient, description})
        return await newConsulation.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar a consulta:", error)
        throw e
    }
}
module.exports = createConsulation