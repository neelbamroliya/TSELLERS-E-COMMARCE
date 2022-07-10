const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const userRoute = require("./routes/user.route")
const authRoute = require("./routes/auth.route")
const productRoute = require("./routes/product.route")
const cartRoute = require("./routes/cart.route")
const orderRoute = require("./routes/order.route")
const paymentRoute = require("./routes/payment.route")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection successful"))
    .catch(err => console.log(err))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/checkout", paymentRoute)


app.get("/api/test", () => {
    console.log("test is successful");
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})