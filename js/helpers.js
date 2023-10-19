import { async } from "regenerator-runtime";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url), timeout(0.5)]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${response.statusText} (${response.status})`);
        return data;

    } catch (err) {
        throw err;
    }
}