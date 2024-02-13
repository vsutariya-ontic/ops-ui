import { create } from "zustand";
const DEFAULT_STATE = {
    isLogged: false,
    email: "",
    username: "",
    teamId: "",
    role: "",
};
interface LoginProps {
    email: string;
    username: string;
    tableNo?: number;
    teamId: string;
    role: string;
}
interface AuthStore {
    isLogged: boolean;
    email: string;
    username: string;
    tableNo?: number;
    teamId: string;
    role: string;
    login: (props: LoginProps) => void;
    logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => {
    return {
        ...DEFAULT_STATE,
        login: (props: LoginProps) => {
            set({
                isLogged: true,
                ...props,
            });
        },
        logout: () => {
            localStorage.removeItem("auth");
            sessionStorage.removeItem("auth");
            set(DEFAULT_STATE);
        },
    };
});
