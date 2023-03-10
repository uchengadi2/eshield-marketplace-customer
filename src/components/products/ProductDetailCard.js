import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import SendProductToCartForm from "./SendProductToCartForm";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import { RoomSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 325,
    maxWidth: 1400,
    //height: 440,
    //height: 500,

    marginLeft: "10px",
    borderRadius: 0,
    marginTop: "12em",
    padding: 0,
    // "&:hover": {
    //   border: "solid",
    //   borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: 400,
    //height: 440,
    //height: 800,
    width: 350,

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "10em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: 200,
    width: 200,
    marginLeft: "100px",
  },
  media: {
    height: 400,
    width: 400,
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  secondRow: {
    marginLeft: 10,
    width: 550,
    border: "1px dotted",
    padding: 20,
  },
  secondRowMobile: {
    marginLeft: 0,
    marginTop: 30,
    width: 380,
    border: "1px dotted",
    padding: 10,
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  thirdRow: {
    marginLeft: 10,
    width: 350,
    border: "1px dotted",
    padding: 20,
  },
  thirdRowMobile: {
    marginLeft: 10,
    marginTop: 30,
    width: 380,
    border: "1px dotted",
    padding: 20,
  },

  secondColumn: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: 1330,
  },
  secondColumnMobile: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: 400,
  },
}));

