import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageData = () => {
  const newdata = localStorage.getItem("cartData");
  if (newdata === []) {
    return [];
  } else {
    return JSON.parse(newdata);
  }
};

const CartDetails = createSlice({
  name: "Cart",
  initialState: {
    Cart: localStorage.getItem("cartData") ? getLocalStorageData() : [],
    totalamount: null,
  },
  reducers: {
    AddItemToCart: (state, action) => {
       (state.Cart, "additem");
      const findItem = state.Cart?.find(
        (prod) => prod.id === action.payload.id
      );
      if (findItem) {
        state.Cart = state.Cart.map((prod) =>
          prod.id === action.payload.id
            ? { ...findItem, quantity: findItem.quantity + 1 }
            : prod
        );
      } else {
        state.Cart = [...state?.Cart, { ...action.payload, quantity: 1 }];
      }
    },

    removeIemFromCart: (state, action) => {
      const findItem = state.Cart?.find(
        (item) => item.id === action.payload.id
      );
      if (findItem.quantity === 1) {
        state.Cart = state.Cart.filter((item) => item.id != action.payload.id);
      } else {
        state.Cart = state.Cart.map((item) =>
          item.id === action.payload.id
            ? { ...findItem, quantity: findItem.quantity - 1 }
            : item
        );
      }
    },

    ClearAll: (state) => {
      state.Cart = [];
    },
    TotalCartPrice: (state) => {
      state.totalamount = state.Cart?.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
  },
});
export const { AddItemToCart, removeIemFromCart, ClearAll, TotalCartPrice } =
  CartDetails.actions;
export default CartDetails.reducer;
