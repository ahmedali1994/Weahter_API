console.log("Hello =============>>");

// fetch("http://localhost:3000/weather?address=Cleveland").then((response) => {
//   console.log("debug11");

//   response.json().then((data) => {
//     //json().then !== json.then
//     console.log("debug");

//     if (data.error) {
//       console.log(data.error);
//       console.log("debug");
//     } else {
//       console.log("debug");
//       console.log(data);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const city = document.querySelector(".city");
const temp = document.querySelector(".weather-temp");
const dec = document.querySelector(".weather-des");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  city.textContent = "Loading...";

  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        //json().then !== json.then
        if (data.error) {
          city.textContent = data.error;
          temp.textContent = "";
        } else {
          city.textContent = data.name;
          temp.textContent = data.temp + "℉";
          dec.textContent = data.weatherdes;
        }
      });
    }
  );
});

const clear = () => {
  city.textContent = "";
  temp.textContent = "";
  dec.textContent = "";
};
