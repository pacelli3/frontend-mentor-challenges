import {defineConfig} from "vite";
import {reactRouter} from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), netlifyReactRouter(), netlify()],
    resolve: {
        tsconfigPaths: true,
    },
});
