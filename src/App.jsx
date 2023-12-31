import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import SubMenu from "./components/SubMenu/SubMenu";
import ResetMap from "./components/ResetMap";
import PrintScreen from "./components/PrintScreen";
import Logo from "./components/logo";
import ToggleButton from "./components/ToggleMenu/ToggleButton";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

function App() {
  let [map, setMap] = useState(null);
  const [isControlsActive, setIsControlsActive] = useState(false);
  let submenu = document.querySelector(".submenu");
  const pageElement = document.querySelector("#map");
  let selectedDistricts = [];
  let allDistrictsVisible = false;
  let drawMenu = document.querySelector(".mapboxgl-ctrl-top-right");

  useEffect(() => {
    let mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clf8a2hoq001r01mukt9dgsmp",
      center: [4.387564, 50.838193],
      zoom: 11,
      preserveDrawingBuffer: true,
    };

    let map = new mapboxgl.Map(mapSettings);
    setMap(map);
    let geocoderContainer = document.getElementById("geocoderContainer");

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Your Address Here",
      marker: {
        draggable: false,
        element: createCustomMarkerElement(),
      },
    });

    const draw = new MapboxDraw({
      userProperties: true,
      controls: {
        marker: true, // Включите инструмент "Marker"
        // Другие инструменты рисования, если необходимо
      },
      modes: {
        ...MapboxDraw.modes,
      },
    });

    map.on("load", function () {
      map.addControl(draw);
    });

    geocoderContainer.appendChild(geocoder.onAdd(map));
  }, []);

  function createCustomMarkerElement() {
    let element = document.createElement("div");
    element.className = "custom-marker";
    element.style.backgroundImage = "url(/pin.png)";
    element.style.width = "32px"; // Установите желаемую ширину и высоту маркера
    element.style.height = "32px";
    return element;
  }

  function removeCustomMarker() {
    // Get the custom marker element
    let customMarker = document.querySelector(".custom-marker");

    // Remove the custom marker from the map
    if (customMarker) {
      customMarker.parentNode.removeChild(customMarker);
    }
  }

  function controlsButtonHandler() {
    let submenuDisplay = submenu.style.display === "none" ? "block" : "none";
    setIsControlsActive(!isControlsActive);
    submenu.style.display = submenuDisplay;
  }

  /*===================================================================================*/

  function allDistrictsButtonHandler() {
    allDistrictsVisible = !allDistrictsVisible; // Toggle the state of allDistrictsVisible

    if (allDistrictsVisible) {
      // Show all districts
      selectedDistricts = [
        "SW",
        "SE",
        "CD",
        "EU",
        "NE",
        "NW",
        "Airport",
        "Louise",
        "North",
        "South",
      ];
    } else {
      // Hide all districts
      selectedDistricts = [];
    }

    // Toggle visibility of all districts
    toggleAllDistrictsVisibility();
  }

  function toggleAllDistrictsVisibility() {
    var districtsToShow = [];

    if (selectedDistricts.length === 0) {
      // districtsToShow.push(["!=", ["get", "sidebar_label"], ""]);
    } else {
      selectedDistricts.forEach(function (district) {
        districtsToShow.push(["==", ["get", "sidebar_label"], district]);
      });
    }

    map.setFilter("districts-brussels-0-2", ["any"].concat(districtsToShow));

    // Обновите карту
    map.triggerRepaint();
  }

  function toggleButton(data) {
    const districtIndex = selectedDistricts.indexOf(data);

    if (districtIndex === -1) {
      // Если район не выбран, добавьте его в список
      selectedDistricts.push(data);
    } else {
      // Если район уже выбран, удалите его из списка
      selectedDistricts.splice(districtIndex, 1);
    }

    // Переключите видимость всех районов
    toggleAllDistrictsVisibility();
  }

  return (
    <div id="mapContainer">
      <div className="sidebar">
        <Logo />
        <div id="geocoderContainer"></div>
        <div className="greenLine"></div>
        <SubMenu
          controlsButtonHandler={controlsButtonHandler}
          isControlsActive={isControlsActive}
          map={map}
        ></SubMenu>
        <div className="greenLine"></div>
        <ResetMap
          map={map}
          removeCustomMarker={removeCustomMarker}
          selectedDistricts={selectedDistricts}
        ></ResetMap>
        <div className="greenLine"></div>
        Brussels
        <div className="greenLine"></div>
        <div className="toggleContainer">
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="CD"
            id="CBDButton"
          >
            Center District
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="EU"
            id="EUButton"
          >
            European District
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="Louise"
            id="LouiseButton"
          >
            Louise
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="North"
            id="NorthButton"
          >
            North
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="NE"
            id="NEButton"
          >
            North-East
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="NW"
            id="NEButton"
          >
            North-West
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="South"
            id="NEButton"
          >
            South
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="SE"
            id="SEButton"
          >
            South-East
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="SW"
            id="SEButton"
          >
            South-West
          </ToggleButton>
          <ToggleButton
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="Airport"
            id="SEButton"
          >
            Airport
          </ToggleButton>

          <button
            onClick={allDistrictsButtonHandler}
            data-district="All"
            className="toggleButton"
            id="allDistrictsButton"
          >
            All Districts
          </button>
          <div className="greenLine"></div>
          <PrintScreen
            toggleAllDistrictsVisibility={toggleAllDistrictsVisibility}
            drawMenu={drawMenu}
            pageElement={pageElement}
          >
            Print Screen
          </PrintScreen>
        </div>
      </div>
      <div id="map" style={{ flex: 1, position: "relative" }}>
        <a href="https://neon-factory.design">
          <img alt="Logo" className="logo-map" src="public/logo.png" />
        </a>
      </div>
    </div>
  );
}

export default App;
