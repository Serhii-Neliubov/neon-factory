import React from "react";
import { useState } from 'react';
const DecentralisedDistrictsButton = ({children, decentralisedDistrictsButtonHandler, setDecentralisedToggle, decentralisedToggle}) => {


  const handleClick = () => {
    decentralisedDistrictsButtonHandler();
    setDecentralisedToggle((prevToggle) => !prevToggle);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            handleClick();
          }}
          data-district="Decentralised"
          className="toggleButton"
          id="decentralisedDistrictsButton"
        >
          {children}
        </button>
        <div
          onClick={() => {
            handleClick();
          }}
          className={decentralisedToggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default DecentralisedDistrictsButton;
