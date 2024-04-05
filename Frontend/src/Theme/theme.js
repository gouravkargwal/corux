import { blue, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {},
        flexContainer: {
          border: `1px solid ${grey[500]}`, // Encapsulates tabs with a border
          borderRadius: "5px",
          overflow: "hidden",
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:last-child": {
            borderRight: "none",
          },
          "&.Mui-selected": {
            color: "#fff",
            backgroundColor: blue["A700"],
          },
        },
      },
    },
  },
});

export default theme;
