import React from "react";

export const ZoomInButton = ({ map, children }) => {
  function zoomInHandler() {
    map.zoomIn();
  }

  return (
    <button onClick={zoomInHandler} className="actionButton zoomIn">
      {children}
    </button>
  );
};
