const key = "6f8ce6b5eba440609be174223231106";

async function getStats (input, callback) {
    const location = input;
    const queryStr = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=8`;
    
    if (location === null) null
    else {
        const response = await fetch(queryStr);
        const json = await response.json();
        console.log(json);
        callback && callback(json);
    };
};

export { getStats, };