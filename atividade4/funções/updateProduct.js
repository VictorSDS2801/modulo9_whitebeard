 const Product = require("../routes e schemas/products.schemas")
 
 const updateProduct = async (id, name, category, price, stock) => {
     try {
         const updateData = {}
 
         if (name !== undefined) updateData.name = name
         if (category !== undefined) updateData.category = category
         if (price !== undefined) updateData.price = price
         if (stock !== undefined) updateData.stock = stock
 
         if (Object.keys(updateData).length === 0) {
             const error = new Error("Nenhum campo enviado para atualizar")
             error.status = 400
             throw error
         }
 
         const updatedProduct = await Product.findByIdAndUpdate(
             id, 
             updateData,
             { new: true, runValidators: true}
         )
 
         if (!updatedProduct) {
             const error = new Error("Produto não encontrado")
             error.status = 404
             throw error
         }
 
         return updatedProduct
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
         console.error("Erro ao atualizar o produto:", error)
         throw e
     }
 }
 module.exports = updateProduct