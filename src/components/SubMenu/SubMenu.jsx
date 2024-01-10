import { ZoomInButton } from "./ZoomInButton.jsx";
import ZoomOutButton from "./ZoomOutButton.jsx";
import RotateLeftButton from "./RotateLeftButton";
import RotateRightButton from "./RotateRightButton";
import IncreasePitchButton from "./IncreasePitchButton";
import DecreasePitchButton from "./DecreasePitchButton";
import { ActionControls } from "./ActionControls";
import { useSelector } from "react-redux";

const SubMenu = ({ map, submenuTag }) => {
  const isControlsActive = useSelector(
    (state) => state.activeControl.value
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
