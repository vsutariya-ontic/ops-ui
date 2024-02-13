import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../lib/api";
const updateCartItem = async (
    user_email: string,
    item_id: string,
    quantity: number
) => {
    try {
        const response = await opsPostRequest("/add-cart-item", {
            user_email: user_email,
            item_id: item_id,
            quantity: quantity,
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const useCartItemMutation = (user_email: string, item_id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ quantity }: any) =>
            updateCartItem(user_email, item_id, quantity),
        onSuccess: (response: any) => {
            const prevData: any = queryClient.getQueryData("CART_LIST");
            let newCartItems = prevData;
            const targetCt = prevData.find((ct: any) => ct.item_id === item_id);
            if (targetCt && response.data?.cartItem) {
                newCartItems[newCartItems.indexOf(targetCt)] =
                    response.data?.cartItem;
            } else if (targetCt) {
                newCartItems.splice(newCartItems.indexOf(targetCt), 1);
            } else {
                newCartItems.unshift(response.data?.cartItem);
            }
            queryClient.setQueryData("CART_LIST", newCartItems);
        },
    });
};
