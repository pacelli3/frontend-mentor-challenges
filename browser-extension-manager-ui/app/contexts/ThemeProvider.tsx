import type {ReactNode} from "react";
import {createContext, useState, useEffect} from "react";

type Theme = "dark" | "light" | undefined;

interface ThemeContext {
    theme: Theme;
    toggle: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(undefined);

    useEffect(() => {
        const root = document.documentElement;

        if (root.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const toggle = (theme: Theme) => {
        setTheme(theme);
        window.localStorage.setItem("extensions-theme", theme!);

        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    };

    return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>;
};
