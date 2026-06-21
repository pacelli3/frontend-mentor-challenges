import type {Route} from "./+types/extension-details";
import type {Extension} from "~/types/extension";
import {clsx} from "clsx";
import {STATUS_CODES} from "~/utils/status-codes";
import {Share2, Star, Mail, CircleCheckBig, MoveLeft} from "lucide-react";
import {useFetcher, Link, useLocation, data} from "react-router";
import {createClient} from "~/utils/supabase.server";
import toAmericanDateFormat from "~/utils/to-american-date-format";

export const loader = async ({
    request,
    params,
}: Route.LoaderArgs): Promise<{extension: Extension}> => {
    const {supabase} = createClient(request);
    const {data: extension, error} = await supabase
        .from("extensions")
        .select("*")
        .eq("id", params.extensionId)
        .single();

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

    return {extension};
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

const ExtensionDetails = ({loaderData}: Route.ComponentProps) => {
    const location = useLocation();
    const fetcher = useFetcher();
    const {extension} = loaderData;

    const filter = location.state.filter as string;

    return (
        <>
            <main className="mbs-6.5 sm:mbs-13.5">
                <Link
                    className="group mbe-12 inline-block"
                    to={filter ? `/?filter=${filter}` : "/"}
                >
                    <MoveLeft
                        aria-hidden="true"
                        className="me-2 inline-block align-middle text-neutral-900 transition-colors duration-250 group-hover:text-red-500 group-focus:text-red-500 dark:text-neutral-100 dark:group-hover:text-red-400 dark:group-focus:text-red-400"
                        size={22}
                        strokeWidth={1.5}
                    />

                    <span className="text-neutral-900 transition-colors duration-250 group-hover:text-red-500 group-focus:text-red-500 dark:text-neutral-100 dark:group-hover:text-red-400 dark:group-focus:text-red-400">
                        Back to {filter} extensions
                    </span>
                </Link>

                <section className="flex flex-col gap-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <img src={extension.logo_url} alt="" className="w-13.75" />
                            <h1 className="text-2xl leading-[1.26] font-bold tracking-tight text-neutral-900 sm:text-[27px] dark:text-neutral-300">
                                {extension.name}
                            </h1>
                        </div>

                        <fetcher.Form
                            onChange={e =>
                                fetcher.submit(
                                    {
                                        id: extension.id,
                                        is_active: (e.currentTarget.is_active as HTMLInputElement)
                                            .checked,
                                    },
                                    {encType: "application/json", method: "PATCH"},
                                )
                            }
                        >
                            <label className="relative block h-8 w-15">
                                <span className="sr-only">
                                    {extension.is_active ? "Disable" : "Enable"} extension
                                </span>

                                <input
                                    className="peer h-0 w-0 opacity-0"
                                    data-id={extension.id}
                                    defaultChecked={extension.is_active}
                                    name="is_active"
                                    value="on"
                                    type="checkbox"
                                />
                                <span
                                    aria-hidden="true"
                                    className={clsx(
                                        "absolute inset-0 cursor-pointer rounded-2xl transition-colors duration-250 ease-in-out peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-red-500 before:absolute before:bottom-1 before:h-6 before:w-6 before:rounded-full before:bg-neutral-0 before:content-[''] hover:bg-red-500 dark:hover:bg-red-400",
                                        extension.is_active
                                            ? "bg-red-700 before:left-2 before:translate-x-full dark:bg-red-500"
                                            : "bg-neutral-300 before:left-1 before:translate-x-0 dark:bg-neutral-600",
                                    )}
                                ></span>
                            </label>
                        </fetcher.Form>
                    </div>

                    <button
                        className="group flex cursor-pointer items-center justify-center gap-x-2 rounded-3xl px-3 py-2 transition-colors duration-250 hover:bg-neutral-200 focus:bg-red-500 focus:outline-2 focus:outline-offset-2 focus:outline-red-500 sm:self-start dark:hover:bg-neutral-100"
                        type="button"
                    >
                        <Share2
                            aria-hidden="true"
                            className="text-neutral-900 transition-colors duration-250 group-focus:text-neutral-100 dark:text-neutral-100 dark:group-hover:text-neutral-900"
                            size={20}
                            strokeWidth={1.5}
                        />

                        <span className="text-neutral-900 transition-colors duration-250 group-focus:text-neutral-100 dark:text-neutral-100 dark:group-hover:text-neutral-900">
                            Share
                        </span>
                    </button>

                    <div className="flex flex-col items-center gap-x-3 sm:flex-row">
                        <ul className="flex items-center gap-x-3">
                            {extension.categories.map(category => (
                                <li key={category}>
                                    <Link
                                        className="rounded-md bg-neutral-300 px-2.5 py-2 text-sm text-black capitalize transition-colors duration-250 hover:bg-neutral-100 focus:outline-2 focus:outline-offset-2 focus:outline-red-500"
                                        to="#"
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <p className="mbs-8 text-sm sm:mbs-0 dark:text-neutral-100">
                            {extension.number_of_users} users
                        </p>
                    </div>
                </section>

                <section className="mbs-5 border-b border-neutral-600 py-10">
                    <div className="mbe-20 overflow-hidden rounded-lg shadow-lg">
                        <img src={extension.banner_url} alt="" />
                    </div>

                    <h2 className="text-center text-xl leading-[1.26] font-bold text-neutral-900 sm:text-left sm:text-2xl dark:text-neutral-300">
                        Overview
                    </h2>
                    <p className="mbs-6 text-center sm:text-left dark:text-neutral-100">
                        {extension.description}
                    </p>
                </section>

                <section className="border-b border-neutral-600 py-10">
                    <div className="flex flex-col items-center gap-x-4 gap-y-3 sm:flex-row">
                        <h2 className="text-xl leading-[1.26] font-bold text-neutral-900 sm:text-2xl dark:text-neutral-300">
                            {extension.rating} out of 5
                        </h2>

                        <div className="flex gap-x-1">
                            <Star
                                aria-hidden="true"
                                className="text-neutral-900 dark:text-neutral-300"
                            />
                            <Star
                                aria-hidden="true"
                                className="text-neutral-900 dark:text-neutral-300"
                            />
                            <Star
                                aria-hidden="true"
                                className="text-neutral-900 dark:text-neutral-300"
                            />
                            <Star
                                aria-hidden="true"
                                className="text-neutral-900 dark:text-neutral-300"
                            />
                            <Star
                                aria-hidden="true"
                                className="text-neutral-900 dark:text-neutral-300"
                            />
                        </div>
                    </div>

                    <div className="mbs-8 flex flex-col gap-y-1 sm:flex-row">
                        <p className="text-center after:mx-3 after:hidden after:h-1.5 after:w-1.5 after:rounded-full after:bg-neutral-900 after:align-middle after:content-[''] sm:after:inline-block dark:text-neutral-100 dark:after:bg-neutral-100">
                            No ratings
                        </p>
                        <Link
                            className="text-center underline transition-colors duration-250 hover:text-red-500 focus:text-red-500 dark:text-neutral-100 dark:hover:text-red-400 dark:focus:text-red-400"
                            to="#"
                        >
                            Learn more about results and reviews.
                        </Link>
                    </div>

                    <button
                        className="mbs-8 w-full cursor-pointer rounded-3xl px-3 py-2 text-center transition-colors duration-250 hover:bg-neutral-200 focus:bg-red-500 focus:text-neutral-0 focus:outline-2 focus:outline-offset-2 focus:outline-red-500 sm:w-auto dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
                        type="button"
                    >
                        See all reviews
                    </button>
                </section>

                <section className="border-b border-neutral-600 py-10">
                    <h2 className="text-xl leading-[1.26] font-bold text-neutral-900 sm:text-2xl dark:text-neutral-300">
                        Details
                    </h2>

                    <dl className="mbs-6 grid grid-cols-1 justify-between gap-y-9 [grid-template-areas:'version''size''developer''updated''languages''trader'] sm:grid-cols-3 sm:[grid-template-areas:'version_size_developer''updated_languages_trader'] md:grid-cols-4 md:grid-rows-2 md:gap-y-3 md:[grid-template-areas:'version_size_developer_trader''updated_languages_developer_trader']">
                        <div className="[grid-area:version]">
                            <dt className="font-bold dark:text-neutral-100">Version</dt>
                            <dd className="mbs-1 dark:text-neutral-100">
                                {extension.details.version}
                            </dd>
                        </div>
                        <div className="[grid-area:updated]">
                            <dt className="font-bold dark:text-neutral-100">Updated</dt>
                            <dd className="mbs-1 capitalize dark:text-neutral-100">
                                {toAmericanDateFormat(extension.details.last_commit)}
                            </dd>
                        </div>
                        <div className="[grid-area:size]">
                            <dt className="font-bold dark:text-neutral-100">Size</dt>
                            <dd className="mbs-1 dark:text-neutral-100">
                                {extension.details.size}
                            </dd>
                        </div>
                        <div className="[grid-area:languages]">
                            <dt className="font-bold dark:text-neutral-100">Languages</dt>
                            {extension.details.languages.map(lang => (
                                <dd className="mbs-1 capitalize dark:text-neutral-100" key={lang}>
                                    {lang}
                                </dd>
                            ))}
                        </div>
                        <div className="[grid-area:developer]">
                            <dt className="font-bold dark:text-neutral-100">Developer</dt>
                            <dd className="mbs-1 flex items-center gap-x-2 dark:text-neutral-100">
                                <Mail aria-hidden="true" size={20} /> {extension.details.developer}
                            </dd>
                        </div>
                        <div className="[grid-area:trader]">
                            <dt className="font-bold dark:text-neutral-100">
                                {extension.details.is_trader ? "Trader" : "Non-trader"}
                            </dt>
                            <dd className="mbs-1 dark:text-neutral-100">
                                This developer has {extension.details.is_trader ? "" : "not"}{" "}
                                identified itself as a trader. For consumers in the European Union,
                                please note that consumer rights do not apply to contracts between
                                you and this developer.
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="border-b border-neutral-600 py-8">
                    <h2 className="text-xl leading-[1.26] font-bold text-neutral-900 sm:text-2xl dark:text-neutral-300">
                        Privacy
                    </h2>

                    <p className="mbs-6 dark:text-neutral-100">
                        <CircleCheckBig aria-hidden="true" className="me-3 inline-block" />
                        The developer has disclosed that it will not collect or use your data. To
                        learn more, see the developer’s{" "}
                        <Link
                            className="underline transition-colors duration-250 hover:text-red-500 focus:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                            to="#"
                        >
                            privacy policy
                        </Link>
                        .
                    </p>

                    <p className="mbs-6 font-medium dark:text-neutral-100">
                        This developer declares that your data is
                    </p>

                    <ul className="mbs-3 grid list-inside list-disc gap-y-2.5">
                        <li className="dark:text-neutral-100">
                            Not being sold to third parties, outside of the{" "}
                            <Link
                                className="underline transition-colors duration-250 hover:text-red-500 focus:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                                to="#"
                            >
                                approved use cases
                            </Link>
                        </li>
                        <li className="dark:text-neutral-100">
                            Not being used or transferred for purposes that are unrelated to the
                            item's core functionality
                        </li>
                        <li className="dark:text-neutral-100">
                            Not being used or transferred to determine creditworthiness or for
                            lending purposes
                        </li>
                    </ul>
                </section>

                <section className="border-b border-neutral-600 py-10">
                    <h2 className="text-xl leading-[1.26] font-bold text-neutral-900 sm:text-2xl dark:text-neutral-300">
                        Support
                    </h2>

                    <p className="mbs-6 dark:text-neutral-100">
                        For help with questions, suggestions, or problems, visit the developer's{" "}
                        <Link
                            className="underline transition-colors duration-250 hover:text-red-500 focus:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
                            to="#"
                        >
                            support site
                        </Link>
                        .
                    </p>
                </section>
            </main>

            <footer className="mx-auto mbs-10 w-fit">
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
                    Terms <span className="lowercase">of</span> service
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

export default ExtensionDetails;
