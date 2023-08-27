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
import ToggleButton from "./components/ToggleMenu/ToggleButton";
import AllDistrictsButton from "./components/ToggleMenu/AllDistrictsButton";
import Palette from "./components/Palette";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

function App() {
  let [map, setMap] = useState(null);
  const [isControlsActive, setIsControlsActive] = useState(false);
  let submenu = document.querySelector(".submenu");
  const pageElement = document.querySelector("#map");
  let [selectedDistricts, setSelectedDistricts] = useState([]);
  let [isAllDistrictsVisible, setIsAllDistrictsVisible] = useState(true);
  let [isAllDistrictsSelected, setIsAllDistrictsSelected] = useState(false);
  let drawMenu = document.querySelector(".mapboxgl-ctrl-top-right");
  const [draw, setDraw] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    let mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
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
        animate: false, // Отключить анимацию появления/исчезновения маркера
      },
    });

    const draw = new MapboxDraw({
      userProperties: true,
      controls: {
        marker: true,
        animate: false, // Отключить анимацию появления/исчезновения маркера
      },
      styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
          id: "gl-draw-line",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": selectedColor,
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        // polygon fill
        {
          id: "gl-draw-polygon-fill",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          paint: {
            "fill-color": selectedColor,
            "fill-outline-color": "#D20C0C",
            "fill-opacity": 0.1,
          },
        },
        // polygon mid points
        {
          id: "gl-draw-polygon-midpoint",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
          paint: {
            "circle-radius": 3,
            "circle-color": "#fbb03b",
          },
        },
        // polygon outline stroke
        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": selectedColor,
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        // vertex point halos
        {
          id: "gl-draw-polygon-and-line-vertex-halo-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-color": selectedColor,
          },
        },
        // vertex points
        {
          id: "gl-draw-polygon-and-line-vertex-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 3,
            "circle-color": selectedColor,
          },
        },

        // INACTIVE (static, already drawn)
        // line stroke
        {
          id: "gl-draw-line-static",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["==", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": selectedColor,
            "line-width": 3,
          },
        },
        // polygon fill
        {
          id: "gl-draw-polygon-fill-static",
          type: "fill",
          filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
          paint: {
            "fill-color": selectedColor,
            "fill-outline-color": selectedColor,
            "fill-opacity": 0.1,
          },
        },
        // polygon outline
        {
          id: "gl-draw-polygon-stroke-static",
          type: "line",
          filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": selectedColor,
            "line-width": 3,
          },
        },
        {
          id: "highlight-active-points",
          type: "symbol", // Измените тип на "symbol"
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["==", "active", "true"],
          ],
          layout: {
            "icon-image": "custom-pin", // Имя изображения без расширения файла
            "icon-size": 1,
            "icon-anchor": "bottom",
          },
          paint: {},
        },
        {
          id: "points-are-blue",
          type: "symbol",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["==", "active", "false"],
          ],
          layout: {
            "icon-image": "custom-pin", // Имя изображения без расширения файла
            "icon-size": 1,
            "icon-anchor": "bottom",
          },
          paint: {},
        },
      ],
      modes: {
        ...MapboxDraw.modes,
      },
    });
    setDraw(draw);
    map.on("load", function () {
      map.addControl(draw);

      map.loadImage("/pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);

        // Continue with your map initialization
        // ...
      });
    });

    geocoderContainer.appendChild(geocoder.onAdd(map));
  }, [selectedColor]);

  function createCustomMarkerElement() {
    let element = document.createElement("div");
    element.className = "custom-marker";
    element.style.backgroundImage = "url(/pin.svg)";
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

  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // Получите шестнадцатеричное значение цвета
  };
  /*===================================================================================*/

  function allDistrictsButtonHandler() {
    if (isAllDistrictsVisible) {
      setSelectedDistricts([
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
      ]);
      setIsAllDistrictsSelected(true);
      toggleAllDistrictsVisibility();
      map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
    } else {
      // Hide all districts
      // map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
      const allDistricts = [
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
      allDistricts.forEach((district) => {
        if (selectedDistricts.includes(district)) {
          toggleButton(district);
        }
      });
      setSelectedDistricts([]);
      setIsAllDistrictsSelected(false);
      toggleAllDistrictsVisibility();
    }
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
      <Palette
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
      />
      <div className="sidebar">
        <img alt="Logo" className="logo" src="logo.png" />
        <div id="geocoderContainer"></div>
        <div className="greenLine"></div>
        <SubMenu
          controlsButtonHandler={controlsButtonHandler}
          isControlsActive={isControlsActive}
          map={map}
        ></SubMenu>
        <div className="greenLine"></div>
        <ResetMap
          draw={draw}
          map={map}
          removeCustomMarker={removeCustomMarker}
          setSelectedDistricts={setSelectedDistricts}
        ></ResetMap>
        <div className="greenLine"></div>
        Brussels
        <div className="greenLine"></div>
        <div className="toggleContainer">
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="CD"
            id="CBDButton"
          >
            Center District
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="EU"
            id="EUButton"
          >
            European District
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="Louise"
            id="LouiseButton"
          >
            Louise
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="North"
            id="NorthButton"
          >
            North
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="NE"
            id="NEButton"
          >
            North-East
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="NW"
            id="NEButton"
          >
            North-West
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="South"
            id="NEButton"
          >
            South
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="SE"
            id="SEButton"
          >
            South-East
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="SW"
            id="SEButton"
          >
            South-West
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            selectedDistricts={selectedDistricts}
            data="Airport"
            id="SEButton"
          >
            Airport
          </ToggleButton>
          <AllDistrictsButton
            setIsAllDistrictsVisible={setIsAllDistrictsVisible}
            allDistrictsButtonHandler={allDistrictsButtonHandler}
            isAllDistrictsVisible={isAllDistrictsVisible}
            selectedDistricts={selectedDistricts}
          >
            All Districts
          </AllDistrictsButton>
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
        <img alt="Logo" className="logo-map" src="logo.png" />
      </div>
    </div>
  );
}

export default App;
