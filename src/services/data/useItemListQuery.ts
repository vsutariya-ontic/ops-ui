import { UseQueryOptions, useQuery } from "react-query";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";
const fetchItems = async (props: any) => {
    const { category } = props;
    let query = "";
    if (!(category === "All")) {
        query = `?category=${category}`;
    }
    const token = localStorage.getItem("auth");
    try {
        const response = await opsPostRequest(`/getItem${query}`, {
            auth_token: token,
        });
        if (response.success) {
            return response.items;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Unable to fetch items");
    }
};

export const useItemListQuery = (
    category: string,
    options?: UseQueryOptions<any>
) => {
    return useQuery({
        queryFn: () =>
            fetchItems({
                category: category,
            }),
        queryKey: [queryKeys.ITEM_LIST, category],
        ...options,
    });
};
