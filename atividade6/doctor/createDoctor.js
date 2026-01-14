 const Doctor = require("../schemas/doctors.schemas")

const createDoctor = async (name, speciality) => {
    try {
        if (!name || !speciality) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newDoctor = new Doctor({name, speciality})
        return await newDoctor.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o médico:", error)
        throw e
    }
}
module.exports = createDoctor