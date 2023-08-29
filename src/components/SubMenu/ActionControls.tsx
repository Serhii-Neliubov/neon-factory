import React from "react";

export const ActionControls = ({ isControlsActive, controlsButtonHandler }) => {
  return (
    <button
      onClick={controlsButtonHandler}
      className={`BrusselsButton ${
        isControlsActive ? "BrusselsButton_open" : ""
      }`}
      id="controlsButton"
    >
      {isControlsActive ? "Close Controls" : "Open Controls"}
    </button>
  );
};
