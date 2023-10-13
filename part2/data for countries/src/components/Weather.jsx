import React, { useEffect, useState } from "react";

// WeatherApp.js - Component to fetch and display weather data
const WeatherApp = ({ capital }) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState(null);

  console.log(apiKey);

  useEffect(() => {
    if (apiKey) {
      console.log("h");
      console.log(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
      );
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data));
    }
  }, [apiKey, capital]);

  return (
    <div>
      {weatherData && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
