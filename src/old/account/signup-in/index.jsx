import React from "react";
import ReactDOM from "react-dom";
import {I18nextProvider} from "react-i18next";

import i18n from "../../common/i18n.jsx";
import APP from "./components/APP.jsx";
import APPStore from "./store/APPStore.jsx";

const appStore = new APPStore();
i18n.changeLanguage(conf.languageCode);
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <APP store={appStore}/>
  </I18nextProvider>,
  document.getElementById("root")
);
