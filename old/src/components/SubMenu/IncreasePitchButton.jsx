import React from "react";

const IncreasePitchButton = ({ map, children }) => {
  function increasePitchButtonHandler() {
    let currentPitch = map.getPitch();
    map.setPitch(currentPitch + 5);
  }
  return (
    <button
      onClick={increasePitchButtonHandler}
      className="actionButton increasePitch"
    >
      {children}
    </button>
  );
};

export default IncreasePitchButton;
