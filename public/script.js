window.addEventListener("DOMContentLoaded", () => {
    document
        .querySelectorAll("#stopwatchButtons > button")
        .forEach((button) => {
            button.addEventListener("click", () => {
                switch (button.dataset.action) {
                    case "Start":
                        if (!stopwatch.startTime) {
                            stopwatch.start();
                        } else {
                            stopwatch.restart();
                        }
                        stopwatch.interval = setInterval(stopwatch.count, 1000);
                        screen.changeButton(button, "Stop");
                        break;
                    case "Stop":
                        stopwatch.pause();
                        screen.changeButton(button, "Start");
                        break;
                    case "Reset":
                        stopwatch.pause();
                        stopwatch.reset();
                        screen.changeButton(button, "Start");
                        break;
                    case "Save":
                        stopwatch.save();
                        stopwatch.pause();
                        stopwatch.reset();
                        screen.changeButton(button, "Start");
                        break;
                    default:
                        console.log("Error => Invalid action!");
                        break;
                }
            });
        });
});

const screen = {
    updateTime: (seconds) => {
        document.querySelector("#time").innerText = screen.formatTime(seconds);
    },

    formatTime: (seconds) => {
        const hh = `${Math.floor(seconds / 3600)}`.padStart(2, "0");
        const mm = `${Math.floor(seconds / 60) % 60}`.padStart(2, "0");
        const ss = `${seconds % 60}`.padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    },

    changeButton: (button, action) => {
        button.dataset.action = action;
        button.innerText = action;
        button.classList.toggle("blue", action === "Start");
        button.classList.toggle("gray", action === "Stop");
    }
};

const stopwatch = {
    startTime: null,
    interval: null,
    seconds: 0,

    start: () => {
        stopwatch.startTime = Date.now();
    },
    restart: () => {
        stopwatch.startTime = Date.now() - stopwatch.seconds * 1000;
    },
    count: () => {
        const milliseconds = Date.now() - stopwatch.startTime;
        stopwatch.seconds = Math.floor(milliseconds / 1000);
        screen.updateTime(stopwatch.seconds);
    },
    reset: () => {
        stopwatch.startTime = null;
        stopwatch.seconds = 0;
        screen.updateTime(stopwatch.seconds);
    },
    pause: () => {
        clearInterval(stopwatch.interval);
        stopwatch.interval = null;
    },
    save: () => {
        console.log(stopwatch.seconds);
    }
};
