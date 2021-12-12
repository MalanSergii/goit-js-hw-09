import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');


buttonStart.disabled = true; 
let intervalId;

const options = { 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < new Date()) {
        return Notiflix.Notify.warning('Please choose a date in the future');
      }
        clearInterval(intervalId);
        buttonStart.disabled = false;
      
        function onButtonStartClick() {
            intervalId = setInterval(() => {
            const deltaTime = selectedDates[0] - new Date();
      
            if(deltaTime < 1000) {
            clearInterval(intervalId);
            }
            const time = convertMs(deltaTime);
            updateClockFace(time);
            }, 1000);
         };
        
      buttonStart.addEventListener('click', onButtonStartClick);
    }
};  

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

}

function addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
    day.textContent = `${days}`;
    hour.textContent = `${hours}`;
    minute.textContent = `${minutes}`;
    second.textContent = `${seconds}`;
}