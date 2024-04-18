import { useMutation } from "react-query";
import { opsPutRequest } from "../../lib/api";

const putOrder = async (order: RevisedOrder) => {
  try {
    const response = await opsPutRequest("/order", order);

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const usePutOrderMutation = () => {
  return useMutation({
    mutationFn: (order: any) => putOrder(order),
  });
};
