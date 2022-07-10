const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Carts = require("../models/cart.model")


//CREATE CART AND ADD TO CART
router.post("/addtocart", async (req, res) => {
    try {
        // console.log(req.body);
        const cart = await Carts.findOne({ userId: req.body.userId })
        if (cart) {
            const updatedCart = await Carts.findOneAndUpdate({ userId: req.body.userId }, {
                cartItems: req.body.cartItems
            })
            // console.log("addtocart updatedcart 2====>", updatedCart);
            res.status(200).json({ msg: "cart successfully updated" })
        } else {
            const newCart = new Carts({
                userId: req.body.userId,
                cartItems: req.body.cartItems
            })
            await newCart.save()
            // console.log("savecart====>", prod);
            res.status(201).json({ msg: "cart created successfully" })

        }

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//LOAD CART
router.post("/loadcart", async (req, res) => {
    // console.log(req.body);
    const cart = await Carts.findOne({ userId: req.body.userId })
    if (cart) {
        // console.log(cart);
        res.status(200).json(cart)
    } else {
        res.status(200).json({ msg: "cart is empty" })
    }
})

//REMOVE FROM CART
router.post("/removefromcart", async (req, res) => {
    try {
        // console.log(req.body.userId);
        const cart = await Carts.findOne({ userId: req.body.userId })
        // console.log(cart.cartItems[1]._id, req.body.product._id);
        if (cart.cartItems === []) {
            // console.log("empty");
            res.status(400).json()
        } else {
            const cartItems = await Carts.findOne({ userId: req.body.userId })
            // console.log("cart", cartItems.cartItems);
            const index = cartItems.cartItems.findIndex(item => item._id == req.body.product._id)
            // console.log(index);
            const ucart = cartItems.cartItems.splice(index, 1)
            // console.log(cartItems.cartItems);
            const updatedCart = await Carts.findOneAndUpdate({ userId: req.body.userId }, {
                "$set": {
                    "cartItems": cartItems.cartItems
                }
            })
            // console.log("cart", ucart[0]);
            // console.log("removefromcart updatedcart====>", updatedCart);
            res.status(200).json(ucart[0])
        }

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET USER CART
router.get("/find/:id", async (req, res) => {
    try {
        const cart = await Carts.findOne({ id: req.params.id })
        // console.log("get cart", cart);
        res.status(200).json(cart)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET ALL
router.get("/", async (req, res) => {
    try {
        const cart = await Carts.find()
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})


module.exports = router