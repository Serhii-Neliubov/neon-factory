import React from "react";

export const ZoomInButton = ({ map, children }) => {
  function zoomInHandler() {
    map.zoomIn();
  }

  return (
    <button onClick={zoomInHandler} className="controlButton zoomIn">
      {children}
    </button>
  );
};
