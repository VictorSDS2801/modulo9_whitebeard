 const Product = require("../routes e schemas/products.schemas")

const getProducts = async (filters = {}) => {
    try {
        const query = {}

        if (filters.name) query.name = { $regex: filters.name, $options: "i"}
        if (filters.category) query.category = { $regex: filters.category, $options: "i"}
        if (filters.price !== undefined) query.price = filters.price
        if (filters.stock !== undefined) query.stock = filters.stock

        const products = await Product.find(query)
        return products
    } catch (error) {
        const e = new Error("Erro ao buscar produtos")
        e.status = 500
        console.error("Erro ao buscar produtos:", error)
        throw e
    }
}
module.exports = getProducts