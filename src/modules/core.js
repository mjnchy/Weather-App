function getLocation (input) {
    return input !== ''? input: null;
};

async function getCurrentStats (input) {
    const location = getLocation(input);
    const key = "6f8ce6b5eba440609be174223231106";
    
    const queryStr = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    
    if (location === null) null
    else {
        const response = await fetch(queryStr);
        const json = await response.json();

        return json;
    };
};

async function getSunStats (lat, long) {
    const queryStr = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;

    const response = await fetch(queryStr);
    const json = await response.json();

    return json;
};

export {getCurrentStats, getSunStats};