import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
interface UseLoginMutationProps {
  rememberMe: boolean;
}
interface UserLoginRequest {
  user_email: string;
  user_password: string;
  user_role: string;
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
          email: response.userData.user_email,
          username: response.userData.user_name,
          teamId: response.userData.team_id,
          role: response.userData.user_role.toLowerCase(),
        });

        Cookies.set("auth", response.auth_token);
        console.log("auth", response.auth_token);

        if (rememberMe) {
          localStorage.setItem("auth", response.auth_token);
        } else {
          sessionStorage.setItem("auth", response.auth_token);
        }
        navigate("/");
      }
    },
  });
};
