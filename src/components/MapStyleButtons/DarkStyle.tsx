import React, { useEffect, useState } from "react";

const DarkStyle = ({ darkStyleHandler, mapStyleSetter }) => {
  const [toggleClass, setToggleClass] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);

  const handleClick = () => {
    setToggle(true);
  };
  useEffect(() => {
    if (mapStyleSetter == 4) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle, mapStyleSetter]);
  return (
    <div
      onClick={() => {
        darkStyleHandler();
        handleClick();
      }}
      className="toggleButton"
    >
      <div>Dark</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default DarkStyle;
