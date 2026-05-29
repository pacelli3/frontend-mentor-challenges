/**
 * Mocks an API call to a server.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const notify = async () => {
    const toast = document.getElementById("toast")!;

    await delay(1_000);
    toast.removeAttribute("hidden");

    await delay(3_000);
    toast.setAttribute("hidden", "true");
};

export default notify;
