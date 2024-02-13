import { createTheme } from "@mui/material";
import { create } from "zustand";
const darkTheme = createTheme({
    typography: {
        fontFamily: "Nunito, sans-serif",
    },
    palette: {
        primary: {
            main: "#E86C25",
        },
        secondary: {
            main: "#e5e5e5",
            dark: "#363636", // dark level 3
        },
        background: {
            default: "#000000", // dark level 1
            paper: "#141414", // dark level 2
        },
        text: {
            primary: "#dfdfdf",
        },
        mode: "dark",
    },
});
const lightTheme = createTheme({
    typography: {
        fontFamily: "Nunito, sans-serif",
    },
    palette: {
        primary: {
            main: "#E86C25",
        },
        secondary: {
            main: "#373737",
            dark: "#f9fbff",
        },
        background: {
            default: "#ffffff",
            paper: "#f8f9fa",
        },
        text: {
            primary: "#373737",
        },
        mode: "light",
    },
});
export const useThemeStore = create((set) => ({
    theme: lightTheme,
    setDarkTheme: () => {
        set({
            theme: darkTheme,
        });
    },
    setLightTheme: () => {
        set({
            theme: lightTheme,
        });
    },
    toggleTheme: () => {
        set((state: any) => ({
            theme: state.theme === lightTheme ? darkTheme : lightTheme,
        }));
    },
}));
