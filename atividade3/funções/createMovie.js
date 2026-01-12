const Movie = require("../routes e schemas/movies.schemas")

const createMovie = async (title, director, year, genre) => {
    try {
        if (!title || !director || year === undefined || !genre) {
            const error = new Error("Todos os campos são obrigatórios.")
            error.status = 400
            throw error
        }

        const newMovie = new Movie({title, director, year, genre})
        return await newMovie.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            const e = new Error(`Dados inválidos: ${error.message}`)
            e.status = 400
            throw e
        }

        const e = new Error("Erro interno do servidor")
        e.status = 500
        console.error("Erro ao criar o filme:", error)
        throw e
    }
}
module.exports = createMovie