const Student = require("../routes e schemas/students.schema")

const getStudents = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) query.name = { $regex: filters.name, $options: "i"}
        if (filters.course) query.course = { $regex: filters.course, $options: "i"}
        if (filters.registration !== undefined) query.registration = filters.registration
        if (filters.year !== undefined) query.year = filters.year

        const students = await Student.find(query)
        return students
    } catch (error) {
        const e = new Error("Erro ao buscar estudantes")
        e.status = 500
        console.error("Erro ao buscar estudantes:", error)
        throw e
    }
}
module.exports = getStudents