import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Drag from "./components/DragNDrop/Drag";
import DragHorizontal from "./components/DragNDrop/DragHorizontal";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<DragHorizontal />, document.getElementById("root"));
