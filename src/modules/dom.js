import { getStats, getSunStats } from "./core";
import { toggleClass, convert, } from "./manipulation";

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

async function displayMainStats (input, callback) {
    const weatherResults = await getStats(input);
    
    const currentStats = await weatherResults.current;
    const location = await weatherResults.location;
    const today = await weatherResults.forecast.forecastday[0];

    locationElems.city.textContent = `${location.name}`;
    locationElems.region.textContent = `${location.region}`;
    
    currentStatElems.temp.textContent = `${Math.round(currentStats.temp_c)}`;
    currentStatElems.tempFeel.textContent = ` ${Math.round(currentStats.feelslike_c)}`;

    currentStatElems.sky.textContent = `${currentStats.condition.text}`;
    currentStatElems.skyIcon.src = `${currentStats.condition.icon}`;
    currentStatElems.wind.textContent = `${currentStats.wind_mph} m/h`;
    
    currentStatElems.max.textContent = `${today.day.maxtemp_c} ${currentStatElems.max.dataset.unit.toLocaleUpperCase()}`;
    currentStatElems.min.textContent = `${today.day.mintemp_c} ${currentStatElems.max.dataset.unit.toLocaleUpperCase()}`;
    currentStatElems.visibility.textContent = `${currentStats.vis_miles} miles`;

    currentStatElems.humidity.textContent = `${currentStats.humidity}%`;
    currentStatElems.gust.textContent = `${currentStats.gust_mph} mph`;   
    currentStatElems.pressure.textContent = `${currentStats.pressure_in} in`;

    currentStatElems.uv.textContent = `${currentStats.uv}`;

    currentStatElems.sunrise.textContent = `${today.astro.sunrise}`;
    currentStatElems.sunset.textContent = `${today.astro.sunset}`;

    callback();
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

export { displayMainStats, switchUnits, setBackground };