function getLocation (input) {
    return input !== ''? input: null;
};

async function getCurrentStats(input, callback) {
    const key = "6f8ce6b5eba440609be174223231106";
    const location = getLocation(input);
     const queryStr = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
     if (location === null) null
     else {
        await fetch(queryStr)
        .then(resolve => resolve.json())
        .then(resolve => callback && callback(resolve));
     };
};

async function getSunStats (lat, long, callback) {
    const queryStr = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
    
    await fetch(queryStr)
    .then(resolution => resolution.json())
    .then(result => callback(result));
};

export {getCurrentStats, getSunStats};