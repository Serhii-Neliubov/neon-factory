import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "./App.css";

import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVvbi1mYWN0b3J5IiwiYSI6ImNrcWlpZzk1MzJvNWUyb3F0Z2UzaWZ5emQifQ.T-AqPH9OSIcwSLxebbyh8A";

const districtVisibility = {
  CBD: true,
  EU: true,
  Louise: true,
  North: true,
  South: true,
};

function App() {
  const [map, setMap] = useState(null);
  const districtButtons = document.querySelectorAll(".toggleButton");
  const submenu = document.querySelector(".submenu");
  const controlsButton = document.querySelector("#controlsButton");
  const centralisedButton = document.getElementById("CBDEULouiseNorthButton");

  useEffect(() => {
    const mapSettings = {
      container: "map",
      style: "mapbox://styles/neon-factory/clf8a2hoq001r01mukt9dgsmp",
      center: [4.387564, 50.838193],
      zoom: 11,
    };

    const map = new mapboxgl.Map(mapSettings);
    setMap(map);
    const geocoderContainer = document.getElementById("geocoderContainer");

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Your Adress Here",
      marker: {
        draggable: false,
        element: createCustomMarkerElement(),
      },
    });

    geocoderContainer.appendChild(geocoder.onAdd(map));
  }, []);

  function controlsButtonHandler() {
    const submenuDisplay = submenu.style.display === "none" ? "block" : "none";

    submenu.style.display = submenuDisplay;

    controlsButton.textContent =
      submenu.style.display === "none" ? "Open Controls" : "Close Controls";
  }

  function zoomInHandler() {
    map.zoomIn();
  }

  function zoomOutButtonHandler() {
    map.zoomOut();
  }

  function rotateLeftHandler() {
    const currentRotation = map.getBearing();
    map.setBearing(currentRotation - 15);
  }

  function rotateRightButtonHandler() {
    var currentRotation = map.getBearing();
    map.setBearing(currentRotation + 15);
  }

  function increasePitchButtonHandler() {
    var currentPitch = map.getPitch();
    map.setPitch(currentPitch + 10);
  }

  function decreasePitchButtonHandler() {
    var currentPitch = map.getPitch();
    map.setPitch(currentPitch - 10);
  }

  function resetMapButtonHandler() {
    map.flyTo({
      center: [4.387564, 50.838193],
      zoom: 11,
      bearing: 0,
      pitch: 0,
    });

    // Reset the visibility of all districts
    for (var district in districtVisibility) {
      toggleDistrictLayerVisibility(district, districtVisibility[district]);
    }

    // Reset the visibility of the main layer
    map.setLayoutProperty("districts-brussels-0-2", "visibility", "visible");

    var allDistrictsButton = document.getElementById("allDistrictsButton");

    allDistrictsButton.addEventListener("click", function () {
      // Toggle the visibility of the "districts-brussels-0-2" layer
      toggleDistrictLayerVisibility();
      // Toggle the text of the button
      toggleButtonText(allDistrictsButton, "All Districts", true);
    });

    // Reset button text
    toggleButtonText(allDistrictsButton, "All Districts", true);
    toggleButtonText(centralisedButton, "Show Centralised Districts", false);

    districtButtons.forEach(function (button) {
      toggleButtonText(button, button.getAttribute("data-district"), false);
    });

    // Reset the sidebar label visibility
    var sidebarLabels = document.querySelectorAll(".sidebar-label");

    sidebarLabels.forEach(function (label) {
      label.classList.remove("hidden");
    });
  }

  function toggleDistrictLayerVisibility(district, isVisible) {
    var layerId = "districts-brussels-0-2";
    var visibility = map.getLayoutProperty(layerId, "visibility");

    if (!isVisible) {
      map.setLayoutProperty(layerId, "visibility", "visible");
    }

    if (district === "Centralised") {
      // Toggle the visibility of the "districts-brussels-0-2" layer for CBD, EU, Louise, and North
      var districtsToShow = ["CBD", "EU", "Louise", "North"];

      for (var i = 0; i < districtsToShow.length; i++) {
        map.setFilter(layerId, [
          "==",
          ["get", "sidebar_label"],
          districtsToShow[i],
        ]);
        map.setLayoutProperty(layerId, "visibility", "visible");
      }
    } else {
      if (visibility === "visible") {
        // Set the filter to hide the selected district
        map.setFilter(layerId, ["!=", ["get", "sidebar_label"], district]);
      } else {
        // Set the filter to show only the selected district
        map.setFilter(layerId, ["==", ["get", "sidebar_label"], district]);
      }

      // Toggle the visibility of the layer
      map.setLayoutProperty(
        layerId,
        "visibility",
        visibility === "visible" ? "none" : "visible"
      );
    }

    // Update the visibility of the district
    districtVisibility[district] = isVisible;

    // Update the filter to show/hide the district
    var filter = ["==", ["get", "sidebar_label"], district];
    map.setFilter(layerId, filter);
    map.setLayoutProperty(layerId, "visibility", visibility);
  }

  function centralisedButtonHandler() {
    var districtsToShow = ["CBD", "EU", "Louise", "North", "South"];

    toggleDistrictLayerVisibility(districtsToShow);
    toggleButtonText(centralisedButton);
  }

  districtButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var district = button.getAttribute("data-district");

      // Toggle the visibility of the sidebar label item named "North"
      toggleSidebarLabelItemVisibility(district);

      // Toggle the text of the button
      toggleButtonText(button, district, false);

      // Toggle the visibility of the "districts-brussels-0-2" layer based on 'sidebar_label' property
      toggleDistrictLayerVisibility(district);
    });
  });

  function toggleSidebarLabelItemVisibility(district) {
    // Find the sidebar label item with the corresponding district name
    var sidebarLabelItem = document.querySelector(
      '.sidebar-label[data-district="' + district + '"]'
    );

    if (sidebarLabelItem) {
      // Toggle the visibility of the sidebar label item
      sidebarLabelItem.classList.toggle("hidden");
    }
  }

  function toggleButtonText(button, districtName, isAllDistricts) {
    var buttonText = button.textContent;
    if (buttonText.includes("Hide")) {
      if (isAllDistricts) {
        button.textContent = "Show All Districts";
      } else {
        button.textContent = "Show " + districtName;
      }
    } else {
      if (isAllDistricts) {
        button.textContent = "Hide All Districts";
      } else {
        button.textContent = "Hide " + districtName;
      }
    }
  }

  // Function to remove the custom marker
  // function removeCustomMarker() {
  //   // Get the custom marker element
  //   var customMarker = document.querySelector(".custom-marker");

  //   // Remove the custom marker from the map
  //   if (customMarker) {
  //     customMarker.parentNode.removeChild(customMarker);
  //   }
  // }

  function createCustomMarkerElement() {
    var element = document.createElement("div");
    element.className = "custom-marker";
    element.style.backgroundImage = "url(pin.png)";
    return element;
  }

  return (
    <div id="mapContainer">
      <div className="sidebar">
        <div className="sidebarCompany">
          <img
            style={{ width: "25px" }}
            alt="Logo"
            className="logo"
            src="logo.png"
          />
          <h1 className="">Neon Factory</h1>
        </div>
        <div id="geocoderContainer"></div>
        <div className="greenLine"></div>
        <button
          onClick={controlsButtonHandler}
          className="controlButton"
          id="controlsButton"
        >
          Open Controls
        </button>
        <div
          className="submenu"
          id="controlsSubMenu"
          style={{ display: "none" }}
        >
          <button onClick={zoomInHandler} className="controlButton zoomIn">
            Zoom In
          </button>
          <button
            onClick={zoomOutButtonHandler}
            className="controlButton zoomOut"
          >
            Zoom Out
          </button>
          <button
            onClick={rotateLeftHandler}
            className="controlButton rotateLeft"
          >
            Rotate Left
          </button>
          <button
            onClick={rotateRightButtonHandler}
            className="controlButton rotateRight"
          >
            Rotate Right
          </button>
          <button
            onClick={increasePitchButtonHandler}
            className="controlButton increasePitch"
          >
            Increase Pitch
          </button>
          <button
            onClick={decreasePitchButtonHandler}
            className="controlButton decreasePitch"
          >
            Decrease Pitch
          </button>
        </div>
        <div className="greenLine"></div>
        <button
          onClick={resetMapButtonHandler}
          className="controlButton resetMap"
        >
          Reset Map
        </button>
        <div className="greenLine"></div>
        Brussels
        <div className="greenLine"></div>
        <div className="toggleContainer">
          <button className="toggleButton" id="allDistrictsButton">
            All Districts
          </button>
          <button
            onClick={centralisedButtonHandler}
            className="toggleButton"
            id="CBDEULouiseNorthButton"
          >
            Show Centralised Districts
          </button>
          <button className="toggleButton" data-district="CBD" id="CBDButton">
            Central Business district
          </button>
          <button className="toggleButton" data-district="EU" id="EUButton">
            European District
          </button>
          <button
            className="toggleButton"
            data-district="Louise"
            id="LouiseButton"
          >
            Louise
          </button>
          <button
            className="toggleButton"
            data-district="North"
            id="NorthButton"
          >
            North
          </button>
          <button className="toggleButton" data-district="NE" id="NEButton">
            North-East
          </button>
          <button className="toggleButton" data-district="NW" id="NWButton">
            North-West
          </button>
          <button
            className="toggleButton"
            data-district="South"
            id="SouthButton"
          >
            South
          </button>
          <button className="toggleButton" data-district="SE" id="SEButton">
            South-East
          </button>
          <button className="toggleButton" data-district="SW" id="SWButton">
            South-West
          </button>
          <button
            className="toggleButton"
            data-district="Airport"
            id="AirportButton"
          >
            Airport
          </button>
          <div className="greenLine"></div>
        </div>
      </div>
      <div id="map" style={{ flex: 1 }}></div>
    </div>
  );
}

export default App;
