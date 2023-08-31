import React from "react";

const ResetMap = ({
  map,
  setSelectedDistricts,
  removeCustomMarker,
  draw,
  setSqml,
  setIsAllDistrictsVisible,
  setCentralisedToggle,
  setIsCentralisedDistrictsVisible,
  setDecentralisedToggle,
  setIsDecentralisedDistrictsVisible,
  setAllDistrictsToggle,
  setServicesAction,
  setShowTransport,
}) => {
  function resetMapButtonHandler() {
    setCentralisedToggle(false);
    setServicesAction(false);
    setIsCentralisedDistrictsVisible(true);
    setDecentralisedToggle(false);
    setIsDecentralisedDistrictsVisible(true);
    setShowTransport(true);
    setAllDistrictsToggle(false);
    setIsAllDistrictsVisible(true);
    removeCustomMarker();
    setSqml(0);
    draw.deleteAll();
    map.flyTo({
      center: [4.387564, 50.838193],
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });

    setSelectedDistricts([]);
    map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");

    const inputElement = document.querySelector(".DefaultInput");
    if (inputElement) {
      inputElement.checked = true;
    }

    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });

      // Остальной код обработки карты также может быть здесь
    }
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
