import React from "react";

const DecreasePitchButton = ({ map, children }) => {
  function decreasePitchButtonHandler() {
    let currentPitch = map.getPitch();
    map.setPitch(currentPitch - 5);
  }
  return (
    <button
      onClick={decreasePitchButtonHandler}
      className="actionButton decreasePitch"
    >
      {children}
    </button>
  );
};

export default DecreasePitchButton;
