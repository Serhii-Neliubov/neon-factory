import { useEffect, useState, useRef, useCallback } from "react";

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
import MyLoader from "./components/MyLoader/MyLoader";
// Utils
import defaultDrawStyles from "./utils/DefaultDrawStyles";
//Map functions
import {
  removeCustomMarker,
  toggleDistrictsVisibility,
  toggleButton,
  createMarkerElement,
} from "./utils/MapFunctions";
import ToggleMenu from "./components/ToggleMenu/ToggleMenu";
import RightTopMenuText from "./components/RightTopMenuText";
// import MyModal from "./components/MyModal/MyModal";
import { Scrollbar } from "react-scrollbars-custom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { openBrusselsChanging } from "./redux/slices/openBrusselsSlice";
import { activeSidebarChanging } from "./redux/slices/activeSidebarSlice";
import {
  centralisedDistrictsVisibleFalse,
  centralisedDistrictsVisibleTrue,
} from "./redux/slices/centralisedDistrictsVisibleSlice";
import {
  decentralisedDistrictsVisibleFalse,
  decentralisedDistrictsVisibleTrue,
} from "./redux/slices/decentralisedDistrictsVisibleSlice";
import {
  allDistrictsSelectedFalse,
  allDistrictsSelectedTrue,
} from "./redux/slices/allDistrictsSelectedSlice";
import {
  centralisedToggleFalse,
  centralisedToggleTrue,
} from "./redux/slices/centralisedToggleSlice";
import {
  decentralisedToggleFalse,
  decentralisedToggleTrue,
} from "./redux/slices/decentralisedToggleSlice";
import Container from "./components/Container";
import CircleMenu from "./components/CircleMenu";
import OpenTranportButton from "./components/ToggleMenu/OpenTranportButton";
import OpenCadastreButton from "./components/ToggleMenu/OpenCadastreButton";
import OpenMapStyleButton from "./components/ToggleMenu/OpenMapStyleButton";

