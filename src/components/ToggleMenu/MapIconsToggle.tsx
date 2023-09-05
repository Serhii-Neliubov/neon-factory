import React from "react";
import { useState, useEffect } from "react";

const MapIconsToggle = ({
  children,
  setServicesAction,
  servicesAction,
  map,
}) => {
  const [toggle, setToggle] = useState(false);
  const [toggleClass, setToggleClass] = useState<string>("");

  function toggleDistrictLayerVisibility() {
    setServicesAction((prev) => !prev);
    if (!servicesAction) {
      map.setLayoutProperty("poi-label", "visibility", "visible");
      setToggle(true);
    } else {
      map.setLayoutProperty("poi-label", "visibility", "none");
      setToggle(false);
    }
  }

  useEffect(() => {
    if (servicesAction) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [servicesAction]);

  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => {
          toggleDistrictLayerVisibility();
        }}
        className="toggleButton"
        id="mapIconsToggle"
      >
        {children}
      </button>
      <div
        onClick={() => {
          toggleDistrictLayerVisibility();
        }}
        className={toggleClass}
      ></div>
    </div>
  );
};
export default MapIconsToggle;
