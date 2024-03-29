import React from "react";
import ToggleButton from "./ToggleButton";
import CentralisedDistrictsButton from "./CentralisedDistrictsButton";
import DecentralisedDistrictsButton from "./DecentralisedDistrictsButton";

const ToggleMenu = ({
  map,
  toggleButton,
  centralisedDistrictsButtonHandler,
  decentralisedDistrictsButtonHandler,
  selectedDistricts,
}) => {
  const buttons = [
    {
      data: "CD",
      id: "CBDButton",
      name: "Centre",
      center: [4.351356, 50.845288],
      zoom: 13,
    },
    {
      data: "EU",
      id: "EUButton",
      name: "European",
      center: [4.385024, 50.844421],
      zoom: 13,
    },
    {
      data: "Louise",
      id: "LouiseButton",
      name: "Louise",
      center: [4.371282, 50.831629],
      zoom: 13,
    },
    {
      data: "North",
      id: "NorthButton",
      name: "North",
      center: [4.348951, 50.86046],
      zoom: 13,
    },
    {
      data: "South",
      id: "South",
      name: "Midi",
      center: [4.331086, 50.839218],
      zoom: 13,
    },
    {
      data: "NE",
      id: "NEButton",
      name: "North-East",
      center: [4.404263, 50.865011],
      zoom: 12,
    },
    {
      data: "NW",
      id: "NWButton",
      name: "North-West",
      center: [4.317688, 50.870644],
      zoom: 12,
    },
    {
      data: "SE",
      id: "SEButton",
      name: "South-East",
      center: [4.416287, 50.81435],
      zoom: 12,
    },
    {
      data: "SW",
      id: "SWButton",
      name: "South-West",
      center: [4.319291, 50.803937],
      zoom: 12,
    },
    {
      data: "Airport",
      id: "Airport",
      name: "Airport",
      center: [4.480888, 50.899911],
      zoom: 11.5,
    },
  ];

  return (
    <>
      {buttons.map((button) => (
        <ToggleButton
          selectedDistricts={selectedDistricts}
          toggleButton={toggleButton}
          map={map}
          data={button.data}
          id={button.id}
          key={button.id}
          center={button.center}
          zoom={button.zoom}
        >
          {button.name}
        </ToggleButton>
      ))}
      <CentralisedDistrictsButton
        centralisedDistrictsButtonHandler={centralisedDistrictsButtonHandler}
      >
        CBD
      </CentralisedDistrictsButton>
      <DecentralisedDistrictsButton
        decentralisedDistrictsButtonHandler={
          decentralisedDistrictsButtonHandler
        }
      >
        Decentralised
      </DecentralisedDistrictsButton>
    </>
  );
};

export default ToggleMenu;
