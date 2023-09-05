import React from "react";

const MyModal = () => {
  return (
    <div className="modal-window">
      <div className="modal-window__content">
        <div className="modal-window__close-button">&times;</div>
        <div className="modal-window__text">
          <div className="modal-window__logo">
            <a href="https://neon-factory.design/">
              <img alt="Logo" className="logo__icon" src="logo.svg" />
            </a>
          </div>
          <h3 className="modal-window__title">
            TO UNLOCK THE FULL VERSION <br /> PLEASE INSERT YOUR E-MAIL, NAME
            AND COMPANY
          </h3>
          <div className="modal-window__inputs">
            <input
              className="modal-window__input"
              type="text"
              placeholder="e-mail"
            />
            <input
              className="modal-window__input"
              type="text"
              placeholder="name"
            />
            <input
              className="modal-window__input"
              type="text"
              placeholder="company"
            />
          </div>
          <div className="modal-window__toggles">
            <div className="modal-window__toggle">
              <input type="checkbox" />
              <p>PLEASE SEND ME YOUR NEWSLETTER</p>
            </div>
            <div className="modal-window__toggle">
              <input type="checkbox" />
              <p>
                PLEASE CONTACT ME!
                <br />
                I’AM INTERESTED TO HAVE MY OWN
              </p>
            </div>
          </div>
          <button className="modal-window__button">CONTINUE MAPPING</button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
