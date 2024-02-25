import { useState, useEffect } from "react";

const DefaultMapStyleButton = ({
  children,
  defaultStyleHandler,
  defaultMapStyle,
}) => {
  const [toggle, setToggle] = useState(false); // Установите начальное значение toggle в зависимости от children
  const [toggleClass, setToggleClass] = useState("");

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (defaultMapStyle) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle]);

  return (
    <div onClick={handleClick} className="toggleButton">
      <div onClick={defaultStyleHandler}>{children}</div>
      <div onClick={defaultStyleHandler} className={toggleClass}></div>
    </div>
  );
};

export default DefaultMapStyleButton;
