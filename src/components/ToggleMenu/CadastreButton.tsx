import React from "react";
import { useState, useEffect } from "react";

const CadastreButton = ({ children, showCadastre, setShowCadastre, map }) => {
  const [toggleClass, setToggleClass] = useState<string>("");

  function toggleTransportLayerVisibility() {
    setShowCadastre((prev) => !prev);
    if (!showCadastre) {
      map.setLayoutProperty(
        "bruxelles-cadastre-complet-7xijuk",
        "visibility",
        "visible"
      );
      map.setLayoutProperty("building", "visibility", "none");
    } else {
      map.setLayoutProperty(
        "bruxelles-cadastre-complet-7xijuk",
        "visibility",
        "none"
      );
      map.setLayoutProperty("building", "visibility", "visible");
    }
  }

  useEffect(() => {
    if (showCadastre) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [showCadastre]);

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
export default CadastreButton;
