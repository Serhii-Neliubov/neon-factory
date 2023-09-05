import React from "react";

export const ActionControls = ({
  isControlsActive,
  controlsButtonHandler,
  setIsControlsActive,
}) => {
  return (
    <button
      onClick={() => setIsControlsActive(!isControlsActive)}
      className={`BrusselsButton`}
      id="controlsButton"
    >
      {isControlsActive ? "Close Controls" : "Open Controls"}
    </button>
  );
};
