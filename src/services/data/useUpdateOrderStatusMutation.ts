import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";
const updateOrderStatus = async (order_id: string, newStatus: string) => {
    try {
        const response = await opsPostRequest("/update-order-status", {
            order_id: order_id,
            new_status: newStatus,
        });
    } catch (err) {
        console.log(err);
    }
};

export const useUpdateOrderStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            order_id,
            newStatus,
        }: {
            order_id: string;
            newStatus: string;
        }) => updateOrderStatus(order_id, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.ORDER_LIST]);
        },
    });
};
