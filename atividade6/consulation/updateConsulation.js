 const Consulation = require("../schemas/consulations.schemas")
 
 const updateConsulation = async (id, date, idDoctor, idPacient, description) => {
     try {
         const updateData = {}
 
         if (date !== undefined) updateData.date = date
         if (idDoctor !== undefined) updateData.idDoctor = idDoctor
         if (idPacient !== undefined) updateData.idPacient = idPacient
         if (description !== undefined) updateData.description = description
 
         if (Object.keys(updateData).length === 0) {
             const error = new Error("Nenhum campo enviado para atualizar")
             error.status = 400
             throw error
         }
 
         const updatedConsulation = await Consulation.findByIdAndUpdate(
             id, 
             updateData,
             { new: true, runValidators: true}
         )
 
         if (!updatedConsulation) {
             const error = new Error("Funcionário não encontrado")
             error.status = 404
             throw error
         }
 
         return updatedConsulation
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
         console.error("Erro ao atualizar a consulta:", error)
         throw e
     }
 }
 module.exports = updateConsulation