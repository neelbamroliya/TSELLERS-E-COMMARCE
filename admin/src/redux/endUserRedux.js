import { createSlice } from "@reduxjs/toolkit"

export const endUserSlice = createSlice({
  name: "endUser",
  initialState: {
    endUsers: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //GET ALL
    getEndUserStart: (state) => {
      state.isFetching = true;
      state.error = false
    },
    getEndUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false
      state.endUsers = action.payload
    },
    getEndUserFailure: (state) => {
      state.isFetching = false;
      state.error = true
    },
    //DELETE
    deleteEndUserStart: (state) => {
      state.isFetching = true;
      state.error = false
    },
    deleteEndUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false
      state.endUsers.splice(
        state.endUsers.findIndex(item => item._id === action.payload), 1
      )
    },
    deleteEndUserFailure: (state) => {
      state.isFetching = false;
      state.error = true
    }
  }
});

export const { getEndUserStart, getEndUserSuccess, getEndUserFailure, deleteEndUserStart, deleteEndUserSuccess, deleteEndUserFailure } = endUserSlice.actions;

export default endUserSlice.reducer