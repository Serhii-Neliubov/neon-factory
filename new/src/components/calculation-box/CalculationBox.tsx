import { Map as MapTypes } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area as turfArea } from '@turf/turf';
import { useEffect, useState } from "react";

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
    <div className='absolute bottom-[80px] right-[60px] z-20 bg-[#0F293A] py-[20px] px-[40px] rounded-md'>
      <div className='text-white'>{area}.SQM</div>
    </div>
  )
}