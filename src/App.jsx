import { useEffect, useState, useRef } from "react";

// MapBox
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

// Css
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Components
import SubMenu from "./components/SubMenu/SubMenu";
import ResetMap from "./components/ResetMap";
import PrintScreen from "./components/PrintScreen";
import ToggleButton from "./components/ToggleMenu/ToggleButton";
import AllDistrictsButton from "./components/ToggleMenu/AllDistrictsButton";

// Utils
import defaultDrawStyles from "./utils/DefaultDrawStyles";
//Map functions
import {
  createCustomMarkerElement,
  removeCustomMarker,
  toggleAllDistrictsVisibility,
  toggleButton,
} from "./utils/MapFunctions";

function App() {
  const [map, setMap] = useState(null);
  const [isControlsActive, setIsControlsActive] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isAllDistrictsVisible, setIsAllDistrictsVisible] = useState(true);
  const [isAllDistrictsSelected, setIsAllDistrictsSelected] = useState(false);
  const [draw, setDraw] = useState(null);
  const submenuTag = useRef();
  const mapTag = useRef();
  const colorPicker = useRef();
  const geocoderContainer = useRef();
  const drawMenu = document.querySelector(".mapboxgl-ctrl-top-right");
  const sreenLogo = document.querySelector(".logo-map");
  const palette = document.querySelector(".palette");
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
  var drawFeatureID =
    "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";
  var newDrawFeature = false;

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

    let mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
      center: [4.387564, 50.838193],
      zoom: 11,
      preserveDrawingBuffer: true,
    };

    let map = new mapboxgl.Map(mapSettings);
    setMap(map);

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Your Address Here",
      marker: {
        draggable: false,
        element: createCustomMarkerElement(),
        animate: false,
      },
    });
    const colorPicker = document.getElementById("colorPicker");

    colorPicker.addEventListener("input", function () {
      var selectedColor = colorPicker.value;

      if (drawFeatureID !== "" && typeof draw === "object") {
        // Установите выбранный цвет для выбранной фигуры
        draw.setFeatureProperty(drawFeatureID, "portColor", selectedColor);

        // Обновите фигуру на карте
        var feat = draw.get(drawFeatureID);
        draw.add(feat);
      }
    });
    var draw = new MapboxDraw({
      // this is used to allow for custom properties for styling
      // it appends the word "user_" to the property
      userProperties: true,
      controls: {
        combine_features: false,
        uncombine_features: false,
      },
      styles: defaultDrawStyles,
    });

    setDraw(draw);

    map.addControl(draw, "top-right");

    var setDrawFeature = function (e) {
      if (e.features.length && e.features[0].type === "Feature") {
        var feat = e.features[0];
        drawFeatureID = feat.id;
      }
    };

    map.on("draw.update", setDrawFeature);

    map.on("draw.selectionchange", setDrawFeature);

    map.on("click", function (e) {
      if (!newDrawFeature) {
        var drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : "";
      }

      newDrawFeature = false;
    });

    map.on("draw.create", function () {
      newDrawFeature = true;
    });

    const geocoderContainerRef = geocoderContainer.current;
    geocoderContainerRef.appendChild(geocoder.onAdd(map));

    return () => {
      geocoderContainerRef.removeChild(geocoderContainerRef.firstChild);
    };
  }, []);

  function controlsButtonHandler() {
    let submenuDisplay =
      submenuTag.current.style.display === "none" ? "block" : "none";
    setIsControlsActive(!isControlsActive);
    submenuTag.current.style.display = submenuDisplay;
  }

  function allDistrictsButtonHandler() {
    if (isAllDistrictsVisible) {
      setSelectedDistricts(allDistricts);
      toggleAllDistrictsVisibility(selectedDistricts, map);
      map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");

      setIsAllDistrictsSelected(true);
    } else {
      setSelectedDistricts([]);
      allDistricts.forEach((district) => {
        if (selectedDistricts.includes(district)) {
          toggleButton(district, selectedDistricts, map);
        }
      });
      toggleAllDistrictsVisibility(selectedDistricts, map);

      setIsAllDistrictsSelected(false);
    }
  }

  function changeColor(selectedColor) {
    if (drawFeatureID !== "" && typeof draw === "object") {
      // Установите выбранный цвет для выбранной фигуры
      draw.setFeatureProperty(drawFeatureID, "portColor", selectedColor);

      // Обновите фигуру на карте
      var feat = draw.get(drawFeatureID);
      draw.add(feat);
    }
  }

  return (
    <div id="mapContainer">
      <div className="sidebar">
        <img alt="Logo" className="logo" src="logo.png" />
        <div ref={geocoderContainer}></div>
        <div className="greenLine"></div>
        <SubMenu
          controlsButtonHandler={controlsButtonHandler}
          isControlsActive={isControlsActive}
          map={map}
          submenuTag={submenuTag}
        ></SubMenu>
        <div className="greenLine"></div>
        <ResetMap
          draw={draw}
          map={map}
          removeCustomMarker={removeCustomMarker}
          setSelectedDistricts={setSelectedDistricts}
          setIsAllDistrictsVisible={setIsAllDistrictsVisible}
        ></ResetMap>
        <div className="greenLine"></div>
        Brussels
        <div className="greenLine"></div>
        <div className="toggleContainer">
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="CD"
            id="CBDButton"
          >
            Center District
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="EU"
            id="EUButton"
          >
            European District
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="Louise"
            id="LouiseButton"
          >
            Louise
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="North"
            id="NorthButton"
          >
            North
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="NE"
            id="NEButton"
          >
            North-East
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="NW"
            id="NEButton"
          >
            North-West
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="South"
            id="NEButton"
          >
            South
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="SE"
            id="SEButton"
          >
            South-East
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
            selectedDistricts={selectedDistricts}
            data="SW"
            id="SEButton"
          >
            South-West
          </ToggleButton>
          <ToggleButton
            isAllDistrictsSelected={isAllDistrictsSelected}
            toggleButton={toggleButton}
            map={map}
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
            palette={palette}
            sreenLogo={sreenLogo}
            drawMenu={drawMenu}
            mapTag={mapTag.current}
          >
            Print Screen
          </PrintScreen>
        </div>
      </div>
      <div id="map" ref={mapTag} style={{ flex: 1, position: "relative" }}>
        <input
          type="color"
          ref={colorPicker}
          id="colorPicker"
          className="palette"
          onChange={(event) => changeColor(event.target.value)}
        />
        <img alt="Logo" className="logo-map" src="logo.png" />
      </div>
    </div>
  );
}

export default App;
