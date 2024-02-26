import "mapbox-gl/dist/mapbox-gl.css";
import {ReactNode} from "react";

export const Map = ({children}: {children: ReactNode}) => {
  return (
    <div id="map" style={{ width: '100%', height: '100vh' }}>
      {children}
    </div>
  )
}