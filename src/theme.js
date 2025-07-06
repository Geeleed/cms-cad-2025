"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Prompt, sans-serif",
  },
  //   components: {
  //     MuiCssBaseline: {
  //       styleOverrides: {
  //         body: {
  //           fontFamily: "Prompt, sans-serif",
  //         },
  //       },
  //     },
  //   },
  palette: {
    primary: {
      light: "#f59c9f",
      main: "#fa5457",
      dark: "#f1383c",
      contrastText: "#ffecef",
    },
    secondary: {
      light: "#2dcfd2",
      main: "#00b6bc",
      dark: "#078c8c",
      contrastText: "#000",
    },
  },
});

export default theme;
