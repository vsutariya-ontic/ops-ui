import { useMutation, useQueryClient } from "react-query";
import { opsPutRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

interface UpdateOrderStatusProps {
  orderId: string;
  status: string;
}

const updateOrderStatus = async (body: UpdateOrderStatusProps) => {
  try {
    const response = await opsPutRequest("/order", body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateOrderStatusProps) => updateOrderStatus(body),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ORDER_LIST]);
    },
  });
};
