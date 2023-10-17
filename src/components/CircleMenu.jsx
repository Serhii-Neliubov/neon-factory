import { useState, useCallback, useRef } from "react";
import MapboxCircle from "mapbox-gl-circle";

// eslint-disable-next-line react/prop-types
const CircleMenu = ({ map }) => {
  const [circles, setCircles] = useState([]);
  const selectedCircleRef = useRef(null);

  const updateRadiusDisplay = (radius) => {
    const radiusDisplay = document.getElementById("radius-display");
    if (radius !== undefined && radius > 0) {
      radiusDisplay.textContent = `Radius: ${radius}`;
    } else {
      radiusDisplay.textContent = "";
    }
  };

  const createCircle = useCallback(() => {
    if (!map) return;

    // eslint-disable-next-line react/prop-types
    const center = map.getCenter();
    const uniqueId = "_" + Math.random().toString(36).substr(2, 9);

    const myCircle = new MapboxCircle(center, 10, {
      editable: true,
      minRadius: 10,
      fillColor: "rgba(0,0,0,0.2)",
      id: uniqueId,
    }).addTo(map);

    let radius = 10;
    updateRadiusDisplay(radius);

    myCircle.on("centerchanged", (circleObj) => {
      console.log("New center:", circleObj.getCenter());
    });

    myCircle.on("radiuschanged", (circleObj) => {
      radius = circleObj.getRadius();
      updateRadiusDisplay(radius);
    });

    myCircle.on("click", () => {
      selectedCircleRef.current = myCircle;
      updateRadiusDisplay(radius);
    });

    myCircle.on("contextmenu", (mapMouseEvent) => {
      console.log("Right-click:", mapMouseEvent.lngLat);
    });

    return myCircle;
  }, [map]);

  const handleCreateCircle = useCallback(() => {
    const circle = createCircle();
    if (circle) {
      setCircles((prev) => [...prev, circle]);
    }
  }, [createCircle]);

  const handleDeleteCircle = useCallback(() => {
    if (selectedCircleRef.current) {
      const updatedCircles = circles.filter(
        (circle) => circle !== selectedCircleRef.current
      );
      selectedCircleRef.current.remove();
      setCircles(updatedCircles);
      selectedCircleRef.current = null;

      // Если это был последний круг на карте, обнуляем отображение радиуса
      if (updatedCircles.length === 0) {
        updateRadiusDisplay();
      }
    }
  }, [circles]);

  const handleDeleteAllCircles = useCallback(() => {
    circles.forEach((circle) => circle.remove());
    setCircles([]);
    selectedCircleRef.current = null;
    updateRadiusDisplay(); // обнуляем отображение радиуса
  }, [circles]);

  return (
    <>
      <div id="radius-display"></div>
      <button id="delete-circle-button" onClick={handleDeleteCircle}>
        Delete Radius
      </button>
      <button id="delete-circles-button" onClick={handleDeleteAllCircles}>
        Delete all Radius
      </button>
      <button onClick={handleCreateCircle} id="createCircleButton">
        Draw Radius
      </button>
      <div id="distance-marker" className="distance-marker">
        <div className="distance-close" id="distance-close">
          ×
        </div>
        <div id="distance-value" className="distance-value">
          0 m
        </div>
      </div>
    </>
  );
};

export default CircleMenu;
