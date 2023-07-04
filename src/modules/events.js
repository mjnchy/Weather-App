import { event, loadPage, loadStats } from "./eventFunctions";

window.onload = loadStats('okemos');

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    loadPage();
});

window.addEventListener('click', event);