import { useMutation } from "react-query";
import { opsPutRequest } from "../../../lib/api";

const putCart = async (cart: any) => {
  try {
    const response = await opsPutRequest("/cart", cart);

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const usePutCartMutation = () => {
  return useMutation({
    mutationFn: (cart: any) => putCart(cart),
  });
};
