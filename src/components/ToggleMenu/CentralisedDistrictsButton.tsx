import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { centralisedToggleChanging } from "../../redux/slices/centralisedToggleSlice";
import { RootState } from "../../redux/store";
const CentralisedDistrictsButton = ({
  children,
  centralisedDistrictsButtonHandler,
}) => {
  const dispatch = useDispatch();
  const centralisedToggle = useSelector(
    (state: RootState) => state.centralisedToggle.value
  );
  const handleClick = () => {
    centralisedDistrictsButtonHandler();
    dispatch(centralisedToggleChanging());
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="toggleButton"
    >
      <div data-district="Centralised" id="centralisedDistrictsButton">
        {children}
      </div>
      <div
        className={centralisedToggle ? "switch-btn switch-on" : "switch-btn"}
      ></div>
    </div>
  );
};
export default CentralisedDistrictsButton;
