import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
// const arcOrange = "#FFBA60";
const arcOrange = "#FD841F";
const arcGrey = "#868686";
const arcWhite = "#ffffff";
const arcPrimary = "#019a31";

export default createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      grey: arcGrey,
      white: arcWhite,
      green: arcPrimary,
    },
    primary: {
      // main: arcBlue,
      main: arcPrimary,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "None",
      fontWeight: 700,
      fontSize: "0.85rem",
      "&:hover": {
        color: "white",
      },
    },
    // estimate: {
    //   fontFamily: "Pacifico",
    //   fontSize: "0.85rem",
    //   textTransform: "none",
    //   color: "white",
    // },
    estimate: {
      fontFamily: "Roboto",
      fontSize: "0.85rem",
      textTransform: "none",
      color: "white",
    },
    partner: {
      fontFamily: "Raleway",
      fontSize: "0.85rem",
      textTransform: "none",
      color: "white",
    },
    signOut: {
      fontFamily: "Roboto",
      fontSize: "0.85rem",
      textTransform: "none",
      color: "white",
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.0rem",
      color: "#ffffff",
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      // color: arcBlue,
      color: arcPrimary,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      // color: arcBlue,
      color: arcPrimary,
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Raleway",
      fontSize: "1.25rem",
      // color: arcBlue,
      color: arcPrimary,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: arcGrey,
    },
    subtitle2: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: 300,
    },

    learnButton: {
      // borderColor: arcBlue,
      borderColor: arcPrimary,
      borderwidth: 2,
      textTransform: "none",
      // color: arcBlue,
      color: arcPrimary,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    partnerButton: {
      borderColor: arcWhite,
      borderwidth: 2,
      textTransform: "none",
      color: arcOrange,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        // color: arcBlue,
        color: arcPrimary,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 400,
      },
      underline: {
        "&:before": {
          // borderBottom: `2px solid ${arcBlue}`,
          borderBottom: `2px solid ${arcPrimary}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          // borderBottom: `2px solid ${arcBlue}`,
          borderBottom: `2px solid ${arcPrimary}`,
        },
      },
    },
  },
});
