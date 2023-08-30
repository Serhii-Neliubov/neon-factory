import React from "react";
import { useState } from 'react';
const CentralisedDistrictsButton = ({children, centralisedDistrictsButtonHandler, centralisedToggle, setCentralisedToggle}) => {


  const handleClick = () => {
    centralisedDistrictsButtonHandler()
    setCentralisedToggle((prevToggle) => !prevToggle);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            handleClick();
          }}
          data-district="Centralised"
          className="toggleButton"
          id="centralisedDistrictsButton"
        >
          {children}
        </button>
        <div
          onClick={() => {
            handleClick();
          }}
          className={centralisedToggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default CentralisedDistrictsButton;
