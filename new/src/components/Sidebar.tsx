import './Sidebar.css';
import {Map as MapTypes} from "mapbox-gl";

const MAP_STYLES = {}

export const Sidebar = ({map}: {map: MapTypes | undefined}) => {
  const currentPitch = map?.getPitch();
  const currentRotation = map?.getBearing();
  const [mapStyle, setMapStyle] = ['default'];

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

  function setDefaultStyleHandler() {
    map?.setStyle('mapbox://styles/neon-factory/clle3pwwc010r01pm1k5f605b');
  }

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
          <div className='sidebar-styles_button' onClick={setDefaultStyleHandler}>Default</div>
          <div className='sidebar-styles_button'>Dark</div>
          <div className='sidebar-styles_button'>Monochrome</div>
          <div className='sidebar-styles_button'>Satellite</div>
        </div>
      </div>
    </div>
  )
}