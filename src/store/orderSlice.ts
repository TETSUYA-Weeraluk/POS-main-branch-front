import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemCardMenuComponentProps } from "../pages/order/components/ItemCardMenu.component";

export interface OrderState {
  cart: {
    total: number;
    items: {
      type: string;
      order: {
        name: string;
        price: number;
        quantity: number;
      }[];
    }[];
  };
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: OrderState = {
  cart: {
    total: 0,
    items: [],
  },
  loading: "idle",
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addInCart(state, action: PayloadAction<ItemCardMenuComponentProps>) {
      const { name, price, type } = action.payload;

      const indexType = state.cart.items.findIndex(
        (order) => order.type === type
      );

      if (indexType === -1) {
        state.cart.items.push({
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
        const indexItem = state.cart.items[indexType].order.findIndex(
          (order) => order.name === name
        );

        if (indexItem === -1) {
          state.cart.items[indexType].order.push({
            name,
            price,
            quantity: 1,
          });
        } else {
          state.cart.items[indexType].order[indexItem].quantity += 1;
        }
      }

      state.cart.total += price;
    },

    removeItem(
      state,
      action: PayloadAction<{ name: string; type: string; price: number }>
    ) {
      const { name, type, price } = action.payload;

      const indexType = state.cart.items.findIndex(
        (order) => order.type === type
      );

      if (indexType === -1) {
        return;
      }

      const indexItem = state.cart.items[indexType].order.findIndex(
        (order) => order.name === name
      );

      state.cart.total -= price;

      if (indexItem === -1) {
        return;
      }

      if (state.cart.items[indexType].order[indexItem].quantity === 1) {
        state.cart.items[indexType].order.splice(indexItem, 1);

        if (state.cart.items[indexType].order.length === 0) {
          state.cart.items.splice(indexType, 1);
        }

        return;
      }

      state.cart.items[indexType].order[indexItem].quantity -= 1;
    },
  },
  //   extraReducers: (builder) => {},
});

export const { addInCart, removeItem } = orderSlice.actions;
export default orderSlice.reducer;
