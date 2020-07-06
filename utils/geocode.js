const request = require("request");

const mapBoxApi = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) + // This method ==> encodeURIComponent(city) <== is to avoid any special character such as ?/^&*%$
    ".json?access_token=pk.eyJ1IjoiYWhtZWRhbGlhYmQiLCJhIjoiY2tibDlmN2pvMTZ3ejJzb2RoMHlsZmpxcyJ9.DVKIykqNJN3j4X_A4tqMBw&limit=1";
  request({ url, json: true }, (error, { body }) => {
    //{body} !== body by itself
    if (error) {
      console.log("error 1");
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = mapBoxApi;
