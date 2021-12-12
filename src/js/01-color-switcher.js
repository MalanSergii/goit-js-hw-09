const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let timerId;
const TIME_DELAY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartButtonClick() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, TIME_DELAY);
    buttonStart.disabled = true;
};

function onStopButtonClick() {
    clearInterval(timerId);
    buttonStart.disabled = false;
};

buttonStart.addEventListener('click', onStartButtonClick);
buttonStop.addEventListener('click', onStopButtonClick );
