import React from "react";
import { useState } from 'react';
const DecentralisedDistrictsButton = ({children, decentralisedDistrictsButtonHandler}) => {

  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
    
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            decentralisedDistrictsButtonHandler();

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
            decentralisedDistrictsButtonHandler();

            handleClick();
          }}
          className={toggle ? "switch-btn switch-on" : "switch-btn"}
        ></div>
      </div>
    </>
  );
};
export default DecentralisedDistrictsButton;
