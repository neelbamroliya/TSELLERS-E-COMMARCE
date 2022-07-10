import { loginFailure, loginStart, loginSuccess, logoutstat } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"
import { addEndUserFailure, addEndUserStart, addEndUserSuccess } from "./endUserRedux"
import { cartCheckout, loadCart } from "../redux/cartRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        // console.log("login", res.data);
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const logout = async (dispatch, user) => {
    try {
        const res = await userRequest.post("/auth/logout", user)
        // console.log("logout", res.data);
        dispatch(logoutstat(res.data))
    } catch (err) { }
}


export const addEndUser = async (dispatch, user) => {
    dispatch(addEndUserStart())
    try {
        const res = await userRequest.post(`/auth/register`, user)
        dispatch(addEndUserSuccess(res.data))
    } catch (err) {
        dispatch(addEndUserFailure())
    }
}

export const addtoCartReq = async (cartItems, userId) => {
    try {
        // console.log(cartItems, user);
        const res = await userRequest.post("/carts/addtocart", { cartItems, userId })
        // console.log(res.data);
        // dispatch(addToCart(res.data))
    } catch (err) {

    }
}
export const removefromCartReq = async (dispatch, userId, product) => {
    try {
        // console.log(userId, product);
        const res = await userRequest.post("/carts/removefromcart", { userId, product })
        // console.log(res.data);
        // dispatch(addToCart(res.data))
    } catch (err) {

    }
}

export const loadCartReq = async (dispatch, userId) => {
    // console.log(userId);
    const res = await userRequest.post("/carts/loadcart", { userId })
    // console.log(res.data)
    dispatch(loadCart(res.data))
}

export const cartCheckoutReq = async (dispatch, checkoutDetails) => {
    // console.log(checkoutDetails);
    const res = await userRequest.post("/orders/checkout", { checkoutDetails })
    // console.log(res.data);
    dispatch(cartCheckout())
}
