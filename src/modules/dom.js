import { getSunStats } from "./core";

function getLocationElems () {
    return {
        city: document.getElementById('city-name'),
        country: document.getElementById('region-name')
    };
};

function getCurrentStatElems () {
    return {
        temp: document.getElementById('temp-actual'),
        tempFeel: document.getElementById('temp-feel'),
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
};

const currentElems = getCurrentStatElems();

function displayLocation (resolution) {
    const location = resolution.location;
    const currentElems = getLocationElems();

    currentElems.city.textContent = `${location.name}`;
    currentElems.country.textContent = `${location.region}`;
};

function displayMainStats (resolution) {
    const current = resolution.current;

    const lat = resolution.location.lat;
    const long = resolution.location.lon;

    currentElems.temp.textContent = `${Math.round(current.temp_c)}`;
    currentElems.tempFeel.textContent = `Feels like ${Math.round(current.feelslike_c)}`;

    currentElems.sky.textContent = `${current.condition.text}`;
    currentElems.skyIcon.src = `${current.condition.icon}`;

    currentElems.wind.textContent = `${current.wind_mph} m/h`;
    currentElems.visibility.textContent = `${current.vis_miles} miles`;

    currentElems.humidity.textContent = `${current.humidity}%`;
    currentElems.gust.textContent = `${current.gust_mph} mph`;
    
    currentElems.pressure.textContent = `${current.pressure_in} in`;
    currentElems.uv.textContent = `${current.uv}`;

    getSunStats(lat, long, (result) => {
        currentElems.sunrise.textContent = `${result.results.sunrise.slice(0, 4)} ${result.results.sunrise.slice(-2)}`;
        currentElems.sunset.textContent = `${result.results.sunset.slice(0, 4)} ${result.results.sunset.slice(-2)}`;
    });
};

function switchUnit (targetUnit, activeUnit) {
    !targetUnit.classList.contains('active')? targetUnit.classList.toggle('active'): null
    targetUnit.classList.contains('inactive')? targetUnit.classList.toggle('inactive'): null;

    activeUnit.classList.contains('active')? activeUnit.classList.toggle('active'): null;
    !activeUnit.classList.contains('inactive')? activeUnit.classList.toggle('inactive'): null;
};

function setBackground () {
    const imgObj = {
        mist: `https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
        sunny: 'https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2271&q=80',
        overcast: 'https://images.unsplash.com/photo-1416163347366-de4602bbb003?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
    };

    document.body.style.backgroundImage = `url(${imgObj[document.getElementById('sky-condition').textContent.toLocaleLowerCase()]})`;
};

export { displayLocation, displayMainStats, setBackground, switchUnit }