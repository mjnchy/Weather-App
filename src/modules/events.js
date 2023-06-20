import { displayMainStats, displayTodayForeCast, setBackground } from "./dom";
import { event } from "./eventFunctions";

window.onload = () => {
    displayMainStats('okemos', (resolve) => {
        setBackground();
        displayTodayForeCast(resolve);
    });
};

window.addEventListener('click', event);