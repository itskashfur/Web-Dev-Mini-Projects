// Variables
let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

// Elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const recordBtn = document.getElementById("recordBtn");
const deleteLapBtn = document.getElementById("deleteLapBtn");
const lapsList = document.getElementById("laps");

const themeToggle = document.getElementById("themeToggle");
const menuIcon = document.getElementById("menuIcon");

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

// Record Laps (Console)
recordBtn.addEventListener("click", () => {
    if (lapsList.children.length > 0) {
        console.log("Recorded Laps:");
        [...lapsList.children].forEach((lap) => console.log(lap.textContent));
        alert("Laps recorded! Check the console.");
    } else {
        alert("No laps to record!");
    }
});

// Delete Laps
deleteLapBtn.addEventListener("click", () => {
    lapsList.innerHTML = "";
    alert("All laps deleted!");
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

// Update Display
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Format Time (00)
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeToggle.textContent = document.body.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
});

// Menu Toggle
menuIcon.addEventListener("click", () => {
    if (menuIcon.src.includes("home-icon.png")) {
        menuIcon.src = "icons8-menu-50.png"; // Change to Menu
    } else {
        menuIcon.src = "icons8-home-64.png"; // Change to Home
    }
});
