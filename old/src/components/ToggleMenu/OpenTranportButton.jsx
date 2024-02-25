import { useDispatch, useSelector } from "react-redux";
import { openTransportChanging } from "../../redux/slices/openTransportSlice";
import TransportButton from "./TransportButton.jsx";
import MapIconsToggle from "./MapIconsToggle";

const OpenTranportButton = ({ map }) => {
  const dispatch = useDispatch();
  const openTransport = useSelector(
    (state) => state.openTransport.value
  );
  return (
    <>
      <button
        onClick={() => dispatch(openTransportChanging())}
        className={`TransportButton TransportButton_bg ${
          openTransport ? "TransportButton_open" : ""
        }`}
      >
        Transports & Amenieties
      </button>
      {openTransport ? (
        <div className="toggleIcons">
          <TransportButton map={map}>Transport</TransportButton>
          <MapIconsToggle map={map}>
            SHOPS, RESTAURANTS & SERVICES
          </MapIconsToggle>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OpenTranportButton;
