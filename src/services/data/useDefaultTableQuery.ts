import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { queryKeys } from "../queryKeys";
import { opsPostRequest } from "../../lib/api";

const fetchDefaultTable = async (user_email: string) => {
    try {
        const response = await opsPostRequest("/get-default-table", {
            user_email: user_email,
        });
        if (response.success) return response.table;
        else return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};
export const useDefaultTableQuery = (options?: UseQueryOptions<any>) => {
    const user_email = useAuthStore((state) => state.email);
    return useQuery({
        queryFn: async () => await fetchDefaultTable(user_email),
        queryKey: [queryKeys.DEFAULT_TABLE],
        ...options,
    });
};
