import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { allDistrictsVisibleChanging } from "../../redux/slices/allDistrictsVisibleSlice";
import { allDistrictsToggleChanging } from "../../redux/slices/allDistrictsToggleSlice";

const AllDistrictsButton = ({ children, allDistrictsButtonHandler }) => {
  const dispatch = useDispatch();
  const allDistrictsToggle = useSelector(
    (state: RootState) => state.allDistrictsToggle.value
  );

  const handleClick = () => {
    dispatch(allDistrictsToggleChanging());
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
