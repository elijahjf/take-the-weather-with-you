import { useEffect, useState } from "react";
import Search from "../search";
import WeatherIcons from "../WeatherIcons";
import Wind from "../Wind";
import FeelsLike from "../FeelsLike";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=67692539f53f151163778489e5f73501&units=metric`
      );

      const data = await response.json();

      console.log(data, "data");
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

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

  useEffect(() => {
    fetchWeatherData("Perth");
  }, []);

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
            <div className="temp">{weatherData?.main?.temp_min}&#8451;</div>
            <div className="min-max">Max</div>
            <div className="temp">{weatherData?.main?.temp_max}&#8451;</div>
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
        </div>
      )}
    </div>
  );
}
