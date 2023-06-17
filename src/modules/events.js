import { getCurrentStats } from "./core";
import { displayLocation, displayMainStats, setBackground, switchUnit } from "./dom";

window.onload = () => {
    getCurrentStats('okemos', (resolve) => {
        displayLocation(resolve);
        displayMainStats(resolve);
        setBackground()
    });
};

// window.addEventListener('click', e => {
//     if (e.target.classList.contains('unit')) {
//         const targetElem = e.target;
//         const activeElem = e.target.previousElementSibling === null? e.target.nextElementSibling: e.target.previousElementSibling;
//         switchUnit(targetElem, activeElem); 
//     }
// })