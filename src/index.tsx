import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./Style/Theme";
import GlobalStyles from "./Style/GlobalStyles";
import App from "./App";

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
