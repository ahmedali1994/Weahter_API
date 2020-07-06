const forecastt = require("../utils/forecast.js");
const geocode = require("../utils/geocode.js");
const path = require("path"); // package to locate the path that script run from
const express = require("express");
const hbs = require("hbs");
const { error } = require("console");
const app = express();

//-------------PATH SECTION ------------------------------------------//
const publicDirectoryPath = path.join(__dirname, "../public"); // get the public folder path
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//-------------PATH SECTION ------------------------------------------//

//--------------------------SET VIEW ENGINE ---------------------------------//
app.use(express.static(publicDirectoryPath)); // let express know that is folder is need to be used
app.set("view engine", "hbs");
app.set("views", viewsPath); // set the views directory to views with s
hbs.registerPartials(partialsPath); // ==> registerPartials with  ==> S <==
//--------------------------SET VIEW ENGINE ---------------------------------//

//--------------------------ROUTE SECTION -----------------------------------//

app.get("/app", (req, res) => {
  res.render("index");
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "query error",
    });
  }
  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecastt(location, (error, weather) => {
      if (error) {
        return res.send({ error });
      } else {
        res.send({
          temp: weather.temp,
          icon: weather.icon,
          time: weather.time,
          weatherdes: weather.weatherDes,
          name: weather.name,
          country: weather.country,
        });
      }
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("page404");
});

//--------------------------ROUTE SECTION -----------------------------------//

//------------Start the server---------------//
app.listen(3000, () => {
  console.log("Server is on 3000");
});
