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
        avg: document.getElementById('avg-temp-value'),
        visibility: document.getElementById('visibility-value'),
        humidity: document.getElementById('humidity-value'),
        gust: document.getElementById('gust-value'),
        pressure: document.getElementById('pressure-value'),
        uv: document.getElementById('uv-value'),
        sunrise: document.getElementById('sunrise-value'),
        sunset: document.getElementById('sunset-value')
    };
})();

const tmrStatElems = (() => {
    return {
        sky: document.getElementById('tmr-condition-text'),
        skyIcon: document.getElementById('tmr-condition-icon'),
        max: document.getElementById('tmr-max-temp-value'),
        min: document.getElementById('tmr-min-temp-value'),
        humidity: document.getElementById('tmr-humidity-value'),
        sunrise: document.getElementById('tmr-sunrise-value'),
        sunset: document.getElementById('tmr-sunset-value')
    };
})();

function displayLocation (resolve) {
    locationElems.city.textContent = resolve.location.name;
    locationElems.region.textContent = resolve.location.region;
};

function displayStats (time, forecast, obj) {
    obj.temp? obj.temp.textContent = Math.round(time[`temp_${tempUnit}`]): null;
    
    obj.wind? obj.wind.textContent = `${time[`wind_${velocityUnit}`]} ${velocityUnit}`: null;
    obj.sky? obj.sky.textContent = time.condition.text: null;
    obj.skyIcon? obj.skyIcon.src = time.condition.icon: null;
    obj.tempFeel? obj.tempFeel.textContent = Math.round(time[`feelslike_${tempUnit}`]): null;

    obj.max? obj.max.textContent = `${Math.round(forecast.day[`maxtemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;
    obj.min? obj.min.textContent = `${Math.round(forecast.day[`mintemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;
    obj.avg? obj.avg.textContent = `${Math.round(forecast.day[`avgtemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;

    obj.visibility? obj.visibility.textContent = `${time[`vis_${distanceUnit}`]} ${distanceUnit}`: null;
    obj.gust? obj.gust.textContent = `${time[`gust_${velocityUnit}`]} ${velocityUnit}`: null;

    if(obj.humidity) {
        obj.humidity.textContent = time.humidity? `${time.humidity}%`: `${time.avghumidity}%`;
    };
    
    obj.pressure? obj.pressure.textContent = `${time.pressure_in} in`: null;
    obj.uv? obj.uv.textContent = time.uv: null;

    obj.sunrise? obj.sunrise.textContent = forecast.astro.sunrise: null;
    obj.sunset? obj.sunset.textContent = forecast.astro.sunset: null;
};

function displayForecast (day, fixHours, container) {
    const hour = new Date().getHours();
    const allHours = day.hour;
    const forecastHours = fixHours === true? allHours.slice(-(allHours.length - hour) + 1): allHours;

    forecastHours.forEach(hour => {
        let givenHour = hour.time.slice(-5, -3);
        let ampm;
        let localHour;
        givenHour === `00`? givenHour = 12: null;

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

export { displayLocation, displayStats, displayForecast, currentStatElems, tmrStatElems };