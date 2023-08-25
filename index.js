import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { store , persistor } from "./src/Store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
