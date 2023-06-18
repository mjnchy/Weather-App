function toggleClass (target, current) {
    if (target.classList.contains('inactive') && !target.classList.contains('active')) {
        target.classList.toggle('active');
        target.classList.toggle('inactive');        
    };

    if (current.classList.contains('active') && !current.classList.contains('inactive')) {
        current.classList.toggle('active');
        current.classList.toggle('inactive');
    };
};

function convert (targetUnit, elements) {
    const unit = targetUnit.dataset.unit;

    function equations (value) {
        return {
            c: Math.round((value - 32) * 5/9),
            f: (value * 9/5) + 32,
            mph: value * 0.621371,
            kph: value * 1.60934  
        };
    };

    elements.forEach(element => {
        const value = parseInt(element.textContent.match(/\d+/g));

        if (element.dataset.unit) {
            element.dataset.unit = unit;
            element.textContent = `${equations(value)[unit]} ${element.dataset.unit.toLocaleUpperCase()}`;
        }

        else element.textContent = `${equations(value)[unit]}`;
    });
};

export { toggleClass, convert }