import { createSlice } from "@reduxjs/toolkit";

// { id: "", name: "", image: "", size: 0, price: 0, quantity: 0 }
const initialState = {
  shoes: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addShoesToCart: (state, action) => {
      console.log(action.payload);
      state.shoes = [...state.shoes, action.payload];
      state.totalAmount += action.payload.price;
    },
    removeShoesFromCart: (state, action) => {
      state.totalAmount -=
        state.shoes.find((shoes) => shoes.id === action.payload.id).price *
        state.shoes.find((shoes) => shoes.id === action.payload.id).quantity;
      state.shoes = state.shoes.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(
        state.shoes.find((shoes) => shoes.id === action.payload.id)
      );
      state.shoes[index].quantity += 1;
      state.totalAmount += state.shoes.find(
        (shoes) => shoes.id === action.payload.id
      ).price;
    },
    deacreaseQuantity: (state, action) => {
      const index = state.shoes.indexOf(
        state.shoes.find((shoes) => shoes.id === action.payload.id)
      );
      if (state.shoes[index].quantity > 1) {
        state.shoes[index].quantity -= 1;
        state.totalAmount -= state.shoes.find(
          (shoes) => shoes.id === action.payload.id
        ).price;
      }
    },
  },
});

export const {
  addShoesToCart,
  removeShoesFromCart,
  deacreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
