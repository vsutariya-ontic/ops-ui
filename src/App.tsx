import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./layouts/Topbar";
import { useAuthStore } from "./managers/authStore";
import { routes } from "./routes";
import { useValidateTokenQuery } from "./services/auth/useValidateTokenQuery";
import { useThemeStore } from "./theme/theme";

export const App = () => {
  const theme = useThemeStore((state: any) => state.theme);
  const { palette } = theme;
  const isLogged = useAuthStore((state) => state.isLogged);
  const role = useAuthStore((state) => state.role);
  const { isLoading } = useValidateTokenQuery();
  if (isLoading) {
    return (
      <div className="flex h-[100vh] w-[100vw] justify-center items-center">
        <CircularProgress className={`text-[${palette.primary}]`} />
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
                          ? route.element.authenticated
                          : route.element.unAuthenticated
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
