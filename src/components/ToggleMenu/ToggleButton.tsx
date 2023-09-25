import React, { useState, useEffect } from "react";

const ToggleButton = ({
  data,
  id,
  children,
  toggleButton,
  selectedDistricts,
  map,
  center,
  zoom,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleClass, setToggleClass] = useState<string>("");

  const handleClick = () => {
    toggleButton(data, selectedDistricts, map);
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);

    map.flyTo({
      center,
      zoom, // Fly to the selected target
      duration: 12000, // Animate over 12 seconds
      essential: true, // This animation is considered essential with
      //respect to prefers-reduced-motion
    });
  };

  useEffect(() => {
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);
  }, [selectedDistricts]);

  useEffect(() => {
    if (toggle) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle]);

  return (
    <div onClick={handleClick} className="toggleButton">
      <div data-district={data} id={id}>
        {children}
      </div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default ToggleButton;
