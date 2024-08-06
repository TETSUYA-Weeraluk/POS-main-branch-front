import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListOrderProps } from "../pages/order/components/ListOrder.component";
import { ItemCardMenuComponentProps } from "../pages/order/components/ItemCardMenu.component";

export interface OrderState {
  cart: ListOrderProps[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: OrderState = {
  cart: [],
  loading: "idle",
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addInCart(state, action: PayloadAction<ItemCardMenuComponentProps>) {
      const { name, price, type } = action.payload;

      const indexType = state.cart.findIndex((order) => order.type === type);

      if (indexType === -1) {
        state.cart.push({
          type,
          order: [
            {
              name,
              price,
              quantity: 1,
            },
          ],
        });
      } else {
        const indexItem = state.cart[indexType].order.findIndex(
          (order) => order.name === name
        );

        if (indexItem === -1) {
          state.cart[indexType].order.push({
            name,
            price,
            quantity: 1,
          });
        } else {
          state.cart[indexType].order[indexItem].quantity += 1;
        }
      }
    },
  },
  //   extraReducers: (builder) => {},
});

export const { addInCart } = orderSlice.actions;
export default orderSlice.reducer;
