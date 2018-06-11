import React from "react";
import ReactDOM from "react-dom";
import {I18nextProvider} from "react-i18next";

import i18n from "../common/i18n.jsx";
import App from "./app.jsx";

// ============================ Main ================================
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App/>
  </I18nextProvider>,
  document.getElementById("root")
);
