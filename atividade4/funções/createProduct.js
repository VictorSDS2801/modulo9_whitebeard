 const Product = require("../routes e schemas/products.schemas")

const createProduct = async (name, category, price, stock) => {
    try {
        if (!name || !category || price === undefined || stock === undefined) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newProduct = new Product({name, category, price, stock})
        return await newProduct.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o produto:", error)
        throw e
    }
}
module.exports = createProduct