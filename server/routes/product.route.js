const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Products = require("../models/product.model")


//CREATE
router.post("/", async (req, res) => {
    const newProduct = new Products(req.body)

    try {
        const saveProduct = await newProduct.save()
        res.status(201).json(saveProduct)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//UPDATE
router.put("/:id", async (req, res) => {

    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedProduct)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Product has been deleted..." })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)

        res.status(200).json(product)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        // const products = query ? await Products.find().sort({ _id: -1 }).limit(1) : await Products.find()
        // res.status(200).json(products)
        let products;
        if (qNew) {
            products = await Products.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            products = await Products.find({
                category: {
                    $in: [qCategory],
                }
            })
        } else {
            products = await Products.find()
        }
        res.status(200).json(products)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})


module.exports = router