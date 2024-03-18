import { Map as MapTypes } from 'mapbox-gl';
import { useState } from 'react';
import html2canvas from "html2canvas";

const MAP_STYLE_MODES = {
  DEFAULT: 'default',
  DARK: 'dark',
  MONOCHROME: 'monochrome',
  SATELLITE: 'satellite',
}
const MAP_STYLES = {
  [MAP_STYLE_MODES.DEFAULT]: 'mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b',
  [MAP_STYLE_MODES.DARK]: 'mapbox://styles/neon-factory/cllwooepi00i101pjf7im44oy',
  [MAP_STYLE_MODES.MONOCHROME]: 'mapbox://styles/neon-factory/cllwomphb00i401qyfp8m9u97',
  [MAP_STYLE_MODES.SATELLITE]: 'mapbox://styles/neon-factory/cllwohnul00im01pfe5adhc90',
}

const TRANSPORT_LAYOUTS: {[value: string]: string} = {
  TRANSIT_LABEL: 'transit-label',
  STIB_2023: 'stib-2023',
  PARKINGS: 'parkings',
  GARES_BRUXELLES: 'gares-bruxelles',
}

const BRUSSELS_BUTTONS = [
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

type SidebarProps = {
  map: MapTypes | undefined
}

export const Sidebar = ({map}: SidebarProps) => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [currentStyle, setCurrentStyle] = useState(MAP_STYLES[MAP_STYLE_MODES.DEFAULT]);
  const [sidebarVisibleStatus, setSidebarVisibleStatus] = useState('Close');
  const [isTransportActive, setIsTransportActive] = useState(true);
  const [isRestaurantsActive, setIsRestaurantsActive] = useState(false);
  const [isCadastreActive, setIsCadastreActive] = useState(false);

  function increasePitchHandler() {
    const currentPitch = map?.getPitch();
    map?.setPitch(currentPitch as number + 5);
  }

  function decreasePitchHandler() {
    const currentPitch = map?.getPitch();
    map?.setPitch(currentPitch as number - 5);
  }

  function rotateLeftHandler() {
    const currentRotation = map?.getBearing();
    map?.setBearing(currentRotation as number - 5);
  }

  function rotateRightHandler() {
    const currentRotation = map?.getBearing();
    map?.setBearing(currentRotation as number + 5);
  }

  function zoomInHandler() {
    map?.zoomIn();
  }

  function zoomOutHandler() {
    map?.zoomOut();
  }

  function setStyleHandler(modeStyle: string) {
    setCurrentStyle(MAP_STYLES[modeStyle]);

    map?.setStyle(MAP_STYLES[modeStyle]);
  }

  function setActiveDistrictsHandler(district: string, centerCoordinates: number[]) {
    const districtIndex = selectedDistricts.indexOf(district);

    if (districtIndex !== -1) {
      selectedDistricts.splice(districtIndex, 1);
    } else {
      selectedDistricts.push(district);
    }

    const newFilter = ["any", ...selectedDistricts.map(d => ["==", ["get", "sidebar_label"], d])];

    map?.setFilter("districts-brussels-0-2", newFilter);
    map?.triggerRepaint();

    map?.flyTo({
      center: centerCoordinates as [number, number],
      duration: 800,
      zoom: 12,
      essential: true
    });
  }

  function resetMapHandler() {
    map?.setStyle(currentStyle);

    map?.flyTo({
      zoom: 12,
      pitch: 0,
      bearing: 0,
      center: [4.3517, 50.8503],
      duration: 800,
      essential: true
    });

    setSelectedDistricts([]);
  }

  function sidebarVisibleHandler() {
    if(sidebarVisibleStatus === 'Open') {
      setSidebarVisibleStatus('Close');
    } else {
      setSidebarVisibleStatus('Open');
    }
  }

  function setTransportIconsHandler() {
    setIsTransportActive(!isTransportActive);

    if(isTransportActive) {
      Object.keys(TRANSPORT_LAYOUTS).forEach((key) => {
        map?.setLayoutProperty(TRANSPORT_LAYOUTS[key], 'visibility', 'none');
      });
    } else {
      Object.keys(TRANSPORT_LAYOUTS).forEach((key) => {
        map?.setLayoutProperty(TRANSPORT_LAYOUTS[key], 'visibility', 'visible');
      });
    }
  }

  function setRestaurantsIconsHandler() {
    setIsRestaurantsActive(!isRestaurantsActive);

    if(!isRestaurantsActive) {
      map?.setLayoutProperty("poi-label", "visibility", "visible");
    } else {
      map?.setLayoutProperty("poi-label", "visibility", "none");
    }
  }

  function cadastreHandler() {
    setIsCadastreActive(!isCadastreActive);

    if(!isCadastreActive) {
      map?.setLayoutProperty("bruxelles-cadastre-complet-7xijuk", "visibility", "visible");
      map?.setLayoutProperty("building", "visibility", "none");
    } else {
      map?.setLayoutProperty("bruxelles-cadastre-complet-7xijuk", "visibility", "none");
      map?.setLayoutProperty("building", "visibility", "visible");
    }
  }

  function downloadMapHandler() {
    const mapElement = document.getElementById('map');

    if (mapElement) {
      html2canvas(mapElement, {
        useCORS: true,
        allowTaint: true
      }).then(canvas => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = "test.png";
        a.href = canvas.toDataURL();
        a.click();
      });
    } else {
      console.error('Map element not found.');
    }
  }

  return (
    <div className='absolute z-10'>
      {sidebarVisibleStatus === 'Close' && <div className='sidebar'>
          <div className='sidebar-controls'>
              <button className='sidebar-controls_button' onClick={zoomInHandler}>Zoom In</button>
              <button className='sidebar-controls_button' onClick={zoomOutHandler}>Zoom Out</button>
              <button className='sidebar-controls_button' onClick={rotateLeftHandler}>Rotate Left</button>
              <button className='sidebar-controls_button' onClick={rotateRightHandler}>Rotate Right</button>
              <button className='sidebar-controls_button' onClick={increasePitchHandler}>Increase Pitch</button>
              <button className='sidebar-controls_button' onClick={decreasePitchHandler}>Decrease Pitch</button>
          </div>
          <div className='sidebar-styles'>
              <div className='sidebar-styles_button' onClick={() => setStyleHandler('default')}>Default</div>
              <div className='sidebar-styles_button' onClick={() => setStyleHandler('dark')}>Dark</div>
              <div className='sidebar-styles_button' onClick={() => setStyleHandler('monochrome')}>Monochrome</div>
              <div className='sidebar-styles_button' onClick={() => setStyleHandler('satellite')}>Satellite</div>
          </div>
          <div className='sidebar-brussels'>
            {BRUSSELS_BUTTONS.map((button) => {
              return (
                <div key={button.id} className='sidebar-brussels_button'
                     onClick={() => setActiveDistrictsHandler(button.data, button.center)}>
                  {button.name}
                </div>
              );
            })}
              <div className='sidebar-brussels_button'>Cbd</div>
              <div className='sidebar-brussels_button'>Decentralised</div>
              <div className='sidebar-brussels_button'>All Districts</div>
          </div>
          <div className='sidebar-transport-amnities'>
              <button className='sidebar-transport-amnities_button'
                      onClick={() => setTransportIconsHandler()}>Transport
              </button>
              <button className='sidebar-transport-amnities_button'
                      onClick={() => setRestaurantsIconsHandler()}>Shops, Restaurants & Services
              </button>
          </div>
          <div className='sidebar-cadastre'>
              <button className='sidebar-cadastre_button' onClick={cadastreHandler}>Cadastre</button>
          </div>
          <button onClick={downloadMapHandler}>Download Map</button>
          <button onClick={resetMapHandler}>Reset Map</button>
      </div>}
      <button className='sidebar-close' onClick={sidebarVisibleHandler}>{sidebarVisibleStatus}</button>
    </div>
  )
}