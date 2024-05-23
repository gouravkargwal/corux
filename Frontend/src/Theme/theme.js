import { blue, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fc211d",
      light: "#fc4642",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#dcdcdd4a",
      green: "rgb(235, 247, 241)",
      violet: "#f9f3ff",
      red: "#fff5f6",
      main: "#fbfbfb",
    },
    button: {
      red: "#e9565a",
      violet: "#b651a2",
      green: "#32b76c",
    },
    text: {
      blue: "#3e8eef",
      grey: "#949ca7",
      red: "#e9565a",
      violet: "#b651a2",
      green: "#32b76c",
      white: "#FFF",
    },
    icon: {
      green: "#32b76c",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            fontWeight: 500,
            fontFamily: "Ubuntu,sans-serif",
            fontSize: "12px",
          },
        },
      },
    },
  },
});

export default theme;
