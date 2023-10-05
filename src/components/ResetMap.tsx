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
  setOpenBrussels,
  setMapStyleButtonOpen,
  setIsControlsActive,
  setOpenTransport,
  setShowCadastre,
  selectedFeatures,
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
    setShowCadastre(false);
    setSqml(0);
    selectedFeatures.length = 0;

    setIsControlsActive(false);
    setOpenBrussels(false);
    setMapStyleButtonOpen(false);
    setOpenTransport(false);
    draw.deleteAll();
    map.flyTo({
      center: [4.387564, 50.845193],
      zoom: 10.8,
      bearing: 0,
      pitch: 0,
    });

    setSelectedDistricts([]);

    map.on("load", function () {
      console.log(selectedFeatures);
      map.on("mousemove", "custom-tileset-layer", function (e) {
        // ... Код обработки наведения мыши
      });
      map.on("click", "custom-tileset-layer", function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["custom-tileset-layer"],
        });

        if (features.length > 0) {
          var feature = features[0];

          // Проверяем, есть ли этот полигон уже в массиве
          var index = selectedFeatures.indexOf(feature.properties.CaPaKey);

          if (index === -1) {
            // Если полигон не найден в массиве, добавляем его и окрашиваем в синий цвет
            selectedFeatures.push(feature.properties.CaPaKey);
          } else {
            // Если полигон уже в массиве, удаляем его
            selectedFeatures.splice(index, 1);
          }
        }
      });
      // Clear the selectedFeatures array
      selectedFeatures.length = 0;
      map.on("idle", function () {
        // Обновляем стиль для всех фич в слое на основе массива selectedFeatures
        map.setPaintProperty("custom-tileset-layer", "fill-color", [
          "match",
          ["to-string", ["get", "CaPaKey"]],
          selectedFeatures.map(String),
          "rgb(76, 192, 173)", // Установите цвет заливки для выбранных фич (например, синий)
          "rgba(255, 255, 255, 0)", // Цвет заливки для остальных фич
        ]);
      });

      // Add a Tileset source and layer
      map.addLayer({
        id: "custom-tileset-layer",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://neon-factory.12ssh55s",
        },
        "source-layer": "Bruxelles_Cadastre_complet-7xijuk",
        paint: {
          "fill-color": "rgba(255, 255, 255, 0)",
          "fill-opacity": 0.3,
        },
      });
    });

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
      selectedFeatures.length = 0;
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });

      // Add a Tileset source and layer
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
