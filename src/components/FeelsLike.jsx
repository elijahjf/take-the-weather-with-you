import React from "react";

const FeelsLike = ({ feelsLikeTemp }) => {
  return (
    <div className="feels-like-div">
      <span className="feels-like-temp">{feelsLikeTemp}&#8451;</span>
    </div>
  );
};

export default FeelsLike;
