import type {ReactNode} from "react";
import {createContext, useState, useEffect} from "react";

type Theme = "dark" | "light";

interface ThemeContext {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("extensions-theme") as Theme;

        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "light") {
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
        }

        localStorage.setItem("extensions-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

    return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>;
};
