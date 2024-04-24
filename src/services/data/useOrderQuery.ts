/* Ready with db2 */
import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { queryKeys } from "../queryKeys";

const fetchOrder = async (status: string) => {
  try {
    const response = await opsGetRequest(`/order?status=${status}`);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const useOrderQuery = (
  status: string,
  reactQueryOptions?: UseQueryOptions<any>
) => {
  const userId = useAuthStore((state) => state.userId);
  return useQuery({
    queryFn: () => fetchOrder(status),
    queryKey: [userId, status, queryKeys.ORDER],
    ...reactQueryOptions,
  });
};
