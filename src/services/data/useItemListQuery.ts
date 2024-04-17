import { UseQueryOptions, useQuery } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";
const fetchItems = async (props: any) => {
  const { category } = props;
  let query = "";
  if (!(category === "All")) {
    query = `?category=${category}`;
  }
  const token = String(
    localStorage.getItem("auth") || sessionStorage.getItem("auth")
  );

  try {
    const response = await opsPostRequest(`/getItem${query}`, {
      authToken: token,
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
