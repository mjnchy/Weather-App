import {getStats} from "./core";
import { displayStats, displayLocation, displayForecast } from "./dom";

// import { event } from "./eventFunctions";

window.onload = () => {
    getStats('lansing', resolve => {
        displayLocation(resolve);
        displayStats(resolve, 2);
        displayForecast(resolve, 1, [0], [2], [document.getElementById('today-forecast'), document.getElementById('forecast-breakdown-1'),
    document.getElementById('forecast-breakdown-2')]);
    });
};

// window.addEventListener('click', event);