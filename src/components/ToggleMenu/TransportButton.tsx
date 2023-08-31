import React from "react";
import { useState } from "react";

const TransportButton = ({ children, toggleTransportLayerVisibility }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            toggleTransportLayerVisibility();
            handleClick();
          }}
          className="toggleButton"
          id="mapIconsToggle"
        >
          {children}
        </button>
        <div
          onClick={() => {
            toggleTransportLayerVisibility();
            handleClick();
          }}
          className={!toggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default TransportButton;
