import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";
const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await opsPostRequest("/update-order-status", {
      orderId: orderId,
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
      orderId,
      newStatus,
    }: {
      orderId: string;
      newStatus: string;
    }) => updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ORDER_LIST]);
    },
  });
};
