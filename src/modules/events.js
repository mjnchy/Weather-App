import { event, loadDefault, loadPage } from "./eventFunctions";

window.onload = loadDefault;

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    loadPage();
});

window.addEventListener('click', event);