const mongooose = require("mongoose")

const CartSchema = new mongooose.Schema(
    {
        userId: {
            type: mongooose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cartItems: [
            {
                productId: {
                    type: mongooose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                img: {
                    type: String,
                    required: true
                },
                color: {
                    type: String
                },
                size: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    default: 0
                }
            }
        ]
    }, {
    timestamps: true
})

module.exports = mongooose.model("Cart", CartSchema)