const express = require("express")
const router = express.Router()
const createBook = require("./funções/createBook")
const getBooks = require("./funções/getBooks")
const updateBook = require("./funções/updateBook")
const deleteBook = require("./funções/deleteBook")

router.post("/books", async (req, res) => {
    const { title, author, year, genre } = req.body

    const newBook = await createBook(title, author, year, genre)
    res.status(201).send({message: "Livro criado com sucesso!", book: newBook})
})
router.get("/books", async (req, res) => {
    const books = await getBooks(req.query)
    res.status(200).send(books)
})
router.put("/books/:id", async (req, res) => {
    const { id } = req.params
    const { title, author, year, genre } = req.body

    const updatedBook = await updateBook(id, title, author, year, genre)

    res.status(200).send({message: "Livro atualizado com sucesso", book: updatedBook})
})
router.delete("/books/:id", async (req, res) => {
    const { id } = req.params
    const deletedBook = await deleteBook(id)

    res.status(200).send({message: "Livro deletado com sucesso!", book: deletedBook})
})
module.exports = router