function App() {
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);

  const openBrussels = useSelector((state) => state.openBrussels.value);
  const activeSidebar = useSelector((state) => state.activeSidebar.value);
  const [showCadastre, setShowCadastre] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const isCentralisedDistrictsVisible = useSelector(
    (state) => state.centralisedDistrictsVisible.value
  );
  const isAllDistrictsVisible = useSelector(
    (state) => state.allDistrictsVisible.value
  );
  const isDecentralisedDistrictsVisible = useSelector(
    (state) => state.decentralisedDistrictsVisible.value
  );

  const [selectedDistricts, setSelectedDistricts] = useState([]);

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

  const [mapStyleSetter, setMapStyleSetter] = useState(1);
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);

  const MAPBOX_ACCESS_TOKEN = useRef(
    "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A"
  );

  const customTilesetLayer = {
    id: "custom-tileset-layer",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://neon-factory.12ssh55s",
    },
    "source-layer": "Bruxelles_Cadastre_complet-7xijuk",
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "black",
        "rgba(255, 255, 255, 0)",
      ],
      "fill-opacity": 0.2,
    },
  };

  const customTilesetLineLayer = {
    id: "custom-tileset-line-layer",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://neon-factory.12ssh55s",
    },
    "source-layer": "Bruxelles_Cadastre_complet-7xijuk",
    paint: {
      "line-color": [
        "match",
        ["get", "CaPaKey"], // The attribute to match
        "specificValue1",
        "rgb(255, 0, 0)", // When CaPaKey matches specificValue1
        "specificValue2",
        "rgb(0, 255, 0)", // When CaPaKey matches specificValue2
        "rgba(255, 255, 255, 0)", // Default color when there is no match
      ],
    },
  };

  useEffect(() => {
    if (!map || !showCadastre) return;

    const handleMouseMove = (e) => {
      map.getCanvas().style.cursor = "pointer";

      if (hoveredFeatureId) {
        map.setFeatureState(
          {
            source: "custom-tileset-layer",
            sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
            id: hoveredFeatureId,
          },
          { hover: false }
        );
      }

      if (e.features.length > 0) {
        const newHoveredFeatureId = e.features[0].id;
        setHoveredFeatureId(newHoveredFeatureId);
        map.setFeatureState(
          {
            source: "custom-tileset-layer",
            sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
            id: newHoveredFeatureId,
          },
          { hover: true }
        );

        const CaPaKey = e.features[0].properties.CaPaKey;
        map.setPaintProperty("custom-tileset-layer", "fill-color", [
          "match",
          ["get", "CaPaKey"],
          CaPaKey,
          "rgba(0,0,0, 0.4)",
          "rgba(255,255,255,0)",
        ]);
      }
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";

      if (hoveredFeatureId) {
        map.setFeatureState(
          {
            source: "custom-tileset-layer",
            sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
            id: hoveredFeatureId,
          },
          { hover: false }
        );
        setHoveredFeatureId(null);

        map.setPaintProperty(
          "custom-tileset-layer",
          "fill-color",
          "rgba(255,255,255,0)"
        );
      }
    };

    map.on("mousemove", "custom-tileset-layer", handleMouseMove);
    map.on("mouseleave", "custom-tileset-layer", handleMouseLeave);

    return () => {
      map.off("mousemove", "custom-tileset-layer", handleMouseMove);
      map.off("mouseleave", "custom-tileset-layer", handleMouseLeave);
    };
  }, [map, showCadastre, hoveredFeatureId]);
  useEffect(() => {
    if (!map) return;

    if (!showCadastre && hoveredFeatureId) {
      // Сбросьте стиль дома
      map.setPaintProperty(
        "custom-tileset-layer",
        "fill-color",
        "rgba(255,255,255,0)"
      );

      // Установите состояние фичи в неактивное
      map.setFeatureState(
        {
          source: "custom-tileset-layer",
          sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
          id: hoveredFeatureId,
        },
        { hover: false }
      );

      // Обнулите hoveredFeatureId
      setHoveredFeatureId(null);
    }
  }, [map, showCadastre, hoveredFeatureId]);

  useEffect(() => {
    if (!map || !hoveredFeatureId) return;

    const featureState = {
      source: "custom-tileset-layer",
      sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
      id: hoveredFeatureId,
    };

    map.setFeatureState(featureState, { hover: true });
    return () => {
      map.setFeatureState(featureState, { hover: false });
    };
  }, [map, hoveredFeatureId]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetLayerStyles = useCallback(() => {
    map.setPaintProperty("custom-tileset-line-layer", "line-color", [
      "match",
      ["get", "CaPaKey"],
      "specificValue1",
      "rgb(255, 0, 0)",
      "specificValue2",
      "rgb(0, 255, 0)",
      "rgba(255, 255, 255, 0)",
    ]);
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (map) {
      if (showCadastre) {
        map.on("click", "custom-tileset-layer", function (e) {
          let features = map.queryRenderedFeatures(e.point, {
            layers: ["custom-tileset-layer"],
          });

          if (features.length > 0) {
            let feature = features[0];
            let index = selectedFeatures.indexOf(feature.properties.CaPaKey);
            if (index === -1) {
              setSelectedFeatures([
                ...selectedFeatures,
                feature.properties.CaPaKey,
              ]);
              map.setFeatureState(
                {
                  source: "custom-tileset-layer",
                  sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
                  id: feature.id,
                },
                { selected: true }
              );
            } else {
              const updatedSelectedFeatures = [...selectedFeatures];
              updatedSelectedFeatures.splice(index, 1);
              setSelectedFeatures(updatedSelectedFeatures);
              // Удаляем выбранный полигон из массива и восстанавливаем его стиль
              map.setFeatureState(
                {
                  source: "custom-tileset-layer",
                  sourceLayer: "Bruxelles_Cadastre_complet-7xijuk",
                  id: feature.id,
                },
                { selected: false }
              );
            }
          }
        });
      }
      if (showCadastre) {
        map.on("idle", function () {
          if (selectedFeatures.length === 0) {
            resetLayerStyles();
          } else {
            const lineColorExpression = [
              "match",
              ["to-string", ["get", "CaPaKey"]],
              ...selectedFeatures.flatMap((feature) => [
                String(feature),
                "rgb(255,0,0)",
              ]),
              "rgba(255,255,255,0)",
            ];
            map.setPaintProperty(
              "custom-tileset-line-layer",
              "line-color",
              lineColorExpression
            );
          }
        });
      }
      return () => {
        map.off("click", "custom-tileset-layer");
        map.off("idle");
      };
    }
  }, [map, selectedFeatures, showCadastre, resetLayerStyles]);

  useEffect(() => {
    if (map && map.isStyleLoaded()) {
      const updateStyles = () => {
        if (!showCadastre && selectedDistricts.length === 0) {
          resetLayerStyles();
        } else if (selectedFeatures.length === 0) {
          resetLayerStyles();
        } else {
          const lineColorExpression = [
            "match",
            ["to-string", ["get", "CaPaKey"]],
            ...selectedFeatures.flatMap((feature) => [
              String(feature),
              "rgb(255,0,0)",
            ]),
            "rgba(255,255,255,0)",
          ];
          map.setPaintProperty(
            "custom-tileset-line-layer",
            "line-color",
            lineColorExpression
          );
        }
      };

      map.on("idle", updateStyles);

      return () => {
        map.off("idle", updateStyles);
      };
    }
  }, [selectedFeatures, map, showCadastre, selectedDistricts.length]);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN.current;

    let mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
      center: [4.387564, 50.845193],
      zoom: 10.8,
      preserveDrawingBuffer: true,
    };

    let map = new mapboxgl.Map(mapSettings);
    setMap(map);

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

    function addLayerIfAbsent(map, layer) {
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer);
      }
    }
    map.on("move", function () {
      addLayerIfAbsent(map, customTilesetLayer);
      addLayerIfAbsent(map, customTilesetLineLayer);
    });

    map.on("style.load", function () {
      addLayerIfAbsent(map, customTilesetLayer);
      addLayerIfAbsent(map, customTilesetLineLayer);
    });

    const marker = document.getElementById("distance-marker");
    map.on("draw.delete", function () {
      // Скрываем маркер при удалении линии
      document.getElementById("distance-marker").style.display = "none";
    });

    setDraw(draw);

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", function () {
      addLayerIfAbsent(map, customTilesetLayer);
      addLayerIfAbsent(map, customTilesetLineLayer);
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
      } else if (updatedFeature.geometry.type === "Polygon") {
        // Calculate the area of the updated polygon
        // eslint-disable-next-line no-undef
        const area = turf.area(updatedFeature.geometry);
        const sqm = Math.round(area * 100) / 100;
        setSqml(sqm);
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

  function changeColor() {
    let selectedColor = colorPicker.current.value;
    if (MAPBOX_ACCESS_TOKEN.current !== "" && typeof draw === "object") {
      // Установите выбранный цвет для выбранной фигуры
      draw.setFeatureProperty(
        MAPBOX_ACCESS_TOKEN.current,
        "portColor",
        selectedColor
      );

      // Обновите фигуру на карте
      let feat = draw.get(MAPBOX_ACCESS_TOKEN.current);
      draw.add(feat);
    }
  }

  useEffect(() => {
    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });
    }
  }, [map]);

  function allDistrictsButtonHandler() {
    if (isAllDistrictsVisible) {
      dispatch(decentralisedToggleTrue());
      dispatch(centralisedToggleTrue());
      dispatch(decentralisedDistrictsVisibleFalse());
      dispatch(centralisedDistrictsVisibleFalse());

      setSelectedDistricts(allDistricts);
      toggleDistrictsVisibility(selectedDistricts, map);
      if (mapStyleSetter == 1) {
        map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
        setShowCadastre(false);
      } else if (mapStyleSetter == 2) {
        map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");
        setShowCadastre(false);
      } else if (mapStyleSetter == 3) {
        map.setStyle("mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97");
        setShowCadastre(false);
      } else {
        map.setStyle("mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy");
        setShowCadastre(false);
      }
      dispatch(allDistrictsSelectedTrue());
    } else {
      dispatch(decentralisedToggleFalse());
      dispatch(decentralisedDistrictsVisibleTrue());
      dispatch(centralisedToggleFalse());
      dispatch(centralisedDistrictsVisibleTrue());
      setSelectedDistricts([]);
      allDistricts.forEach((district) => {
        if (selectedDistricts.includes(district)) {
          toggleButton(district, selectedDistricts, map);
        }
      });
      toggleDistrictsVisibility(selectedDistricts, map);
      dispatch(allDistrictsSelectedFalse());
    }
  }

  // function modalWindowHandler() {
  //   setIsModalActive(!isModalActive);
  //   defaultStyleHandler();
  // }
  function centralisedDistrictsButtonHandler() {
    if (isCentralisedDistrictsVisible) {
      dispatch(decentralisedToggleFalse());

      dispatch(decentralisedDistrictsVisibleTrue());
      setSelectedDistricts(centralisedDistricts);
      toggleDistrictsVisibility(centralisedDistricts, map);

      dispatch(centralisedDistrictsVisibleFalse());
    } else {
      const withoutCentralisedDistricts = selectedDistricts.filter(
        (district) => !centralisedDistricts.includes(district)
      );
      setSelectedDistricts(withoutCentralisedDistricts);
      toggleDistrictsVisibility(withoutCentralisedDistricts, map);
      dispatch(centralisedDistrictsVisibleTrue());
    }
  }

  function decentralisedDistrictsButtonHandler() {
    if (isDecentralisedDistrictsVisible) {
      dispatch(centralisedToggleFalse());

      dispatch(centralisedDistrictsVisibleTrue());

      setSelectedDistricts(decentralisedDistricts);
      toggleDistrictsVisibility(decentralisedDistricts, map);

      dispatch(decentralisedDistrictsVisibleFalse());
    } else {
      const withoutDecentralisedDistricts = selectedDistricts.filter(
        (district) => !decentralisedDistricts.includes(district)
      );
      setSelectedDistricts(withoutDecentralisedDistricts);
      toggleDistrictsVisibility(withoutDecentralisedDistricts, map);
      dispatch(decentralisedDistrictsVisibleTrue());
    }
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
    <>
      {showLoader && <MyLoader />}
      <Container>
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
            <div className="mainToggleButtons">
              <div ref={geocoderContainer}></div>
              <SubMenu map={map} submenuTag={submenuTag} />
              <OpenMapStyleButton
                setShowCadastre={setShowCadastre}
                setSelectedDistricts={setSelectedDistricts}
                map={map}
                mapStyleSetter={mapStyleSetter}
                setMapStyleSetter={setMapStyleSetter}
              />
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
                    toggleButton={toggleButton}
                    map={map}
                    selectedDistricts={selectedDistricts}
                    centralisedDistrictsButtonHandler={
                      centralisedDistrictsButtonHandler
                    }
                    decentralisedDistrictsButtonHandler={
                      decentralisedDistrictsButtonHandler
                    }
                  />
                  <AllDistrictsButton
                    allDistrictsButtonHandler={allDistrictsButtonHandler}
                  >
                    All Districts
                  </AllDistrictsButton>
                </div>
              ) : null}
              <button className="AreasButton">antwerp (soon)</button>
              <button className="AreasButton">Gent (soon)</button>
              <button className="AreasButton">luxembourg (soon)</button>
              <OpenTranportButton map={map} />
              <OpenCadastreButton
                showCadastre={showCadastre}
                setShowCadastre={setShowCadastre}
                map={map}
              />
            </div>
            <div className="down-sidebar__buttons">
              <ResetMap
                setSelectedFeatures={setSelectedFeatures}
                mapStyleSetter={mapStyleSetter}
                setSqml={setSqml}
                draw={draw}
                map={map}
                setShowCadastre={setShowCadastre}
                removeCustomMarker={removeCustomMarker}
                setSelectedDistricts={setSelectedDistricts}
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
          <CircleMenu map={map} />
          <RightTopMenuText />
          <div className="calculation-box">
            <div id="calculated-area">{Sqm}.SQM</div>
          </div>
          <input
            type="color"
            ref={colorPicker}
            id="colorPicker"
            className="palette"
            onChange={changeColor}
          />
          <img alt="Logo" className="logo-map" src="logo.png" />
        </div>
      </Container>
    </>
  );
}

export default App;
