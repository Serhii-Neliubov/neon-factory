import React from "react";

const ResetMap = ({
  map,
  selectedDistricts,
  removeCustomMarker,
  setIsActive,
}) => {
  function resetMapButtonHandler() {
    removeCustomMarker();
    setIsActive(false);
    map.flyTo({
      center: [4.387564, 50.838193],
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });

    selectedDistricts = [];

    map.setStyle("mapbox://styles/neon-factory/clf8a2hoq001r01mukt9dgsmp");

    // Сбрасываем видимость надписей в боковой панели
    var sidebarLabels = document.querySelectorAll(".sidebar-label");
    sidebarLabels.forEach(function (label) {
      label.classList.remove("hidden");
    });
  }

  return (
    <button onClick={resetMapButtonHandler} className="controlButton resetMap">
      Reset Map
    </button>
  );
};

export default ResetMap;
