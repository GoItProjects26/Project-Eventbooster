export {deleteTimer, timerDisplay};
import {updateBasket} from "./basket";
import {refs} from "./refs";

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(Obj) {
    for(let key in Obj) {
        Obj[key] =`${(Obj[key])}`.padStart(2, 0)}
    return Obj;
}

function calculateTime(obj) {
    const begin = obj?.contentShoppingCart[0]?.timer;
    const end = begin + obj.duration
    let passedTime = end - Date.now();
  
    if (passedTime <= 500) timeIsOver(obj);
    
    return addLeadingZero(convertMs(passedTime));
}

function timeIsOver (obj) {
    obj.clearByTimerEvent()
    updateBasket ()
    refs.basketTimerHeader.textContent = "";
}

function timerDisplay (timeObj) {
    let {minutes, seconds} = calculateTime(timeObj)
    if(!isNaN(minutes) || !isNaN(seconds)) {
        refs.basketTimer.textContent = `${minutes} : ${seconds}`;
        refs.basketTimerHeader.textContent = `${minutes} : ${seconds}`;
    } else {
        refs.basketTimer.textContent = "";
        refs.basketTimerHeader.textContent = "";
    }
}

function deleteTimer (id) {
    refs.basketTimer.textContent = "";
    refs.basketTimerHeader.textContent = "";
    clearInterval(id)
}