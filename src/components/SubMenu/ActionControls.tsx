import React from "react";

export const ActionControls = ({ isControlsActive, setIsControlsActive }) => {
  return (
    <button
      onClick={() => setIsControlsActive(!isControlsActive)}
      className={`BrusselsButton ${
        isControlsActive ? "BrusselsButton_open" : ""
      }`}
      id="controlsButton"
    >
      {isControlsActive ? "Close Controls" : "Open Controls"}
    </button>
  );
};
