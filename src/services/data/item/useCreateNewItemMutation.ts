import { useMutation, useQueryClient } from "react-query";
import { opsPostRequest } from "../../../lib/api";
import { queryKeys } from "../../queryKeys";

interface CreateItemFormState {
  itemName: string;
  category: string;
  timeToMake: string | number;
  ingredients: string;
  imageUrl: string;
}
const addNewMenuItem = async (data: CreateItemFormState) => {
  try {
    const response = await opsPostRequest("/item", data);
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
