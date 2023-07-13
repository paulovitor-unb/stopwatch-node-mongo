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
    updateTime: (milliseconds) => {
        const formattedTime = screen.formatTime(milliseconds);
        document.querySelector("#time").innerText = formattedTime;
    },

    formatTime: (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);

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
    milliseconds: 0,

    start: () => {
        stopwatch.startTime = Date.now();
    },
    restart: () => {
        stopwatch.startTime = Date.now() - stopwatch.milliseconds;
    },
    count: () => {
        stopwatch.milliseconds = Date.now() - stopwatch.startTime;
        screen.updateTime(stopwatch.milliseconds);
    },
    reset: () => {
        stopwatch.startTime = null;
        stopwatch.milliseconds = 0;
        screen.updateTime(stopwatch.milliseconds);
    },
    pause: () => {
        clearInterval(stopwatch.interval);
        stopwatch.interval = null;
    },
    save: async () => {
        const url = `${window.location.origin}/api/times`;
        const data = {
            userId: document.querySelector("#userId").value,
            projectId: document.querySelector("#projectId").value,
            time: Math.floor(stopwatch.milliseconds / 1000),
            formattedTime: document.querySelector("#time").innerText
        };

        try {
            const response = await fetchService(url, data, "", "POST");

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const newTime = await response.json();

            console.log(newTime.data);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const fetchService = async (url, data, auth, method) => {
    switch (method) {
        case "GET":
            stringifiedData = stringifyNestedObject(data);
            const query = new URLSearchParams(stringifiedData).toString();

            url = `${url}?${query}`;

            return await fetch(url, { headers: { Authorization: auth } });
        default:
            return await fetch(url, {
                method,
                body: JSON.stringify({ data }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: auth
                }
            });
    }
};
