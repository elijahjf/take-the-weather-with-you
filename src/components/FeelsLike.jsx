import React from "react";

const FeelsLike = ({ feelsLikeTemp }) => {
  // Round temp to the nearest whole number
  const roundFeelsLikeTemp = Math.round(feelsLikeTemp);

  return (
    <div className="feels-like-div">
      <span className="feels-like-temp">{roundFeelsLikeTemp}&#8451;</span>
    </div>
  );
};

export default FeelsLike;
