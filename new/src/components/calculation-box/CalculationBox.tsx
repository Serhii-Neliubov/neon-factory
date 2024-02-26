import { Map as MapTypes } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area as turfArea } from '@turf/turf';
import { useEffect, useState } from "react";

import './CalculationBox.css';

type CalculationBoxProps = {
  map: MapTypes | undefined,
  draw: MapboxDraw | undefined
}

export const CalculationBox = ({map, draw}: CalculationBoxProps) => {
  const [area, setArea] = useState('0');

  useEffect(() => {
    const updateArea = () => {
      const selectedFeatures = draw?.getSelected();

      if (selectedFeatures && selectedFeatures.features.length > 0) {
        const calcArea = turfArea(selectedFeatures.features[0]);
        const rounded_area = String(Math.round(calcArea * 100) / 100);

        setArea(rounded_area);
      } else {
        setArea('0');
      }
    };

    const handleDrawEvent = () => {
      updateArea();
    };

    const handleClick = () => {
      updateArea();
    };

    map?.on('draw.create', handleDrawEvent);
    map?.on('draw.delete', handleDrawEvent);
    map?.on('draw.update', handleDrawEvent);
    map?.on('click', handleClick);

    return () => {
      map?.off('draw.create', handleDrawEvent);
      map?.off('draw.delete', handleDrawEvent);
      map?.off('draw.update', handleDrawEvent);
      map?.off('click', handleClick);
    };
  }, [map, draw]);

  return (
    <div className='calculationBox'>
      <div className='calculatedArea'>{area} m²</div>
    </div>
  )
}