import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
// import rootReducer from "./reducers/reducers";
import kinoSlice from "./reducers/kinoSlice";

const store = configureStore({ reducer:{ kino: kinoSlice }});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
