import React from "react";

const RightTopMenuText = () => {
  return (
    <div className="rightTopMenu">
      <div className="rightTopMenu-button rightTopMenu-button-line">Line</div>
      <div className="rightTopMenu-button rightTopMenu-button-shape">Shape</div>
      <div className="rightTopMenu-button rightTopMenu-button-location">
        Add Location
      </div>
      <div className="rightTopMenu-button rightTopMenu-button-erase">Erase</div>
      <div className="rightTopMenu-button rightTopMenu-button-color">Color</div>
      <div className="rightTopMenu-button rightTopMenu-button-north">
        Reset North
      </div>
    </div>
  );
};

export default RightTopMenuText;
