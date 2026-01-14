 const Doctor = require("../schemas/doctors.schemas")

const getDoctors = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) query.name = { $regex: filters.name, $options: "i"}
        if (filters.speciality) query.speciality = { $regex: filters.speciality, $options: "i"}

        const doctors = await Doctor.find(query)
        return doctors
    } catch (error) {
        const e = new Error("Erro ao buscar médicos")
        e.status = 500
        console.error("Erro ao buscar médicos:", error)
        throw e
    }
}
module.exports = getDoctors