import React, { useState, useEffect } from "react";

const AllDistrictsButton = ({
  children,
  setIsAllDistrictsVisible,
  allDistrictsButtonHandler,
  isAllDistrictsVisible,
  setAllDistrictsToggle,
  allDistrictsToggle,
}) => {
  const handleClick = () => {
    setAllDistrictsToggle((prevToggle) => !prevToggle);
    setIsAllDistrictsVisible(!isAllDistrictsVisible);
    allDistrictsButtonHandler();
  };

  return (
    <div
      className="toggleButton"
      onClick={() => {
        handleClick();
      }}
    >
      <div data-district="All" id="allDistrictsButton">
        {children}
      </div>
      <div
        className={allDistrictsToggle ? "switch-btn switch-on" : "switch-btn"}
      ></div>
    </div>
  );
};

export default AllDistrictsButton;
