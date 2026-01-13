 const Employee = require("../routes e schemas/employees.schema")
 
 const updateEmployee = async (id, name, position, department, salary) => {
     try {
         const updateData = {}
 
         if (name !== undefined) updateData.name = name
         if (position !== undefined) updateData.position = position
         if (department !== undefined) updateData.department = department
         if (salary !== undefined) updateData.salary = salary
 
         if (Object.keys(updateData).length === 0) {
             const error = new Error("Nenhum campo enviado para atualizar")
             error.status = 400
             throw error
         }
 
         const updatedEmployee = await Employee.findByIdAndUpdate(
             id, 
             updateData,
             { new: true, runValidators: true}
         )
 
         if (!updatedEmployee) {
             const error = new Error("Funcionário não encontrado")
             error.status = 404
             throw error
         }
 
         return updatedEmployee
     } catch (error) {
         if (error.name === "CastError") {
             const e = new Error("ID inválido")
             e.status = 400
             throw e
         }
 
         if (error.name === "ValidationError") {
             const e = new Error(`Dados inválidos: ${error.message}`)
             e.status = 400
             throw e
         }
 
         const e = new Error("Erro interno do servidor")
         e.status = 500
         console.error("Erro ao atualizar o funcionário:", error)
         throw e
     }
 }
 module.exports = updateEmployee