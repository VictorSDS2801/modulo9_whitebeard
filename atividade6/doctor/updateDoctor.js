 const Doctor = require("../schemas/doctors.schemas")
 
 const updateDoctor = async (id, name, speciality) => {
     try {
         const updateData = {}
 
         if (name !== undefined) updateData.name = name
         if (speciality !== undefined) updateData.speciality = speciality
 
         if (Object.keys(updateData).length === 0) {
             const error = new Error("Nenhum campo enviado para atualizar")
             error.status = 400
             throw error
         }
 
         const updatedDoctor = await Doctor.findByIdAndUpdate(
             id, 
             updateData,
             { new: true, runValidators: true}
         )
 
         if (!updatedDoctor) {
             const error = new Error("Médico não encontrado")
             error.status = 404
             throw error
         }
 
         return updatedDoctor
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
         console.error("Erro ao atualizar o médico:", error)
         throw e
     }
 }
 module.exports = updateDoctor