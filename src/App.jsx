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
      styles: [
        // default themes provided by MB Draw
        // default themes provided by MB Draw
        // default themes provided by MB Draw
        // default themes provided by MB Draw

        {
          id: "gl-draw-polygon-fill-inactive",
          type: "fill",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "fill-color": "#3bb2d0",
            "fill-outline-color": "#3bb2d0",
            "fill-opacity": 0.1,
          },
        },
        {
          id: "gl-draw-polygon-fill-active",
          type: "fill",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          paint: {
            "fill-color": "#fbb03b",
            "fill-outline-color": "#fbb03b",
            "fill-opacity": 0.1,
          },
        },
        {
          id: "gl-draw-polygon-midpoint",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
          paint: {
            "circle-radius": 3,
            "circle-color": "#fbb03b",
          },
        },
        {
          id: "gl-draw-polygon-stroke-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#3bb2d0",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#fbb03b",
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-line-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#3bb2d0",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-line-active",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["==", "active", "true"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#fbb03b",
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-color": "#fff",
          },
        },
        {
          id: "gl-draw-polygon-and-line-vertex-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 3,
            "circle-color": "#fbb03b",
          },
        },
        {
          id: "gl-draw-point-point-stroke-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-opacity": 1,
            "circle-color": "#fff",
          },
        },
        {
          id: "gl-draw-point-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 3,
            "circle-color": "#3bb2d0",
          },
        },
        {
          id: "gl-draw-point-stroke-active",
          type: "circle",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["==", "active", "true"],
            ["!=", "meta", "midpoint"],
          ],
          paint: {
            "circle-radius": 7,
            "circle-color": "#fff",
          },
        },
        {
          id: "gl-draw-point-active",
          type: "circle",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["!=", "meta", "midpoint"],
            ["==", "active", "true"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-color": "#fbb03b",
          },
        },
        {
          id: "gl-draw-polygon-fill-static",
          type: "fill",
          filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
          paint: {
            "fill-color": "#404040",
            "fill-outline-color": "#404040",
            "fill-opacity": 0.1,
          },
        },
        {
          id: "gl-draw-polygon-stroke-static",
          type: "line",
          filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#404040",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-line-static",
          type: "line",
          filter: [
            "all",
            ["==", "mode", "static"],
            ["==", "$type", "LineString"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#404040",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-point-static",
          type: "circle",
          filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
          paint: {
            "circle-radius": 5,
            "circle-color": "#404040",
          },
        },

        // end default themes provided by MB Draw
        // end default themes provided by MB Draw
        // end default themes provided by MB Draw
        // end default themes provided by MB Draw

        // new styles for toggling colors
        // new styles for toggling colors
        // new styles for toggling colors
        // new styles for toggling colors

        {
          id: "gl-draw-polygon-color-picker",
          type: "fill",
          filter: [
            "all",
            ["==", "$type", "Polygon"],
            ["has", "user_portColor"],
          ],
          paint: {
            "fill-color": ["get", "user_portColor"],
            "fill-outline-color": ["get", "user_portColor"],
            "fill-opacity": 0.5,
          },
        },
        {
          id: "gl-draw-line-color-picker",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["has", "user_portColor"],
          ],
          paint: {
            "line-color": ["get", "user_portColor"],
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-point-color-picker",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["has", "user_portColor"]],
          paint: {
            "circle-radius": 3,
            "circle-color": ["get", "user_portColor"],
          },
        },
      ],
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
