import {Switch} from "@/components/ui/switch.tsx";
import {clsx} from "clsx";
import React, {useState} from "react";

interface CadastreButtonProps {
  map?: mapboxgl.Map;
}

const button = 'text-left cursor-pointer font-semibold text-white uppercase hover:text-[#4CC0AD] transition-all';

export const CadastreButton = ({map}: CadastreButtonProps) => {
  const [isCadastreMenuVisible, setIsCadastreMenuVisible] = useState(false);
  const [isCadastreActive, setIsCadastreActive] = useState(false);

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

  return (
    <React.Fragment>
      <button onClick={() => setIsCadastreMenuVisible(prev => !prev)} className='bg-gradient-to-b bg-[#4CC0AD99] py-[17px] rounded-[8px] text-white font-semibold transition-all uppercase'>cadastre</button>
      {isCadastreMenuVisible && <div className='flex flex-col gap-[15px] p-[20px] border rounded-[8px]'>
          <div className='flex items-center gap-[10px]' onClick={cadastreHandler}>
              <Switch/>
              <button className={clsx(button)}>Cadastre</button>
          </div>
      </div>}
    </React.Fragment>
  )
}