import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        userId: null,
        products: [],
        quantity: 0,
        total: 0,
        isFetching: false,
        error: false
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.userId = action.payload.userId
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity
            state.isFetching = false;
            state.error = false
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.userId = action.payload.userId
            console.log(action.payload);
            state.products.splice(
                state.products.findIndex(item => item.productId === action.payload.productId), 1
            )
            state.total -= action.payload.price * action.payload.quantity
            state.isFetching = false;
            state.error = false
        },
        loadCart: (state, action) => {
            state.quantity = action.payload.cartItems.length ? action.payload.cartItems.length : 0
            state.userId = action.payload.userId
            state.products = action.payload.cartItems
            state.total = (action.payload.cartItems.map(item => parseInt(item.quantity) * parseInt(item.price))).reduce((a, b) => a + b, 0)
        },
        emptyCart: (state) => {
            state.quantity = 0
            state.userId = null
            state.products = []
            state.total = 0
        },
        cartCheckout: (state) => {
            state.quantity = 0
            state.products = []
            state.total = 0
        }
        // addToCart: (state, action) => {
        //     // console.log(action.payload);
        //     state.quantity += 1
        //     state.userId = action.payload.userId
        //     const prod = {
        //         color: action.payload.color,
        //         img: action.payload.img,
        //         price: action.payload.price,
        //         productId: action.payload.productId,
        //         quantity: action.payload.quantity,
        //         size: action.payload.size,
        //         title: action.payload.title,
        //     }
        //     // console.log(prod);
        //     state.products.push(prod)
        //     state.total += action.payload.price * action.payload.quantity
        //     // (action.payload.cartItems.map(item => parseInt(item.quantity) * parseInt(item.price))).reduce((a, b) => a + b)
        //     // console.log("map", (action.payload.cartItems.map(item => parseInt(item.quantity) * parseInt(item.price))).reduce((a, b) => a + b))
        //     state.isFetching = false;
        //     state.error = false
        // },
        // removefromcart: (state, action) => {
        //     state.quantity -= 1;
        //     state.products.splice(
        //         state.products.findIndex(item => item._id === action.payload.productId), 1
        //     )
        //     state.total -= action.payload.price * action.payload.quantity
        //     //     console.log(action.payload)
        //     //     state.quantity = action.payload.cartItems.length
        //     //     state.userId = action.payload.userId
        //     //     state.products = action.payload.cartItems.slice(0)
        //     //     state.total = (action.payload.cartItems.map(item => parseInt(item.quantity) * parseInt(item.price))).reduce((a, b) => a + b)
        //     //     // console.log("map", (action.payload.cartItems.map(item => parseInt(item.quantity) * parseInt(item.price))).reduce((a, b) => a + b))
        //     //     state.isFetching = false;
        //     //     state.error = false
        //     // }
        // }
    }
})

export const { addProduct, removeProduct, addToCart, loadCart, emptyCart, cartCheckout } = cartSlice.actions
export default cartSlice.reducer