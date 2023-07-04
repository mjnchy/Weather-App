import {getStats} from "./core";
import { tempUnit, displayStats, displayLocation, displayForecast } from "./dom";
import { convert, setNewActive, set_New_Breakdown, setBackground } from "./dom2";

function loadStats (input) {
    getStats(input, resolve => {
        displayLocation(resolve);
        displayStats(resolve, 2);
        displayForecast(resolve, 2, [0], [1, 2], [document.getElementById('today-forecast'), document.getElementById('forecast-breakdown-1'),
        document.getElementById('forecast-breakdown-2')]);
    });
};

function loadPage () {
    const input = document.getElementById('search-input').value;
    loadStats(input);
};

function loadDefault () {
    loadStats('london');
    setBackground();
};

function event (e) {
    const elem = e.target
    const id = e.target.id;
    const cls = e.target.classList;
    
    switch (true) {
        case cls.contains('temp-unit') && cls.contains('inactive'):
            setNewActive(elem);
            convert(tempUnit, document.querySelectorAll('.is-temp'), ['temp-actual', 'temp-feel-value']);
            break;
        case cls.contains('forecast-nav-btn'):
            set_New_Breakdown(elem);
            break;
    };
};

export { loadDefault, loadPage, event };