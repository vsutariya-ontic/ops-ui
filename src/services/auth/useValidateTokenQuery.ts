import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const fetchTokenValidity = async (login: Function, logout: Function) => {
  try {
    const response = await opsPostRequest("/validate", {});
    console.log(response);
    if (response.success) {
      const payload = {
        email: response.userData.userEmail,
        username: response.userData.userName,
        teamId: response.userData.teamId,
        role: response.userData.userRole,
      };
      login(payload);
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
