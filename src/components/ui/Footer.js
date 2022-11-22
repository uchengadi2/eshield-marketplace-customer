import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import FooterAdornment from "./../../assets/Footer Adornment.svg";
import facebook from "./../../assets/facebook.svg";
import twitter from "./../../assets/twitter.svg";
import linkedIn from "./../../assets/linkedin.svg";
import instagram from "./../../assets/instagram.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.green,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adorement: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },

  mainContainer: {
    position: "absolute",
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      color: "orange",
    },
  },
  gridItem: {
    margin: "3em",
  },
  icon: {
    height: "4em",
    width: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      width: "2.5em",
    },
  },
  socialContainer: {
    position: "absolute",
    marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
    },
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid
          container
          justify="center"
          // alignItems="center"
          className={classes.mainContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="/"
                onClick={() => props.setValue(0)}
                className={classes.link}
              >
                {/* Home */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="/services"
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(0);
                }}
                className={classes.link}
              >
                {/* Products */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/customservices"
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(1);
                }}
                className={classes.link}
              >
                {/* Custom Services */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/categories"
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(2);
                }}
                className={classes.link}
              >
                {/* Product Categories */}
              </Grid>
              {/* <Grid
                item
                component={Link}
                to="/categories"
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(3);
                }}
                className={classes.link}
              >
                Cart
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="/revolution"
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(4);
                }}
                className={classes.link}
              >
                {/* The Partners */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/revolution"
                onClick={() => props.setValue(2)}
                className={classes.link}
              >
                {/* Vendor */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/revolution"
                onClick={() => props.setValue(2)}
                className={classes.link}
              >
                {/* Courier */}
              </Grid>
              {/* <Grid
                item
                component={Link}
                to="/revolution"
                onClick={() => props.setValue(2)}
                className={classes.link}
              >
                Process
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="/about"
                onClick={() => props.setValue(3)}
                className={classes.link}
              >
                {/* About Us */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/about"
                onClick={() => props.setValue(3)}
                className={classes.link}
              >
                {/* History */}
              </Grid>
              <Grid
                item
                component={Link}
                to="/about"
                onClick={() => props.setValue(3)}
                className={classes.link}
              >
                {/* Team */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container dieection="column" spacing={2}>
              <Grid
                item
                component={Link}
                to="/contact"
                onClick={() => props.setValue(4)}
                className={classes.link}
              >
                {/* Contact Us */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img
        alt="black decorative slash"
        src={FooterAdornment}
        className={classes.adorement}
      />

      <Grid
        container
        spacing={2}
        justify="flex-end"
        //alignItems="center"
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com/eshieldafricab2b/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="facebok logo" src={facebook} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.linkedin.com/company/e-shield-africa/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="twitter logo" src={linkedIn} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com/e_shieldafrica/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="instagram logo" src={instagram} className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
