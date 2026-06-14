import {useContext} from "react";
import {ThemeContext} from "~/contexts/ThemeProvider";

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("`useTheme` must be within a `ThemeProvider`");
    }

    return context;
};

export default useTheme;
