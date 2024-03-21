import {useEffect, useRef, useState} from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

interface ColorPickerProps {
  draw: MapboxDraw | undefined;
}

export const ColorPicker = ({draw}: ColorPickerProps) => {
  const colorPicker = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#3bb2d0');

  function changeColor() {
    if (draw) {
      const selectedFeatures = draw.getSelected();

      selectedFeatures.features.forEach(feature => {
        if (feature.id) {
          draw.setFeatureProperty(feature.id as string, 'portColor', selectedColor || '#ff0000');
        }
      });

      draw.getSelected().features = selectedFeatures.features;
    }
  }

  useEffect(() => {
    changeColor();
  }, [selectedColor]);

  return (
    <input
      type="color"
      ref={colorPicker}
      id="colorPicker"
      className="absolute z-[90]"
      onChange={(event) => setSelectedColor(event.target.value)}
    />
  )
}