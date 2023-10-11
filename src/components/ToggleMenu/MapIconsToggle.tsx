import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { servicesActionChanging } from "../../redux/slices/servicesActionSlice";

const MapIconsToggle = ({ children, map }) => {
  const [toggle, setToggle] = useState(false);
  const [toggleClass, setToggleClass] = useState<string>("");
  const dispatch = useDispatch();
  const servicesAction = useSelector(
    (state: RootState) => state.servicesAction.value
  );

  function toggleDistrictLayerVisibility() {
    dispatch(servicesActionChanging());
    if (!servicesAction) {
      map.setLayoutProperty("poi-label", "visibility", "visible");
      setToggle(true);
    } else {
      map.setLayoutProperty("poi-label", "visibility", "none");
      setToggle(false);
    }
  }

  useEffect(() => {
    if (servicesAction) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [servicesAction]);

  return (
    <div
      className="toggleButton"
      onClick={() => {
        toggleDistrictLayerVisibility();
      }}
    >
      <div id="mapIconsToggle">{children}</div>
      <div className={toggleClass}></div>
    </div>
  );
};
export default MapIconsToggle;
