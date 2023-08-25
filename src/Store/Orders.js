import { createSlice } from "@reduxjs/toolkit";

const orederdetails = createSlice({
  name: "orders",
  initialState: {
    orders:[],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});
export const { getOrders } = orederdetails.actions;
export default orederdetails.reducer;
