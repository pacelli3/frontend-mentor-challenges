document.querySelectorAll("details").forEach(details => {
    details.addEventListener("toggle", (e: ToggleEvent) => {
        const liveRegion = document.getElementById("liveregion") as HTMLDivElement;
        const detailsEl = e.currentTarget as HTMLDetailsElement;
        const icon = detailsEl.querySelector(".summary__icon") as HTMLImageElement;
        const paragraph = detailsEl.querySelector("p") as HTMLParagraphElement;

        if (detailsEl.open) {
            // Only update ARIA live region when `<details>` is expanded.
            liveRegion.textContent = paragraph.textContent;
            icon.src = "src/assets/images/icon-minus.svg";
        } else {
            icon.src = "src/assets/images/icon-plus.svg";
        }
    });
});
