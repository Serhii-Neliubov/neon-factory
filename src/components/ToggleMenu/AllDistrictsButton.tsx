import React, { useState, useEffect } from "react";

const AllDistrictsButton = ({
  children,
  setIsAllDistrictsVisible,
  allDistrictsButtonHandler,
  isAllDistrictsVisible,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => {
          setIsAllDistrictsVisible(!isAllDistrictsVisible);
          allDistrictsButtonHandler();
          handleClick();
        }}
        data-district="All"
        className="toggleButton"
        id="allDistrictsButton"
      >
        {children}
      </button>
      <div
        onClick={() => {
          setIsAllDistrictsVisible(!isAllDistrictsVisible);
          allDistrictsButtonHandler();
          handleClick();
        }}
        className={toggle ? "switch-btn switch-on" : "switch-btn"}
      ></div>
    </div>
  );
};

export default AllDistrictsButton;
