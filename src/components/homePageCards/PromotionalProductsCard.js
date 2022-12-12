import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
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

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
//import CartUpdateAndDeliveryForm from "./CartUpdateAndDeliveryForm";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 325,
    // //height: 440,
    // height: 500,
    maxWidth: 340,
    height: 400,
    //height: 370,
    // width: 325,
    //width: 500,

    marginLeft: "10px",
    borderRadius: 30,
    marginTop: "3em",
    marginBottom: "3em",
    padding: 0,
  },
  media: {
    height: 100,
    width: 100,
    padding: 10,
    marginLeft: "100px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "0px",
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

export default function PromotionalProductsCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();

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

  //get the product details
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products/${props.product}`);
      const product = response.data.data.data;

      allData.push({
        id: product._id,
        name: product.name,
        imageCover: product.imageCover,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        sku: product.sku,
        remainingTotalUnits: product.remainingTotalUnits,
        totalUnits: product.totalUnits,
        category: product.category,
        vendor: product.vendor,
        pricePerUnit: product.pricePerUnit,
        currency: product.currency,
        ranking: product.ranking,
        refNumber: product.refNumber,
        make: product.make,
        model: product.model,
        color: product.color,
        size: product.size,
        design: product.design,
        weightPerUnit: product.weightPerUnit,
        content: product.content,
        smell: product.smell,
        taste: product.taste,
        feel: product.feel,
        ingredients: product.ingredients,
        reliability: product.reliability,
        safety: product.safety,
        packaging: product.packaging,
        marketingClaims: product.marketingClaims,
        durability: product.durability,
        location: product.location,
        locationCountry: product.locationCountry,
        minimumQuantity: product.minimumQuantity,
        configuration: product.configuration,
        deliveryCostPerUnitWithinProductLocation:
          product.deliveryCostPerUnitWithinProductLocation,
        maxmumQuantityForBaselineDelivery:
          product.maxmumQuantityForBaselineDelivery,
        baselineDeliveryCostWithinProductLocation:
          product.baselineDeliveryCostWithinProductLocation,
        estimatedDeliveryPeriodInDays: product.estimatedDeliveryPeriodInDays,
        estimatedDeliveryPeriodInHours: product.estimatedDeliveryPeriodInHours,
        estimatedDeliveryPeriodInMinutes:
          product.estimatedDeliveryPeriodInMinutes,
      });

      if (!allData) {
        return;
      }
      setProduct({
        productId: allData[0].id,
        name: allData[0].name,
        imageCover: allData[0].imageCover,
        shortDescription: allData[0].shortDescription,
        fullDescription: allData[0].fullDescription,
        sku: allData[0].sku,
        remainingTotalUnits: allData[0].remainingTotalUnits,
        totalUnits: allData[0].totalUnits,
        category: allData[0].category,
        vendor: allData[0].vendor,
        pricePerUnit: allData[0].pricePerUnit,
        currency: allData[0].currency,
        ranking: allData[0].ranking,
        refNumber: allData[0].refNumber,
        make: allData[0].make,
        model: allData[0].model,
        color: allData[0].color,
        size: allData[0].size,
        design: allData[0].design,
        weightPerUnit: allData[0].weightPerUnit,
        content: allData[0].content,
        smell: allData[0].smell,
        taste: allData[0].taste,
        feel: allData[0].feel,
        ingredients: allData[0].ingredients,
        reliability: allData[0].reliability,
        safety: allData[0].safety,
        packaging: allData[0].packaging,
        marketingClaims: allData[0].marketingClaims,
        durability: allData[0].durability,
        location: allData[0].location,
        locationCountry: allData[0].locationCountry,
        minimumQuantity: allData[0].minimumQuantity,
        deliveryCostPerUnitWithinProductLocation:
          allData[0].deliveryCostPerUnitWithinProductLocation,
        maxmumQuantityForBaselineDelivery:
          allData[0].maxmumQuantityForBaselineDelivery,
        baselineDeliveryCostWithinProductLocation:
          allData[0].baselineDeliveryCostWithinProductLocation,
        estimatedDeliveryPeriodInDays: allData[0].estimatedDeliveryPeriodInDays,
        estimatedDeliveryPeriodInHours:
          allData[0].estimatedDeliveryPeriodInHours,
        estimatedDeliveryPeriodInMinutes:
          allData[0].estimatedDeliveryPeriodInMinutes,
        configuration: allData[0].configuration,
      });
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${product.currency}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setCurrencyName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [product]);

  //get the country name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries/${product.locationCountry}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setCountryName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [product]);

  //get the state name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states/${product.location}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setStateName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [product]);

  //get the state name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/vendors/${product.vendor}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setVendorName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [product]);

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.imageCover}`;
  }

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

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: message,
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

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    // setOpen({ open: false });
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
    //setOpen({ open: false });
  };

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

  if (!product) {
    return <></>;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={product.name}
          image={imageUrl}
          title={product.name}
          crossOrigin="anonymous"
        />

        <CardContent style={{ padding: 10, height: 200, marginTop: 30 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
            <span>({product.configuration})</span>
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ marginLeft: 70, fontSize: "1.1rem" }}
          >
            <strong>
              {getCurrencyCode()}
              {props.salesPricePerUnit
                ? props.salesPricePerUnit
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                : 0}{" "}
              /unit
            </strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Minimum Quantity Required: {props.minimumQuantity} unit(s)
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Product Location: {stateName}/{countryName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Delivery within Location in:{" "}
            {product.estimatedDeliveryPeriodInDays
              ? product.estimatedDeliveryPeriodInDays
              : ""}
            {product.estimatedDeliveryPeriodInDays ? "days" : ""}&nbsp;
            {product.estimatedDeliveryPeriodInHours
              ? product.estimatedDeliveryPeriodInHours
              : ""}
            {product.estimatedDeliveryPeriodInHours ? " hrs" : ""}&nbsp;
            {product.estimatedDeliveryPeriodInMinutes
              ? product.estimatedDeliveryPeriodInMinutes
              : ""}
            {product.estimatedDeliveryPeriodInMinutes ? " mins" : ""}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          // to="/mobileapps"
          to={`/categories/${product.category}/${product.productId}`}
          varaint="outlined"
          className={classes.learnButton}
          onClick={() => (
            <ProductDetails productId={product.productId} token={props.token} />
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
                  // height="250"
                  component="img"
                  alt={props.alt}
                  image={imageUrl}
                  crossOrigin="anonymous"
                />
              </CardActionArea>
            </Card>
          ) : (
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
    </Card>
  );
}
