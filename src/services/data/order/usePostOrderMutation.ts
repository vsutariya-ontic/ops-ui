/* Ready with db2 */
import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../../lib/api";
import { useAuthStore } from "../../../managers/authStore";

const postOrder = async (order: any) => {
  try {
    const response = await opsPostRequest("/order", order);

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const usePostOrderMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.userId);

  return useMutation({
    mutationFn: (order: any) => postOrder(order),
    onSuccess: (response) => {
      if (response.success) {
        alert("Order placed successfully!");
        queryClient.setQueryData([userId, "CART"], {});
      }
    },
  });
};
