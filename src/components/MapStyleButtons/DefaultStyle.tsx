import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DefaultStyle = ({ mapStyleSetter }) => {
  const [toggleClass, setToggleClass] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);
  const map = useSelector((state: RootState) => state.map.value);

  function defaultStyleHandler() {
    map.setStyle("mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b");
    setShowCadastre(false);
    setMapStyleSetter(1);
    setShowTransport(true);
    setServicesAction(false);

    const inputElement = document.querySelector(".DefaultInput");
    if (inputElement) {
      inputElement.checked = true;
    }

    if (map) {
      map.loadImage("pin.png", function (error, image) {
        if (error) throw error;
        map.addImage("custom-pin", image);
      });

      // Остальной код обработки карты также может быть здесь
    }
    setSelectedDistricts([]);
    setCentralisedToggle(false);
    // setIsModalActive(false);
    setDecentralisedToggle(false);
    setAllDistrictsToggle(false);
  }

  const handleClick = () => {
    setToggle(true);
  };
  useEffect(() => {
    if (mapStyleSetter == 1) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle, mapStyleSetter]);
  return (
    <div
      onClick={() => {
        defaultStyleHandler();
        handleClick();
      }}
      className="toggleButton"
    >
      <div onClick={handleClick}>Default</div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default DefaultStyle;
