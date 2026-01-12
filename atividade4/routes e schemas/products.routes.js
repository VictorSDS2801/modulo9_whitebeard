const express = require("express")
const router = express.Router()
const createProduct = require("../funções/createProduct")
const getProducts = require("../funções/getProducts")
const updateProduct = require("../funções/updateProduct")
const deleteProduct = require("../funções/deleteProduct")

router.post("/produtos", async (req, res) => {
    const { name, category, price, stock } = req.body

    const newProduct = await createProduct(name, category, price, stock)
    res.status(201).send({message: "Produto criado com sucesso!", product: newProduct})
})
router.get("/produtos", async (req, res) => {
    const produtos = await getProducts(req.query)
    res.status(200).send(produtos)
})
router.put("/produtos/:id", async (req, res) => {
    const { id } = req.params
    const { name, category, price, stock } = req.body

    const updatedProduct = await updateProduct(id, name, category, price, stock)

    res.status(200).send({message: "Produto atualizado com sucesso", product: updatedProduct})
})
router.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params
    const deletedProduct = await deleteProduct(id)

    res.status(200).send({message: "Produto deletado com sucesso!", product: deletedProduct})
})
module.exports = router
