import React from "react";
const CentralisedDistrictsButton = ({
  children,
  centralisedDistrictsButtonHandler,
  centralisedToggle,
  setCentralisedToggle,
}) => {
  const handleClick = () => {
    centralisedDistrictsButtonHandler();
    setCentralisedToggle((prevToggle) => !prevToggle);
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="brusselsButton"
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
