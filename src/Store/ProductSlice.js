import { createSlice } from "@reduxjs/toolkit";

const ProductDetails = createSlice({
  name: "ProductDetails",
  initialState: {
    products: [],
    sellerProduct: [],
    filtredproduct:[],
    loading: false,
    error: null,
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    productAddedBySeller: (state, action) => {
      state.sellerProduct = action.payload;
    },
    setFilteredProduct: (state, action) => {
      state.filtredproduct = action.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getAllProducts, loadingState, productAddedBySeller , setFilteredProduct } =
  ProductDetails.actions;
export default ProductDetails.reducer;
