 const Pacient = require("../schemas/pacients.shemas")
 
 const updatePacient = async (id, name, birthDate) => {
     try {
         const updateData = {}
 
         if (name !== undefined) updateData.name = name
         if (birthDate !== undefined) updateData.birthDate = birthDate
 
         if (Object.keys(updateData).length === 0) {
             const error = new Error("Nenhum campo enviado para atualizar")
             error.status = 400
             throw error
         }
 
         const updatedPacient = await Pacient.findByIdAndUpdate(
             id, 
             updateData,
             { new: true, runValidators: true}
         )
 
         if (!updatedPacient) {
             const error = new Error("Paciente não encontrado")
             error.status = 404
             throw error
         }
 
         return updatedPacient
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
         console.error("Erro ao atualizar o paciente:", error)
         throw e
     }
 }
 module.exports = updatePacient