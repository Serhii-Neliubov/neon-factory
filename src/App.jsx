import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "./App.css";

import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import html2canvas from "html2canvas";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

function App() {
  const [map, setMap] = useState(null);
  const districtButtons = document.querySelectorAll(".toggleButton");
  const submenu = document.querySelector(".submenu");
  const controlsButton = document.querySelector("#controlsButton");
  const sidebarLabels = document.querySelectorAll(".sidebar-label");

  const [districts, setDistricts] = useState({
    CBD: true,
    EU: true,
    Louise: true,
    North: true,
    NorthEast: true,
    NorthWest: true,
    South: true,
    SouthEst: true,
    SouthWest: true,
    Airport: true,
  });

  useEffect(() => {
    const mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clf8a2hoq001r01mukt9dgsmp",
      center: [4.387564, 50.838193],
      zoom: 11,
    };

    const map = new mapboxgl.Map(mapSettings);
    setMap(map);
    const geocoderContainer = document.getElementById("geocoderContainer");

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Your Adress Here",
      marker: {
        draggable: false,
        element: createCustomMarkerElement(),
      },
    });

    geocoderContainer.appendChild(geocoder.onAdd(map));
  }, []);

  function controlsButtonHandler() {
    const submenuDisplay = submenu.style.display === "none" ? "block" : "none";

    submenu.style.display = submenuDisplay;

    controlsButton.textContent =
      submenu.style.display === "none" ? "Open Controls" : "Close Controls";
  }

  function zoomInHandler() {
    map.zoomIn();
  }

  function zoomOutButtonHandler() {
    map.zoomOut();
  }

  function rotateLeftHandler() {
    const currentRotation = map.getBearing();
    map.setBearing(currentRotation - 15);
  }

  function rotateRightButtonHandler() {
    var currentRotation = map.getBearing();
    map.setBearing(currentRotation + 15);
  }

  function increasePitchButtonHandler() {
    var currentPitch = map.getPitch();
    map.setPitch(currentPitch + 10);
  }

  function decreasePitchButtonHandler() {
    var currentPitch = map.getPitch();
    map.setPitch(currentPitch - 10);
  }

  function toggleDistrictLayerVisibility(district, isVisible) {
    var layerId = "districts-brussels-0-2";
    var visibility = map.getLayoutProperty(layerId, "visibility");

    if (!isVisible) {
      map.setLayoutProperty(layerId, "visibility", "visible");
    }

    var updatedDistricts = { ...districts };

    if (district === "Centralised") {
      // Toggle the visibility of the "districts-brussels-0-2" layer for CBD, EU, Louise, and North
      var districtsToShow = ["CBD", "EU", "Louise", "North"];

      for (var i = 0; i < districtsToShow.length; i++) {
        map.setFilter(layerId, [
          "==",
          ["get", "sidebar_label"],
          districtsToShow[i],
        ]);
        map.setLayoutProperty(layerId, "visibility", "visible");
      }
    } else {
      if (visibility === "visible") {
        // Set the filter to hide the selected district
        map.setFilter(layerId, ["!=", ["get", "sidebar_label"], district]);
      } else {
        // Set the filter to show only the selected district
        map.setFilter(layerId, ["==", ["get", "sidebar_label"], district]);
      }

      // Toggle the visibility of the layer
      map.setLayoutProperty(
        layerId,
        "visibility",
        visibility === "visible" ? "none" : "visible"
      );
    }

    // Update the visibility of the district
    updatedDistricts[district] = isVisible;
    setDistricts(updatedDistricts);

    // Update the filter to show/hide the district
    var filter = ["==", ["get", "sidebar_label"], district];
    map.setFilter(layerId, filter);
    map.setLayoutProperty(layerId, "visibility", visibility);
  }

  function allDistrictsButtonHandler() {
    districts.forEach((district) => {
      toggleDistrictLayerVisibility(district, true);
    });
  }

  function printScreenHandler() {
    const center = map.getCenter();
    const currentZoom = map.getZoom();

    // Создайте временный элемент, чтобы вставить карту для скриншота
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "1920px"; // Ширина скриншота
    tempDiv.style.height = "1080px"; // Высота скриншота
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "0";
    tempDiv.style.left = "-99999px"; // Делаем элемент невидимым
    document.body.appendChild(tempDiv);

    // Создайте новую карту во временном элементе
    const tempMap = new mapboxgl.Map({
      container: tempDiv,
      style: "mapbox://styles/neon-factory/clf8a2hoq001r01mukt9dgsmp",
      center: center,
      zoom: currentZoom,
    });

    // Дождитесь загрузки карты
    tempMap.on("load", () => {
      // Используйте html2canvas для создания скриншота
      html2canvas(tempMap.getCanvas()).then(function (canvas) {
        // Преобразуйте скриншот в изображение
        const imgData = canvas.toDataURL("image/png");

        // Создайте ссылку для скачивания изображения
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "map-screenshot.png";

        // Добавьте ссылку на страницу и выполните клик для скачивания
        document.body.appendChild(a);
        a.click();

        // Очистите ресурсы и удалите временный элемент
        document.body.removeChild(a);
        tempMap.remove();
        document.body.removeChild(tempDiv);
      });
    });
  }

  function resetMapButtonHandler() {
    map.flyTo({
      center: [4.387564, 50.838193],
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });

    // Reset the visibility of all districts
    for (let district in districts) {
      toggleDistrictLayerVisibility(district, districts[district]);
    }

    // Reset the visibility of the main layer
    map.setLayoutProperty("districts-brussels-0-2", "visibility", "visible");

    // Reset the sidebar label visibility

    sidebarLabels.forEach((label) => {
      label.classList.remove("hidden");
    });
  }

  districtButtons.forEach((button) => {
    button.addEventListener("click", function () {
      var district = button.getAttribute("data-district");

      // Toggle the visibility of the sidebar label item named "North"
      toggleSidebarLabelItemVisibility(district);

      // Toggle the visibility of the "districts-brussels-0-2" layer based on 'sidebar_label' property
      toggleDistrictLayerVisibility(district);
    });
  });

  function centralisedButtonHandler() {
    var districtsToShow = ["CBD", "EU", "Louise", "North", "South"];

    toggleDistrictLayerVisibility(districtsToShow);
  }

  function toggleSidebarLabelItemVisibility(district) {
    // Find the sidebar label item with the corresponding district name
    var sidebarLabelItem = document.querySelector(
      '.sidebar-label[data-district="' + district + '"]'
    );

    if (sidebarLabelItem) {
      // Toggle the visibility of the sidebar label item
      sidebarLabelItem.classList.toggle("hidden");
    }
  }

  // Function to remove the custom marker
  // function removeCustomMarker() {
  //   // Get the custom marker element
  //   var customMarker = document.querySelector(".custom-marker");

  //   // Remove the custom marker from the map
  //   if (customMarker) {
  //     customMarker.parentNode.removeChild(customMarker);
  //   }
  // }

  function createCustomMarkerElement() {
    var element = document.createElement("div");
    element.className = "custom-marker";
    element.style.backgroundImage = "url(pin.png)";
    return element;
  }

  return (
    <div id="mapContainer">
      <div className="sidebar">
        <img alt="Logo" className="logo" src="LOGO_Neon-Factory.png" />
        <div id="geocoderContainer"></div>
        <div className="greenLine"></div>
        <button
          onClick={controlsButtonHandler}
          className="controlButton"
          id="controlsButton"
        >
          Open Controls
        </button>
        <div
          className="submenu"
          id="controlsSubMenu"
          style={{ display: "none" }}
        >
          <button onClick={zoomInHandler} className="controlButton zoomIn">
            Zoom In
          </button>
          <button
            onClick={zoomOutButtonHandler}
            className="controlButton zoomOut"
          >
            Zoom Out
          </button>
          <button
            onClick={rotateLeftHandler}
            className="controlButton rotateLeft"
          >
            Rotate Left
          </button>
          <button
            onClick={rotateRightButtonHandler}
            className="controlButton rotateRight"
          >
            Rotate Right
          </button>
          <button
            onClick={increasePitchButtonHandler}
            className="controlButton increasePitch"
          >
            Increase Pitch
          </button>
          <button
            onClick={decreasePitchButtonHandler}
            className="controlButton decreasePitch"
          >
            Decrease Pitch
          </button>
        </div>
        <div className="greenLine"></div>
        <button
          onClick={resetMapButtonHandler}
          className="controlButton resetMap"
        >
          Reset Map
        </button>
        <div className="greenLine"></div>
        Brussels
        <div className="greenLine"></div>
        <div className="toggleContainer">
          <button
            onClick={() => allDistrictsButtonHandler()}
            className="toggleButton"
            id="allDistrictsButton"
          >
            All Districts
          </button>
          <button
            onClick={centralisedButtonHandler}
            className="toggleButton"
            id="CBDEULouiseNorthButton"
          >
            Show Centralised Districts
          </button>
          <button className="toggleButton" data-district="CBD" id="CBDButton">
            Central Business district
          </button>
          <button className="toggleButton" data-district="EU" id="EUButton">
            European District
          </button>
          <button
            className="toggleButton"
            data-district="Louise"
            id="LouiseButton"
          >
            Louise
          </button>
          <button
            className="toggleButton"
            data-district="North"
            id="NorthButton"
          >
            North
          </button>
          <button className="toggleButton" data-district="NE" id="NEButton">
            North-East
          </button>
          <button className="toggleButton" data-district="NW" id="NWButton">
            North-West
          </button>
          <button
            className="toggleButton"
            data-district="South"
            id="SouthButton"
          >
            South
          </button>
          <button
            onClick={() => setDistricts(!districts.SouthEst)}
            className="toggleButton"
            data-district="SE"
            id="SEButton"
          >
            {districts.SouthEst ? "Show SouthEst" : "Hide SouthEst"}
          </button>
          <button
            className="toggleButton"
            data-district="SW"
            id="SWButton"
          ></button>
          <button
            className="toggleButton"
            data-district="Airport"
            id="AirportButton"
          >
            {districts.Airport ? "Show Airport" : "Hide Airport"}
          </button>
          <div className="greenLine"></div>
          <button onClick={printScreenHandler} className="PrintScreen">
            Print Screen
          </button>
        </div>
      </div>
      <div id="map" style={{ flex: 1 }}></div>
    </div>
  );
}

export default App;
