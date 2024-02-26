import {Map as MapTypes} from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area as turfArea } from '@turf/turf';
import {useEffect, useState} from "react";
import './CalculationBox.css';

type CalculationBoxProps = {
  map: MapTypes | undefined,
  draw: MapboxDraw | undefined
}

export const CalculationBox = ({map, draw}: CalculationBoxProps) => {
  const [area, setArea] = useState('0');

  useEffect(() => {
    const updateArea = () => {
      const data = draw?.getAll();

      if (data && data.features.length > 0) {
        const calcArea = turfArea(data);
        const rounded_area = String(Math.round(calcArea * 100) / 100);
        setArea(rounded_area);
      }
    };

    map?.on('draw.create', updateArea);
    map?.on('draw.delete', updateArea);
    map?.on('draw.update', updateArea);

    return () => {
      map?.off('draw.create', updateArea);
      map?.off('draw.delete', updateArea);
      map?.off('draw.update', updateArea);
    };
  }, [map, draw]);

  return (
    <div className='calculationBox'>
      <div className='calculatedArea'>{area} m²</div>
    </div>
  )
}