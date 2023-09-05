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
import AllDistrictsButton from "./components/ToggleMenu/AllDistrictsButton";
import MapIconsToggle from "./components/ToggleMenu/MapIconsToggle";
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
import TransportButton from "./components/ToggleMenu/TransportButton";
import LayoutChanger from "./components/LayoutChanger/LayoutChanger";
import ToggleMenu from "./components/ToggleMenu/ToggleMenu";
import RightTopMenuText from "./components/RightTopMenuText";

function App() {
  const [map, setMap] = useState(null);
  const [isControlsActive, setIsControlsActive] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isAllDistrictsVisible, setIsAllDistrictsVisible] = useState(true);
  const [isCentralisedDistrictsVisible, setIsCentralisedDistrictsVisible] =
    useState(true);

  const [isDecentralisedDistrictsVisible, setIsDecentralisedDistrictsVisible] =
    useState(true);
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
  const menuStyle = document.querySelector(".menuMapStyle");
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
  const centralisedDistricts = ["Louise", "North", "South", "CD", "EU"];
  const decentralisedDistricts = ["NE", "NW", "SW", "SE"];
  let [openBrussels, setOpenBrussels] = useState(false);
  const [Sqm, setSqml] = useState(0);
  const [showTransport, setShowTransport] = useState(true);
  const [centralisedToggle, setCentralisedToggle] = useState(false);
  const [decentralisedToggle, setDecentralisedToggle] = useState(false);
  const [allDistrictsToggle, setAllDistrictsToggle] = useState(false);
  const [mapStyleSetter, setMapStyleSetter] = useState(1);

  const drawFeatureID = useRef(
    "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A"
  );

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

      if (drawFeatureID.current !== "" && typeof draw === "object") {
        // Установите выбранный цвет для выбранной фигуры
        draw.setFeatureProperty(
          drawFeatureID.current,
          "portColor",
          selectedColor
        );

        // Обновите фигуру на карте
        var feat = draw.get(drawFeatureID.current);
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
    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", function () {
      map.addControl(draw);

      map.setLayoutProperty("poi-label", "visibility", "none");
    });
    map.on("click", "0", function (e) {
      const clickedPolygon = e.features[0]; // Получаем информацию о кликнутом полигоне
      // Вызываем функцию для отображения метров полигона

      showPolygonArea(clickedPolygon);
    });

    map.on("click", function (e) {
      if (!newDrawFeature.current) {
        var drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID.current = drawFeatureAtPoint.length
          ? drawFeatureAtPoint[0]
          : "";
        if (drawFeatureAtPoint.length) {
          // Если была найдена фигура, покажите её размер
          var clickedFeature = draw.get(drawFeatureAtPoint[0]);
          showPolygonArea(clickedFeature);
        } else {
          // Если фигура не была найдена, сбросьте отображение размера
          setSqml(0);
        }
      }

      newDrawFeature.current = false;
    });
    colorPicker.current.addEventListener("change", function (event) {
      changeColor(event.target.value, mapboxgl, draw);
    });

    function showPolygonArea(polygonFeature) {
      // eslint-disable-next-line no-undef
      const area = turf.area(polygonFeature.geometry);
      const sqm = Math.round(area * 100) / 100;
      // Выводим метры полигона в какой-либо элемент (например, модальное окно)
      setSqml(sqm);
    }

    map.on("draw.create", function (e) {
      newDrawFeature.current = true;
      updateArea(e); // Вызываем функцию обновления размера при создании новой фигуры
    });

    map.on("draw.delete", function () {
      newDrawFeature.current = true;
      setSqml(0); // Сбрасываем размер при удалении фигуры
    });

    map.on("draw.update", function (e) {
      if (newDrawFeature.current) {
        // Вызываем функцию обновления размера только если была создана новая фигура или произошло обновление
        updateArea(e);
      }
    });

    const geocoderContainerRef = geocoderContainer.current;
    geocoderContainerRef.appendChild(geocoder.onAdd(map));

    function updateArea(e) {
      const selectedFeature = e.features[0];

      if (selectedFeature) {
        // eslint-disable-next-line no-undef
        const area = turf.area(selectedFeature.geometry);
        const sqm = Math.round(area * 100) / 100;
        setSqml(sqm);
      }
    }

    return () => {
      geocoderContainerRef.removeChild(geocoderContainerRef.firstChild);
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });

      // Остальной код обработки карты также может быть здесь
    }
  }, [map]);

  function allDistrictsButtonHandler() {
    if (isAllDistrictsVisible) {
      setDecentralisedToggle(true);
      setIsDecentralisedDistrictsVisible(false);
      setCentralisedToggle(true);
      setIsCentralisedDistrictsVisible(false);

      setSelectedDistricts(allDistricts);
      toggleDistrictsVisibility(selectedDistricts, map);
      if (mapStyleSetter == 1) {
        map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
      } else if (mapStyleSetter == 2) {
        map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");
      } else if (mapStyleSetter == 3) {
        map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
      } else {
        map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
      }
      setIsAllDistrictsSelected(true);
    } else {
      setDecentralisedToggle(false);
      setIsDecentralisedDistrictsVisible(true);
      setCentralisedToggle(false);
      setIsCentralisedDistrictsVisible(true);

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
      setDecentralisedToggle(false);
      setIsDecentralisedDistrictsVisible(true);

      setSelectedDistricts(centralisedDistricts);
      toggleDistrictsVisibility(centralisedDistricts, map);

      setIsCentralisedDistrictsVisible(false);
    } else {
      const withoutCentralisedDistricts = selectedDistricts.filter(
        (district) => !centralisedDistricts.includes(district)
      );
      setSelectedDistricts(withoutCentralisedDistricts);
      toggleDistrictsVisibility(withoutCentralisedDistricts, map);
      setIsCentralisedDistrictsVisible(true);
    }
  }

  function decentralisedDistrictsButtonHandler() {
    if (isDecentralisedDistrictsVisible) {
      setCentralisedToggle(false);
      setIsCentralisedDistrictsVisible(true);

      setSelectedDistricts(decentralisedDistricts);
      toggleDistrictsVisibility(decentralisedDistricts, map);

      setIsDecentralisedDistrictsVisible(false);
    } else {
      const withoutDecentralisedDistricts = selectedDistricts.filter(
        (district) => !decentralisedDistricts.includes(district)
      );
      setSelectedDistricts(withoutDecentralisedDistricts);
      toggleDistrictsVisibility(withoutDecentralisedDistricts, map);
      setIsDecentralisedDistrictsVisible(true);
    }
  }

  function satelitteStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");

    const inputElement = document.querySelector(".SatelitteInput");
    if (inputElement) {
      inputElement.checked = true;
    }
    setMapStyleSetter(2);

    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });
    }
    setSelectedDistricts([]);
    setCentralisedToggle(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
    setShowTransport(true);
    setServicesAction(false);
  }

  function monochromeStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
    const inputElement = document.querySelector(".MonochromeInput");
    if (inputElement) {
      inputElement.checked = true;
    }
    setMapStyleSetter(3);

    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });

      // Остальной код обработки карты также может быть здесь
    }
    setSelectedDistricts([]);
    setCentralisedToggle(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
    setShowTransport(true);
    setServicesAction(false);
  }

  function darkStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
    const inputElement = document.querySelector(".DarkInput");
    setMapStyleSetter(4);
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
    setSelectedDistricts([]);
    setCentralisedToggle(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
    setShowTransport(true);
    setServicesAction(false);
  }

  function defaultStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
    setMapStyleSetter(1);
    setShowTransport(true);
    setServicesAction(false);

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
    setSelectedDistricts([]);
    setCentralisedToggle(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
  }

  useEffect(() => {
    if (map) {
      map.on("load", () => {
        document
          .querySelector(".mapboxgl-ctrl-group")
          .addEventListener("mouseover", function () {
            document.querySelector(".rightTopMenu-button-north").style.display =
              "unset";
          });
        document
          .querySelector(".mapboxgl-ctrl-group")
          .addEventListener("mouseout", function () {
            document.querySelector(".rightTopMenu-button-north").style.display =
              "none";
          });

        document
          .querySelector(".mapbox-gl-draw_line")
          .addEventListener("mouseover", function () {
            document.querySelector(".rightTopMenu-button-line").style.display =
              "unset";
          });
        document
          .querySelector(".mapbox-gl-draw_line")
          .addEventListener("mouseout", function () {
            document.querySelector(".rightTopMenu-button-line").style.display =
              "none";
          });

        document
          .querySelector(".mapbox-gl-draw_polygon")
          .addEventListener("mouseover", function () {
            document.querySelector(".rightTopMenu-button-shape").style.display =
              "unset";
          });

        document
          .querySelector(".mapbox-gl-draw_polygon")
          .addEventListener("mouseout", function () {
            document.querySelector(".rightTopMenu-button-shape").style.display =
              "none";
          });

        document
          .querySelector(".mapbox-gl-draw_point")
          .addEventListener("mouseover", function () {
            document.querySelector(
              ".rightTopMenu-button-location"
            ).style.display = "unset";
          });
        document
          .querySelector(".mapbox-gl-draw_point")
          .addEventListener("mouseout", function () {
            document.querySelector(
              ".rightTopMenu-button-location"
            ).style.display = "none";
          });

        document
          .querySelector(".mapbox-gl-draw_trash")
          .addEventListener("mouseover", function () {
            document.querySelector(".rightTopMenu-button-erase").style.display =
              "unset";
          });
        document
          .querySelector(".mapbox-gl-draw_trash")
          .addEventListener("mouseout", function () {
            document.querySelector(".rightTopMenu-button-erase").style.display =
              "none";
          });

        document
          .querySelector(".palette")
          .addEventListener("mouseover", function () {
            document.querySelector(".rightTopMenu-button-color").style.display =
              "unset";
          });
        document
          .querySelector(".palette")
          .addEventListener("mouseout", function () {
            document.querySelector(".rightTopMenu-button-color").style.display =
              "none";
          });
      });
    }
  }, [draw, map]);

  return (
    <div id="mapContainer">
      <div className="sidebar">
        <div className="logo">
          <div className="logo__name">
            <a href="https://neon-factory.design/">
              <img alt="Logo" className="logo__icon" src="logo.svg" />
            </a>
            <h2>NEON-FACTORY</h2>
          </div>
          <p className="logo__text">
            A <span>DESIGN AGENSY</span> FOR COMMERCIAL REAL ESTATE
          </p>
        </div>
        <h1 className="title">Districts map</h1>
        <input
          type="color"
          ref={colorPicker}
          id="colorPicker"
          className="palette"
          onChange={(event) => changeColor(event.target.value, mapboxgl, draw)}
        />
        <RightTopMenuText />
        <div className="calculation-box">
          <div id="calculated-area">{Sqm}.SQM</div>
        </div>
        <div ref={geocoderContainer}></div>
        <SubMenu
          setIsControlsActive={setIsControlsActive}
          isControlsActive={isControlsActive}
          map={map}
          submenuTag={submenuTag}
        ></SubMenu>
        <button
          onClick={() => setOpenBrussels(!openBrussels)}
          className={`BrusselsButton ${
            openBrussels ? "BrusselsButton_open" : ""
          }`}
        >
          Brussels
        </button>
        {openBrussels ? (
          <div className="toggleContainer">
            <ToggleMenu
              isAllDistrictsSelected={isAllDistrictsSelected}
              toggleButton={toggleButton}
              map={map}
              selectedDistricts={selectedDistricts}
              centralisedDistrictsButtonHandler={
                centralisedDistrictsButtonHandler
              }
              centralisedToggle={centralisedToggle}
              setCentralisedToggle={setCentralisedToggle}
              decentralisedDistrictsButtonHandler={
                decentralisedDistrictsButtonHandler
              }
              decentralisedToggle={decentralisedToggle}
              setDecentralisedToggle={setDecentralisedToggle}
            />
            <AllDistrictsButton
              setIsAllDistrictsVisible={setIsAllDistrictsVisible}
              allDistrictsButtonHandler={allDistrictsButtonHandler}
              isAllDistrictsVisible={isAllDistrictsVisible}
              allDistrictsToggle={allDistrictsToggle}
              setAllDistrictsToggle={setAllDistrictsToggle}
            >
              All Districts
            </AllDistrictsButton>
          </div>
        ) : null}
        <div className="toggleIcons">
          <MapIconsToggle
            servicesAction={servicesAction}
            setServicesAction={setServicesAction}
            map={map}
          >
            Shop, Restaurants, Services...
          </MapIconsToggle>
          <TransportButton
            setShowTransport={setShowTransport}
            showTransport={showTransport}
            map={map}
          >
            Transport
          </TransportButton>
        </div>

        <ResetMap
          mapStyleSetter={mapStyleSetter}
          setServicesAction={setServicesAction}
          setShowTransport={setShowTransport}
          setSqml={setSqml}
          draw={draw}
          map={map}
          removeCustomMarker={removeCustomMarker}
          setSelectedDistricts={setSelectedDistricts}
          setIsAllDistrictsVisible={setIsAllDistrictsVisible}
          setCentralisedToggle={setCentralisedToggle}
          setIsCentralisedDistrictsVisible={setIsCentralisedDistrictsVisible}
          setDecentralisedToggle={setDecentralisedToggle}
          setIsDecentralisedDistrictsVisible={
            setIsDecentralisedDistrictsVisible
          }
          setAllDistrictsToggle={setAllDistrictsToggle}
        ></ResetMap>

        <PrintScreen
          palette={palette}
          sreenLogo={sreenLogo}
          drawMenu={drawMenu}
          mapTag={mapTag.current}
          menuStyle={menuStyle}
          colorPicker={colorPicker}
        ></PrintScreen>
      </div>
      <div id="map" ref={mapTag} style={{ flex: 1, position: "relative" }}>
        <LayoutChanger
          defaultStyleHandler={defaultStyleHandler}
          satelitteStyleHandler={satelitteStyleHandler}
          monochromeStyleHandler={monochromeStyleHandler}
          darkStyleHandler={darkStyleHandler}
        />
        <img alt="Logo" className="logo-map" src="logo.png" />
      </div>
    </div>
  );
}

export default App;
