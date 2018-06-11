import React from "react";
import ReactDOM from "react-dom";

import App from "./app.jsx";
import StockStore from "./store/stockStore.jsx";

const stockstore =  new StockStore(conf.searchUrl, {
  headers: {"X-CSRFToken": conf.csrfToken},
  CoinInfo: conf.CoinInfo,
});


ReactDOM.render(
  <App store={stockstore}/>,
  document.getElementById("root")
);
