import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decentralisedToggleChanging } from "../../redux/slices/decentralisedToggleSlice";
import { RootState } from "../../redux/store";
const DecentralisedDistrictsButton = ({
  children,
  decentralisedDistrictsButtonHandler,
}) => {
  const dispatch = useDispatch();
  const decentralisedToggle = useSelector(
    (state: RootState) => state.decentralisedToggle.value
  );
  const handleClick = () => {
    decentralisedDistrictsButtonHandler();
    dispatch(decentralisedToggleChanging());
  };

  return (
    <div
      className="toggleButton"
      onClick={() => {
        handleClick();
      }}
    >
      <div data-district="Decentralised" id="decentralisedDistrictsButton">
        {children}
      </div>
      <div
        className={decentralisedToggle ? "switch-btn switch-on" : "switch-btn"}
      ></div>
    </div>
  );
};
export default DecentralisedDistrictsButton;
