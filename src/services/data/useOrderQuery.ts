import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";

const fetchOrder = async (status: string, userId: string) => {
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
    queryFn: () => fetchOrder(status, userId),
    queryKey: [userId, status],
    ...reactQueryOptions,
  });
};
