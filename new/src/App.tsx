import {useEffect, useState} from 'react';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Map } from './components/Map.tsx';
import mapboxgl, { Map as MapTypes } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { CalculationBox } from "./components/calculation-box/CalculationBox.tsx";

import pin from '@/assets/images/pin.png';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MAPBOX_DRAW_STYLES } from "@/assets/data/mapbox-draw-styles.ts";
import {ColorPicker} from "@/components/color-picker/ColorPicker.tsx";
import {Bg} from "@/components/ui/bg.tsx";

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
      userProperties: true,
      controls: {
        polygon: true,
        trash: true,
        line_string: true,
        point: true,
      },
      modes: {
        ...MapboxDraw.modes,
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

      map.addLayer({
        id: 'Bruxelles_Cadastre_complet-7xijuk',
        type: 'line', // Изменение типа слоя на line
        source: {
          type: 'vector',
          url: 'mapbox://neon-factory.12ssh55s'
        },
        'source-layer': 'Bruxelles_Cadastre_complet-7xijuk',
        paint: {
          'line-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#000000', // Чёрный цвет при наведении
            ['boolean', ['feature-state', 'selected'], false],
            '#FF0000', // Красный цвет при клике
            'rgba(0, 0, 0, 0)' // Прозрачный цвет по умолчанию
          ],
          'line-width': 2, // Ширина линии
        }
      });

      map.setPaintProperty('Bruxelles_Cadastre_complet-7xijuk', 'fill-opacity', 0);

      MapGeocoder.on('result', (event) => {
        const source = map.getSource('single-point') as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData(event.result.geometry);
        }
      });
    });

    map.on('load', () => {


      // Устанавливаем fill-opacity в 0, чтобы сделать заливку прозрачной
    });

// Обработка события наведения мыши на слой
    map.on('mousemove', 'Bruxelles_Cadastre_complet-7xijuk', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

// Обработка события клика на слой
    // Обработка события клика на слой
    map.on('click', 'Bruxelles_Cadastre_complet-7xijuk', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length > 0) {
        const selectedFeatureId = features[0].id;
        const selectedFeatureState = map.getFeatureState({ source: 'Bruxelles_Cadastre_complet-7xijuk', sourceLayer: 'Bruxelles_Cadastre_complet-7xijuk', id: selectedFeatureId });

        // Устанавливаем состояние для всех частей дома
        for (const feature of features) {
          map.setFeatureState({ source: 'Bruxelles_Cadastre_complet-7xijuk', sourceLayer: 'Bruxelles_Cadastre_complet-7xijuk', id: feature.id }, { selected: !selectedFeatureState.selected });
        }
      }
    });


// Возвращение курсора в обычное состояние при выходе из области слоя
    map.on('mouseleave', 'Bruxelles_Cadastre_complet-7xijuk', () => {
      map.getCanvas().style.cursor = '';
    });



    setMap(map);
    setDraw(MapDrawTools);

    return () => map.remove();
  }, []);

  return (
    <div className='w-screen relative bg-[#001524] overflow-hidden h-screen pt-[50px] pr-[50px] pb-[50px]'>
      <Bg />
      <Sidebar map={map}/>
      <CalculationBox map={map} draw={draw}/>
      <ColorPicker draw={draw}/>
      <Map/>
    </div>
  )
}

export default App