import { useEffect, useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Map } from './components/Map.tsx';
import mapboxgl, { Map as MapTypes } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { CalculationBox } from "./components/calculation-box/CalculationBox.tsx";

import pin from '@/assets/images/pin.png';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import {MAPBOX_DRAW_STYLES} from "@/assets/data/mapbox-draw-styles.ts";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A'

function App() {
  const [map, setMap] = useState<MapTypes | undefined>();
  const [draw, setDraw] = useState<MapboxDraw | undefined>();
  const [color, setColor] = useState<string>('#ff0000');

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
      mapboxgl: mapboxgl,
      placeholder: 'YOUR ADDRESS HERE',
      marker: false,
    })
    const MapResetNorth = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: false,
      visualizePitch: false,
    })

    const customMarker = document.createElement('div');
    customMarker.style.backgroundImage = `url(${pin})`;
    customMarker.style.backgroundSize = 'cover';
    customMarker.style.backgroundPosition = 'center';
    customMarker.style.width = '27px';
    customMarker.style.height = '41px';

    map.addControl(MapGeocoder);
    map.addControl(MapDrawTools, 'top-right');
    map.addControl(MapResetNorth);

    {/* Custom marker for geocoder */}
    map.on('load', () => {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.loadImage(
        pin as string,
        (error, image) => {
          if (error) throw error;
          if (!image) return; // handle undefined case
          map.addImage('custom-marker', image);
          map.addLayer({
            id: 'point',
            source: 'single-point',
            type: 'symbol',
            layout: {
              'icon-image': 'custom-marker',
              'icon-size': 0.5,
              'icon-allow-overlap': true
            },
          });
        }
      );

      MapGeocoder.on('result', (event) => {
        const source = map.getSource('single-point') as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData(event.result.geometry);
        }
      });
    });

    setMap(map);
    setDraw(MapDrawTools);

    return () => map.remove();
  }, []);

  return (
    <div className='w-screen relative bg-[#001524] overflow-hidden h-screen pt-[50px] pr-[50px] pb-[50px]'>
      {/* Background */}
      <div className='bg-gradient-to-r from-[#001524] opacity-80 to-[#001524] absolute w-[450px] h-full z-10'/>
      <div className='bg-gradient-to-r from-[#001524] via-[#001524] via-10% absolute w-[450px] h-full z-10'/>
      {/* ========== */}
      <Sidebar map={map}/>
      <CalculationBox map={map} draw={draw}/>

      <input
        className='absolute bg-transparent'
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <Map/>
    </div>
  )
}

export default App
