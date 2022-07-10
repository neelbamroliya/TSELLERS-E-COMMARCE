import { createSlice } from "@reduxjs/toolkit"

export const endUserSlice = createSlice({
  name: "endUser",
  initialState: {
    endUsers: [],
    isFetching: false,
    error: false
  },
  reducers: {
    addEndUserStart: (state) => {
      state.isFetching = true;
      state.error = false
    },
    addEndUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false
      state.endUsers.push(action.payload)
    },
    addEndUserFailure: (state) => {
      state.isFetching = false
      state.error = true
    }
  }
})

export const { addEndUserStart, addEndUserSuccess, addEndUserFailure } = endUserSlice.actions

export default endUserSlice.reducer