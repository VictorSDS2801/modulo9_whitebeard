 const Consulation = require("../schemas/consulations.schemas")

const getConsulations = async (filters = {}) => {
    try {
        const query = {}

        if (filters.date) query.date = { $regex: filters.date, $options: "i"}
        if (filters.idDoctor !== undefined) query.idDoctor = filters.idDoctor
        if (filters.idPacient !== undefined) query.idPacient = filters.idPacient
        if (filters.description) query.description = { $regex: filters.description, $options: "i"}
        

        const consulations = await Consulation.find(query)
        return consulations
    } catch (error) {
        const e = new Error("Erro ao buscar consultas")
        e.status = 500
        console.error("Erro ao buscar consultas:", error)
        throw e
    }
}
module.exports = getConsulations