import React from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store"; // Redux store 가져오기
import App from "./App";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );