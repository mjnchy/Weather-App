import {getStats} from "./core";
import { displayStats, displayLocation, displayForecast, currentStatElems, tmrStatElems} from "./dom";

// import { event } from "./eventFunctions";

window.onload = () => {
    getStats('lansing', resolve => {
        displayLocation(resolve);
        displayStats(resolve.current, resolve.forecast.forecastday[0], currentStatElems);
        displayForecast(resolve.forecast.forecastday[0], true, document.getElementById('today-forecast'));
        displayStats(resolve.forecast.forecastday[1].day, resolve.forecast.forecastday[1], tmrStatElems);
    })
};

// window.addEventListener('click', event);