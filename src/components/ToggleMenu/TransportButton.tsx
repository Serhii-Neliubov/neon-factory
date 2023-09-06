import React from "react";
import { useState, useEffect } from "react";

const TransportButton = ({
  children,
  showTransport,
  setShowTransport,
  map,
}) => {
  const [toggleClass, setToggleClass] = useState<string>("");

  function toggleTransportLayerVisibility() {
    setShowTransport((prev) => !prev);
    if (!showTransport) {
      map.setLayoutProperty("transit-label", "visibility", "visible");
    } else {
      map.setLayoutProperty("transit-label", "visibility", "none");
    }
  }

  useEffect(() => {
    if (showTransport) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [showTransport]);

  return (
    <div
      className="toggleButton"
      onClick={() => {
        toggleTransportLayerVisibility();
      }}
    >
      <div id="mapIconsToggle">{children}</div>
      <div className={toggleClass}></div>
    </div>
  );
};
export default TransportButton;
