import Cookies from "js-cookie";
import { create } from "zustand";
const DEFAULT_AUTH_STATE = {
  isLogged: false,
  email: "",
  userFirstName: "",
  userLastName: "",
  teamId: "",
  role: "",
  defaultTable: null,
  userId: "",
};
interface LoginProps {
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
  defaultTable: any;
  userId: string;
}
export interface AuthStore {
  isLogged: boolean;
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
  defaultTable: any;
  userId: string;
  login: (props: LoginProps) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set, state) => {
  return {
    ...DEFAULT_AUTH_STATE,
    login: (props: LoginProps) => {
      set({
        isLogged: true,
        ...props,
      });
    },
    logout: () => {
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
      Cookies.remove("auth");
      set(DEFAULT_AUTH_STATE);
    },
  };
});
