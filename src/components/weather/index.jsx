import { useEffect, useState, useCallback } from "react";
import Search from "../search";
import WeatherIcons from "../WeatherIcons";
import Wind from "../Wind";
import FeelsLike from "../FeelsLike";
import FiveDayForecast from "../FiveDayForecast";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeatherData = useCallback(async (param) => {
    // Use useCallback here to memoize the function - function reference will only change if its dependencies change
    // Since the dependency array is empty ([]), the function reference won't change on every re-render, eliminating the warning.
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=67692539f53f151163778489e5f73501&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=67692539f53f151163778489e5f73501&units=metric`
        ),
      ]);

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json(),
      ]);

      if (weatherData && forecastData) {
        const processedForecast = processForecastData(forecastData);
        setWeatherData(weatherData);
        setForecastData(processedForecast);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentData() {
    return new Date().toLocaleDateString("en-au", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function getWeatherIcon(weatherData) {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return null;
    }
    const iconCode = weatherData.weather[0].icon;
    return <WeatherIcons iconCode={iconCode} />;
  }

  function processForecastData(data) {
    const dailyForecasts = {}; // Use an object to track min/max for each day

    data.list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-au", {
        weekday: "short",
      });
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          day: date,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          iconCode: item.weather[0].icon, // Take the first icon for simplicity
        };
      } else {
        dailyForecasts[date].minTemp = Math.min(
          dailyForecasts[date].minTemp,
          item.main.temp_min
        );
        dailyForecasts[date].maxTemp = Math.max(
          dailyForecasts[date].maxTemp,
          item.main.temp_max
        );
      }
    });

    return Object.values(dailyForecasts).slice(1, 6); // Convert to array, skip today
  }

  useEffect(() => {
    fetchWeatherData("Perth");
  }, [fetchWeatherData]);

  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentData()}</span>
          </div>
          <div className="temp-div">
            <div className="min-max">Min</div>
            <div className="temp">
              {Math.round(weatherData?.main?.temp_min)}&#8451;
            </div>
            <div className="min-max">Max</div>
            <div className="temp">
              {Math.round(weatherData?.main?.temp_max)}&#8451;
            </div>
            {weatherData && getWeatherIcon(weatherData)}
          </div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="feels-like">
                  {weatherData && (
                    <FeelsLike feelsLikeTemp={weatherData.main.feels_like} />
                  )}
                </p>
                <p>Feels Like</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="wind">
                  {weatherData && (
                    <Wind
                      windSpeed={weatherData.wind?.speed * 3.6} // convert to km per hr
                      windDeg={weatherData.wind?.deg}
                    />
                  )}
                </p>
                <p>Wind</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
          <div className="five-day-forecast-row">
            {!loading && forecastData && (
              <FiveDayForecast forecastData={forecastData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
