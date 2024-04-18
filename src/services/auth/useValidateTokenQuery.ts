import { UseQueryOptions, useQuery } from "react-query";
import { opsGetRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { useCartManager } from "../../managers/cartManager";
import { OrderStatus } from "../../types/general";
import { useOrderQuery } from "../data/useOrderQuery";
import { queryKeys } from "../queryKeys";

const getTokenValidity = async (
  login: Function,
  logout: Function,
  initCartManager: Function,
  orderQuery: any
) => {
  try {
    const response = await opsGetRequest("/validate");
    console.log(response);
    if (response.success) {
      login(
        {
          email: response.data.userEmail,
          userFirstName: response.data.userFirstName,
          userLastName: response.data.userLastName,
          teamId: response.data.teamId,
          role: response.data.userRole,
        },
        initCartManager,
        orderQuery.refetch
      );
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
  const initCartManager = useCartManager((state) => state.init);
  const orderQuery = useOrderQuery(OrderStatus.IN_CART, { enabled: false });

  return useQuery({
    queryFn: () => getTokenValidity(login, logout, initCartManager, orderQuery),
    queryKey: [queryKeys.TOKEN],
    ...options,
  });
};
