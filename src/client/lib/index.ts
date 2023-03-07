import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const mainDiv = document.getElementById("main");
if (mainDiv) {
	ReactDOM.render(App(), mainDiv);
}