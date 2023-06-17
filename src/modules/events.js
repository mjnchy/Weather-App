import { displayMainStats, switchUnits, } from "./dom";

window.onload = () => {
    displayMainStats('okemos');
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('unit')) {
        const current = e.target.nextElementSibling !== null?e.target.nextElementSibling: e.target.previousElementSibling;
        switchUnits(e.target, current);
    };
})