const Pacient = require("../schemas/pacients.shemas")

const getPacients = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) query.name = { $regex: filters.name, $options: "i"}
        if (filters.birthDate) query.birthDate = { $regex: filters.birthDate, $options: "i"}

        const pacients = await Pacient.find(query)
        return pacients
    } catch (error) {
        const e = new Error("Erro ao buscar pacientes")
        e.status = 500
        console.error("Erro ao buscar pacientes:", error)
        throw e
    }
}
module.exports = getPacients