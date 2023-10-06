import React from "react";
const customTilesetLayer = {
  id: "custom-tileset-layer",
  type: "fill",
  source: {
    type: "vector",
    url: "mapbox://neon-factory.12ssh55s",
  },
  "source-layer": "Bruxelles_Cadastre_complet-7xijuk",
  paint: {
    "fill-color": "rgba(255, 255, 255, 0)",
    "fill-opacity": 0.3,
  },
};
const ResetMap = ({
  map,
  setSelectedDistricts,
  removeCustomMarker,
  draw,
  setSqml,
  setIsAllDistrictsVisible,
  setCentralisedToggle,
  setIsCentralisedDistrictsVisible,
  setDecentralisedToggle,
  setIsDecentralisedDistrictsVisible,
  setAllDistrictsToggle,
  setServicesAction,
  setShowTransport,
  mapStyleSetter,
  setOpenBrussels,
  setMapStyleButtonOpen,
  setIsControlsActive,
  setOpenTransport,
  setShowCadastre,
  resetMapButtonHandler,
}) => {
  return (
    <button onClick={resetMapButtonHandler} className="controlButton resetMap">
      Reset Map
    </button>
  );
};

export default ResetMap;
