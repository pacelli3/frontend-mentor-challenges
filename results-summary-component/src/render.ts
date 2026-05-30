import data from "../data.json";

const getColor = (category: string) => {
    switch (category) {
        case "Reaction":
            return "red";

        case "Memory":
            return "yellow";

        case "Verbal":
            return "green";

        default:
            return "blue";
    }
};

const getListItem = (category: string, url: string, score: number, color: string) => {
    return `
    <li class="card__summary-score-item bg-primary-${color} flex">
        <figure class="card__score-item-figure flex">
            <img class="card__figure-img" alt="" height="20" width="20" src="${url}" />
            <figcaption class="text-preset-1 text-primary-${color}">${category}</figcaption>
        </figure>

        <p class="fw-bold text-dark-grey-blue--50 text-preset-1">
            <span class="d-inline-block text-dark-grey-blue m-right">${score}</span>
            <span aria-hidden="true">/ 100</span>
        </p>
    </li>    
`;
};

const render = () => {
    const cardSummaryDetails = document.getElementById("card__summary-details");

    let listItems = "";

    data.map(d => ({ ...d, icon: new URL(d.icon, import.meta.url).href })).forEach(
        d => (listItems += getListItem(d.category, d.icon, d.score, getColor(d.category))),
    );

    // I think that using Non-Null Assertion is valid because this is a element I control.
    cardSummaryDetails!.innerHTML = listItems;
};

render();
