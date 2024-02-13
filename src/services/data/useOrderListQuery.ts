import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";

const fetchOrders = async (endpoint: string, user_email: string) => {
    try {
        const response = await opsPostRequest(endpoint, {
            user_email: user_email,
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
    const user_email = useAuthStore((state) => state.email);
    return useQuery({
        queryFn: () => fetchOrders(getUrl(category), user_email),
        queryKey: [queryKeys.ORDER_LIST, category],
        ...options,
    });
};
