import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import swDev from "./serviceWorker";
import firebase from "./firebase";

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    return messaging.getToken();
  })
  .then((token: any) => {
    console.log("token", token);
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
swDev();
