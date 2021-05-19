const axios = require("axios");

module.exports = async (city) => {
    const lat = "41.9981";
    const lon = "21.4254";
    const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=9b5fa6d25b8720bf3aa2591a22661c04`
    );
    const data = res.data.list[0];
    console.log(data);

    city.city.airPollution = {
        day: new Date(data.dt).toLocaleDateString("en-US"),
        carbonMonoxid: data.components.co,
        ozone: data.components.o3,
        coarseParticulateMatter: data.components.pm10,
    };

    return city;
};
