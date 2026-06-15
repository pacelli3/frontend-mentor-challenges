import type {Route} from "./+types/root";
import appStylesHref from "./app.css?url";
import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration} from "react-router";
import {ThemeProvider} from "./contexts/ThemeProvider";

export const links: Route.LinksFunction = () => [
    {rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32"},
    {
        rel: "preload",
        href: "/app/assets/fonts/noto-sans-v42-latin-regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },
    {
        rel: "preload",
        href: "/app/assets/fonts/noto-sans-v42-latin-500.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },
    {
        rel: "preload",
        href: "/app/assets/fonts/noto-sans-v42-latin-700.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },
    {rel: "stylesheet", href: appStylesHref},
];

export const meta: Route.MetaFunction = () => [
    {title: "Frontend Mentor | Browser extension manager ui"},
    {charSet: "utf-8"},
    {name: "viewport", content: "width=device-width, initial-scale=1"},
];

export const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <html dir="ltr" lang="en">
            <head>
                <Meta />
                <Links />
            </head>

            <body className="min-h-screen bg-linear-[180deg,#ebf2fc_0%,#eef8f9_100%] dark:bg-linear-[180deg,#040918_0%,#091540_100%]">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            function getInitialTheme() {
                                const persistedTheme = window.localStorage.getItem("extensions-theme");
                                const hasPersistedTheme = typeof persistedTheme === "string";

                                if (hasPersistedTheme) return persistedTheme;

                                const mediaQueryPreference = window.matchMedia("(prefers-color-scheme: dark)");
                                const hasMediaQueryPreference = typeof mediaQueryPreference.matches === "boolean";

                                if (hasMediaQueryPreference) {
                                    return mediaQueryPreference.matches ? "dark" : "light";
                                }

                                return "light";
                            }

                            const theme = getInitialTheme();
                            const root = document.documentElement;

                            if(theme === "dark") {
                                root.classList.add("dark");
                            } else {
                                root.classList.remove("dark");
                            }
                        })();
                    `,
                    }}
                ></script>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    );
}

export const ErrorBoundary = ({error}: Route.ErrorBoundaryProps) => {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
};
