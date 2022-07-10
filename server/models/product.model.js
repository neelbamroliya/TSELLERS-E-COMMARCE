const mongooose = require("mongoose")

const ProductSchema = new mongooose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true
        },
        desc: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        },
        category: {
            type: Array
        },
        size: {
            type: Array
        },
        color: {
            type: Array
        },
        price: {
            type: Number,
            require: true
        },
        inStock: {
            type: Boolean,
            default: true
        }

    }, {
    timestamps: true
})

module.exports = mongooose.model("Product", ProductSchema)