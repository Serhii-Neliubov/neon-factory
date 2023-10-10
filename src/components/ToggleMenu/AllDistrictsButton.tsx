import React from "react";
import { useDispatch } from "react-redux";
import { changeDistrictValue } from "../../redux/slices/isAllDistrictsVisibleSlice";

const AllDistrictsButton = ({
  children,
  allDistrictsButtonHandler,
  setAllDistrictsToggle,
  allDistrictsToggle,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    setAllDistrictsToggle((prevToggle) => !prevToggle);
    dispatch(changeDistrictValue());
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
