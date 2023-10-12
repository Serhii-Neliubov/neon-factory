import React, { useEffect, useState } from "react";
import { showCadastreFalse } from "../../redux/slices/showCadastreSlice";
import { useDispatch } from "react-redux";
import { selectedDistrictsChanging } from "../../redux/slices/selectedDistrictsSlice";
import { showTransportTrue } from "../../redux/slices/showTransportSlice";
import { servicesActionFalse } from "../../redux/slices/servicesActionSlice";
import { centralisedToggleFalse } from "../../redux/slices/centralisedToggleSlice";
import { decentralisedToggleFalse } from "../../redux/slices/decentralisedToggleSlice";
import { allDistrictsToggleFalse } from "../../redux/slices/allDistrictsToggleSlice";

const SatelliteStyle = ({
  mapStyleSetter,
  map,
  setMapStyleSetter,
  setSelectedDistricts,
  setShowCadastre,
}) => {
  const dispatch = useDispatch();

  const [toggleClass, setToggleClass] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  function satelitteStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90");
    setMapStyleSetter(2);

    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });
    }

    dispatch(showCadastreFalse());
    dispatch(showTransportTrue());
    setSelectedDistricts([]);
    dispatch(centralisedToggleFalse());
    dispatch(decentralisedToggleFalse());
    setShowCadastre(false);
    dispatch(servicesActionFalse());
    dispatch(allDistrictsToggleFalse());
    // setIsModalActive(true);
  }

  const handleClick = () => {
    setToggle(true);
  };

  useEffect(() => {
    if (mapStyleSetter == "2") {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle, mapStyleSetter]);
  return (
    <div
      onClick={() => {
        handleClick();
        satelitteStyleHandler();
      }}
      className="toggleButton"
    >
      <div onClick={handleClick}>Satellite</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default SatelliteStyle;
