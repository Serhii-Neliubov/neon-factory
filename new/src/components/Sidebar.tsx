import './Sidebar.css';
import { Map as MapTypes } from "mapbox-gl";

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

export const Sidebar = ({map}: {map: MapTypes | undefined}) => {
  const currentPitch = map?.getPitch();
  const currentRotation = map?.getBearing();

  function increasePitchHandler() {
    map?.setPitch(currentPitch as number + 5);
  }

  function decreasePitchHandler() {
    map?.setPitch(currentPitch as number - 5);
  }

  function rotateLeftHandler() {
    map?.setBearing(currentRotation as number - 5);
  }

  function rotateRightHandler() {
    map?.setBearing(currentRotation as number + 5);
  }

  function zoomInHandler() {
    map?.zoomIn();
  }

  function zoomOutHandler() {
    map?.zoomOut();
  }

  function setStyleHandler(modeStyle: string) {
    if(MAP_STYLES[modeStyle]){
      map?.setStyle(MAP_STYLES[modeStyle]);
    } else {
      map?.setStyle(MAP_STYLES[MAP_STYLE_MODES.DEFAULT]);
    }
  }

  function setActiveDistrictHandler(district: string | undefined) {
    console.log(district);
  }

  function resetMapHandler() {
    map?.setPitch(0);
    map?.setBearing(0);
    map?.setZoom(11);
    map?.setCenter([4.3517, 50.8503]);
  }

  function downloadMapHandler() {}

  return (
    <div className='body'>
      <div className='sidebar'>
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
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('Center')}>Center</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('European')}>European</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('Louise')}>Louise</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('North')}>North</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('Midi')}>Midi</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('North-East')}>North-East
          </div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('North-West')}>North-West
          </div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('South-East')}>South-East
          </div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('South-West')}>South-West
          </div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('Airport')}>Airport</div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('Cbd')}>Cbd</div>
          <div className='sidebar-brussels_button'
               onClick={() => setActiveDistrictHandler('Decentralised')}>Decentralised
          </div>
          <div className='sidebar-brussels_button' onClick={() => setActiveDistrictHandler('All Districts')}>All
            Districts
          </div>
        </div>
        <button onClick={downloadMapHandler}>Download Map</button>
        <button onClick={resetMapHandler}>Reset Map</button>
      </div>
    </div>
  )
}