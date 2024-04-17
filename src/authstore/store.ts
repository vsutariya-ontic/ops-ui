import Cookies from "js-cookie";
import { create } from "zustand";
const DEFAULT_STATE = {
  isLogged: false,
  email: "",
  userFirstName: "",
  userLastName: "",
  teamId: "",
  role: "",
};
interface LoginProps {
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
}
export interface AuthStore {
  isLogged: boolean;
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
  login: (props: LoginProps) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set, state) => {
  return {
    ...DEFAULT_STATE,
    login: (props: LoginProps) => {
      set({
        isLogged: true,
        ...props,
      });
    },
    logout: () => {
      console.log(state());
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
      Cookies.remove("auth");
      set(DEFAULT_STATE);
    },
  };
});
