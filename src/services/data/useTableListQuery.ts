import { UseQueryOptions, useQuery } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";
const fetchTableList = async () => {
  try {
    const token = JSON.parse(String(localStorage.getItem("auth")));
    const response = await opsPostRequest("/get-table-list", {
      authToken: token,
    });
    return response.tables;
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
