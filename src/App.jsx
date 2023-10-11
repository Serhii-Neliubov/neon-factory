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
  removeCustomMarker,
  toggleDistrictsVisibility,
  toggleButton,
  changeColor,
} from "./utils/MapFunctions";
import TransportButton from "./components/ToggleMenu/TransportButton";
import CadastreButton from "./components/ToggleMenu/CadastreButton";
import ToggleMenu from "./components/ToggleMenu/ToggleMenu";
import RightTopMenuText from "./components/RightTopMenuText";
// import MyModal from "./components/MyModal/MyModal";
import DefaultStyle from "./components/MapStyleButtons/DefaultStyle";
import DarkStyle from "./components/MapStyleButtons/DarkStyle";
import MonochromeStyle from "./components/MapStyleButtons/MonochromeStyle";
import SatelliteStyle from "./components/MapStyleButtons/SatelliteStyle";
import { Scrollbar } from "react-scrollbars-custom";
import MapboxCircle from "mapbox-gl-circle";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeMapValue } from "./redux/slices/mapSlice";
import { openBrusselsChanging } from "./redux/slices/openBrusselsSlice";
import { activeSidebarChanging } from "./redux/slices/activeSidebarSlice";
import { openTransportChanging } from "./redux/slices/openTransportSlice";
import { openCadastreChanging } from "./redux/slices/openCadastreSlice";
import { showCadastreFalse } from "./redux/slices/showCadastreSlice";
import { changeDrawValue } from "./redux/slices/drawSlice";
import { mapStyleButtonChanging } from "./redux/slices/mapStyleButtonSlice";

