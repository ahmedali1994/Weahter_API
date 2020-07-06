const request = require("request");

const forecast = (placeName, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=05d9e812c4cd60085742af53f3aefc27&%20query=" +
    placeName +
    "&units=f";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service ==>" + error, undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      const data = {
        temp: response.body.current.temperature,
        icon: response.body.current.weather_icons[0],
        time: response.body.current.observation_time,
        weatherDes: response.body.current.weather_descriptions[0],
        name: response.body.location.name,
        country: response.body.location.country,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
