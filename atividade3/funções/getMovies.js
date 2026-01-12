const Movie = require("../routes e schemas/movies.schemas")

const getMovies = async (filters = {}) => {
    try {
        const query = {}

        if (filters.title) query.title = { $regex: filters.title, $options: "i"}
        if (filters.director) query.director = { $regex: filters.director, $options: "i"}
        if (filters.genre) query.genre = { $regex: filters.genre, $options: "i"}
        if (filters.year !== undefined) query.year = filters.year

        const movies = await Movie.find(query)
        return movies
    } catch (error) {
        const e = new Error("Erro ao buscar filmes")
        e.status = 500
        console.error("Erro ao buscar filmes:", error)
        throw e
    }
}
module.exports = getMovies