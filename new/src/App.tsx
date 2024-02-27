import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Map } from './components/Map.tsx';
import mapboxgl, { Map as MapTypes } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { CalculationBox } from "./components/calculation-box/CalculationBox.tsx";

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { MAPBOX_DRAW_STYLES } from "./assets/data/mapbox-draw-styles.ts";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A'

function App() {
  const [map, setMap] = useState<MapTypes | undefined>();
  const [draw, setDraw] = useState<MapboxDraw | undefined>();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
      center: [4.387564, 50.845193],
      zoom: 10.8,
      preserveDrawingBuffer: true,
    });

    const MapDrawTools = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        line_string: true,
        point: true,
      },
      styles: MAPBOX_DRAW_STYLES,
    });
    const MapGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    const MapResetNorth = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: false,
      visualizePitch: false,
    })

    map.addControl(MapGeocoder);
    map.addControl(MapDrawTools, 'top-right');
    map.addControl(MapResetNorth);

    // Marker functionality
    map.on('draw.create', (event) => {
      const feature = event.features[0];
      if (feature && feature.geometry.type === 'Point') {
        const coordinates = feature.geometry.coordinates;
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker'; // стилизуйте этот класс по вашему усмотрению

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '❌';
        deleteButton.className = 'marker-delete-button';
        deleteButton.style.display = 'none'; // скрыть кнопку по умолчанию
        markerElement.appendChild(deleteButton);

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(coordinates)
          .addTo(map);

        markerElement.addEventListener('mouseenter', () => {
          deleteButton.style.display = 'block';
        });

        markerElement.addEventListener('mouseleave', () => {
          deleteButton.style.display = 'none';
        });

        deleteButton.addEventListener('click', () => {
          marker.remove();
        });

        markerElement.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const onMouseMove = (event: mapboxgl.MapMouseEvent) => {
            const lngLat = map.unproject(event.point);
            marker.setLngLat(lngLat);
          };

          const onMouseUp = () => {
            map.off('mousemove', onMouseMove);
            map.off('mouseup', onMouseUp);
          };

          map.on('mousemove', onMouseMove);
          map.once('mouseup', onMouseUp);
        });
      }
    });

    setMap(map);
    setDraw(MapDrawTools);

    return () => map.remove();
  }, []);

  return (
    <React.Fragment>
      <Sidebar map={map} />
      <CalculationBox map={map} draw={draw}/>
      <Map />
    </React.Fragment>
  )
}

export default App