export default function ProductDetailCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState();

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  //const imageUrl = `${baseURL}/images/categories/${props.image}`;
  const imageUrl = `${baseURL}/images/products/${props.product.imageCover}`;

  const Str = require("@supercharge/strings");

  // console.log(
  //   "this is description trim:",
  //   Str(props.description).limit(100, "...").get()
  // );

  useEffect(() => {
    if (props.isOnPromo) {
      setPrice(props.promoPrice);
      setMinQuantity(props.promoMinQuantity);
    } else {
      setPrice(props.product.pricePerUnit);
      setMinQuantity(props.product.minimumQuantity);
    }
  }, [props]);

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.product.currency}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setCurrencyName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the country name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(
        `/countries/${props.product.locationCountry}`
      );
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setCountryName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the state name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states/${props.product.location}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setStateName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleBookingsOpenDialogStatus = () => {
    setOpen(false);
  };
  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: "You have successfully logged in",
      backgroundColor: "#4BB543",
    });
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    setOpen({ open: false });
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message,
      backgroundColor: "#FF3232",
    });
    setOpen({ open: false });
  };
  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(true);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: "You have successfully signed up",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(true);
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  // const handleLogOutDialogOpenStatus = () => {
  //   // history.push("/categories/new");
  //   setOpenLogOut(false);
  // };
  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        <DialogContent>
          <UserLogin
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}\
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
  };

  return (
    <>
      {matchesMDUp ? (
        <Grid container direction="column" className={classes.root}>
          <Grid item container direction="row">
            <Grid item>
              <Card>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={props.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRow}>
              <Box>
                <Typography variant="h4" style={{ fontSize: "2.5em" }}>
                  {props.product.name}({props.product.configuration})
                </Typography>
                <Typography variant="h4" style={{ marginTop: 10 }}>
                  {getCurrencyCode()}
                  {price
                    ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0}
                  <span style={{ fontSize: 12, marginLeft: 0 }}>per Unit</span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  {props.product.shortDescription}
                </Typography>
                {props.product.sku !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Sku:</strong>
                    </span>
                    {props.product.sku}
                  </Typography>
                )}
                {props.product.refNumber !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Reference Number:</strong>
                    </span>
                    {props.product.refNumber}
                  </Typography>
                )}
                {/* {props.product.weightPerUnit !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Weight per Unit:</strong>
                    </span>
                    {props.product.weightPerUnit
                      ? props.product.weightPerUnit
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : 0}
                    <span style={{ fontSize: 12, marginLeft: 0 }}>kg</span>
                  </Typography>
                )} */}
                {/* {props.product.remainingTotalUnits !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Number of Units in Stock:</strong>
                    </span>
                    {props.product.remainingTotalUnits}
                  </Typography>
                )} */}

                {/* {props.product.make !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Make:</strong>
                    </span>

                    {props.product.make}
                  </Typography>
                )} */}

                {/* {props.product.model !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Model:</strong>
                    </span>
                    {props.product.model}
                  </Typography>
                )} */}
                {/* {props.product.color !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Colour:</strong>
                    </span>
                    {props.product.color}
                  </Typography>
                )} */}
                {/* {props.product.size !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Size:</strong>
                    </span>
                    {props.product.size}
                  </Typography>
                )} */}
                {/* {props.product.design !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Design:</strong>
                    </span>
                    {props.product.design}
                  </Typography>
                )} */}

                {/* {props.product.content !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Content:</strong>
                    </span>
                    {props.product.content}
                  </Typography>
                )} */}
                {/* {props.product.smell !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Smell:</strong>
                    </span>
                    {props.product.smell}
                  </Typography>
                )} */}
                {/* {props.product.taste !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Taste:</strong>
                    </span>
                    {props.product.taste}
                  </Typography>
                )} */}
                {/* {props.product.feel !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Feel:</strong>
                    </span>
                    {props.product.feel}
                  </Typography>
                )} */}
                {/* {props.product.ingredients !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Ingredients:</strong>
                    </span>
                    {props.product.ingredients}
                  </Typography>
                )} */}
                {/* {props.product.reliability !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Reliability:</strong>
                    </span>
                    {props.product.reliability}
                  </Typography>
                )} */}
                {/* {props.product.safety !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Safety:</strong>
                    </span>
                    {props.product.safety}
                  </Typography>
                )} */}
                {/* {(props.product.packaging !== "undefined" ||
                  props.product.packaging !== undefined ||
                  props.product.packaging !== "") && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Packaging:</strong>
                    </span>
                    {props.product.packaging}
                  </Typography>
                )} */}
                {/* {props.product.durability !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Durability:</strong>
                    </span>
                    {props.product.durability}
                  </Typography>
                )} */}
                {/* {props.product.marketingClaims !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>MarketingClaims:</strong>
                    </span>
                    {props.product.marketingClaims}
                  </Typography>
                )} */}
                {/* {stateName !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Target Delivery Location:</strong>
                    </span>
                    {stateName}/{countryName}
                  </Typography>
                )} */}
                {/* <Typography variant="h5" style={{ color: "black", fontSize: 15 }}>
              <span style={{ marginRight: 20 }}>
                {" "}
                <strong>Supports delivery beyond Target Location:</strong>
              </span>
              No
            </Typography> */}
                {props.product.minimumQuantity !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Minimum Quantity Required:</strong>
                    </span>
                    {minQuantity} unit(s)
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item className={classes.thirdRow}>
              <Box>
                <SendProductToCartForm
                  price={price}
                  currency={props.product.currency}
                  minimumQuantity={minQuantity}
                  productId={props.product.id}
                  token={props.token}
                  userId={props.userId}
                  location={props.product.location}
                  locationCountry={props.product.locationCountry}
                  handleMakeOpenSignUpDialogStatus={
                    handleMakeOpenSignUpDialogStatus
                  }
                  handleMakeCloseSignUpDialogStatus={
                    handleMakeCloseSignUpDialogStatus
                  }
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleMakeCloseForgotPasswordFormDialogStatus={
                    handleMakeCloseForgotPasswordFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  handleFailedSignUpDialogOpenStatusWithSnackbar={
                    handleFailedSignUpDialogOpenStatusWithSnackbar
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item className={classes.secondColumn}>
            <Box>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                {props.product.fullDescription}{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid item container direction="column">
            <Grid item>
              <Card>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={props.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRowMobile}>
              <Box>
                <Typography variant="h5" style={{ fontSize: "2.0em" }}>
                  {props.product.name}
                </Typography>
                <Typography variant="h5">
                  {getCurrencyCode()}
                  {price
                    ? price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0}
                  <span style={{ fontSize: 12, marginLeft: 0 }}>per Unit</span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  {props.product.shortDescription}
                </Typography>
                {props.product.sku !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      <strong>Sku:</strong>
                    </span>
                    {props.product.sku}
                  </Typography>
                )}
                {props.product.refNumber !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Reference Number:</strong>
                    </span>
                    {props.product.refNumber}
                  </Typography>
                )}
                {/* {props.product.weightPerUnit !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Weight per Unit:</strong>
                    </span>
                    {props.product.weightPerUnit
                      ? props.product.weightPerUnit
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : 0}
                    <span style={{ fontSize: 12, marginLeft: 0 }}>kg</span>
                  </Typography>
                )} */}
                {/* {props.product.remainingTotalUnits !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Number of Units in Stock:</strong>
                    </span>
                    {props.product.remainingTotalUnits}
                  </Typography>
                )} */}

                {/* {props.product.make !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Make:</strong>
                    </span>

                    {props.product.make}
                  </Typography>
                )} */}

                {/* {props.product.model !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Model:</strong>
                    </span>
                    {props.product.model}
                  </Typography>
                )} */}
                {/* {props.product.color !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Colour:</strong>
                    </span>
                    {props.product.color}
                  </Typography>
                )} */}
                {/* {props.product.size !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Size:</strong>
                    </span>
                    {props.product.size}
                  </Typography>
                )} */}
                {/* {props.product.design !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Design:</strong>
                    </span>
                    {props.product.design}
                  </Typography>
                )} */}

                {/* {props.product.content !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Content:</strong>
                    </span>
                    {props.product.content}
                  </Typography>
                )} */}
                {/* {props.product.smell !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Smell:</strong>
                    </span>
                    {props.product.smell}
                  </Typography>
                )} */}
                {/* {props.product.taste !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Taste:</strong>
                    </span>
                    {props.product.taste}
                  </Typography>
                )} */}
                {/* {props.product.feel !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Feel:</strong>
                    </span>
                    {props.product.feel}
                  </Typography>
                )} */}
                {/* {props.product.ingredients !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Ingredients:</strong>
                    </span>
                    {props.product.ingredients}
                  </Typography>
                )} */}
                {/* {props.product.reliability !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Reliability:</strong>
                    </span>
                    {props.product.reliability}
                  </Typography>
                )} */}
                {/* {props.product.safety !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Safety:</strong>
                    </span>
                    {props.product.safety}
                  </Typography>
                )} */}
                {/* {props.product.packaging !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Packaging:</strong>
                    </span>
                    {props.product.packaging}
                  </Typography>
                )} */}
                {/* {props.product.durability !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Durability:</strong>
                    </span>
                    {props.product.durability}
                  </Typography>
                )} */}
                {/* {props.product.marketingClaims !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>MarketingClaims:</strong>
                    </span>
                    {props.product.marketingClaims}
                  </Typography>
                )} */}
                {/* {stateName !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Target Delivery Location:</strong>
                    </span>
                    {stateName}/{countryName}
                  </Typography>
                )} */}
                {/* <Typography variant="h5" style={{ color: "black", fontSize: 15 }}>
              <span style={{ marginRight: 20 }}>
                {" "}
                <strong>Supports delivery beyond Target Location:</strong>
              </span>
              No
            </Typography> */}
                {props.product.minimumQuantity !== "undefined" && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {" "}
                      <strong>Minimum Quantity Required:</strong>
                    </span>
                    {minQuantity} unit(s)
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item className={classes.thirdRowMobile}>
              <Box>
                <SendProductToCartForm
                  price={price}
                  currency={props.product.currency}
                  minimumQuantity={minQuantity}
                  //quantity={minQuantity}
                  productId={props.product.id}
                  token={props.token}
                  userId={props.userId}
                  location={props.product.location}
                  locationCountry={props.product.locationCountry}
                  handleMakeOpenSignUpDialogStatus={
                    handleMakeOpenSignUpDialogStatus
                  }
                  handleMakeCloseSignUpDialogStatus={
                    handleMakeCloseSignUpDialogStatus
                  }
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleMakeCloseForgotPasswordFormDialogStatus={
                    handleMakeCloseForgotPasswordFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  handleFailedSignUpDialogOpenStatusWithSnackbar={
                    handleFailedSignUpDialogOpenStatusWithSnackbar
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item className={classes.secondColumnMobile}>
            <Box>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                {props.product.fullDescription}{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      {renderLoginForm()}
      {renderSignUpForm()}
      {renderForgotPasswordForm()}
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </>
  );
}
