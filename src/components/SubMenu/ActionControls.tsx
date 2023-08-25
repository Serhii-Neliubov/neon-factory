import React from "react";

export const ActionControls = ({ isControlsActive, controlsButtonHandler }) => {
  return (
    <button
      onClick={controlsButtonHandler}
      className="controlButton"
      id="controlsButton"
    >
      {isControlsActive ? "Close Controls" : "Open Controls"}
    </button>
  );
};
