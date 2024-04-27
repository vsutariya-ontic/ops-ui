import Cookies from "js-cookie";
import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { queryKeys } from "../queryKeys";

const fetchTokenValidity = async () => {
  try {
    const response = await opsGetRequest("/validate");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const useValidateTokenQuery = (options?: UseQueryOptions<any>) => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return useQuery({
    queryFn: () => fetchTokenValidity(),
    queryKey: [queryKeys.TOKEN],
    onSuccess: (response) => {
      if (response.success) {
        login({
          email: response.data.userEmail,
          userFirstName: response.data.userFirstName,
          userLastName: response.data.userLastName,
          teamId: response.data.teamId,
          role: response.data.userRole,
          userId: response.userId,
          defaultTable: response.defaultTable,
        });
      } else {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
        Cookies.remove("auth");

        logout();
      }
    },
    ...options,
  });
};
