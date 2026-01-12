const Book = require("../book.schema")

const getBooks = async (filters = {}) => {
    try {
        const query = {}

        if (filters.title) query.title = { $regex: filters.title, $options: "i"}
        if (filters.author) query.author = { $regex: filters.author, $options: "i"}
        if (filters.genre) query.genre = { $regex: filters.genre, $options: "i"}
        if (filters.year !== undefined) query.year = filters.year

        const books = await Book.find(query)
        return books
    } catch (error) {
        const e = new Error("Erro ao buscar livros")
        e.status = 500
        console.error("Erro ao buscar livros:", error)
        throw e
    }
}
module.exports = getBooks