import { UseQueryOptions, useQuery } from "react-query";
import { useAuthStore } from "../../authstore/store";
import { opsPostRequest } from "../../lib/api";
import { queryKeys } from "../queryKeys";

const fetchTokenValidity = async (login: Function, logout: Function) => {
    let localToken = JSON.parse(String(localStorage.getItem("auth")));
    let sessionToken = JSON.parse(String(sessionStorage.getItem("auth")));
    let token;
    if (localToken) token = localToken;
    if (sessionToken) token = sessionToken;
    if (token) {
        try {
            const response = await opsPostRequest("/validate", {
                auth_token: token,
            });
            if (response.success) {
                const payload = {
                    email: response.userData.user_email,
                    username: response.userData.user_name,
                    teamId: response.userData.team_id,
                    role: response.userData.user_role,
                };
                login(payload);
            } else {
                localStorage.removeItem("auth");
                logout();
            }
        } catch (err) {
            console.log(err);
        }
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
