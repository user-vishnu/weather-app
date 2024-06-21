let inputBox = document.querySelector(".input-box");
let searchBtn = document.querySelector("#search-btn");
let weatherImg = document.querySelector(".weather-img");
let temperature = document.querySelector(".temperature");
let weatherCondition = document.querySelector(".condition");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let weatherBody = document.querySelector(".weather-body");
let locationNotFound = document.querySelector(".location-not-found");

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

async function checkWeather(city) {
  const api_key = "6eb20060e1191ed3f82f893c3fb182c7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url).then((res) => res.json());

  if (weather_data.cod === "404") {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
  } else {
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    document.querySelector(
      "#text"
    ).textContent = `Weather details of ${city} is:`;

    temperature.innerHTML =
      `${Math.round(weather_data.main.temp - 273.15)}` + "<sup>°C</sup>";

    weatherCondition.innerHTML = weather_data.weather[0].description;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    wind.innerHTML = `${weather_data.wind.speed} kmph`;

    switch (weather_data.weather[0].main) {
      case "Clouds":
        weatherImg.src = "images/cloud.png";
        break;

      case "Clear":
        weatherImg.src = "images/clear.png";
        break;

      case "Mist":
        weatherImg.src = "images/mist.png";
        break;

      case "Haze":
        weatherImg.src = "images/haze.png";
        break;

      case "Rain":
        weatherImg.src = "images/rain.png";
        break;

      case "Snow":
        weatherImg.src = "images/snow.png";
        break;

      default:
        weatherImg.src = "images/weather.png";
    }
  }
}
