import type {Route} from "./+types/home";
import {clsx} from "clsx";
import {useSearchParams, useNavigation} from "react-router";
import {createClient} from "~/utils/supabase.server";
import FilterButton from "~/components/FilterButton";
import ExtensionCard from "~/components/ExtensionCard";

type Extension = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
    is_active: boolean;
};

export const loader = async ({
    request,
}: Route.LoaderArgs): Promise<{extensions: Extension[] | null}> => {
    const {supabase} = createClient(request);
    const {data: extensions} = await supabase.from("extensions").select();
    return {extensions};
};

export const action = async ({request}: Route.ActionArgs) => {
    const {id, is_active} = (await request.json()) as {id: string; is_active: boolean};
    const {supabase} = createClient(request);
    const {error} = await supabase.from("extensions").update({is_active: is_active}).eq("id", id);

    // TODO - add error handling
    return null;
};

const Home = ({loaderData}: Route.ComponentProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation();

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
        <ExtensionCard key={extension.id} extension={extension} />
    ));

    return (
        <main className="mbs-6.5 sm:mbs-13.5">
            <header className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
                <h1 className="text-2xl leading-[1.26] font-bold tracking-tight text-neutral-900 sm:text-[27px] dark:text-neutral-0">
                    Extensions List
                </h1>

                <ul className="flex items-center gap-x-2">{buttonListItems}</ul>
            </header>

            <ul
                className={clsx(
                    "mbs-6.5 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-3.5",
                    navigation.state === "loading" &&
                        "animate-[flicker_825ms_ease-in-out] dark:animate-[flicker-dark_825ms_ease-in-out]",
                )}
            >
                {extensionListItems}
            </ul>
        </main>
    );
};

export default Home;
