import type {Route} from "./+types/home";
import type {Extension} from "~/types/extension";
import {clsx} from "clsx";
import {useSearchParams, useNavigation, Link, data} from "react-router";
import {createClient} from "~/utils/supabase.server";
import {Blocks} from "lucide-react";
import {STATUS_CODES} from "~/utils/status-codes";
import FilterButton from "~/components/FilterButton";
import ExtensionCard from "~/components/ExtensionCard";
import useTheme from "~/hooks/useTheme";

export const loader = async ({
    request,
}: Route.LoaderArgs): Promise<{extensions: Extension[] | null}> => {
    const {supabase} = createClient(request);
    const {data: extensions, error} = await supabase.from("extensions").select("*");

    if (error) {
        throw data(
            {
                message: error.message,
                hint: error.hint || STATUS_CODES[error.code].description,
                code: error.code,
            },
            {status: STATUS_CODES[error.code].httpStatus || 400},
        );
    }

    return {extensions};
};

export const action = async ({request}: Route.ActionArgs) => {
    const {id, is_active} = (await request.json()) as {id: string; is_active: boolean};
    const {supabase} = createClient(request);
    const {error} = await supabase.from("extensions").update({is_active: is_active}).eq("id", id);

    if (error) {
        throw data(
            {
                message: error.message,
                hint: error.hint || STATUS_CODES[error.code].description,
                code: error.code,
            },
            {status: STATUS_CODES[error.code].httpStatus || 400},
        );
    }

    return null;
};

const Home = ({loaderData}: Route.ComponentProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation();
    const {theme} = useTheme();

    let extensions = loaderData?.extensions ?? [];
    const query = searchParams.get("filter") ?? "";

    if (query) {
        extensions = extensions.filter(extension =>
            query === "active" ? extension.is_active : !extension.is_active,
        );
    }

    const setFilter = (query: string) => setSearchParams(query ? {filter: query} : {});

    const FILTERS = [
        {label: "All", value: ""},
        {label: "Active", value: "active"},
        {label: "Inactive", value: "inactive"},
    ];

    const buttonListItems = FILTERS.map(filter => (
        <FilterButton key={filter.label} filter={filter} query={query} setFilter={setFilter} />
    ));

    const extensionListItems = extensions.map(extension => (
        <ExtensionCard key={extension.id} extension={extension} filter={query} />
    ));

    return (
        <>
            <main className="mbs-6.5 sm:mbs-13.5">
                <header className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
                    <h1 className="text-2xl leading-[1.26] font-bold tracking-tight text-neutral-900 sm:text-[27px] dark:text-neutral-0">
                        Extensions List
                    </h1>

                    <ul className="flex items-center gap-x-2">{buttonListItems}</ul>
                </header>

                {extensionListItems.length > 0 ? (
                    <ul
                        className={clsx(
                            "mbs-6.5 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-3.5",
                            navigation.state === "loading" &&
                                "animate-[flicker_825ms_ease-in-out] dark:animate-[flicker-dark_825ms_ease-in-out]",
                        )}
                    >
                        {extensionListItems}
                    </ul>
                ) : (
                    <div className="mx-auto mbs-42 flex w-110 flex-col items-center justify-center gap-y-5">
                        {/* Only visible on dark mode */}
                        {theme === "dark" && (
                            <Blocks size={45} color={"#EDEDED"} strokeWidth={1.5} />
                        )}

                        {/* Only visible on light mode */}
                        {theme === "light" && (
                            <Blocks size={45} color={"#091540"} strokeWidth={1.5} />
                        )}

                        <p className="text-center text-sm leading-6 text-neutral-800 dark:text-neutral-100">
                            Your {query ? query : "extensions"} extensions will appear here.
                            Discover interesting <span className="font-bold">Extensions</span> to
                            follow in your browser.
                        </p>
                    </div>
                )}
            </main>

            <footer className="mx-auto mbs-14 w-fit">
                <Link
                    className="text-sm capitalize transition-colors duration-250 after:mx-3 after:inline-block after:h-1 after:w-1 after:rounded-full after:bg-neutral-900 after:align-middle after:content-[''] hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:after:bg-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                    to="#"
                >
                    About web store
                </Link>
                <Link
                    className="text-sm capitalize transition-colors duration-250 after:mx-3 after:inline-block after:h-1 after:w-1 after:rounded-full after:bg-neutral-900 after:align-middle after:content-[''] hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:after:bg-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                    to="#"
                >
                    Developer dashboard
                </Link>
                <Link
                    className="text-sm capitalize transition-colors duration-250 after:mx-3 after:inline-block after:h-1 after:w-1 after:rounded-full after:bg-neutral-900 after:align-middle after:content-[''] hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:after:bg-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                    to="#"
                >
                    Privacy policy
                </Link>
                <Link
                    className="text-sm capitalize transition-colors duration-250 after:mx-3 after:inline-block after:h-1 after:w-1 after:rounded-full after:bg-neutral-900 after:align-middle after:content-[''] hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:after:bg-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                    to="#"
                >
                    Terms of service
                </Link>
                <Link
                    className="text-sm capitalize transition-colors duration-250 hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                    to="#"
                >
                    Help
                </Link>
            </footer>
        </>
    );
};

export default Home;
