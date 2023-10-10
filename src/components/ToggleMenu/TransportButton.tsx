import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { showTransportChanging } from "../../redux/slices/showTransportSlice";

const TransportButton = ({ children }) => {
  const dispatch = useDispatch();
  const [toggleClass, setToggleClass] = useState<string>("");
  const showTransport = useSelector(
    (state: RootState) => state.showTransport.value
  );
  const map = useSelector((state: RootState) => state.map.value);
  function toggleTransportLayerVisibility() {
    dispatch(showTransportChanging());
    if (!showTransport) {
      map.setLayoutProperty("transit-label", "visibility", "visible");
      map.setLayoutProperty("stib-2023", "visibility", "visible");
      map.setLayoutProperty("parkings", "visibility", "visible");
      map.setLayoutProperty("gares-bruxelles", "visibility", "visible");
    } else {
      map.setLayoutProperty("transit-label", "visibility", "none");
      map.setLayoutProperty("stib-2023", "visibility", "none");
      map.setLayoutProperty("parkings", "visibility", "none");
      map.setLayoutProperty("gares-bruxelles", "visibility", "none");
    }
  }

  useEffect(() => {
    if (showTransport) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [showTransport]);

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
export default TransportButton;
