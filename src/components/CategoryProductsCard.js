import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import clsx from "clsx";
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

import ButtonArrow from "./ui/ButtonArrow";
import UserLogin from "./users/UserLogin";
import UserSignUp from "./users/UserSignUp";
import UserPasswordReset from "./users/UserPasswordReset";
import Bookings from "./Bookings";
import history from "../history";
import ProductsForCategory from "./products/ProductsForCategory";
import ProductDetails from "./products/ProductDetails";
import api from "./../apis/local";

import { baseURL } from "./../apis/util";

import theme from "./ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 325,
    // //height: 440,
    // height: 500,
    maxWidth: 350,
    height: 400,
    //height: 370,
    width: 325,
    //width: 500,

    marginLeft: "10px",
    borderRadius: 30,
    marginTop: "10em",
    marginBottom: "3em",
    padding: 0,
  },
  rootMobile: {
    maxWidth: 600,
    //height: 440,
    height: 400,
    width: 325,

    marginLeft: "0px",
    borderRadius: 30,
    marginTop: "15em",
    padding: 0,
    // "&:hover": {
    //   border: "solid",
    //   borderColor: theme.palette.common.grey,
    // },
  },
  media: {
    height: 100,
    width: 100,
    marginLeft: "100px",
  },
  mediaMobile: {
    height: 100,
    width: 100,
    marginLeft: "100px",
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
}));

export default function CategoryProductsCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();

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

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.currency}`);
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
      const response = await api.get(`/countries/${props.locationCountry}`);
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
      const response = await api.get(`/states/${props.location}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setStateName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //const imageUrl = `${baseURL}/images/categories/${props.image}`;
  const imageUrl = `${baseURL}/images/products/${props.image}`;

  const Str = require("@supercharge/strings");

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

  const handleFailedLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not logged you in. Please ensure your login credentials are correct",
      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
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

  const handleFailedSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not sign you up. Please ensure you are connected to the internet and all required fields are completed",
      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(false);
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
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}
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

  const renderSelectedCategoryProducts = (category) => {
    return <ProductsForCategory />;
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
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              alt={props.name}
              image={imageUrl}
              title={props.name}
              crossOrigin="anonymous"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.shortDescription}
              </Typography>
            </CardContent>
            <Typography
              variant="h5"
              color="textSecondary"
              component="p"
              style={{ marginTop: 5 }}
            >
              <span style={{ marginLeft: 130 }}>
                <strong>
                  {getCurrencyCode()}
                  {props.price
                    ? props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0}
                  /unit
                </strong>
              </span>
              <br />
              <span style={{ fontSize: 12, marginLeft: 10 }}>
                Minimum Quantity Required(MQR):
                <span>{props.minimumQuantity} unit(s)</span>
              </span>
              <br />
              <span style={{ fontSize: 11, marginLeft: 10 }}>
                Delivery cost/Unit within&nbsp;
                {stateName}/{countryName}
                {" :"} &nbsp;
                {getCurrencyCode()}
                {props.deliveryCostPerUnitWithinProductLocation
                  ? props.deliveryCostPerUnitWithinProductLocation
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : ""}
              </span>

              {/* <span style={{ fontSize: 11, marginLeft: 10 }}>
            {" "}
            {getCurrencyCode()}
            {props.deliveryCostPerUnitWithinProductLocation
              ? props.deliveryCostPerUnitWithinProductLocation
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              : ""}
          </span> */}
              {/* <span style={{ fontSize: 11, marginLeft: 10 }}>
            Supports delivery beyond Target Location: &nbsp; No
          </span> */}
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button
              component={Link}
              // to="/mobileapps"
              to={`/categories/${props.categoryId}/${props.productId}`}
              varaint="outlined"
              className={classes.learnButton}
              // onClick={() =>
              //   props.token === undefined ? setOpenLoginForm(true) : setOpen(true)
              // }
              // onClick={() => {
              //   props.setValue(1);
              //   props.setSelectedIndex(2);

              // }}
              // onClick={() => {
              //   // setSelectedCategory(props.categoryId);
              //   //renderSelectedCategoryProducts(props.categoryId);
              //   return <ProductsForCategory />;
              // }}
              onClick={() => (
                <ProductDetails
                  productId={props.productId}
                  token={props.token}
                />
              )}
            >
              <span style={{ marginRight: 10 }}>Show Details </span>
              <ButtonArrow
                height={10}
                width={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.rootMobile}>
          <CardActionArea>
            <CardMedia
              className={classes.mediaMobile}
              component="img"
              alt={props.name}
              image={imageUrl}
              title={props.name}
              crossOrigin="anonymous"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.shortDescription}
              </Typography>
            </CardContent>
            <Typography
              variant="h5"
              color="textSecondary"
              component="p"
              style={{ marginTop: 5 }}
            >
              <span style={{ marginLeft: 130 }}>
                <strong>
                  {getCurrencyCode()}
                  {props.price
                    ? props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0}
                  /unit
                </strong>
              </span>
              <br />
              <span style={{ fontSize: 12, marginLeft: 10 }}>
                Minimum Quantity Required(MQR):
                <span>{props.minimumQuantity} unit(s)</span>
              </span>
              <br />
              <span style={{ fontSize: 11, marginLeft: 10 }}>
                Delivery cost/Unit within&nbsp;
                {stateName}/{countryName}
                {" :"} &nbsp;
                {getCurrencyCode()}
                {props.deliveryCostPerUnitWithinProductLocation
                  ? props.deliveryCostPerUnitWithinProductLocation
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : ""}
              </span>

              {/* <span style={{ fontSize: 11, marginLeft: 10 }}>
            {" "}
            {getCurrencyCode()}
            {props.deliveryCostPerUnitWithinProductLocation
              ? props.deliveryCostPerUnitWithinProductLocation
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              : ""}
          </span> */}
              {/* <span style={{ fontSize: 11, marginLeft: 10 }}>
            Supports delivery beyond Target Location: &nbsp; No
          </span> */}
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button
              component={Link}
              // to="/mobileapps"
              to={`/categories/${props.categoryId}/${props.productId}`}
              varaint="outlined"
              className={classes.learnButton}
              // onClick={() =>
              //   props.token === undefined ? setOpenLoginForm(true) : setOpen(true)
              // }
              // onClick={() => {
              //   props.setValue(1);
              //   props.setSelectedIndex(2);

              // }}
              // onClick={() => {
              //   // setSelectedCategory(props.categoryId);
              //   //renderSelectedCategoryProducts(props.categoryId);
              //   return <ProductsForCategory />;
              // }}
              onClick={() => (
                <ProductDetails
                  productId={props.productId}
                  token={props.token}
                />
              )}
            >
              <span style={{ marginRight: 10 }}>Show Details </span>
              <ButtonArrow
                height={10}
                width={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </CardActions>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          {matchesMDUp ? (
            <Card className={classes.dialog}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={props.alt}
                  image={imageUrl}
                  crossOrigin="anonymous"
                />
              </CardActionArea>
            </Card>
          ) : (
            <></>
          )}

          <Bookings
            token={props.token}
            userId={props.userId}
            handleBookingsOpenDialogStatus={handleBookingsOpenDialogStatus}
          />
        </DialogContent>
      </Dialog>
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
