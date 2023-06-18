import { switchUnits } from "./dom";

function event (e) {
    const cls = e.target.classList;
    
    switch (true) {
        case cls.contains('unit'):
            switchUnits(e.target, e.target.nextElementSibling === null?
                 e.target.previousElementSibling: e.target.nextElementSibling);
            break;
    };
};

export { event }