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
    <div style={{ display: "flex" }}>
      <button
        onClick={() => {
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
          handleClick();
        }}
        className={allDistrictsToggle ? "switch-btn switch-on" : "switch-btn"}
      ></div>
    </div>
  );
};

export default AllDistrictsButton;
