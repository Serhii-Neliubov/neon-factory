import { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Map } from './components/Map.tsx';
import mapboxgl, { Map as MapTypes } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A'

function App() {
  const [map, setMap] = useState<MapTypes | undefined>();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b",
      center: [4.387564, 50.845193],
      zoom: 10.8,
    });

    setMap(map);

    return () => map.remove();
  }, []);

  return (
    <Map>
      <Sidebar map={map} />
    </Map>
  )
}

export default App
