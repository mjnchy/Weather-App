import { displayMainStats, setBackground, switchUnits, } from "./dom";
import {} from "./eventFunctions";

window.onload = () => {
    displayMainStats('okemos', () => {
        setBackground();
    });
};

// if (e.target.classList.contains('unit')) {
    //     const current = 
    //     e.target.nextElementSibling === null? e.target.previousElementSibling: e.target.nextElementSibling;
    //     switchUnits(e.target, current);
    // }
    // switch (e.target.className) {
    //     case 'unit':
    //         const current = 
    //         e.target.nextElementSibling === null? e.target.previousElementSibling: e.target.nextElementSibling;
    //         console.log(e.target, current)
    //         switchUnits(e.target, current);
    //         break;
    // }
// )