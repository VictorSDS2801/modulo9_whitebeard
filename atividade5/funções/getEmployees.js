 const Employee = require("../routes e schemas/employees.schema")

const getEmployees = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) query.name = { $regex: filters.name, $options: "i"}
        if (filters.position) query.position = { $regex: filters.position, $options: "i"}
        if (filters.department) query.department = { $regex: filters.department, $options: "i"}
        if (filters.salary !== undefined) query.salary = filters.salary

        const employees = await Employee.find(query)
        return employees
    } catch (error) {
        const e = new Error("Erro ao buscar funcionários")
        e.status = 500
        console.error("Erro ao buscar funcionários:", error)
        throw e
    }
}
module.exports = getEmployees