// deprecated
import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../lib/api";
const updateCartItem = async (
  userEmail: string,
  itemId: string,
  quantity: number
) => {
  try {
    const response = await opsPostRequest("/add-cart-item", {
      userEmail: userEmail,
      itemId: itemId,
      quantity: quantity,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const useCartItemMutation = (userEmail: string, itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ quantity }: any) =>
      updateCartItem(userEmail, itemId, quantity),
    onSuccess: (response: any) => {
      const prevData: any = queryClient.getQueryData("CART_LIST");
      let newCartItems = prevData;
      const targetCt = prevData.find((ct: any) => ct.itemId === itemId);
      if (targetCt && response.data?.cartItem) {
        newCartItems[newCartItems.indexOf(targetCt)] = response.data?.cartItem;
      } else if (targetCt) {
        newCartItems.splice(newCartItems.indexOf(targetCt), 1);
      } else {
        newCartItems.unshift(response.data?.cartItem);
      }
      queryClient.setQueryData("CART_LIST", newCartItems);
    },
  });
};
