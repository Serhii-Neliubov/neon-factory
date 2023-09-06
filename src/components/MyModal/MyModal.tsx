import React from "react";

const MyModal = ({ modalWindowHandler }) => {
  return (
    <div className="modal-window">
      <div className="modal-window__content">
        <div
          onClick={modalWindowHandler}
          className="modal-window__close-button"
        ></div>
        <div className="modal-window__text">
          <div className="modal-window__logo">
            <a href="https://neon-factory.design/">
              <svg
                width="55"
                height="60"
                viewBox="0 0 55 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3602 24.8521C21.3602 24.8521 20.9618 21.743 26.7845 21.5916C32.6071 21.4401 49.2018 21.5916 49.2018 21.5916C49.2018 21.5916 53.27 21.1372 53.27 16.0564C53.27 10.9771 48.1644 8.55098 43.2979 9.76402M16.414 24.8521C16.414 24.8521 15.9359 20.2984 18.0091 17.1536M8.67596 17.1551C8.67596 17.1551 10.2711 14.6177 12.9035 14.3905C15.536 14.1633 35.7989 14.3905 35.7989 14.3905C35.7989 14.3905 39.389 14.0876 40.4264 10.5242C41.4637 6.9608 38.1923 3.70028 38.1923 3.70028C38.1923 3.70028 36.1176 1.87997 32.2087 1.87997C28.2999 1.87997 26.4642 4.98905 26.2252 5.822C25.9861 6.65643 25.9065 9.45668 25.9065 9.45668M13.5425 9.45668C13.5425 9.45668 14.1815 3.54735 19.3667 3.16874C24.5519 2.79013 26.2267 5.822 26.2267 5.822M3.5704 17.1551C3.5704 17.1551 2.30807 4.36248 14.8658 5.85169M14.8658 32.4347V27.734H22.7163V32.4347M40.6295 44.5652H53.2715V57.7572H1.65503V19.8485H9.87267L9.71176 57.7572M10.5898 34.7851H37.9533V57.7572M16.3671 48.8101V53.8909M21.3539 48.8101V53.8909M26.5454 48.8101V53.8909M31.651 48.8101V53.8909M42.9792 48.8101V53.8909M48.1644 48.8101V53.8909"
                  stroke="#4CC0AD"
                  stroke-width="3"
                  stroke-miterlimit="10"
                />
              </svg>
            </a>
          </div>
          <h3 className="modal-window__title">
            TO UNLOCK THE FULL VERSION <br /> PLEASE INSERT YOUR E-MAIL, NAME
            AND COMPANY
          </h3>
          <div className="modal-window__inputs">
            <div className="modal-window__input">
              <input type="text" placeholder="e-mail" />
            </div>
            <div className="modal-window__input">
              <input type="text" placeholder="name" />
            </div>

            <div className="modal-window__input">
              <input type="text" placeholder="company" />
            </div>
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
