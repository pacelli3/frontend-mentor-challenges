/**
 * Any child route can export its own `meta` and `link` functions and the descriptors will be merged with the parent's
 * descriptors—any descriptor with the same key will override the parent's.
 */

import type {Route} from "./+types/not-found";

export const meta: Route.MetaFunction = () => [{title: "Not found"}];

const NotFound = () => {
    return (
        <div>
            <header className="flex border-b border-solid border-neutral-300 dark:border-neutral-600">
                <p className="mx-15 border-x border-neutral-300 px-7.5 py-4 text-lg font-bold text-neutral-800 uppercase dark:border-neutral-600 dark:text-neutral-300">
                    Not found
                </p>
            </header>
            <main className="relative mbs-16 flex min-h-[50vh] items-center justify-center font-medium tracking-tight">
                <span className="absolute text-[25vw] font-bold text-neutral-300 opacity-50 dark:text-neutral-600">
                    404
                </span>
                <h1 className="z-1 max-w-prose text-center text-2xl text-neutral-900 md:text-4xl dark:text-neutral-300">
                    Sorry, we can't find the page you're looking for
                </h1>
            </main>
        </div>
    );
};

export default NotFound;
