import React from "react";
import { useState } from 'react';
const CentralisedDistrictsButton = ({children, centralisedDistrictsButtonHandler}) => {

  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
    
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            centralisedDistrictsButtonHandler()

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
            centralisedDistrictsButtonHandler();

            handleClick();
          }}
          className={toggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default CentralisedDistrictsButton;
