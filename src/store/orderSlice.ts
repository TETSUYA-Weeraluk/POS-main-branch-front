import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemCardMenuComponentProps } from "../pages/order/components/ItemCardMenu.component";
import { Cart, ListOrders } from "../pages/order/order-type";

export interface OrderState {
  cart: Cart;
  listOrders: ListOrders[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: OrderState = {
  cart: {
    total: 0,
    quantity: 0,
    items: [],
  },
  listOrders: [],
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
          quantity: 1,
          total: price,
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

        state.cart.items[indexType].total += price;
        state.cart.items[indexType].quantity += 1;
      }

      state.cart.quantity += 1;
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

      state.cart.items[indexType].total -= price;

      if (state.cart.items[indexType].order[indexItem].quantity === 1) {
        state.cart.items[indexType].order.splice(indexItem, 1);

        if (state.cart.items[indexType].order.length === 0) {
          state.cart.items.splice(indexType, 1);
        }

        return;
      }

      state.cart.items[indexType].order[indexItem].quantity -= 1;
    },

    confirmOrder(
      state,
      action: PayloadAction<{
        cart: Cart;
        codeDiscount: string;
        discount: number;
        descriptionDiscount: string;
        total: number;
      }>
    ) {
      const { cart, codeDiscount, discount, descriptionDiscount, total } =
        action.payload;

      const data: ListOrders = {
        orders: cart.items,
        total: total,
        quantity: cart.quantity,
        code: codeDiscount,
        status: "pending",
        discount,
        descriptionDiscount,
      };
      state.listOrders.push(data);
    },
  },
});

export const { addInCart, removeItem, confirmOrder } = orderSlice.actions;
export default orderSlice.reducer;
