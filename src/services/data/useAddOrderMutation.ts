/* Logic shifted to usePutOrderMutation */
import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const addDefaultTable = async (tableNo: number | null | undefined) => {
  try {
    let token = String(localStorage.getItem("auth"));
    if (!token) {
      token = String(sessionStorage.getItem("auth"));
    }
    const response = opsPostRequest("/add-default-table", {
      authToken: token,
      tableNo: tableNo,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const placeOrders = async (
  token: string,
  instructions: string,
  tableNo: number | undefined
) => {
  try {
    const response = await opsPostRequest("/add-order", {
      authToken: token,
      instructions: instructions,
      tableNo: tableNo,
    });
    if (response.success) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const useAddOrderMutation = ({ formState }: any) => {
  let token = JSON.parse(String(localStorage.getItem("auth")));
  if (!token) {
    token = JSON.parse(String(sessionStorage.getItem("auth")));
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      placeOrders(token, formState.instructions, formState.table?.tableNo),
    onSuccess: async (response) => {
      if (formState.makeDefault) {
        await addDefaultTable(formState.table?.tableNo);
      }
      if (response) {
        queryClient.invalidateQueries([queryKeys.CART_LIST]);
        queryClient.invalidateQueries([queryKeys.ORDER_LIST]);
        alert("Order placed successfully");
      } else {
        alert("error placing orders");
      }
    },
  });
};
