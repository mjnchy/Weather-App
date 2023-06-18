import { displayMainStats, setBackground } from "./dom";
import { event } from "./eventFunctions";

window.onload = () => {
    displayMainStats('okemos', () => {
        setBackground();
    });
};

window.addEventListener('click', event);