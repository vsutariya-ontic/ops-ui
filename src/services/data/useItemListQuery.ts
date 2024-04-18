import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";
const fetchItems = async (props: any) => {
  const { category } = props;
  let query = "";
  if (!(category === "All")) {
    query = `?category=${category}`;
  }

  try {
    const response = await opsGetRequest(`/item${query}`);
    query = "";
    if (response.success) {
      return response.data;
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
