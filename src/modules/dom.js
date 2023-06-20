import { getStats } from "./core";
import { toggleClass, convert, } from "./manipulation";
import { createElem } from "./elements";

let unit = () => document.querySelector('.unit.active').dataset.unit;

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

const todayForecast = (() => {
    return document.getElementById('today-forecast');
})();

async function displayMainStats (input, callback) {
    const weatherResults = await getStats(input);
    
    const currentStats = await weatherResults.current;
    const location = await weatherResults.location;
    const today = await weatherResults.forecast.forecastday[0];

    locationElems.city.textContent = `${location.name}`;
    locationElems.region.textContent = `${location.region}`;
    
    currentStatElems.temp.textContent = `${Math.round(currentStats[`temp_${unit()}`])}`;
    currentStatElems.tempFeel.textContent = ` ${Math.round(currentStats[`feelslike_${unit()}`])}`;

    currentStatElems.sky.textContent = `${currentStats.condition.text}`;
    currentStatElems.skyIcon.src = `${currentStats.condition.icon}`;
    currentStatElems.wind.textContent = `${currentStats.wind_mph} m/h`;
    
    currentStatElems.max.textContent = `${Math.round(today.day[`maxtemp_${unit()}`])} ${unit().toLocaleUpperCase()}`;
    currentStatElems.min.textContent = `${Math.round(today.day[`mintemp_${unit()}`])} ${unit().toLocaleUpperCase()}`;
    currentStatElems.visibility.textContent = `${currentStats.vis_miles} miles`;

    currentStatElems.humidity.textContent = `${currentStats.humidity}%`;
    currentStatElems.gust.textContent = `${currentStats.gust_mph} mph`;   
    currentStatElems.pressure.textContent = `${currentStats.pressure_in} in`;

    currentStatElems.uv.textContent = `${currentStats.uv}`;

    currentStatElems.sunrise.textContent = `${today.astro.sunrise}`;
    currentStatElems.sunset.textContent = `${today.astro.sunset}`;

    callback(weatherResults);
};

function displayTodayForeCast (resolve) {
    const hours = new Date().getHours();
    const forecasetHours = resolve.forecast.forecastday[0].hour.slice(-((resolve.forecast.forecastday[0].hour.length - 1) - hours));

    forecasetHours.forEach(forecastHour => {
        const span = createElem('span', `hour-${forecasetHours.indexOf(forecastHour)}`, ['hour-span']);
        const time = createElem('p', undefined, ['hour-display']);
        const img = createElem('img', undefined, ['hour-icon']);
        const temp = createElem('p', undefined, ['hour-temp']);

        const hour = forecastHour.time.slice(-5, -3);
        
        let ampm;
        let localHour;

        if (hour > 12) {
            ampm = 'pm';
            localHour = hour - 12;
        }   else {
            ampm = 'am';
            localHour = hour;
        };

        time.textContent = `${localHour}:00 ${ampm}`
        img.src = forecastHour.condition.icon;
        temp.textContent = `${Math.round(forecastHour[`temp_${unit()}`])} ${unit().toLocaleUpperCase()}`;

        span.append(time);
        span.append(img);
        span.append(temp);

        todayForecast.append(span);
    });
};

function switchUnits (targetUnit, currentUnit) {
    if (!targetUnit.classList.contains('active') && !currentUnit.classList.contains('inactive')) {
        toggleClass(targetUnit, currentUnit);

        convert(targetUnit, [currentStatElems.temp, currentStatElems.tempFeel,
        currentStatElems.max, currentStatElems.min]);
    };
};

function setBackground () {
    const imgObj = {
        mist: `https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
        sunny: 'https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2271&q=80',
        overcast: 'https://images.unsplash.com/photo-1416163347366-de4602bbb003?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
    };
    document.body.style.backgroundImage = `url(${imgObj.mist})`
    // document.body.style.backgroundImage = `url(${imgObj[currentStatElems.sky.textContent.toLocaleLowerCase()]})`;
};

export { displayMainStats, unit, displayTodayForeCast, switchUnits, setBackground };