const router = require("express").Router()
const Users = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await Users.findOne({ email })
        if (user) res.status(400).json({ msg: "User already exist" })
        if (password.length <= 5) return res.status(400).json({ msg: "Your password is small" })
        const newUser = new Users({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })
        const result = await newUser.save()
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username } = req.body
        const user = await Users.findOne({ username })
        if (!user) return res.status(400).json({ msg: "Invalid Credintials" })

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credintials" })

        const { password, ...others } = user._doc
        //jwt
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "3d" })

        res.status(200).json({ ...others, accessToken })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})
//ADMIN LOGIN
router.post("/adminlogin", async (req, res) => {
    try {
        const { username } = req.body
        const user = await Users.findOne({ username })
        if (!user) return res.status(400).json({ msg: "Invalid Credintials" })

        // console.log(user.isAdmin);
        if (user.isAdmin) {

            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Invalid Credintials" })

            const { password, ...others } = user._doc
            //jwt
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SEC, { expiresIn: "3d" })

            res.status(200).json({ ...others, accessToken })

        } else {
            res.status(200).json({ msg: "you are not admin" })

        }

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})


//LOGOUT
router.post("/logout", async (req, res) => {
    try {
        res.status(200).json({ msg: "Logout Successfully" })
    } catch { }
})

module.exports = router