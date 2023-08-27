import React from "react";
import { SketchPicker, CompactPicker } from "react-color";

const Palette = ({ selectedColor, handleColorChange }) => {
  return (
    <SketchPicker
      className="line-palette"
      color={selectedColor}
      onChange={handleColorChange}
    />
  );
};

export default Palette;
