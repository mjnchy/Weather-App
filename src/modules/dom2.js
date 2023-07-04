import { setTempUnit, tempUnit } from "./dom";

const backgroundImg = {
    sunny: `https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
    rainy: `https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
    night: `https://images.unsplash.com/photo-1431440869543-efaf3388c585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80`,
}

const get_Forecast_Breakdown_Elems = (() => {
    return {
        current: () => document.querySelector('.forecast-breakdown.active'),
        next: () => {
            const nextSibling = document.querySelector('.forecast-breakdown.active').nextElementSibling;
            if (nextSibling !== null) {
                return nextSibling.classList.contains('forecast-breakdown')? nextSibling: null;
            };
        },
        prev: () => {
            const prevSibling = document.querySelector('.forecast-breakdown.active').previousElementSibling;
            if (prevSibling !== null) {
                return prevSibling.classList.contains('forecast-breakdown')? prevSibling: null;
            };
        }
    };
})();

function set_New_Breakdown (elem) {
    const current = get_Forecast_Breakdown_Elems.current();
    const next = get_Forecast_Breakdown_Elems.next();
    const prev = get_Forecast_Breakdown_Elems.prev();

    if (elem.id === 'next-forecast-btn') {
        if (next !== null) {
            current.classList.toggle('active');
            current.classList.add('inactive', 'prev-forecast');

            next.classList.contains('inactive')? next.classList.toggle('inactive'): null;
            next.classList.contains('next-forecast')? next.classList.toggle('next-forecast'): null;
            next.classList.add('active');
        }   else null;
    }

    else if (elem.id === 'prev-forecast-btn') {
        if (prev !== null) {
            current.classList.toggle('active');
            current.classList.add('inactive', 'next-forecast');
    
            prev.classList.contains('inactive')? prev.classList.toggle('inactive'): null;
            prev.classList.contains('prev-forecast')? prev.classList.toggle('prev-forecast'): null;
            prev.classList.add('active');
        }   else null;
    };
};

function setNewActive (elem) {
    let newInactive = elem.parentElement.querySelector('.temp-unit.active');

    elem.classList.add('active');
    elem.classList.remove('inactive');

    newInactive.classList.add('inactive');
    newInactive.classList.remove('active');
    setTempUnit();
};

function convert (unit, elems, exclude) {
    const equations = {
        c: x => Math.round((5/9) * (x - 32)),
        f: x => Math.round(((x * 9/5) + 32) * 10) / 10,
        km: value => value * 1.60934,
        m: value => value * 0.621371
    };

    elems.forEach(elem => {
        const value = parseInt(elem.textContent.match(/\d+/g));
        elem.textContent = exclude.includes(elem.id)? `${equations[unit](value)}`:
        `${equations[unit](value)} ${tempUnit.toLocaleUpperCase()}`;
    });
};

function setBackground () {
    document.body.style.backgroundImage = `url(${backgroundImg.night})`;
};

export { setNewActive, set_New_Breakdown, convert, setBackground };