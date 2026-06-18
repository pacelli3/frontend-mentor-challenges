const monthMap: Record<number, string> = {
    0: "january",
    1: "february",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "september",
    9: "october",
    10: "november",
    11: "december",
};

const toAmericanDateFormat = (rawDate: string) => {
    // `rawDate` format ---> 2026-06-13 13:25:46.970951+00
    // `isoDate` format ---> 2026-06-13T13:25:46Z
    const isoDate = rawDate.replace(" ", "T").slice(0, -10) + "Z";

    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${monthMap[month]} ${day}, ${year}`;
};

export default toAmericanDateFormat;
