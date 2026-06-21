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
    let details = "";
    let status: number | undefined;
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        const data = error.data as {message: string; hint: string; code: string};
        message = data.message;
        details = data.hint;
        status = error.status;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        message = error.message;
        stack = error.stack;
    } else {
        message = "Unknown error";
    }

    return (
        <div>
            <header className="flex border-b border-solid border-neutral-300 dark:border-neutral-600">
                <p className="mx-5 border-x border-neutral-300 px-7.5 py-4 text-sm font-bold text-neutral-800 uppercase sm:mx-15 sm:text-lg dark:border-neutral-600 dark:text-neutral-300">
                    Error
                </p>
            </header>
            <main className="relative mbs-16 flex min-h-[50vh] flex-col items-center justify-center px-7.5 font-medium tracking-tight">
                {status && (
                    <span className="absolute -z-1 text-[32vw] font-bold text-neutral-300 opacity-50 dark:text-neutral-600">
                        {status}
                    </span>
                )}
                <h1 className="z-1 mbe-6 max-w-prose text-center text-2xl text-neutral-900 md:text-4xl dark:text-neutral-300">
                    {message}
                </h1>

                {details && (
                    <p className="text-lg text-neutral-900 dark:text-neutral-300">{details}</p>
                )}
                {stack && (
                    <pre className="mbs-2 max-w-full overflow-auto text-neutral-900 dark:text-neutral-300">
                        {stack}
                    </pre>
                )}
            </main>
        </div>
    );
};
