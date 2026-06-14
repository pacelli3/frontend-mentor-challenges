import {clsx} from "clsx";

interface FilterButtonProps {
    filter: {
        label: string;
        value: string;
    };
    query: string;
    setFilter: (query: string) => void;
}

const FilterButton = ({filter, query, setFilter}: FilterButtonProps) => {
    const isActive = filter.value === "" ? query === "" : query === filter.value;

    return (
        <li>
            <button
                className={clsx(
                    "cursor-pointer rounded-3xl px-4 py-1.5 shadow-sm outline-1 outline-neutral-200 transition-colors duration-250 ease-in-out focus:outline-2 focus:outline-offset-2 focus:outline-red-500 dark:outline-neutral-600",
                    isActive
                        ? "bg-red-500 text-neutral-0 dark:text-neutral-900"
                        : "bg-neutral-0 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100",
                    !isActive &&
                        "hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-600 dark:hover:text-neutral-0",
                )}
                onClick={() => setFilter(filter.value)}
                type="button"
            >
                {filter.label}
            </button>
        </li>
    );
};

export default FilterButton;
