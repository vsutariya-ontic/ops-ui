import _find from "lodash/find";
import _get from "lodash/get";
import _remove from "lodash/remove";
import _set from "lodash/set";
import React from "react";
import { useQueryClient } from "react-query";
import { useAuthStore } from "../managers/authStore";
import { useCartQuery } from "../services/data/cart/useCartQuery";
import { usePutCartMutation } from "../services/data/cart/usePutCartMutation";

export const useCartManager = () => {
  // const [items, setItems] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const userId = useAuthStore((state) => state.userId);
  const cartQuery = useCartQuery();
  const queryClient = useQueryClient();
  const items = cartQuery.data?.items || [];
  const cart = cartQuery.data;

  const putCartMutation = usePutCartMutation();

  const getItemCount = (itemId: string) => {
    console.log({ itemId, items });
    return _get(
      _find(items, (item) => itemId && item.itemId === itemId),
      ["itemCount"],
      0
    );
  };

  const updateItemCount = async (item: any, count: number) => {
    const updatedItems = [...items];
    console.log("before updating", updatedItems);
    const itemId = item.itemId;

    const targetItem = _find(
      updatedItems,
      (item: any) => item.itemId === itemId && itemId
    );
    console.log("targetItem", targetItem);
    if (targetItem && count) {
      _set(targetItem, ["itemCount"], count);
    } else if (count) {
      console.log("item", item);
      updatedItems.push({ ...item, itemCount: count });
    }

    if (count === 0) {
      _remove(updatedItems, (item) => itemId && item.itemId === itemId);
    }
    console.log("after update", updatedItems);
    queryClient.setQueryData([userId, "CART"], {
      ...cartQuery.data,
      items: updatedItems,
    });
    // setItems(updatedItems);
    if (true) {
      await uploadCart(updatedItems);
    }
  };

  const uploadCart = async (newItems?: any[]) => {
    setIsLoading(true);
    await putCartMutation.mutateAsync({
      ...cart,
      items: newItems || items,
    });
    setIsLoading(false);
    return;
  };

  // React.useEffect(() => {
  // if (cart?.items) setItems(cart?.items);
  // }, cart);

  return {
    items,
    getItemCount,
    updateItemCount,
    uploadCart,
    isLoading: isLoading || cartQuery.isLoading || cartQuery.isFetching,
  };
};
