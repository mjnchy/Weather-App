import {getStats} from "./core";
import { displayStats, displayLocation, displayForecast, currentStatElems} from "./dom";

// import { event } from "./eventFunctions";

window.onload = () => {
    getStats('lansing', resolve => {
        displayLocation(resolve);
        displayStats(resolve.current, resolve.forecast.forecastday[0], currentStatElems);
        displayForecast(resolve.forecast.forecastday[0]);
    })
};

// window.addEventListener('click', event);