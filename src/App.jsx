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
import CentralisedDistrictsButton from './components/ToggleMenu/CentralisedDistrictsButton';
import DecentralisedDistrictsButton from './components/ToggleMenu/DecentralisedDistrictsButton';
import MapIconsToggle from './components/ToggleMenu/MapIconsToggle'
// Utils
import defaultDrawStyles from "./utils/DefaultDrawStyles";
//Map functions
import {
  createCustomMarkerElement,
  removeCustomMarker,
  toggleDistrictsVisibility,
  toggleButton,
  changeColor,
} from "./utils/MapFunctions";

function App() {
  const [map, setMap] = useState(null);
  const [isControlsActive, setIsControlsActive] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isAllDistrictsVisible, setIsAllDistrictsVisible] = useState(true);
  const [isCentralisedDistrictsVisible, setIsCentralisedDistrictsVisible] = useState(true);
  const [isDecentralisedDistrictsVisible, setIsDecentralisedDistrictsVisible] = useState(true);
  const [isAllDistrictsSelected, setIsAllDistrictsSelected] = useState(false);
  const [servicesAction, setServicesAction] = useState(false);
  const [draw, setDraw] = useState(null);
  const submenuTag = useRef();
  const mapTag = useRef();
  const colorPicker = useRef();
  const geocoderContainer = useRef();
  const newDrawFeature = useRef(false);
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
  const centralisedDistricts = [
    "Louise",
    "North",
    "South",
    "CD",
    "EU",
  ];
  const decentralisedDistricts = [
    "NE",
    "NW",
    "Airport",
    "SW",
    "SE",
  ]
  let [openBrussels, setOpenBrussels] = useState(false);
  const [Sqm, setSqml] = useState(0);

  let drawFeatureID =
    "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

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

    colorPicker.current.addEventListener("input", function () {
      var selectedColor = colorPicker.current.value;

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

    map.on("load", function () {
      map.addControl(draw);
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
        // Continue with your map initialization
        // ...
      });
    });

    var setDrawFeature = function (e) {
      if (e.features.length && e.features[0].type === "Feature") {
        var feat = e.features[0];
        drawFeatureID = feat.id;
      }
    };

    map.on("draw.update", setDrawFeature);

    map.on("draw.selectionchange", setDrawFeature);

    map.on("click", function (e) {
      if (!newDrawFeature.current) {
        var drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : "";
      }

      newDrawFeature.current = false;
    });

    map.on("draw.create", function () {
      newDrawFeature.current = true;
    });

    const geocoderContainerRef = geocoderContainer.current;
    geocoderContainerRef.appendChild(geocoder.onAdd(map));

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    function updateArea() {
      const data = draw.getAll();
      const area = turf.area(data);
      const sqm = Math.round(area * 100) / 100;

      if (data.features.length > 0) {
        setSqml(sqm);
      } else {
        setSqml(0);
      }
    }

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
      toggleDistrictsVisibility(selectedDistricts, map);
      map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");

      setIsAllDistrictsSelected(true);
    } else {
      setSelectedDistricts([]);
      allDistricts.forEach((district) => {
        if (selectedDistricts.includes(district)) {
          toggleButton(district, selectedDistricts, map);
        }
      });
      toggleDistrictsVisibility(selectedDistricts, map);
      setIsAllDistrictsSelected(false);
    }
  }

  function centralisedDistrictsButtonHandler() {
    if (isCentralisedDistrictsVisible) {
      setSelectedDistricts(centralisedDistricts);
      toggleDistrictsVisibility(centralisedDistricts, map);
      setIsCentralisedDistrictsVisible(false);
    } else {
      const withoutCentralisedDistricts = selectedDistricts.filter(district => !centralisedDistricts.includes(district));
      setSelectedDistricts(withoutCentralisedDistricts)
      toggleDistrictsVisibility(withoutCentralisedDistricts, map);
      setIsCentralisedDistrictsVisible(true);
    }
  }

  function decentralisedDistrictsButtonHandler() {
    if (isDecentralisedDistrictsVisible) {
      setSelectedDistricts(decentralisedDistricts);
      toggleDistrictsVisibility(decentralisedDistricts, map);
      setIsDecentralisedDistrictsVisible(false);
    } else {
      const withoutDecentralisedDistricts = selectedDistricts.filter(district => !decentralisedDistricts.includes(district));
      setSelectedDistricts(withoutDecentralisedDistricts)
      toggleDistrictsVisibility(withoutDecentralisedDistricts, map);
      setIsDecentralisedDistrictsVisible(true);
    }
  }

  function toggleDistrictLayerVisibility() {
    setServicesAction(prev => !prev);
    var layerId = "poi-label";

    if (servicesAction) {
      map.setLayoutProperty(layerId, "visibility", "visible");
    } else {
      map.setLayoutProperty(layerId, "visibility", "none");
    }
  }
  return (
    <div id="mapContainer">
      <div className="sidebar">
        <a href="https://neon-factory.design/">
          <img alt="Logo" className="logo" src="logo.png" />
        </a>
        <input
          type="color"
          ref={colorPicker}
          id="colorPicker"
          className="palette"
          onChange={(event) => changeColor(event.target.value, mapboxgl, draw)}
        />
        <div className="rightTopMenu">
          <div className="rightTopMenu-button rightTopMenu-button-line">
            Line
          </div>
          <div className="rightTopMenu-button rightTopMenu-button-shape">
            Shape
          </div>
          <div className="rightTopMenu-button rightTopMenu-button-location">
            Add Location
          </div>
          <div className="rightTopMenu-button rightTopMenu-button-erase">
            Erase
          </div>
          <div className="rightTopMenu-button rightTopMenu-button-color">
            Color
          </div>
        </div>
        <div className="calculation-box">
          <div id="calculated-area">{Sqm}sqm</div>
        </div>
        <div ref={geocoderContainer}></div>
        <div className="greenLine"></div>
        <SubMenu
          controlsButtonHandler={controlsButtonHandler}
          isControlsActive={isControlsActive}
          map={map}
          submenuTag={submenuTag}
        ></SubMenu>
        <div className="greenLine"></div>

        <button
          onClick={() => setOpenBrussels(!openBrussels)}
          className={`BrusselsButton ${
            openBrussels ? "BrusselsButton_open" : ""
          }`}
        >
          Brussels
        </button>
        <div className="greenLine"></div>
        {openBrussels ? (
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
              id="NWButton"
            >
              North-West
            </ToggleButton>
            <ToggleButton
              isAllDistrictsSelected={isAllDistrictsSelected}
              toggleButton={toggleButton}
              map={map}
              selectedDistricts={selectedDistricts}
              data="South"
              id="South"
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
              id="SWButton"
            >
              South-West
            </ToggleButton>
            <ToggleButton
              isAllDistrictsSelected={isAllDistrictsSelected}

              toggleButton={toggleButton}
              map={map}
              selectedDistricts={selectedDistricts}
              data="Airport"
              id="Airport"
            >
              Airport
            </ToggleButton>

            <CentralisedDistrictsButton
              centralisedDistrictsButtonHandler={centralisedDistrictsButtonHandler}
            >
              Centralised Districts
            </CentralisedDistrictsButton>

            <DecentralisedDistrictsButton
              decentralisedDistrictsButtonHandler={decentralisedDistrictsButtonHandler} 
            >
              Decentralised Districts
            </DecentralisedDistrictsButton>

            <AllDistrictsButton
              setIsAllDistrictsVisible={setIsAllDistrictsVisible}
              allDistrictsButtonHandler={allDistrictsButtonHandler}
              isAllDistrictsVisible={isAllDistrictsVisible}
            >
              All Districts
            </AllDistrictsButton>

            <div className="greenLine"></div>
          </div>
        ) : null}
        <PrintScreen
          palette={palette}
          sreenLogo={sreenLogo}
          drawMenu={drawMenu}
          mapTag={mapTag.current}
          colorPicker={colorPicker}
        >
          Print Screen
        </PrintScreen>

        <div className="greenLine"></div>
          <MapIconsToggle
            toggleDistrictLayerVisibility={toggleDistrictLayerVisibility}
          >
            Shop, Restaurants, Services...
          </MapIconsToggle>
        <div className="greenLine"></div>
        <ResetMap
          setSqml={setSqml}
          draw={draw}
          map={map}
          removeCustomMarker={removeCustomMarker}
          setSelectedDistricts={setSelectedDistricts}
          setIsAllDistrictsVisible={setIsAllDistrictsVisible}
        ></ResetMap>
      </div>
      <div id="map" ref={mapTag} style={{ flex: 1, position: "relative" }}>
        <img alt="Logo" className="logo-map" src="logo.png" />
      </div>
    </div>
  );
}

export default App;
