import Cookies from "js-cookie";
import { create } from "zustand";
const DEFAULT_AUTH_STATE = {
  isLogged: false,
  userId: "",
  email: "",
  userFirstName: "",
  userLastName: "",
  teamId: "",
  role: "",
};
interface LoginProps {
  userId: string;
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
  defaultTable?: any;
}
export interface AuthStore {
  isLogged: boolean;
  userId: string;
  email: string;
  userFirstName: string;
  userLastName: string;
  tableNo?: number;
  teamId: string;
  role: string;
  defaultTable?: any;
  login: (
    props: LoginProps,
    initCartManager: Function,
    orderQueryFn: Function
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, state) => {
  return {
    ...DEFAULT_AUTH_STATE,
    login: (
      props: LoginProps,
      initCartManager: Function,
      orderQueryFn: Function
    ) => {
      set({
        isLogged: true,
        ...props,
      });
      initCartManager(orderQueryFn);
    },
    logout: () => {
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
      Cookies.remove("auth");
      set(DEFAULT_AUTH_STATE);
    },
  };
});
