import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { mapStyleButtonChanging } from "../../redux/slices/mapStyleButtonSlice";
import DefaultStyle from "../MapStyleButtons/DefaultStyle";
import DarkStyle from "../MapStyleButtons/DarkStyle";
import MonochromeStyle from "../MapStyleButtons/MonochromeStyle";
import SatelliteStyle from "../MapStyleButtons/SatelliteStyle";

const OpenMapStyleButton = ({
  map,
  setMapStyleSetter,
  mapStyleSetter,
  setSelectedDistricts,
}) => {
  const dispatch = useDispatch();
  const mapStyleButtonOpen = useSelector(
    (state: RootState) => state.mapStyleButton.value
  );
  return (
    <>
      <button
        onClick={() => dispatch(mapStyleButtonChanging())}
        className={`mapStyleButton ${
          mapStyleButtonOpen ? "mapStyleButton_open" : ""
        }`}
      >
        map style
      </button>
      {mapStyleButtonOpen ? (
        <div className="toggleInputs">
          <DefaultStyle
            map={map}
            mapStyleSetter={mapStyleSetter}
            setMapStyleSetter={setMapStyleSetter}
            setSelectedDistricts={setSelectedDistricts}
          />
          <DarkStyle
            map={map}
            mapStyleSetter={mapStyleSetter}
            setMapStyleSetter={setMapStyleSetter}
            setSelectedDistricts={setSelectedDistricts}
          />
          <MonochromeStyle
            setMapStyleSetter={setMapStyleSetter}
            map={map}
            mapStyleSetter={mapStyleSetter}
            setSelectedDistricts={setSelectedDistricts}
          />
          <SatelliteStyle
            map={map}
            mapStyleSetter={mapStyleSetter}
            setMapStyleSetter={setMapStyleSetter}
            setSelectedDistricts={setSelectedDistricts}
          />
        </div>
      ) : null}
    </>
  );
};

export default OpenMapStyleButton;
