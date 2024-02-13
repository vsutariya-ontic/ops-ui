import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";

const fetchCartItemList = async (user_email: string) => {
    try {
        const response = await opsPostRequest("/get-cart-item-list", {
            user_email: user_email,
        });
        if (response.success) {
            return response.cartItems;
        } else {
            console.log(response);
            return [];
        }
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const useCartListQuery = (options?: UseQueryOptions<any>) => {
    const user_email = useAuthStore((state) => state.email);
    return useQuery({
        queryFn: () => fetchCartItemList(user_email),
        queryKey: [queryKeys.CART_LIST],
        ...options,
    });
};
