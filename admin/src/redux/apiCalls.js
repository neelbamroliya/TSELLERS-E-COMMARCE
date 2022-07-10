import { loginFailure, loginStart, loginSuccess, logoutstat } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux"
import { deleteEndUserFailure, deleteEndUserStart, deleteEndUserSuccess, getEndUserFailure, getEndUserStart, getEndUserSuccess } from "./endUserRedux"
import { approveOrderFailure, approveOrderStart, approveOrderSuccess, deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess } from "./orderRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        // console.log(user);
        const res = await publicRequest.post("/auth/adminlogin", user)
        // console.log(res.data._id);
        if (res.data._id) {
            // console.log("true");
            dispatch(loginSuccess(res.data))
        } else {
            // console.log("false");
            dispatch(loginFailure())
        }
    } catch (err) {
        dispatch(loginFailure())
    }
}
export const logout = async (dispatch, user) => {
    try {
        const res = await userRequest.post("/auth/logout", user)
        dispatch(logoutstat(res.data))
    } catch (err) { }
}
export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}
export const getOrders = async (dispatch) => {
    dispatch(getOrderStart())
    try {
        const res = await publicRequest.get("/orders")
        console.log(res.data);
        dispatch(getOrderSuccess(res.data))
    } catch (err) {
        dispatch(getOrderFailure())
    }
}
export const approveOrder = async (dispatch, orderId) => {
    dispatch(approveOrderStart())
    try {
        const res = await userRequest.put(`/orders/approve/${orderId}`)
        dispatch(approveOrderSuccess(orderId))
    } catch (err) {
        dispatch(approveOrderFailure())
    }
}
export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart())
    try {
        const res = await userRequest.delete(`/orders/${id}`)
        dispatch(deleteOrderSuccess(id))
    } catch (err) {
        dispatch(deleteOrderFailure())
    }
}
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    try {
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}
export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    try {
        const res = await userRequest.put(`/products/${id}`)
        dispatch(updateProductSuccess({ product }))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}

export const getEndUsers = async (dispatch) => {
    dispatch(getEndUserStart())
    try {
        const res = await userRequest.get("/users")
        dispatch(getEndUserSuccess(res.data))
    } catch (err) {
        dispatch(getEndUserFailure())
    }
}
export const deleteEndUser = async (id, dispatch) => {
    dispatch(deleteEndUserStart())
    try {
        const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteEndUserSuccess(id))
    } catch (err) {
        dispatch(deleteEndUserFailure())
    }
}