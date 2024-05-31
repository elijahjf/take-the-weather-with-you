import React from "react";

const WeatherIcons = ({ iconCode, windDirection }) => {
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  const rotationStyle = {
    transform: `rotate(${windDirection}deg)`,
    display: "inline-block",
  };

  return (
    <div style={rotationStyle}>
      <img src={iconUrl} alt="Weather Icon" />
    </div>
  );
};

export default WeatherIcons;
