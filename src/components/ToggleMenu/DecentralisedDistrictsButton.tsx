import React from "react";
const DecentralisedDistrictsButton = ({
  children,
  decentralisedDistrictsButtonHandler,
  setDecentralisedToggle,
  decentralisedToggle,
}) => {
  const handleClick = () => {
    decentralisedDistrictsButtonHandler();
    setDecentralisedToggle((prevToggle) => !prevToggle);
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
