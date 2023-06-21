import {createElem} from "./elements";

const getUnits = (() => {
    return {
        temp: document.querySelector('.temp-unit.active').dataset.unit,
        distance: document.querySelector('#wind').dataset.unit,
    };
})();

const tempUnit = getUnits.temp;
const distanceUnit = getUnits.distance;
const velocityUnit = getUnits.distance === 'miles'? 'mph': 'kph';

const locationElems = (() => {
    return {
        city: document.getElementById('city-name'),
        region: document.getElementById('region-name')
    };
})();

const currentStatElems = (() => {
    return {
        temp: document.getElementById('temp-actual'),
        tempFeel: document.getElementById('temp-feel-value'),
        sky: document.getElementById('sky-condition'),
        skyIcon: document.getElementById('sky-condition-icon'),
        wind: document.getElementById('wind'),
        max: document.getElementById('max-temp-value'),
        min: document.getElementById('min-temp-value'),
        visibility: document.getElementById('visibility-value'),
        humidity: document.getElementById('humidity-value'),
        gust: document.getElementById('gust-value'),
        pressure: document.getElementById('pressure-value'),
        uv: document.getElementById('uv-value'),
        sunrise: document.getElementById('sunrise-value'),
        sunset: document.getElementById('sunset-value')
    };
})();

function displayLocation (resolve) {
    locationElems.city.textContent = resolve.location.name;
    locationElems.region.textContent = resolve.location.region;
};

function displayCurrentStats (resolve) {
    const stats = resolve.current;
    const forecast = resolve.forecast.forecastday[0];

    currentStatElems.temp.textContent = Math.round(stats[`temp_${tempUnit}`]);
    
    currentStatElems.wind.textContent = `${stats[`wind_${velocityUnit}`]} ${velocityUnit}`;
    currentStatElems.sky.textContent = stats.condition.text;
    currentStatElems.skyIcon.src = stats.condition.icon;
    currentStatElems.tempFeel.textContent = Math.round(stats[`feelslike_${tempUnit}`]);

    currentStatElems.max.textContent = `${Math.round(forecast.day[`maxtemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`;
    currentStatElems.min.textContent = `${Math.round(forecast.day[`mintemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`;

    currentStatElems.visibility.textContent = `${stats[`vis_${distanceUnit}`]} ${distanceUnit}`;
    currentStatElems.humidity.textContent = `${stats.humidity}%`;
    currentStatElems.gust.textContent = `${stats[`gust_${velocityUnit}`]} ${velocityUnit}`;
    
    currentStatElems.pressure.textContent = `${stats.pressure_in} in`;
    currentStatElems.uv.textContent = stats.uv;

    currentStatElems.sunrise.textContent = forecast.astro.sunrise;
    currentStatElems.sunset.textContent = forecast.astro.sunset;
};

function displayTodayForecast (resolve) {
    const hour = new Date().getHours();
    const allHours = resolve.forecast.forecastday[0].hour;
    const forecastHours = allHours.slice(-(allHours.length - hour) + 1);
    const container = document.getElementById('today-forecast');

    forecastHours.forEach(hour => {
        let givenHour = hour.time.slice(-5, -3);
        let ampm;
        let localHour;

        if (givenHour > 12) {
            localHour = givenHour - 12;
            ampm = 'pm';
        }

        else {
            localHour = givenHour;
            ampm = 'am';
        };

        const span = createElem('span', undefined, ['hour-span']);
        const declaration = createElem('p', undefined, ['hour-p']);
        const icon = createElem('img', undefined, ['hour-condition-icon']);
        const temp = createElem('p', undefined, ['hour-temp']);

        declaration.textContent = `${localHour} ${ampm.toLocaleUpperCase()}`;
        icon.src = hour.condition.icon;
        temp.textContent = `${Math.round(hour[`temp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`;

        span.append(declaration, icon, temp);
        container.append(span);
    });
};

export { displayLocation, displayCurrentStats, displayTodayForecast };