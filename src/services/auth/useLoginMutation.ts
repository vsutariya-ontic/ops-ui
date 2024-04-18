import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { opsPostRequest } from "../../lib/api";
import { useAuthStore } from "../../managers/authStore";
import { useCartManager } from "../../managers/cartManager";
import { OrderStatus } from "../../types/general";
import { useOrderQuery } from "../data/useOrderQuery";
interface UseLoginMutationProps {
  rememberMe: boolean;
}
interface UserLoginRequest {
  userEmail: string;
  userPassword: string;
  userRole: string;
}
const fetchLoginInfo = async (loginRequestData: UserLoginRequest) => {
  try {
    const response = await opsPostRequest("/login", loginRequestData);
    return response;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
};
export const useLoginMutation = (props: UseLoginMutationProps) => {
  const { rememberMe } = props;
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const initCartManager = useCartManager((state) => state.init);
  const orderQuery = useOrderQuery(OrderStatus.IN_CART, { enabled: false });

  return useMutation({
    mutationFn: (requestData: UserLoginRequest) => fetchLoginInfo(requestData),
    onSuccess: (response) => {
      if (response.success) {
        login(
          {
            userId: response.data.userId,
            email: response.data.userEmail,
            userFirstName: response.data.userFirstName,
            userLastName: response.data.userLastName,
            teamId: response.data.teamId,
            role: response.data.userRole.toLowerCase(),
          },
          initCartManager,
          orderQuery.refetch
        );

        Cookies.set("auth", response.data.authToken);
        console.log("auth", response.data);

        if (rememberMe) {
          localStorage.setItem("auth", response.data.authToken);
        } else {
          sessionStorage.setItem("auth", response.data.authToken);
        }
        navigate("/");
      }
    },
  });
};
