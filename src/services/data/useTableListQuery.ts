import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const fetchTableList = async () => {
  try {
    const response = await opsGetRequest("/table");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const useTableListQuery = (options?: UseQueryOptions<any>) => {
  return useQuery({
    queryFn: async () => await fetchTableList(),
    queryKey: [queryKeys.TABLE_LIST],
    ...options,
  });
};
