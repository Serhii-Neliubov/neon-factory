import React, { useEffect, useState } from "react";

const DefaultStyle = ({ defaultStyleHandler, mapStyleSetter }) => {
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
        defaultStyleHandler();
        handleClick();
      }}
      className="toggleButton"
    >
      <div onClick={handleClick}>Default</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default DefaultStyle;
