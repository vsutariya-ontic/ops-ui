/* Ready with db2 */
import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../../lib/api";
import { useAuthStore } from "../../../managers/authStore";
import { queryKeys } from "../../queryKeys";

const fetchOrder = async () => {
  try {
    const response = await opsGetRequest(`/cart`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const useCartQuery = (reactQueryOptions?: UseQueryOptions<any>) => {
  const userId = useAuthStore((state) => state.userId);
  return useQuery({
    queryFn: () => fetchOrder(),
    queryKey: [userId, queryKeys.CART],
    ...reactQueryOptions,
  });
};
