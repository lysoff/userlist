import React from "react";
import { render } from "react-dom";
import { ThemeProvider, Color } from "@superdispatch/ui";
import { CssBaseline, Box } from "@material-ui/core";

import App from "./App";

render(
  <ThemeProvider>
    <Box bgcolor={Color.Silver100} minHeight="100vh" maxWidth="100vw">
      <CssBaseline />
      <App />
    </Box>
  </ThemeProvider>,
  document.getElementById("root")
);
