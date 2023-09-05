import React from "react";
import { ZoomInButton } from "./ZoomInButton";
import ZoomOutButton from "./ZoomOutButton";
import RotateLeftButton from "./RotateLeftButton";
import RotateRightButton from "./RotateRightButton";
import IncreasePitchButton from "./IncreasePitchButton";
import DecreasePitchButton from "./DecreasePitchButton";
import { ActionControls } from "./ActionControls";

const SubMenu = ({
  map,
  isControlsActive,
  controlsButtonHandler,
  submenuTag,
}) => {
  return (
    <>
      <ActionControls
        isControlsActive={isControlsActive}
        controlsButtonHandler={controlsButtonHandler}
      ></ActionControls>
      <div
        className="submenu"
        ref={submenuTag}
        id="controlsSubMenu"
        style={{ display: "none" }}
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
