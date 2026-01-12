const express = require("express")
const router = express.Router()
const createMovie = require("../funções/createMovie")
const getMovies = require("../funções/getMovies")
const updateMovie = require("../funções/updateMovie")
const deleteMovie = require("../funções/deleteMovie")

router.post("/filmes", async (req, res) => {
    const { title, director, year, genre } = req.body

    const newMovie = await createMovie(title, director, year, genre)
    res.status(201).send({message: "Filme criado com sucesso!", movie: newMovie})
})
router.get("/filmes", async (req, res) => {
    const movies = await getMovies(req.query)
    res.status(200).send(movies)
})
router.put("/filmes/:id", async (req, res) => {
    const { id } = req.params
    const { title, director, year, genre } = req.body

    const updatedMovie = await updateMovie(id, title, director, year, genre)

    res.status(200).send({message: "Filme atualizado com sucesso", movie: updatedMovie})
})
router.delete("/filmes/:id", async (req, res) => {
    const { id } = req.params
    const deletedMovie = await deleteMovie(id)

    res.status(200).send({message: "Filme deletado com sucesso!", movie: deletedMovie})
})
module.exports = router
