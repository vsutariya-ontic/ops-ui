import { UseQueryOptions, useQuery } from "react-query";
import { opsPostRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { queryKeys } from "../queryKeys";

const fetchDefaultTable = async (userEmail: string) => {
  try {
    const response = await opsPostRequest("/get-default-table", {
      userEmail: userEmail,
    });
    if (response.success) return response.table;
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const useDefaultTableQuery = (options?: UseQueryOptions<any>) => {
  const userEmail = useAuthStore((state) => state.email);
  return useQuery({
    queryFn: async () => await fetchDefaultTable(userEmail),
    queryKey: [queryKeys.DEFAULT_TABLE],
    ...options,
  });
};
