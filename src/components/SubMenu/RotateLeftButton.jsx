import React from "react";

const RotateLeftButton = ({ map, children }) => {
  function rotateLeftHandler() {
    let currentRotation = map.getBearing();
    map.setBearing(currentRotation - 5);
  }

  return (
    <button onClick={rotateLeftHandler} className="actionButton rotateLeft">
      {children}
    </button>
  );
};

export default RotateLeftButton;
