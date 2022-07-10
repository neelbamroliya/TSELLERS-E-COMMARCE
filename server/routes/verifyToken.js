const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        // console.log(req.headers.token);
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json({ msg: "Token is not valid" })

            req.user = user
            next()
        })
    } else {
        return res.status(401).json({ msg: "you are not authenticated" })
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("verifyTokenAndAdmin", req.user);
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({ msg: "you are not allowed to do that!" })
        }
    })
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("verifyTokenAndAuthorization", req);
        // console.log(req.user, req.params);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({ msg: "you are not allowed to do that!" })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }