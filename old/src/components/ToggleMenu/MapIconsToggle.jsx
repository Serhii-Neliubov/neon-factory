import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { servicesActionChanging } from "../../redux/slices/servicesActionSlice";

const MapIconsToggle = ({ children, map }) => {
  const [toggleClass, setToggleClass] = useState("");
  const dispatch = useDispatch();
  const servicesAction = useSelector(
    (state) => state.servicesAction.value
  );

  function toggleDistrictLayerVisibility() {
    dispatch(servicesActionChanging());
    if (!servicesAction) {
      map.setLayoutProperty("poi-label", "visibility", "visible");
    } else {
      map.setLayoutProperty("poi-label", "visibility", "none");
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
