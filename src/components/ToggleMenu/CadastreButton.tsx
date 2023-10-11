import React from "react";
import { useState, useEffect } from "react";
import { showCadastreChanging } from "../../redux/slices/showCadastreSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CadastreButton = ({ children, map }) => {
  const [toggleClass, setToggleClass] = useState<string>("");

  const dispatch = useDispatch();

  const showCadastre = useSelector(
    (state: RootState) => state.showCadastre.value
  );

  function toggleTransportLayerVisibility() {
    dispatch(showCadastreChanging());

    if (!showCadastre) {
      map.setLayoutProperty(
        "bruxelles-cadastre-complet-7xijuk",
        "visibility",
        "visible"
      );
      map.setLayoutProperty("building", "visibility", "none");
    } else {
      map.setLayoutProperty(
        "bruxelles-cadastre-complet-7xijuk",
        "visibility",
        "none"
      );
      map.setLayoutProperty("building", "visibility", "visible");
    }
  }

  useEffect(() => {
    if (showCadastre) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [showCadastre]);

  return (
    <div
      className="toggleButton"
      onClick={() => {
        toggleTransportLayerVisibility();
      }}
    >
      <div id="mapIconsToggle">{children}</div>
      <div className={toggleClass}></div>
    </div>
  );
};
export default CadastreButton;
