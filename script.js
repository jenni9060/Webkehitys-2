document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const thankYouMessage = document.createElement("p");
    thankYouMessage.style.color = "green";
    thankYouMessage.style.marginTop = "10px";

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const nameInput = document.getElementById("name");
        const name = nameInput.value.trim();

        if (name) {
            thankYouMessage.textContent = `Kiitos ilmoittautumisesta, ${name}!`;
        } else {
            thankYouMessage.textContent = "Kiitos ilmoittautumisesta!";
        }

        form.appendChild(thankYouMessage);
        form.reset();
    });
});
