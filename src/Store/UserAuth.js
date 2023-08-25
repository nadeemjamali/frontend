import { createSlice } from "@reduxjs/toolkit";

const UserDetail = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  },
  reducers: {
    UserFun: (state, action) => {
      state.user = action.payload;
    },

    Logout: (state) => {
      state.user = null;
    },
  },
});
export const { Logout, UserFun } = UserDetail.actions;
export default UserDetail.reducer;
