import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { store } from "./store";
import Header from "./components/header";
import Game from "./components/game";
import "./app.scss";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="app">
          <Header />
          <Game />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
