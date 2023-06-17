import { getCurrentStats, getSunStats } from "./core";
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
        visibility: document.getElementById('visibility-value'),
        humidity: document.getElementById('humidity-value'),
        gust: document.getElementById('gust-value'),
        pressure: document.getElementById('pressure-value'),
        uv: document.getElementById('uv-value'),
        sunrise: document.getElementById('sunrise-value'),
        sunset: document.getElementById('sunset-value')
    };
})();

async function displayMainStats (input) {
    const weatherResults = await getCurrentStats(input);
    const stats = await weatherResults.current;
    const location = await weatherResults.location;
    
    const sun = await getSunStats(weatherResults.location.lat, weatherResults.location.lon);
    const sunResults = await sun.results;

    locationElems.city.textContent = `${location.name}`;
    locationElems.region.textContent = `${location.region}`;
    
    currentStatElems.temp.textContent = `${Math.round(stats.temp_c)}`;
    currentStatElems.tempFeel.textContent = ` ${Math.round(stats.feelslike_c)}`;

    currentStatElems.sky.textContent = `${stats.condition.text}`;
    currentStatElems.skyIcon.src = `${stats.condition.icon}`;

    currentStatElems.wind.textContent = `${stats.wind_mph} m/h`;
    currentStatElems.visibility.textContent = `${stats.vis_miles} miles`;

    currentStatElems.humidity.textContent = `${stats.humidity}%`;
    currentStatElems.gust.textContent = `${stats.gust_mph} mph`;
    
    currentStatElems.pressure.textContent = `${stats.pressure_in} in`;
    currentStatElems.uv.textContent = `${stats.uv}`;

    currentStatElems.sunrise.textContent = `${sunResults.sunrise.slice(0, 4)} ${sunResults.sunrise.slice(-2)}`;
    currentStatElems.sunset.textContent = `${sunResults.sunset.slice(0, 4)} ${sunResults.sunset.slice(-2)}`;
};

function switchUnits (targetUnit, currentUnit) {
    toggleClass(targetUnit, currentUnit);
    convert(targetUnit.id, currentUnit.id, [currentStatElems.temp, currentStatElems.tempFeel])
};

function setBackground () {
    const imgObj = {
        mist: `https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
        sunny: 'https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2271&q=80',
        overcast: 'https://images.unsplash.com/photo-1416163347366-de4602bbb003?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
    };

    document.body.style.backgroundImage = `url(${imgObj[document.getElementById('sky-condition').textContent.toLocaleLowerCase()]})`;
};

export { displayMainStats, switchUnits };