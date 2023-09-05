import React from "react";
import ToggleButton from "./ToggleButton";
import CentralisedDistrictsButton from "./CentralisedDistrictsButton";
import DecentralisedDistrictsButton from "./DecentralisedDistrictsButton";

const ToggleMenu = ({
  isAllDistrictsSelected,
  map,
  toggleButton,
  selectedDistricts,
  centralisedDistrictsButtonHandler,
  centralisedToggle,
  setCentralisedToggle,
  decentralisedDistrictsButtonHandler,
  decentralisedToggle,
  setDecentralisedToggle,
}) => {
  const buttons = [
    {
      data: "CD",
      id: "CBDButton",
      name: "Center District",
    },
    {
      data: "EU",
      id: "EUButton",
      name: "European District",
    },
    {
      data: "Louise",
      id: "LouiseButton",
      name: "Louise",
    },
    {
      data: "North",
      id: "NorthButton",
      name: "North",
    },
    {
      data: "South",
      id: "South",
      name: "South",
    },
    {
      data: "NE",
      id: "NEButton",
      name: "North-East",
    },
    {
      data: "NW",
      id: "NWButton",
      name: "North-West",
    },
    {
      data: "SE",
      id: "SEButton",
      name: "South-East",
    },
    {
      data: "SW",
      id: "SWButton",
      name: "North-West",
    },
    {
      data: "Airport",
      id: "Airport",
      name: "Airport",
    },
  ];

  return (
    <>
      {buttons.map((button) => (
        <ToggleButton
          isAllDistrictsSelected={isAllDistrictsSelected}
          toggleButton={toggleButton}
          map={map}
          selectedDistricts={selectedDistricts}
          data={button.data}
          id={button.id}
          key={button.id}
        >
          {button.name}
        </ToggleButton>
      ))}
      <CentralisedDistrictsButton
        centralisedDistrictsButtonHandler={centralisedDistrictsButtonHandler}
        centralisedToggle={centralisedToggle}
        setCentralisedToggle={setCentralisedToggle}
      >
        Centralised Districts
      </CentralisedDistrictsButton>
      <DecentralisedDistrictsButton
        decentralisedDistrictsButtonHandler={
          decentralisedDistrictsButtonHandler
        }
        decentralisedToggle={decentralisedToggle}
        setDecentralisedToggle={setDecentralisedToggle}
      >
        Decentralised Districts
      </DecentralisedDistrictsButton>
    </>
  );
};

export default ToggleMenu;
