import React from "react";

const LayoutChanger = ({
  defaultStyleHandler,
  satelitteStyleHandler,
  monochromeStyleHandler,
  darkStyleHandler,
}) => {
  return (
    <div className="menuMapStyle">
      <div onClick={defaultStyleHandler} className="menuMapStyleButton">
        <input
          className="DefaultInput"
          type="radio"
          name="rtoggle"
          defaultChecked
        />
        <label>Default</label>
      </div>
      <div onClick={satelitteStyleHandler} className="menuMapStyleButton">
        <input className="SatelitteInput" type="radio" name="rtoggle" />
        <label>Satellite</label>
      </div>
      <div onClick={monochromeStyleHandler} className="menuMapStyleButton">
        <input className="MonochromeInput" type="radio" name="rtoggle" />
        <label>Monochrome</label>
      </div>
      <div onClick={darkStyleHandler} className="menuMapStyleButton">
        <input className="DarkInput" type="radio" name="rtoggle" />
        <label>Dark</label>
      </div>
    </div>
  );
};

export default LayoutChanger;
