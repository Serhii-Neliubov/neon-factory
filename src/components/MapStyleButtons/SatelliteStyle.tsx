import React, { useEffect, useState } from "react";

const SatelliteStyle = ({ satelitteStyleHandler, mapStyleSetter }) => {
  const [toggleClass, setToggleClass] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);

  const handleClick = () => {
    setToggle(true);
  };
  useEffect(() => {
    if (mapStyleSetter == 2) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle, mapStyleSetter]);
  return (
    <div
      onClick={() => {
        satelitteStyleHandler();
        handleClick();
      }}
      className="toggleButton"
    >
      <div onClick={handleClick}>Satellite</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default SatelliteStyle;
