import React, { useState, useEffect } from "react";

const ToggleButton = ({
  data,
  id,
  children,
  toggleButton,
  isAllDistrictsSelected,
  selectedDistricts
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleClass, setToggleClass] = useState<string>("");

  const handleClick = () => {
    toggleButton(data);
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);
  };

  useEffect(() => {
    setToggle(isAllDistrictsSelected);
  }, [isAllDistrictsSelected]);

  useEffect(() => {
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);
  }, [selectedDistricts])

  useEffect(() => {
    if (toggle) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle]);

  return (
    <div style={{ display: "flex" }}>
      <div
        onClick={handleClick}
        className="toggleButton"
        data-district={data}
        id={id}
      >
        {children}
      </div>
      <div className={toggleClass} onClick={handleClick}></div>
    </div>
  );
};

export default ToggleButton;
