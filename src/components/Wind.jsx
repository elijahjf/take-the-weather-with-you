import React from "react";

const Wind = ({ windSpeed, windDeg }) => {
  // Convert wind direction in degrees to compass direction
  const compassDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  const windIndex = Math.round((windDeg % 360) / 22.5);
  const windDirection = compassDirections[windIndex];

  return (
    <div className="wind-speed">
      {windSpeed ? `${windSpeed.toFixed(1)} km/h` : ""}
      {windDirection ? ` ${windDirection}` : ""}
    </div>
  );
};

export default Wind;
