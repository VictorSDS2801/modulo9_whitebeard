const Book = require("../book.schema")
const deleteBook = async (id) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(id)

        if (!deletedBook) {
            const error = new Error("Livro não encontrado")
            error.status = 404
            throw error
        }

        return deletedBook
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar livro:", error)
        throw e
    }
}
module.exports = deleteBook