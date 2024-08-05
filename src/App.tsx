import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/header";
import Game from "./components/game";
import "./app.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <Game />
      </div>
    </Provider>
  );
}

export default App;
