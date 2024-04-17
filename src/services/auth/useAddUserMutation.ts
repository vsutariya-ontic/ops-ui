import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthFormState } from "../../features/shared/auth/types";
import { opsPostRequest } from "../../lib/api";

const addNewUser = async (state: AuthFormState, role: string) => {
  try {
    const response = await opsPostRequest("/signup", {
      userName: state.firstName + " " + state.lastName,
      userEmail: state.email,
      userPassword: state.password,
      userRole: String(role).toLowerCase(),
    });
    return response;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const useAddUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ state, role }: any) => addNewUser(state, role),
    onSuccess: (response) => {
      if (response.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("There was some error in creating account");
      }
    },
  });
};
