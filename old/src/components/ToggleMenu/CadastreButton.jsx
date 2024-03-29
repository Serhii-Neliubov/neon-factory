import { useState, useEffect } from "react";

const CadastreButton = ({ children, map, setShowCadastre, showCadastre }) => {
  const [toggleClass, setToggleClass] = useState("");

  function toggleTransportLayerVisibility() {
    setShowCadastre(!showCadastre);

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
