const Movie = require("../routes e schemas/movies.schemas")

const deleteMovie = async (id) => {
    try {   
        const deletedMovie = await Movie.findByIdAndDelete(id)

        if (!deletedMovie) {
            const error = new Error("Filme não encontrado")
            error.status = 404
            throw error
        }

        return deletedMovie
    } catch (error) {
        if (error.name === "CastError"){
            const e = new Error("ID inválido")
            e.status = 400
            throw e
        }

        const e = new Error("Error interno do servidor")
        e.status = 500
        console.error("Erro ao deletar filme:", error)
        throw e
    }
}
module.exports = deleteMovie