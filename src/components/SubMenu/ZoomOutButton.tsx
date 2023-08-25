import React from "react";

const ZoomOutButton = ({ map, children }) => {
  function zoomOutButtonHandler() {
    map.zoomOut();
  }

  return (
    <button onClick={zoomOutButtonHandler} className="controlButton zoomOut">
      {children}
    </button>
  );
};

export default ZoomOutButton;
