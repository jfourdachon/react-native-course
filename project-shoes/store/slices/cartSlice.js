import { createSlice } from "@reduxjs/toolkit";

// { id: "", name: "", image: "", size: 0, price: 0, quantity: 0}
const initialState = {
  shoes: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addShoesToCart: (state, action) => {
      state.shoes = [...state.shoes, action.payload];
      state.totalAmount += action.payload.price;
    },
    removeShoesFromCart: (state, action) => {
      const shoesToRemove = state.shoes.find(
        (shoes) => shoes.id === action.payload.id
      );
      state.shoes = state.shoes.filter(
        (shoes) => shoes.id !== shoesToRemove.id
      );
      state.totalAmount -= shoesToRemove.price * shoesToRemove.quantity;
    },
    increaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(
        state.shoes.find((shoes) => shoes.id === action.payload.id)
      );
      state.shoes[index].quantity += 1;
      state.totalAmount += state.shoes[index].price;
    },
    deacreaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(
        state.shoes.find((shoes) => shoes.id === action.payload.id)
      );
      if (state.shoes[index].quantity > 1) {
        state.shoes[index].quantity -= 1;
        state.totalAmount -= state.shoes[index].price;
      }
    },
  },
});

export const {
  addShoesToCart,
  removeShoesFromCart,
  increaseQuantity,
  deacreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
