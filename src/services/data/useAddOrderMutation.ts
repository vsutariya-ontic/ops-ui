import { useMutation, useQueryClient } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const addDefaultTable = async (table_no: number | null | undefined) => {
    try {
        let token = JSON.parse(String(localStorage.getItem("auth")));
        if (!token) {
            token = JSON.parse(String(sessionStorage.getItem("auth")));
        }
        const response = opsPostRequest("/add-default-table", {
            auth_token: token,
            table_no: table_no,
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const placeOrders = async (
    token: string,
    instructions: string,
    table_no: number | undefined
) => {
    try {
        const response = await opsPostRequest("/add-order", {
            auth_token: token,
            instructions: instructions,
            table_no: table_no,
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
            placeOrders(
                token,
                formState.instructions,
                formState.table?.table_no
            ),
        onSuccess: async (response) => {
            if (formState.makeDefault) {
                await addDefaultTable(formState.table?.table_no);
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
