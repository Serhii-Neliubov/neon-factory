import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { allDistrictsVisibleChanging } from "../../redux/slices/allDistrictsVisibleSlice";

const AllDistrictsButton = ({
  children,
  allDistrictsButtonHandler,
  setAllDistrictsToggle,
  allDistrictsToggle,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setAllDistrictsToggle((prevToggle) => !prevToggle);
    dispatch(allDistrictsVisibleChanging());
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