function App() {
  const dispatch = useDispatch();

  const map = useSelector((state) => state.map.value);
  const draw = useSelector((state) => state.draw.value);

  const openBrussels = useSelector((state) => state.openBrussels.value);
  const activeSidebar = useSelector((state) => state.activeSidebar.value);
  const openTransport = useSelector((state) => state.openTransport.value);
  const openCadastre = useSelector((state) => state.openCadastre.value);
  const showCadastre = useSelector((state) => state.showCadastre.value);
  const mapStyleButtonOpen = useSelector((state) => state.mapStyleButton.value);

  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isAllDistrictsVisible, setIsAllDistrictsVisible] = useState(true);
  const [isCentralisedDistrictsVisible, setIsCentralisedDistrictsVisible] =
    useState(true);
  const [isDecentralisedDistrictsVisible, setIsDecentralisedDistrictsVisible] =
    useState(true);
  const [isAllDistrictsSelected, setIsAllDistrictsSelected] = useState(false);
  const [servicesAction, setServicesAction] = useState(false);

  const submenuTag = useRef();
  const mapTag = useRef();
  const colorPicker = useRef();
  const geocoderContainer = useRef();
  const newDrawFeature = useRef(false);

  const drawMenu = document.querySelector(".mapboxgl-ctrl-top-right");
  const sreenLogo = document.querySelector(".logo-map");
  const palette = document.querySelector(".palette");
  const menuStyle = document.querySelector(".menuMapStyle");
  const rightTopMenu = document.querySelector(".mapboxgl-ctrl-top-right");
  const sqmBox = document.querySelector(".calculation-box");

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

  const [Sqm, setSqml] = useState(0);

  const [showTransport, setShowTransport] = useState(true);
  const [centralisedToggle, setCentralisedToggle] = useState(false);
  const [decentralisedToggle, setDecentralisedToggle] = useState(false);
  const [allDistrictsToggle, setAllDistrictsToggle] = useState(false);

  const [mapStyleSetter, setMapStyleSetter] = useState(1);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    let mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
      center: [4.387564, 50.845193],
      zoom: 10.8,
      preserveDrawingBuffer: true,
    };

    let map = new mapboxgl.Map(mapSettings);
    dispatch(changeMapValue(map));
    function createMarkerElement() {
      let container = document.createElement("div");
      container.className = "deleteCustomMarkerContainer";

      // Создайте элемент маркера
      let marker = document.createElement("div");
      marker.className = "custom-marker";
      marker.style.backgroundImage = "url(pin.png)";
      marker.style.width = "32px"; // Установите желаемую ширину и высоту маркера
      marker.style.height = "32px";
      marker.draggable = true;

      // Создайте кнопку удаления
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "×";
      deleteButton.className = "delete-button";

      // Добавьте обработчик события на кнопку удаления
      deleteButton.addEventListener("click", function () {
        // Удалите маркер и его контейнер из карты
        container.remove();
      });

      // Добавьте маркер и кнопку в контейнер
      container.appendChild(marker);
      container.appendChild(deleteButton);

      return container;
    }

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Your Address Here",
      marker: {
        draggable: true,
        element: createMarkerElement(),
        animate: false,
      },
      clearOnBlur: false,
    });

    colorPicker.current.addEventListener("input", function () {
      var selectedColor = colorPicker.current.value;

      if (MAPBOX_ACCESS_TOKEN.current !== "" && typeof draw === "object") {
        // Установите выбранный цвет для выбранной фигуры
        draw.setFeatureProperty(
          MAPBOX_ACCESS_TOKEN.current,
          "portColor",
          selectedColor
        );

        // Обновите фигуру на карте
        var feat = draw.get(MAPBOX_ACCESS_TOKEN.current);
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
      modes: {
        ...MapboxDraw.modes,
      },
      styles: defaultDrawStyles,
    });
    const customTilesetLayer = {
      id: "custom-tileset-layer",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://neon-factory.12ssh55s",
      },
      "source-layer": "Bruxelles_Cadastre_complet-7xijuk",
      paint: {
        "fill-color": "rgba(255, 255, 255, 0)",
        "fill-opacity": 1,
      },
    };
    map.on("style.load", function () {
      map.addLayer(customTilesetLayer);
    });
    map.on("move", function () {
      map.addLayer(customTilesetLayer);
    });
    const marker = document.getElementById("distance-marker");
    map.on("draw.delete", function () {
      // Скрываем маркер при удалении линии
      document.getElementById("distance-marker").style.display = "none";
    });

    dispatch(changeDrawValue(draw));

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", function () {
      map.addControl(draw);
      map.setLayoutProperty("poi-label", "visibility", "none");
    });

    map.on("click", function (e) {
      if (!newDrawFeature.current) {
        var drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

        //if another drawFeature is not found - reset drawFeatureID
        MAPBOX_ACCESS_TOKEN.current = drawFeatureAtPoint.length
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
    map.on("click", "0", function (e) {
      const clickedPolygon = e.features[0]; // Получаем информацию о кликнутом полигоне
      // Вызываем функцию для отображения метров полигона

      showPolygonArea(clickedPolygon);
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

    let drawingCompleted = false;
    map.on("draw.create", function (e) {
      const feature = e.features[0];

      if (feature.geometry.type === "LineString") {
        // Если рисуется линия
        // eslint-disable-next-line no-undef
        const distance = turf.length(feature);

        let displayedDistance; // Исходное значение для отображения

        if (distance < 1000) {
          // Если расстояние меньше 1000 метров, умножаем его на 1000 и отображаем как целое число
          displayedDistance = Math.round(distance * 1000).toString();
        } else {
          // Иначе отображаем значение в метрах с двумя знаками после запятой
          displayedDistance =
            distance.toLocaleString(undefined, { minimumFractionDigits: 2 }) +
            " m";
        }

        const lastCoord =
          feature.geometry.coordinates[feature.geometry.coordinates.length - 1];

        const markerPosition = new mapboxgl.LngLat(lastCoord[0], lastCoord[1]);

        document.getElementById("distance-value").textContent =
          displayedDistance + " m";

        marker.style.left = `${map.project(markerPosition).x}px`;
        marker.style.top = `${map.project(markerPosition).y}px`;
        marker.style.display = "block";
      } else if (feature.geometry.type === "Polygon") {
        // Если рисуется полигон, устанавливаем флаг drawingCompleted в false
        drawingCompleted = false;
      }

      newDrawFeature.current = true;
      updateArea(e);

      // Закрываем полигон при двойном клике
      map.once("dblclick", function (dblClickEvt) {
        if (drawingCompleted) {
          const featuresAtClick = map.queryRenderedFeatures(dblClickEvt.point);
          if (featuresAtClick.length > 0) {
            const selectedFeature = featuresAtClick[0];
            if (selectedFeature.geometry.type === "Polygon") {
              map.setFeatureProperty(selectedFeature.id, "active", "false");
            }
          }
        }
      });
    });

    map.on("draw.create", function (e) {
      const feature = e.features[0];

      if (feature.geometry.type === "Polygon") {
        // Если рисование полигона завершено, устанавливаем флаг drawingCompleted в true
        drawingCompleted = true;
      }
    });

    document
      .getElementById("distance-close")
      .addEventListener("click", function () {
        hideDistanceMenu();
      });

    function hideDistanceMenu() {
      marker.style.display = "none";
    }

    map.on("draw.delete", function () {
      newDrawFeature.current = true;
      setSqml(0); // Сбрасываем размер при удалении фигуры
    });

    map.on("draw.update", function (e) {
      const updatedFeature = e.features[0];

      if (updatedFeature.geometry.type === "LineString") {
        // eslint-disable-next-line no-undef
        const distance = turf
          .length(updatedFeature)
          .toFixed(3)
          .toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Получаем координаты второй точки линии
        const secondPointCoord = updatedFeature.geometry.coordinates[1];

        // Определяем позицию меню
        const menuPosition = new mapboxgl.LngLat(
          secondPointCoord[0],
          secondPointCoord[1]
        );

        // Обновляем текст в меню и позиционируем его
        document.getElementById("distance-value").textContent = `${distance} m`;
        marker.style.left = `${map.project(menuPosition).x}px`;
        marker.style.top = `${map.project(menuPosition).y}px`;
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
      if (showCadastre) {
        map.on("click", "custom-tileset-layer", function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["custom-tileset-layer"],
          });

          if (features.length > 0) {
            var feature = features[0];
            var index = selectedFeatures.indexOf(feature.properties.CaPaKey);
            if (index === -1) {
              setSelectedFeatures([
                ...selectedFeatures,
                feature.properties.CaPaKey,
              ]);
              map.setFeatureState(
                { source: "your-source-id", id: feature.id },
                { selected: true }
              );
            } else {
              const updatedSelectedFeatures = [...selectedFeatures];
              updatedSelectedFeatures.splice(index, 1);
              setSelectedFeatures(updatedSelectedFeatures);
              // Удаляем выбранный полигон из массива и восстанавливаем его стиль
              map.setFeatureState(
                { source: "your-source-id", id: feature.id },
                { selected: false }
              );
            }
          }
        });
      }

      if (showCadastre) {
        map.on("idle", function () {
          // Define the style expression to dynamically set fill color based on "CaPaKey"
          const fillColorExpression = [
            "match",
            ["to-string", ["get", "CaPaKey"]],
            selectedFeatures.map(String),
            "rgb(255, 0, 0)", // Color for selected features
            "rgba(255, 255, 255, 0)", // Default color for other features
          ];
          // Update the fill-color property of the "custom-tileset-layer"
          map.setPaintProperty(
            "custom-tileset-layer",
            "fill-outline-color",
            fillColorExpression
          );
        });
      }
    }
  }, [map, selectedFeatures, showCadastre]);
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
        dispatch(showCadastreFalse());
      } else if (mapStyleSetter == 2) {
        map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");
        dispatch(showCadastreFalse());
      } else if (mapStyleSetter == 3) {
        map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
        dispatch(showCadastreFalse());
      } else {
        map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
        dispatch(showCadastreFalse());
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

  // function modalWindowHandler() {
  //   setIsModalActive(!isModalActive);
  //   defaultStyleHandler();
  // }
  function generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
  let selectedCircle = null;
  const circles = [];
  const radiusDisplay = document.getElementById("radius-display");

  function createCircleButton() {
    if (map) {
      const center = map.getCenter(); // Получаем центральные координаты карты
      const uniqueId = generateUniqueId();
      const myCircle = new MapboxCircle(
        center, // Используем центральные координаты
        3275,
        {
          editable: true,
          minRadius: 10,
          fillColor: "#29AB87",
          id: uniqueId,
        }
      ).addTo(map);

      circles.push(myCircle);

      let radius = 3275;
      radiusDisplay.textContent = `Radius: ${radius} meters`;

      myCircle.on("centerchanged", function (circleObj) {
        console.log("New center:", circleObj.getCenter());
      });

      myCircle.on("radiuschanged", function (circleObj) {
        radius = circleObj.getRadius();
        radiusDisplay.textContent = `Radius: ${radius} meters`;
      });

      myCircle.on("click", function (mapMouseEvent) {
        console.log("Click:", mapMouseEvent.point);
        // Сохраняем выбранный круг
        selectedCircle = myCircle;
        radius = myCircle.getRadius();
        radiusDisplay.textContent = `Radius: ${radius} meters`;
      });

      myCircle.on("contextmenu", function (mapMouseEvent) {
        console.log("Right-click:", mapMouseEvent.lngLat);
      });
    }
  }

  function deleteCircleButton() {
    if (selectedCircle) {
      // Если есть выбранный круг, удаляем его
      const index = circles.indexOf(selectedCircle);
      if (index !== -1) {
        circles.splice(index, 1);
        selectedCircle.remove();
      }
      selectedCircle = null; // Сбрасываем выбранный круг после удаления
      radiusDisplay.textContent = "";
    }
  }
  function deleteAllCirclesButton() {
    // Удаляем все круги из массива circles и с карты
    circles.forEach(function (circle) {
      circle.remove();
    });

    // Очищаем массив circles
    circles.length = 0;

    // Сбрасываем выбранный круг
    selectedCircle = null;

    // Очищаем отображение радиуса
    radiusDisplay.textContent = "";
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
    dispatch(showCadastreFalse());

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
    // setIsModalActive(true);
  }

  function monochromeStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
    dispatch(showCadastreFalse());

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
    // setIsModalActive(true);
    setServicesAction(false);
  }

  function darkStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
    dispatch(showCadastreFalse());
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
    // setIsModalActive(true);
    setShowTransport(true);
    setServicesAction(false);
  }

  function defaultStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
    dispatch(showCadastreFalse());
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
    // setIsModalActive(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
  }

  useEffect(() => {
    if (map) {
      map.resize(); // Обновите размеры карты
    }
  }, [activeSidebar, map]);

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
      <button onClick={() => dispatch(activeSidebarChanging())} />
      {activeSidebar && (
        <div className="sidebar">
          <div className="logo">
            <div className="logo__name">
              <a href="https://neon-factory.design/">
                <svg
                  width="55"
                  height="60"
                  viewBox="0 0 55 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3602 24.8521C21.3602 24.8521 20.9618 21.743 26.7845 21.5916C32.6071 21.4401 49.2018 21.5916 49.2018 21.5916C49.2018 21.5916 53.27 21.1372 53.27 16.0564C53.27 10.9771 48.1644 8.55098 43.2979 9.76402M16.414 24.8521C16.414 24.8521 15.9359 20.2984 18.0091 17.1536M8.67596 17.1551C8.67596 17.1551 10.2711 14.6177 12.9035 14.3905C15.536 14.1633 35.7989 14.3905 35.7989 14.3905C35.7989 14.3905 39.389 14.0876 40.4264 10.5242C41.4637 6.9608 38.1923 3.70028 38.1923 3.70028C38.1923 3.70028 36.1176 1.87997 32.2087 1.87997C28.2999 1.87997 26.4642 4.98905 26.2252 5.822C25.9861 6.65643 25.9065 9.45668 25.9065 9.45668M13.5425 9.45668C13.5425 9.45668 14.1815 3.54735 19.3667 3.16874C24.5519 2.79013 26.2267 5.822 26.2267 5.822M3.5704 17.1551C3.5704 17.1551 2.30807 4.36248 14.8658 5.85169M14.8658 32.4347V27.734H22.7163V32.4347M40.6295 44.5652H53.2715V57.7572H1.65503V19.8485H9.87267L9.71176 57.7572M10.5898 34.7851H37.9533V57.7572M16.3671 48.8101V53.8909M21.3539 48.8101V53.8909M26.5454 48.8101V53.8909M31.651 48.8101V53.8909M42.9792 48.8101V53.8909M48.1644 48.8101V53.8909"
                    stroke="#4CC0AD"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                  />
                </svg>
              </a>
              <h2>NEON-FACTORY</h2>
            </div>
            <p className="logo__text">
              A <span>DESIGN AGENCY</span> FOR COMMERCIAL REAL ESTATE
            </p>
          </div>
          <h1 className="title">Districts map</h1>
          <Scrollbar className="scrollbar">
            <div className="mainToggleButtons">
              <div ref={geocoderContainer}></div>
              <SubMenu map={map} submenuTag={submenuTag}></SubMenu>
              <button
                onClick={() => dispatch(mapStyleButtonChanging())}
                className={`mapStyleButton ${
                  mapStyleButtonOpen ? "mapStyleButton_open" : ""
                }`}
              >
                map style
              </button>
              {mapStyleButtonOpen ? (
                <div className="toggleInputs">
                  <DefaultStyle
                    defaultStyleHandler={defaultStyleHandler}
                    mapStyleSetter={mapStyleSetter}
                  />
                  <DarkStyle
                    darkStyleHandler={darkStyleHandler}
                    mapStyleSetter={mapStyleSetter}
                  />
                  <MonochromeStyle
                    monochromeStyleHandler={monochromeStyleHandler}
                    mapStyleSetter={mapStyleSetter}
                  />
                  <SatelliteStyle
                    satelitteStyleHandler={satelitteStyleHandler}
                    mapStyleSetter={mapStyleSetter}
                  />
                </div>
              ) : null}
              <button
                onClick={() => dispatch(openBrusselsChanging())}
                className={`BrusselsButton BrusselsButton_bg ${
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
              <button className="AreasButton">antwerp (soon)</button>
              <button className="AreasButton">Gent (soon)</button>
              <button className="AreasButton">luxembourg (soon)</button>
              <button
                onClick={() => dispatch(openTransportChanging())}
                className={`TransportButton TransportButton_bg ${
                  openTransport ? "TransportButton_open" : ""
                }`}
              >
                Transports & Amenieties
              </button>
              {openTransport ? (
                <div className="toggleIcons">
                  <TransportButton
                    setShowTransport={setShowTransport}
                    showTransport={showTransport}
                    map={map}
                  >
                    Transport
                  </TransportButton>
                  <MapIconsToggle
                    servicesAction={servicesAction}
                    setServicesAction={setServicesAction}
                    map={map}
                  >
                    SHOPS, RESTAURANTS & SERVICES
                  </MapIconsToggle>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={() => dispatch(openCadastreChanging())}
                className={`CadastreButton TransportButton_bg ${
                  openCadastre ? "CadastreButton_open" : ""
                }`}
              >
                Cadastre
              </button>
              {openCadastre ? (
                <div className="toggleIcons">
                  <CadastreButton showCadastre={showCadastre} map={map}>
                    Cadastre
                  </CadastreButton>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="down-sidebar__buttons">
              <ResetMap
                setSelectedFeatures={setSelectedFeatures}
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
                setIsCentralisedDistrictsVisible={
                  setIsCentralisedDistrictsVisible
                }
                setDecentralisedToggle={setDecentralisedToggle}
                setIsDecentralisedDistrictsVisible={
                  setIsDecentralisedDistrictsVisible
                }
                setAllDistrictsToggle={setAllDistrictsToggle}
              ></ResetMap>

              <PrintScreen
                sqmBox={sqmBox}
                palette={palette}
                sreenLogo={sreenLogo}
                drawMenu={drawMenu}
                mapTag={mapTag.current}
                menuStyle={menuStyle}
                colorPicker={colorPicker}
                rightTopMenu={rightTopMenu}
              ></PrintScreen>
            </div>
          </Scrollbar>
        </div>
      )}

      <div
        id="map"
        ref={mapTag}
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* {isModalActive ? (
          <MyModal modalWindowHandler={modalWindowHandler}></MyModal>
        ) : (
          ""
        )} */}
        <div id="radius-display"></div>
        <button id="delete-circle-button" onClick={deleteCircleButton}>
          Delete circle
        </button>
        <button id="delete-circles-button" onClick={deleteAllCirclesButton}>
          Delete all circles
        </button>
        <button onClick={createCircleButton} id="createCircleButton">
          Create a circle
        </button>
        <div id="distance-marker" className="distance-marker">
          <div className="distance-close" id="distance-close">
            ×
          </div>
          <div id="distance-value" className="distance-value">
            0 m
          </div>
        </div>

        <RightTopMenuText />
        <div className="calculation-box">
          <div id="calculated-area">{Sqm}.SQM</div>
        </div>
        <input
          type="color"
          ref={colorPicker}
          id="colorPicker"
          className="palette"
          onChange={(event) => changeColor(event.target.value, mapboxgl, draw)}
        />
        <img alt="Logo" className="logo-map" src="logo.png" />
      </div>
    </div>
  );
}

export default App;
