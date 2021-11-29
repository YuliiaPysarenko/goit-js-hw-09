const body = document.querySelector("body");
const startButtonRef = document.querySelector("[data-start]");
const stopButtonRef = document.querySelector("[data-stop]");
let timerId;

stopButtonRef.setAttribute("disabled", "on");

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeButton (name1, name2) {
    name1.setAttribute("disabled", "on");
    name2.removeAttribute("disabled");
}

startButtonRef.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    changeButton(startButtonRef, stopButtonRef);
});

stopButtonRef.addEventListener("click", () => {
    clearInterval(timerId);
    changeButton(stopButtonRef, startButtonRef);
})