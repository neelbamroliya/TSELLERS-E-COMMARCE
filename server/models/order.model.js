const mongooose = require("mongoose")

const OrderSchema = new mongooose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        paymentId: {
            type: String,
            required: true
        },
        products: [
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
        ],
        total: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    }, {
    timestamps: true
})

module.exports = mongooose.model("Order", OrderSchema)