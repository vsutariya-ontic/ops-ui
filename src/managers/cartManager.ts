import _find from "lodash/find";
import _get from "lodash/get";
import _remove from "lodash/remove";
import _set from "lodash/set";
import { create } from "zustand";
import { OrderStatus } from "../types/general";

export interface CartManager {
  items: any[];
  status: string;
  init: (orderQueryFn: Function) => Promise<void>;
  getItemCount: (itemId: string) => number;
  updateItemCount: (item: any, count: number) => void;
  uploadCart: (putOrderMutationFn: Function) => void;
}

const DEFAULT_CART_MANAGER_STATE = {
  items: [],
  status: "IN_CART",
};

export const useCartManager = create<CartManager>((set, state) => {
  return {
    ...DEFAULT_CART_MANAGER_STATE,
    init: async (orderQueryFn: Function) => {
      const orderResponse = await orderQueryFn();
      console.log(orderResponse);
      set((state) => ({
        items: orderResponse?.data?.data || [],
      }));
    },
    updateItemCount: (item: any, count: number) => {
      set((state) => {
        const itemId = item.itemId;
        const targetItem = _find(state.items, (item) => item.itemId === itemId);
        if (targetItem && count) {
          _set(targetItem, ["itemCount"], count);
        } else {
          state.items.push({ ...item, itemCount: count });
        }
        if (count === 0) {
          _remove(state.items, (item) => item.itemId === itemId);
        }
        return { items: [...state.items] };
      });
    },
    uploadCart: (putOrderMutationFn: Function) => {
      putOrderMutationFn({
        status: OrderStatus.IN_CART,
        items: state().items,
      });
    },
    getItemCount: (itemId: string) => {
      return _get(
        _find(state().items, (item) => item.itemId === itemId),
        ["itemCount"],
        0
      );
    },
    reset: () => {
      set(DEFAULT_CART_MANAGER_STATE);
    },
  };
});
