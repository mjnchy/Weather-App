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

function convert (desiredUnit, currentUnit, elements) {
    // const equations 
    if (desiredUnit !== currentUnit) {
        desiredUnit === 'f'? 
        elements.forEach(element => element.textContent = `${(parseInt(element.textContent) * 9/5) + 32}`):
        elements.forEach(element => element.textContent = `${Math.round((parseInt(element.textContent) - 32) * 5/9)}`);
    };
};

export { toggleClass, convert }