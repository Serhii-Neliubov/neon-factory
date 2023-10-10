import React from "react";
import { ZoomInButton } from "./ZoomInButton";
import ZoomOutButton from "./ZoomOutButton";
import RotateLeftButton from "./RotateLeftButton";
import RotateRightButton from "./RotateRightButton";
import IncreasePitchButton from "./IncreasePitchButton";
import DecreasePitchButton from "./DecreasePitchButton";
import { ActionControls } from "./ActionControls";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SubMenu = ({ map, submenuTag }) => {
  const isControlsActive = useSelector(
    (state: RootState) => state.activeControl.value
  );
  return (
    <>
      <ActionControls></ActionControls>
      <div
        className={isControlsActive ? "submenu submenu_open" : "submenu"}
        ref={submenuTag}
        id="controlsSubMenu"
      >
        <ZoomInButton map={map}>Zoom In</ZoomInButton>
        <ZoomOutButton map={map}>Zoom Out</ZoomOutButton>
        <RotateLeftButton map={map}>Rotate Left</RotateLeftButton>
        <RotateRightButton map={map}>Rotate Right</RotateRightButton>
        <IncreasePitchButton map={map}>Increase Pitch</IncreasePitchButton>
        <DecreasePitchButton map={map}>Decrease Pitch</DecreasePitchButton>
      </div>
    </>
  );
};

export default SubMenu;
