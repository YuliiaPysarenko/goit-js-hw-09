const body = document.querySelector("body");
const startButtonRef = document.querySelector("[data-start]");
const stopButtonRef = document.querySelector("[data-stop]");
let timerId;

stopButtonRef.setAttribute("disabled", "on");

startButtonRef.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButtonRef.setAttribute("disabled", "on");
    stopButtonRef.removeAttribute("disabled");
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButtonRef.addEventListener("click", () => {
    clearInterval(timerId);
    startButtonRef.removeAttribute("disabled");
    stopButtonRef.setAttribute("disabled", "on");
})