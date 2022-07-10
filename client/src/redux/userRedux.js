import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "name",
    initialState: {
        currentUser: null,
        isFatching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFatching = true
        },
        loginSuccess: (state, action) => {
            state.isFatching = false;
            state.currentUser = action.payload;
            state.error = false
        },
        loginFailure: (state) => {
            state.isFatching = false;
            state.error = true
        },
        logoutstat: (state) => {
            state.currentUser = null
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logoutstat } = userSlice.actions
export default userSlice.reducer