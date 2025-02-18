// script.js
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelector('.loading-icon').style.display = 'none';
    }, 2000); // Simulate loading time

    updateClock();
    setInterval(updateClock, 1000);

    updateWorldClock();
    setInterval(updateWorldClock, 1000);
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.mode-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

let stopwatchInterval;
let stopwatchTime = 0;

function toggleStopwatch() {
    const stopwatch = document.getElementById('stopwatch');
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatch.classList.add('hidden');
    } else {
        stopwatchTime = 0;
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatch.classList.remove('hidden');
    }
}

function updateStopwatch() {
    stopwatchTime++;
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    document.getElementById('stopwatch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateWorldClock() {
    const now = new Date();
    const options = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const worldTime = now.toLocaleTimeString('en-US', options);
    document.getElementById('world-clock').textContent = `UTC Time: ${worldTime}`;
}