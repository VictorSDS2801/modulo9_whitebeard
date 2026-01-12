const Product = require("../routes e schemas/products.schemas")

const deleteProduct = async (id) => {
    try {   
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            const error = new Error("Produto não encontrado")
            error.status = 404
            throw error
        }

        return deletedProduct
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar produto:", error)
        throw e
    }
}
module.exports = deleteProduct