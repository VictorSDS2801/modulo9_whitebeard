const Book = require("../book.schema")

const updateBook = async (id, title, author, year, genre) => {
    try {
        const updateData = {}

        if (title !== undefined) updateData.title = title
        if (author !== undefined) updateData.author = author
        if (year !== undefined) updateData.year = year
        if (genre !== undefined) updateData.genre = genre

        if (Object.keys(updateData).length === 0) {
            const error = new Error("Nenhum campo enviado para atualizar")
            error.status = 400
            throw error
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedBook) {
            const error = new Error("Livro não encontrado")
            error.status = 404
            throw error
        }

        return updatedBook

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
        console.error("Erro ao atualizar o livro:", error)
        throw e
    }
}

module.exports = updateBook
