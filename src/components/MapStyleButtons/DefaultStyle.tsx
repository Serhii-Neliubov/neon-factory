import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DefaultStyle = ({ mapStyleSetter, map, defaultStyleHandler }) => {
  const [toggleClass, setToggleClass] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);

  const handleClick = () => {
    setToggle(true);
  };
  useEffect(() => {
    if (mapStyleSetter == 1) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle, mapStyleSetter]);
  return (
    <div
      onClick={() => {
        handleClick();
        defaultStyleHandler();
      }}
      className="toggleButton"
    >
      <div onClick={handleClick}>Default</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default DefaultStyle;
