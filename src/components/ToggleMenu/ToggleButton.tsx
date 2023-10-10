import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectedDistrictsChanging } from "../../redux/slices/selectedDistrictsSlice";

const ToggleButton = ({
  data,
  id,
  children,
  toggleButton,
  center,
  zoom,
  map,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [toggleClass, setToggleClass] = useState<string>("");
  const selectedDistricts = useSelector(
    (state: RootState) => state.selectedDistricts.value
  );
  const handleClick = () => {
    const isDataSelected = selectedDistricts.includes(data);
    let updatedDistricts;

    if (isDataSelected) {
      updatedDistricts = selectedDistricts.filter(
        (district) => district !== data
      );
    } else {
      updatedDistricts = [...selectedDistricts, data];
    }

    dispatch(selectedDistrictsChanging(updatedDistricts));

    if (!toggle) {
      map.flyTo({
        center,
        zoom,
        duration: 3000,
        essential: true,
      });
    }
  };

  useEffect(() => {
    const isDataSelected = selectedDistricts.includes(data);
    setToggle(isDataSelected);
  }, [selectedDistricts]);

  useEffect(() => {
    if (toggle) {
      setToggleClass("switch-btn switch-on");
    } else {
      setToggleClass("switch-btn");
    }
  }, [toggle]);

  return (
    <div onClick={handleClick} className="toggleButton">
      <div data-district={data} id={id}>
        {children}
      </div>
      <div className={toggleClass}></div>
    </div>
  );
};

export default ToggleButton;
