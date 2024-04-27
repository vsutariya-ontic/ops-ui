// deprecated
import { UseQueryOptions, useQuery } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { queryKeys } from "../queryKeys";

const fetchCartItemList = async (userEmail: string) => {
  try {
    const response = await opsPostRequest("/get-cart-item-list", {
      userEmail: userEmail,
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
  const userEmail = useAuthStore((state) => state.email);
  return useQuery({
    queryFn: () => fetchCartItemList(userEmail),
    queryKey: [queryKeys.CART_LIST],
    ...options,
  });
};
