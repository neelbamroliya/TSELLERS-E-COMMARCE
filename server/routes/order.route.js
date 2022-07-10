const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Orders = require("../models/order.model")
const Carts = require("../models/cart.model")


//CHECKOUT AND ORDER
router.post("/checkout", async (req, res) => {
    console.log(req.body);
    try {
        const cart = await Carts.findOneAndDelete({ userId: req.body.checkoutDetails.cart.userId })
        // console.log(cart);
        if (cart) {

            const orderDetail = {
                userId: req.body.checkoutDetails.cart.userId,
                paymentId: req.body.checkoutDetails.paymentID,
                products: req.body.checkoutDetails.cart.products,
                total: req.body.checkoutDetails.cart.total,
                address: req.body.checkoutDetails.address
            }
            const order = new Orders(orderDetail)
            // console.log("order", order);
            const saveOrder = await order.save()
            // console.log(saveOrder);
            res.status(201).json(saveOrder)
        }
    } catch (err) {
        res.status(500).json({ msg: err.message })

    }
})

//CREATE
// router.post("/", async (req, res) => {
//     const newOrder = new Orders(req.body)

//     try {
//         const order = await newOrder.save()
//         res.status(201).json(order)
//     } catch (err) {
// res.status(500).json({ msg: err.message })
//     }
// })


//UPDATE
router.put("/:id", async (req, res) => {

    try {
        const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedOrder)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Product has been deleted..." })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
    try {
        const orders = await Carts.find({ userId: req.params.userId })

        res.status(200).json(orders)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET ALL
router.get("/", async (req, res) => {
    try {
        const orders = await Orders.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})
//APPROVE ORDER
router.put("/approve/:id", async (req, res) => {
    console.log(req.params);
    try {
        const order = await Orders.findOne({ _id: req.params.id })
        console.log("order", order);
        if (order.status === "pending") {
            const approvance = await Orders.findByIdAndUpdate({ _id: req.params.id }, {
                "$set": {
                    "status": "approved"
                }
            })
            res.status(200).json({ msg: "order approved" })
        } else {
            res.status(400).json({ msg: "order is not pending" })

        }
    } catch (err) {
        res.status(500).json({ msg: err.message })

    }
})

//GET MONTHY INCOME
router.get("/income", async (req, res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Orders.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: previousMonth
                    },
                    ...(productId && { products: { $elemMatch: { productId } } })
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$total"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    }
                }
            }
        ])

        res.status(200).json(income)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

module.exports = router