const Movie = require("../routes e schemas/movies.schemas")

const updateMovie = async (id, title, director, year, genre) => {
    try {
        const updateData = {}

        if (title !== undefined) updateData.title = title
        if (director !== undefined) updateData.director = director
        if (year !== undefined) updateData.year = year
        if (genre !== undefined) updateData.genre = genre

        if (Object.keys(updateData).length === 0) {
            const error = new Error("Nenhum campo enviado para atualizar")
            error.status = 400
            throw error
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, runValidators: true}
        )

        if (!updatedMovie) {
            const error = new Error("Filme não encontrado")
            error.status = 404
            throw error
        }

        return updatedMovie
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
        console.error("Erro ao atualizar o filme:", error)
        throw e
    }
}
module.exports = updateMovie