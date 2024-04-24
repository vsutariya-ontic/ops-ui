import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const fetchOrders = async (endpoint: string, userEmail: string) => {
  try {
    const response = await opsPostRequest(endpoint, {
      userEmail: userEmail,
    });
    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const useOrderListQuery = (
  category: any,
  options?: UseQueryOptions<any>
) => {
  const getUrl = (category: string) => {
    switch (category) {
      case "Pending": {
        return "/get-pending-orders";
      }
      case "Preparing now": {
        return "/get-preparing-orders";
      }
      case "Completed": {
        return "/get-completed-orders";
      }
      default: {
        return "";
      }
    }
  };
  const userEmail = useAuthStore((state) => state.email);
  return useQuery({
    queryFn: () => fetchOrders(getUrl(category), userEmail),
    queryKey: [queryKeys.ORDER_LIST, category],
    ...options,
  });
};
