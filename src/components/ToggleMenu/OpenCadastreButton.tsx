import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { openCadastreChanging } from "../../redux/slices/openCadastreSlice";
import CadastreButton from "./CadastreButton";

const OpenCadastreButton = ({ map, setShowCadastre, showCadastre }) => {
  const dispatch = useDispatch();
  const openCadastre = useSelector(
    (state: RootState) => state.openCadastre.value
  );
  return (
    <>
      <button
        onClick={() => dispatch(openCadastreChanging())}
        className={`CadastreButton TransportButton_bg ${
          openCadastre ? "CadastreButton_open" : ""
        }`}
      >
        Cadastre
      </button>
      {openCadastre ? (
        <div className="toggleIcons">
          <CadastreButton
            showCadastre={showCadastre}
            setShowCadastre={setShowCadastre}
            map={map}
          >
            Cadastre
          </CadastreButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OpenCadastreButton;
