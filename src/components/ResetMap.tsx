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
  mapStyleSetter,
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

    if (mapStyleSetter == 1) {
      map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
    } else if (mapStyleSetter == 2) {
      map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");
    } else if (mapStyleSetter == 3) {
      map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
    } else {
      map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
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
    <>
      <div className="greenLine"></div>

      <button
        onClick={resetMapButtonHandler}
        className="controlButton resetMap"
      >
        Reset Map
      </button>
      <div className="greenLine"></div>
    </>
  );
};

export default ResetMap;
