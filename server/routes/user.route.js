const router = require("express").Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Users = require("../models/user.model")


//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "User has been deleted..." })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET ALL USER
router.get("/find/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)

        const { password, ...others } = user._doc

        res.status(200).json(others)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET USER
router.get("/", async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await Users.find().sort({ _id: -1 }).limit(5) : await Users.find()
        res.status(200).json(users)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//GET USER STATS
router.get("/stats", async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await Users.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.status(200).json(data.sort((a, b) => a._id - b._id))

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }

})

module.exports = router