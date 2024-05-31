import React from "react";
import WeatherIcons from "./WeatherIcons";

// Component for single day forecast
function DailyForecast({ day, minTemp, maxTemp, iconCode }) {
  return (
    <div className="daily-forecast">
      <p className="day">{day}</p>
      <WeatherIcons iconCode={iconCode} />
      <p>
        {Math.round(minTemp)}°C / {Math.round(maxTemp)}°C
      </p>
    </div>
  );
}

// Component for 5 day forecast
function FiveDayForecast({ forecastData }) {
  return (
    <div className="five-day-forecast">
      <h3>5-Day Forecast</h3>
      <div className="daily-forecasts">
        {forecastData.map((data, index) => (
          <DailyForecast key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default FiveDayForecast;
