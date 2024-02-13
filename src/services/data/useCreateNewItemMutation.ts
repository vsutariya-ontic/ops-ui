import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";

interface CreateItemFormState {
    itemName: string;
    category: string;
    timeToPrepare: string | number;
    ingredients: string;
    imageUrl: string;
}
const addNewMenuItem = async (data: CreateItemFormState) => {
    try {
        const response = await opsPostRequest("/createItem", data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const useCreateNewItemMutation = (formData: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => addNewMenuItem(formData),
        onSuccess: (reponse) => {
            queryClient.invalidateQueries([queryKeys.ITEM_LIST]);
        },
    });
};
