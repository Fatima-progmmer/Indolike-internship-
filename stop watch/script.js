
let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = null;
let displaytime = document.getElementById("display");

function stopwatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = hours < 10 ? "0" + minutes : minutes;
    let s = hours < 10 ? "0" + seconds : seconds;


    displaytime.innerHTML = h + ":" + m + ":" + s;
}
function watchstart() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}
function watchstop() {
    clearInterval(timer);
}

function reset() {
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    displaytime.innerHTML = "00:00:00";
}