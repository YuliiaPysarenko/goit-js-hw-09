import Notiflix from 'notiflix';
const inputs = document.querySelector(".form");
const delayRef = document.querySelector("[name='delay']");
const stepRef = document.querySelector("[name='step']");
const amountRef = document.querySelector("[name='amount']");

inputs.addEventListener("submit", (event) => {
  event.preventDefault();
  makePromise();
})

function makePromise() {
  let firstDelay = Number.parseInt(delayRef.value);
  let step = Number.parseInt(stepRef.value);
  let amount = Number.parseInt(amountRef.value);
  console.log(firstDelay, step, amount);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i+1, firstDelay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    firstDelay += step;
  }
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }

    }, delay)
  })
}