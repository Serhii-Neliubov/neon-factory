import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ToggleButton = ({
  data,
  id,
  children,
  toggleButton,
  map,
  center,
  zoom,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleClass, setToggleClass] = useState<string>("");
  const selectedDistricts = useSelector(
    (state: RootState) => state.selectedDistricts.value
  );

  const handleClick = () => {
    toggleButton(data, selectedDistricts, map);
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);
    if (!toggle) {
      map.flyTo({
        center,
        zoom, // Fly to the selected target
        duration: 3000, // Animate over 12 seconds
        essential: true, // This animation is considered essential with
        //respect to prefers-reduced-motion
      });
    }
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
