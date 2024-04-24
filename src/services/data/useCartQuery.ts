/* Ready with db2 */
import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { queryKeys } from "../queryKeys";

const fetchOrder = async () => {
  try {
    const response = await opsGetRequest(`/cart`);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const useOrderQuery = (reactQueryOptions?: UseQueryOptions<any>) => {
  const userId = useAuthStore((state) => state.userId);
  return useQuery({
    queryFn: () => fetchOrder(),
    queryKey: [userId, queryKeys.CART],
    ...reactQueryOptions,
  });
};
