// script.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const stopwatchTime = document.getElementById('stopwatch-time');
    const startStopwatchButton = document.getElementById('start-stopwatch');
    const resetStopwatchButton = document.getElementById('reset-stopwatch');
    const clocksList = document.getElementById('clocks-list');

    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchSeconds = 0;

    // Dark/Light Mode Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Update Clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Stopwatch
    function updateStopwatch() {
        stopwatchSeconds++;
        const hours = Math.floor(stopwatchSeconds / 3600);
        const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
        const seconds = stopwatchSeconds % 60;
        stopwatchTime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startStopwatchButton.addEventListener('click', () => {
        if (!stopwatchRunning) {
            stopwatchInterval = setInterval(updateStopwatch, 1000);
            startStopwatchButton.textContent = 'Stop';
            stopwatchRunning = true;
        } else {
            clearInterval(stopwatchInterval);
            startStopwatchButton.textContent = 'Start';
            stopwatchRunning = false;
        }
    });

    resetStopwatchButton.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchSeconds = 0;
        stopwatchTime.textContent = '00:00:00';
        startStopwatchButton.textContent = 'Start';
        stopwatchRunning = false;
    });

    // World Clocks
    const timeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];

    function updateWorldClocks() {
        clocksList.innerHTML = '';
        timeZones.forEach(zone => {
            const now = new Date(new Date().toLocaleString('en-US', { timeZone: zone }));
            const timeString = now.toLocaleTimeString('en-US', { timeZone: zone });
            const clockElement = document.createElement('div');
            clockElement.textContent = `${zone}: ${timeString}`;
            clocksList.appendChild(clockElement);
        });
    }

    setInterval(updateWorldClocks, 1000);
    updateWorldClocks();
});