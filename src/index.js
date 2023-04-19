// This index.js file imports the dependencies necessary to run this application
// react, react bootstrap, redux, and the redux toolkit.
// The kinoSlice import is a redux toolkit element 
// to pull in the reducer from the Redux store.
// The app is wrapped in a Provider from React Redux to make the store 
// accessible to the whole App.
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import kinoSlice from "./reducers/kinoSlice";

const store = configureStore({ reducer:{ kino: kinoSlice }});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
