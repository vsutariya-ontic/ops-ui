import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { opsGetRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const fetchTokenValidity = async (login: Function, logout: Function) => {
  try {
    const response = await opsGetRequest("/validate");
    console.log(response);
    if (response.success) {
      login({
        email: response.data.userEmail,
        userFirstName: response.data.userFirstName,
        userLastName: response.data.userLastName,
        teamId: response.data.teamId,
        role: response.data.userRole,
      });
    } else {
      localStorage.removeItem("auth");
      logout();
    }
  } catch (err) {
    console.log(err);
  }
};

export const useValidateTokenQuery = (options?: UseQueryOptions<any>) => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  return useQuery({
    queryFn: () => fetchTokenValidity(login, logout),
    queryKey: [queryKeys.TOKEN],
    ...options,
  });
};
