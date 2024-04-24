import { Navigate } from "react-router-dom";
import AuthLayout from "./features/shared/auth/AuthLayout";
import BaseLayout from "./layouts/RoleLayout";
import { AuthStore } from "./managers/authStore";

const HOME: any = {
  employee: <BaseLayout path="/" />,
  pantryboy: <BaseLayout path="/" />,
};

export const getRoutes = (authStore: AuthStore) => [
  {
    path: "/login",
    element: <AuthLayout type="Login" />,
    fallback: <Navigate to="/" />,
    enabled: !authStore.isLogged,
  },
  {
    path: "/signup",
    element: <AuthLayout type="Signup" />,
    fallback: <Navigate to="/" />,
    enabled: !authStore.isLogged,
  },
  {
    path: "/",
    element: HOME[authStore.role],
    fallback: <AuthLayout type="Login" />,
    enabled: authStore.isLogged,
  },
  {
    path: "/orders",
    element: {
      authenticated: <BaseLayout path="/orders" />,
      unAuthenticated: <Navigate to="/login" />,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "*",
    element: {
      authenticated: <>NOT FOUND</>,
      unAuthenticated: <>NOT FOUND</>,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "/dummy",
    element: {
      authenticated: <BaseLayout path="/orders" />,
      unAuthenticated: <Navigate to="/login" />,
    },
    employee: true,
    pantryboy: false,
  },
];

export const routes = [
  {
    path: "/login",
    element: {
      authenticated: <Navigate to="/" />,
      unAuthenticated: <AuthLayout type="Login" />,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "/signup",
    element: {
      authenticated: <Navigate to="/" />,
      unAuthenticated: <AuthLayout type="Signup" />,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "/",
    element: {
      authenticated: <BaseLayout path="/" />,
      unAuthenticated: <Navigate to="/login" />,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "/orders",
    element: {
      authenticated: <BaseLayout path="/orders" />,
      unAuthenticated: <Navigate to="/login" />,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "*",
    element: {
      authenticated: <>NOT FOUND</>,
      unAuthenticated: <>NOT FOUND</>,
    },
    employee: true,
    pantryboy: true,
  },
  {
    path: "/dummy",
    element: {
      authenticated: <BaseLayout path="/orders" />,
      unAuthenticated: <Navigate to="/login" />,
    },
    employee: true,
    pantryboy: false,
  },
];
