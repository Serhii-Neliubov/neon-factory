import React from "react";
import { useState } from "react";

const MapIconsToggle = ({ children, toggleDistrictLayerVisibility }) => {
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            toggleDistrictLayerVisibility();
            handleClick();
          }}
          className="toggleButton"
          id="mapIconsToggle"
        >
          {children}
        </button>
        <div
          onClick={() => {
            toggleDistrictLayerVisibility();
            handleClick();
          }}
          className={!toggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default MapIconsToggle;
