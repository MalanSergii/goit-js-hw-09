import Notiflix from "notiflix";

const form = document.querySelector(".form");

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount }  = event.currentTarget;

  let firstDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const promiseAmount = Number(amount.value);

  for (let position = 1; position <= promiseAmount; position += 1) {
    createPromise(position, firstDelay);
    firstDelay += delayStep;
  };
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });

  promise
  .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};