import type {Extension} from "~/types/extension";
import {Link, useFetcher} from "react-router";
import {clsx} from "clsx";

interface ExtensionCardProps {
    extension: Extension;
    filter: string;
}

const ExtensionCard = ({extension, filter}: ExtensionCardProps) => {
    const fetcher = useFetcher();

    return (
        <li>
            <article className="grid h-39 rounded-2xl bg-neutral-0 px-4 py-3.5 shadow-md outline-1 outline-neutral-100 dark:bg-neutral-800 dark:outline-neutral-600">
                <div className="flex items-start gap-x-3.5">
                    <img src={extension.logo_url} alt="" className="w-12" width="60" height="60" />
                    <div>
                        <h2 className="leading-none font-bold tracking-normal text-neutral-900 dark:text-neutral-0">
                            {extension.name}
                        </h2>
                        <p className="mbs-2 text-[13px] leading-[1.3] tracking-tight text-neutral-600 dark:text-neutral-300">
                            {extension.description}
                        </p>
                    </div>
                </div>

                <div className="mbs-auto flex items-center justify-between">
                    <div className="flex items-center justify-between gap-x-2.5">
                        <Link
                            aria-label={`${extension.name} details.`}
                            className="hover:bg-outline-500 cursor-pointer rounded-3xl px-2.5 py-0.75 text-[13px] font-medium text-neutral-900 outline-1 outline-neutral-300 transition-colors duration-250 ease-in-out hover:bg-red-500 hover:text-neutral-0 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-2 focus:outline-offset-2 focus:outline-red-700 dark:text-neutral-0 dark:outline-neutral-600 dark:hover:bg-red-500 dark:hover:outline-red-500 dark:focus:bg-neutral-600 dark:focus:text-neutral-0 dark:focus:outline-red-500"
                            state={{filter: filter}}
                            to={`/details/${extension.id}`}
                        >
                            Details
                        </Link>
                        <button
                            aria-label={`Remove ${extension.name}.`}
                            className="hover:bg-outline-500 text-neutral-9001 cursor-pointer rounded-3xl px-2.5 py-0.75 text-[13px] font-medium outline-1 outline-neutral-300 transition-colors duration-250 ease-in-out hover:bg-red-500 hover:text-neutral-0 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-2 focus:outline-offset-2 focus:outline-red-700 dark:text-neutral-0 dark:outline-neutral-600 dark:hover:bg-red-500 dark:hover:outline-red-500 dark:focus:bg-neutral-600 dark:focus:text-neutral-0 dark:focus:outline-red-500"
                            type="button"
                        >
                            Remove
                        </button>
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
                        <label className="relative block h-4 w-7">
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
                                    "absolute inset-0 cursor-pointer rounded-2xl transition-colors duration-250 ease-in-out peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-red-500 before:absolute before:bottom-0.5 before:left-0.5 before:h-3 before:w-3 before:rounded-full before:bg-neutral-0 before:content-[''] hover:bg-red-500 dark:hover:bg-red-400",
                                    extension.is_active
                                        ? "bg-red-700 before:translate-x-full dark:bg-red-500"
                                        : "bg-neutral-300 before:translate-x-0 dark:bg-neutral-600",
                                )}
                            ></span>
                        </label>
                    </fetcher.Form>
                </div>
            </article>
        </li>
    );
};

export default ExtensionCard;
