// Variables for time and control
let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

// DOM Elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const recordBtn = document.getElementById("recordBtn");
const deleteLapBtn = document.getElementById("deleteLapBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const lapsList = document.getElementById("laps");

// Start or Pause Stopwatch
startPauseBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
    } else {
        timer = setInterval(runStopwatch, 10);
        startPauseBtn.textContent = "Pause";
    }
    running = !running;
});

// Reset Stopwatch
resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    minutes = seconds = milliseconds = 0;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    lapsList.innerHTML = "";
});

// Add Lap
lapBtn.addEventListener("click", () => {
    if (running) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
});

// Record Laps (Save to Console)
recordBtn.addEventListener("click", () => {
    if (lapsList.children.length > 0) {
        console.log("Recorded Laps:");
        [...lapsList.children].forEach((lap) => console.log(lap.textContent));
        alert("Laps recorded! Check the console.");
    } else {
        alert("No laps to record!");
    }
});

// Delete All Laps
deleteLapBtn.addEventListener("click", () => {
    lapsList.innerHTML = "";
    alert("All laps deleted!");
});

// Theme Toggle
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
});

// Stopwatch Logic
function runStopwatch() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Update Timer Display
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Format Time (Two Digits)
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}
