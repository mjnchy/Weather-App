import {getStats} from "./core";
import { displayStats, displayLocation, displayForecast } from "./dom";

// import { event } from "./eventFunctions";

window.onload = () => {
    getStats('lansing', resolve => {
        displayLocation(resolve);
        displayStats(resolve, 7);
        displayForecast(resolve.forecast.forecastday[0], true, document.getElementById('today-forecast'));
        // displayStats(resolve, 1);
        // displayStats(resolve, 2);
        // displayStats(resolve, 3);
        // displayStats(resolve, 4);
        // displayStats(resolve, 5);
        // displayStats(resolve, 6);
        // displayStats(resolve, 7);
    })
};

// window.addEventListener('click', event);