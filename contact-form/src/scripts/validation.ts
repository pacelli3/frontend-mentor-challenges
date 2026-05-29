import notify from "./notification";

const handleErrorState = (el: HTMLElement, name: string, isMatch: boolean) => {
    if (isMatch) {
        el.classList.add("form__control--error");
        document.getElementById(`form__error-message--${name}`)!.removeAttribute("hidden");
    } else {
        el.classList.remove("form__control--error");
        document.getElementById(`form__error-message--${name}`)!.setAttribute("hidden", "true");
    }
};

const handleBlur = (e: FocusEvent) => {
    const el = e.target! as HTMLElement;
    handleErrorState(el, el.getAttribute("name")!, el.matches(":user-invalid"));
};

const contactForm = document.getElementById("contact-form")! as HTMLFormElement;
const formBtn = document.getElementById("form__btn")! as HTMLButtonElement;

contactForm.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    // Prevents re-submit before processing is completed
    formBtn.disabled = true;

    if (!contactForm.checkValidity()) {
        const invalidFields = document.querySelectorAll(":invalid");
        const filteredFields = [...invalidFields].filter(
            f =>
                f.classList.contains("form__control") ||
                f.classList.contains("form__checkbox") ||
                f.classList.contains("form__radio"),
        );

        filteredFields.forEach(f => {
            const el = f as HTMLElement;
            handleErrorState(el, el.getAttribute("name")!, true);
        });

        formBtn.disabled = false;
    } else {
        contactForm.reset();
        await notify();
        formBtn.disabled = false;
    }
});

document.getElementById("firstname")!.addEventListener("blur", handleBlur);
document.getElementById("lastname")!.addEventListener("blur", handleBlur);
document.getElementById("email")!.addEventListener("blur", handleBlur);
document.getElementById("enquiry")!.addEventListener("blur", handleBlur);
document.getElementById("request")!.addEventListener("blur", handleBlur);
document.getElementById("message")!.addEventListener("blur", handleBlur);
document.getElementById("consent")!.addEventListener("blur", handleBlur);
