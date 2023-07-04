import {createElem} from "./elements";

const getUnits = (() => {
    return {
        temp: () => document.querySelector('.temp-unit.active').dataset.unit,
        distance: () => document.querySelector('#wind').dataset.unit,
    };
})();

let tempUnit = getUnits.temp();
let distanceUnit = getUnits.distance();
const velocityUnit = getUnits.distance() === 'miles'? 'mph': 'kph';
const velocityText = velocityUnit === 'mph'? 'm/h': 'k/h';

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

function setTempUnit () {
    tempUnit = getUnits.temp();
};

function createDayObj (dayIndex) {
    const container = document.getElementById(`forecast-overview-container-${dayIndex}`);

    return {
        header: container.querySelector('.forecast-declaration'),
        date: container.querySelector('.forecast-date'),
        avg: container.querySelector('.avg-temp'),
        max: container.querySelector('.max-temp'),
        min: container.querySelector('.min-temp'),
        sunrise: container.querySelector('.sunrise'),
        sunset: container.querySelector('.sunset'),
        wind: container.querySelector('.avg-wind'),
        rain: container.querySelector('.avg-chance-of-rain'),
        sky: container.querySelector('.condition-text'),
        skyIcon: container.querySelector('.condition-icon'),
        humidity: container.querySelector('.avg-humidity'),
        uv: container.querySelector('.uv')
    };
};

function displayLocation (resolve) {
    locationElems.city.textContent = resolve.location.name;
    locationElems.region.textContent = resolve.location.region.split(' ').length < 2?
    resolve.location.region: resolve.location.country;
};

function setstats (day, stats, obj) {
    obj.temp? obj.temp.textContent = Math.round(stats[`temp_${tempUnit}`]): null;

    if (obj.wind) {
        if (stats[`maxwind_${velocityUnit}`]) {
            let totalWind = 0;
            day.hour.forEach(int => totalWind += int[`wind_${velocityUnit}`]);

            obj.wind.textContent = `${Math.round((totalWind / 24) * 10) / 10} ${velocityText}`;
        }   else obj.wind.textContent = `${stats[`wind_${velocityUnit}`]} ${velocityText}`;
    };
    
    obj.sky? obj.sky.textContent = stats.condition.text: null;
    obj.skyIcon? obj.skyIcon.src = stats.condition.icon: null;
    obj.tempFeel? obj.tempFeel.textContent = Math.round(stats[`feelslike_${tempUnit}`]): null;

    obj.max? obj.max.textContent = `${Math.round(day.day[`maxtemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;
    obj.min? obj.min.textContent = `${Math.round(day.day[`mintemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;
    obj.avg? obj.avg.textContent = `${Math.round(day.day[`avgtemp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`: null;

    obj.visibility? obj.visibility.textContent = `${stats[`vis_${distanceUnit}`]} ${distanceUnit}`: null;
    obj.gust? obj.gust.textContent = `${stats[`gust_${velocityUnit}`]} ${velocityUnit}`: null;

    if(obj.humidity) {
        obj.humidity.textContent = stats.humidity? `${stats.humidity}%`: `${stats.avghumidity}%`;
    };
    
    obj.pressure? obj.pressure.textContent = `${stats.pressure_in} in`: null;
    obj.uv? obj.uv.textContent = stats.uv: null;

    obj.sunrise? obj.sunrise.textContent = day.astro.sunrise: null;
    obj.sunset? obj.sunset.textContent = day.astro.sunset: null;

    obj.rain? obj.rain.textContent = `${stats.daily_chance_of_rain}%`: null;
};

function displayStats (resolve, dayIndex) {
    let day;
    let stats;
    let obj;
    let name_Of_Day;

    for (let i = 0; i <= dayIndex; i++) {
        day = resolve.forecast.forecastday[i]
        if (i === 0) {
            stats = resolve.current;
            obj = currentStatElems;
            setstats(day, stats, obj);
        }

        else {
            stats = resolve.forecast.forecastday[i].day;
            obj = createDayObj(i);
            
            const dateSrc = resolve.forecast.forecastday[i].date;
            const dayObj = new Date(`${dateSrc.slice(5, 7)}-${dateSrc.slice(8, 10)}-${dateSrc.slice(0, 4)}`);
            name_Of_Day = i === 1? 'Tomorrow': dayObj.toLocaleDateString('en-US', {weekday: 'long'});
            
            obj.header.textContent = name_Of_Day;
            obj.date.textContent = dayObj.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
            setstats(day, stats, obj);
        };
    };
};

function displayForecast (resolve, dayIndex, daysToFix, showDetailed, containers) {
    const hour = new Date().getHours();

    for (let i = 0; i <= dayIndex; i++) {
        const day = resolve.forecast.forecastday[i];
        const allHours = day.hour;
        const forecastHours = daysToFix.includes(i)? allHours.slice(-(allHours.length - hour) + 1): allHours;

        forecastHours.forEach(hour => {
            let givenHour = hour.time.slice(-5, -3);
            let ampm;
            let localHour;
            
            if (givenHour == 0) {
                localHour = 12;
                ampm = 'am';
            }
    
            else if (givenHour >= 12) {
                localHour = givenHour == 12? givenHour: givenHour - 12;
                ampm = 'pm';
            }
    
            else {
                localHour = givenHour;
                ampm = 'am';
            };
    
            const span = createElem('span', undefined, ['hour-span', 'forecast-elem-container']);
            const declaration = createElem('p', undefined, ['hour-p', 'forecast-elem']);
            const icon = createElem('img', undefined, ['hour-condition-icon', 'forecast-elem']);
            const temp = createElem('p', undefined, ['is-temp', 'hour-temp', 'forecast-elem']);
            const breakLine = createElem('hr', undefined, ['break-line'])
    
            declaration.textContent = `${localHour} ${ampm.toLocaleUpperCase()}`;
            icon.src = hour.condition.icon;
            temp.textContent = `${Math.round(hour[`temp_${tempUnit}`])} ${tempUnit.toLocaleUpperCase()}`;
    
            span.append(declaration, icon, temp);
    
            if (showDetailed.includes(i)) {
                const chance_of_rain = createElem('p', undefined, ['rain-chance', 'forecast-elem']);
                const wind = createElem('p', undefined, ['wind', 'forecast-elem']);
    
                chance_of_rain.textContent = `${hour.chance_of_rain}%`;
                wind.textContent = `${hour[`wind_${velocityUnit}`]} ${velocityText}`;
                span.insertBefore(chance_of_rain, icon);
                span.insertBefore(wind, chance_of_rain);
            };
    
            containers[i].append(span, breakLine);
        });
    };
};

export { tempUnit, setTempUnit, displayLocation, displayStats, displayForecast, currentStatElems };