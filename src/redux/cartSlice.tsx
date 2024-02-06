import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    allCart: [],
  },
  reducers: {
    populateCart: (state, action) => {
      if (action.payload) {
        state.allCart = action.payload;
        state.total = action.payload.length || 0;
      }
    },
  },
});
export const { populateCart } = cartSlice.actions;

export default cartSlice.reducer;
