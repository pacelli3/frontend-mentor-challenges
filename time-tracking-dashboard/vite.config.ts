import { resolve } from "node:path";
import { defineConfig, Plugin } from "vite";

const ROOT = import.meta.dirname;

const rewrite = (): Plugin => {
    return {
        name: "rewrite",
        configureServer(server) {
            server.middlewares.use(async (req, _, next) => {
                const path = req.url as string;

                if (path === "/") {
                    req.url = "/index.html";
                } else if (path === "/weekly") {
                    req.url = "/src/pages/weekly.html";
                } else if (path === "/monthly") {
                    req.url = "/src/pages/monthly.html";
                }

                next();
            });
        },
    };
};

export default defineConfig({
    plugins: [rewrite()],
    build: {
        rolldownOptions: {
            input: {
                main: resolve(ROOT, "index.html"),
                weekly: resolve(ROOT, "src", "pages", "weekly.html"),
                monthly: resolve(ROOT, "src", "pages", "monthly.html"),
            },
        },
    },
});
