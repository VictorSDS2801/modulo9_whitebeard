const Book = require("../book.schema")

const createBook = async (title, author, year, genre) => {
    try {
        if (!title || !author || year === undefined || !genre) {
            const error = new Error("Todos os campos são obrigatórios")
            error.status = 400
            throw error
        }

        const newBook = new Book({ title, author, year, genre })
        return await newBook.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o livro:", error)
        throw e
    }
}
module.exports = createBook
