import { useAuthStore } from "./authstore/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { useThemeStore } from "./theme/theme";
import { useValidateTokenQuery } from "./services/auth/useValidateTokenQuery";
import Topbar from "./layouts/Topbar";
import { useTheme } from "@emotion/react";
export const App = () => {
    const theme = useThemeStore((state: any) => state.theme);
    const { palette } = theme;
    const isLogged = useAuthStore((state) => state.isLogged);
    const role = useAuthStore((state) => state.role);
    const { isLoading } = useValidateTokenQuery();
    if (isLoading) {
        return (
            <div className="flex min-h-[100vh] min-w-[100vw] justify-center items-center">
                <CircularProgress className="text-[rgb(175,106,255)]" />
            </div>
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box
                    className="h-[100vh] w-[100vw] transition-all duration-500"
                    sx={{
                        color: palette.text.primary,
                        backgroundColor: palette.background.default,
                    }}
                >
                    <Topbar />
                    <Routes>
                        {!isLoading &&
                            routes.map((route: any) => {
                                if (route[role] || role === "") {
                                    return (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            element={
                                                isLogged
                                                    ? route.element
                                                          .authenticated
                                                    : route.element
                                                          .unAuthenticated
                                            }
                                        ></Route>
                                    );
                                }
                            })}
                    </Routes>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
};
