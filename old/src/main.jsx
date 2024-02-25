import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import {StrictMode} from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <StrictMode>
          <App />
      </StrictMode>
  </Provider>
);
