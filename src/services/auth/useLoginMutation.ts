import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
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

  return useMutation({
    mutationFn: (requestData: UserLoginRequest) => fetchLoginInfo(requestData),
    onSuccess: (response) => {
      if (response.success) {
        login({
          email: response.data.userEmail,
          userFirstName: response.data.userFirstName,
          userLastName: response.data.userLastName,
          teamId: response.data.teamId,
          role: response.data.userRole.toLowerCase(),
        });

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
