import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker")
const buttonRef = document.querySelector("button");
const date = new Date();

const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

let timeNumber = 0;
let timerId = null;

buttonRef.setAttribute("disabled", "on");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: date,
    minuteIncrement: 1,
      onClose(selectedDates) {    
        if (selectedDates[0].getTime() < date.getTime()) {
            buttonRef.setAttribute("disabled", "on");
            Notiflix.Notify.failure("Please choose a date in the future");
        }
        else {
            buttonRef.removeAttribute("disabled");
            return timeNumber = selectedDates[0].getTime() - date.getTime();
        }
      },
};

function startTimer() {
    timerId = setInterval(() => {
        let getTime = convertMs(timeNumber);
        timeNumber -= 1000;
        days.textContent = addLeadingZero(getTime.days);
        hours.textContent = addLeadingZero(getTime.hours);
        minutes.textContent = addLeadingZero(getTime.minutes);
        seconds.textContent = addLeadingZero(getTime.seconds);
        if (getTime.days === 0 && getTime.hours === 0 && getTime.minutes === 0 && getTime.seconds === 0) {
            clearInterval(timerId);
        }
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
}

buttonRef.addEventListener("click", startTimer);
flatpickr(input, options);