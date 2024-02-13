import { Navigate } from "react-router-dom";
import BaseLayout from "./layouts/RoleLayout";
import AuthLayout from "./features/shared/auth/AuthLayout";

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
