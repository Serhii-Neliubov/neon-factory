import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { controlActiveChanging } from "../../redux/slices/ControlActiveSlice";

export const ActionControls = () => {
  const dispatch = useDispatch();
  const isControlsActive = useSelector(
    (state: RootState) => state.activeControl.value
  );
  return (
    <button
      onClick={() => dispatch(controlActiveChanging())}
      className={`BrusselsButton ${
        isControlsActive ? "BrusselsButton_open" : ""
      }`}
      id="controlsButton"
    >
      {isControlsActive ? "Close Controls" : "Open Controls"}
    </button>
  );
};
