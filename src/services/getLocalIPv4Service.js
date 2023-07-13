import os from "os";

const getLocalIPv4Service = (port) => {
    const netInterfaces = os.networkInterfaces();

    for (let key in netInterfaces) {
        const localAddress = netInterfaces[key].find(
            (element) => element.family === "IPv4"
        );

        const localIPv4 = localAddress?.address;

        if (localIPv4) {
            console.log(`Server @ http://${localIPv4}:${port}`);
            return;
        }
    }
};

export default getLocalIPv4Service;
