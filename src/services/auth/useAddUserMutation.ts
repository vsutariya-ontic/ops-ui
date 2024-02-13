import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { opsPostRequest } from "../../lib/api";
import { AuthFormState } from "../../features/shared/auth/types";

const addNewUser = async (state: AuthFormState, role: string) => {
    try {
        const response = await opsPostRequest("/signup", {
            user_name: state.firstName + " " + state.lastName,
            user_email: state.email,
            user_password: state.password,
            user_role: String(role).toLowerCase(),
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
