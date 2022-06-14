import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FFFF",
      light: "#EB3A5A",
    },
    secondary: {
      main: "#36FF8C",
      light: "#999999",
    },
    text: {
      primary: "#fff",
      secondary: "#999999",
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Roboto",
        backgroundColor: "#131313 !important",
        color: "#fff",
      },
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
