import React, { useState } from "react";
const ToggleButton = ({ data, id, children, toggleButton }) => {
  const handleClick = () => {
    toggleButton(data); // Вызываем функцию toggleButton, если это необходимо
  };

  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={handleClick}
        className="toggleButton"
        data-district={data}
        id={id}
      >
        {children}
      </button>
      <div className="switch-btn"></div>
    </div>
  );
};

export default ToggleButton;
