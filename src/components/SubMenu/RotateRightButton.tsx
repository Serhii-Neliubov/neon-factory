import React from "react";

const RotateRightButton = ({ map, children }) => {
  function rotateRightButtonHandler() {
    let currentRotation = map.getBearing();
    map.setBearing(currentRotation + 5);
  }
  return (
    <button
      onClick={rotateRightButtonHandler}
      className="controlButton rotateRight"
    >
      {children}
    </button>
  );
};

export default RotateRightButton;
