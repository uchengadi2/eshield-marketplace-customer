import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PaystackButton } from "react-paystack";
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
import CartUpdateAndDeliveryForm from "./CartUpdateAndDeliveryForm";
import CheckoutActionPage from "./CheckoutActionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1500,
    //height: 440,
    height: 230,
    width: 1300,

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "3em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: 600,
    //height: 440,
    height: 545,
    width: 400,

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "5em",
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
    marginLeft: "80px",
  },
  media: {
    height: 250,
    width: 250,
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

export default function CheckoutCard(props) {
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
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();

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

  //confirm if product is on promp
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/productsonsale`, {
        params: {
          product: props.product,
          //status: "active",
        },
      });
      const item = response.data.data.data;

      console.log("items:", item);

      allData.push({
        id: item[0].id,
        price: item[0].salesPricePerUnit,
        minQuantity: item[0].minimumQuantity,
      });

      if (!allData) {
        return;
      }

      setPromoPrice(allData[0].price);
      setIsOnPromo(true);
      setPromoMinQuantity(allData[0].minQuantity);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

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
        configuration: product.configuration,
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
        id: allData[0].id,
        name: allData[0].name,
        imageCover: allData[0].imageCover,
        configuration: allData[0].configuration,
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
      const response = await api.get(`/countries/${props.recipientCountry}`);
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
      const response = await api.get(`/states/${props.recipientState}`);
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
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="row">
              <Grid item style={{ width: 350 }}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={product.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: 600, border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  <Typography variant="h4" color="textSecondary" component="p">
                    {`${product.name} (${product.configuration})`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(product.shortDescription).limit(200, "...").get()}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {isOnPromo
                          ? promoPrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : ""}
                        <span style={{ fontSize: 12 }}>per unit</span>
                      </strong>
                    </span>
                  </Typography>
                  {/* <Typography>
                    <span
                      style={{ fontSize: 15, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Recipient:</strong> &nbsp;
                      <span>{props.recipientName}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Phone Number:</strong>
                      <span>{props.recipientPhoneNumber}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Address:</strong>
                      <span>{props.recipientAddress}</span>
                    </span>
                  </Typography> */}

                  {/* <Typography>
                <span style={{ fontSize: 12, marginLeft: 10 }}>
                  <strong>
                    Additional Delivery Cost per Unit within&nbsp; {stateName}/
                    {countryName} &nbsp; for orders above{" "}
                    {product.maxmumQuantityForBaselineDelivery}&nbsp;Unit(s):
                  </strong>
                  {getCurrencyCode()}
                  {product.deliveryCostPerUnitWithinProductLocation
                    ? product.deliveryCostPerUnitWithinProductLocation
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : ""}
                </span>
              </Typography> */}
                  {/* <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient State:</strong>
                      <span>{stateName}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Country:</strong>
                      <span>{countryName}</span>
                    </span>
                  </Typography> */}
                </CardContent>
              </Grid>

              <Grid item style={{ width: 349, border: "1px dotted grey" }}>
                {product.pricePerUnit && (
                  <CheckoutActionPage
                    price={isOnPromo ? promoPrice : product.pricePerUnit}
                    minimumQuantity={
                      isOnPromo ? promoMinQuantity : product.minimumQuantity
                    }
                    productId={product.id}
                    token={props.token}
                    userId={props.userId}
                    location={product.location}
                    locationCountry={product.locationCountry}
                    baselineDeliveryCostWithinProductLocation={
                      product.baselineDeliveryCostWithinProductLocation
                    }
                    deliveryCostPerUnitWithinProductLocation={
                      product.deliveryCostPerUnitWithinProductLocation
                    }
                    maxmumQuantityForBaselineDelivery={
                      product.maxmumQuantityForBaselineDelivery
                    }
                    quantity={props.quantity}
                    cartId={props.cartId}
                    recipientName={props.recipientName}
                    recipientPhoneNumber={props.recipientPhoneNumber}
                    recipientAddress={props.recipientAddress}
                    recipientCountry={props.recipientCountry}
                    recipientState={props.recipientState}
                    currency={product.currency}
                    productVendor={product.vendor}
                    dateAddedToCart={props.dateAddedToCart}
                    handleMakeOpenLoginFormDialogStatus={
                      handleMakeOpenLoginFormDialogStatus
                    }
                    getCurrencyCode={getCurrencyCode}
                    handleCartItemForCheckoutBox={
                      props.handleCartItemForCheckoutBox
                    }
                    handleSuccessfulCreateSnackbar={
                      props.handleSuccessfulCreateSnackbar
                    }
                    handleFailedSnackbar={props.handleFailedSnack}
                    renderCheckoutUpdate={props.renderCheckoutUpdate}
                  />
                )}
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <CardActionArea disableRipple>
            <Grid container direction="column">
              <Grid item style={{ width: 350 }}>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={product.name}
                  image={imageUrl}
                  //title={product.name}
                  crossOrigin="anonymous"
                />
              </Grid>
              <Grid item style={{ width: 400, border: "1px dotted grey" }}>
                <CardContent disableRipple>
                  <Typography variant="h5" color="textSecondary" component="p">
                    {`${product.name} (${product.configuration})`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {Str(product.shortDescription).limit(200, "...").get()}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 5, marginBottom: 15 }}
                  >
                    <span style={{ marginLeft: 130 }}>
                      <strong>
                        {getCurrencyCode()}
                        {isOnPromo
                          ? promoPrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : product.pricePerUnit
                          ? product.pricePerUnit
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : ""}
                        <span style={{ fontSize: 12 }}>per unit</span>
                      </strong>
                    </span>
                  </Typography>
                  {/* <Typography>
                    <span
                      style={{ fontSize: 15, marginLeft: 10, marginTop: 20 }}
                    >
                      <strong>Recipient:</strong> &nbsp;
                      <span>{props.recipientName}</span>
                    </span>
                  </Typography>

                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Phone Number:</strong>
                      <span>{props.recipientPhoneNumber}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Address:</strong>
                      <span>{props.recipientAddress}</span>
                    </span>
                  </Typography> */}

                  {/* <Typography>
                <span style={{ fontSize: 12, marginLeft: 10 }}>
                  <strong>
                    Additional Delivery Cost per Unit within&nbsp; {stateName}/
                    {countryName} &nbsp; for orders above{" "}
                    {product.maxmumQuantityForBaselineDelivery}&nbsp;Unit(s):
                  </strong>
                  {getCurrencyCode()}
                  {product.deliveryCostPerUnitWithinProductLocation
                    ? product.deliveryCostPerUnitWithinProductLocation
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : ""}
                </span>
              </Typography> */}
                  {/* <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient State:</strong>
                      <span>{stateName}</span>
                    </span>
                  </Typography>
                  <Typography>
                    <span style={{ fontSize: 15, marginLeft: 10 }}>
                      <strong> Recipient Country:</strong>
                      <span>{countryName}</span>
                    </span>
                  </Typography> */}
                </CardContent>
              </Grid>

              <Grid item style={{ width: 400, border: "1px dotted grey" }}>
                {product.pricePerUnit && (
                  <CheckoutActionPage
                    price={isOnPromo ? promoPrice : product.pricePerUnit}
                    minimumQuantity={
                      isOnPromo ? promoMinQuantity : product.minimumQuantity
                    }
                    productId={product.id}
                    token={props.token}
                    userId={props.userId}
                    location={product.location}
                    locationCountry={product.locationCountry}
                    baselineDeliveryCostWithinProductLocation={
                      product.baselineDeliveryCostWithinProductLocation
                    }
                    deliveryCostPerUnitWithinProductLocation={
                      product.deliveryCostPerUnitWithinProductLocation
                    }
                    maxmumQuantityForBaselineDelivery={
                      product.maxmumQuantityForBaselineDelivery
                    }
                    quantity={props.quantity}
                    cartId={props.cartId}
                    recipientName={props.recipientName}
                    recipientPhoneNumber={props.recipientPhoneNumber}
                    recipientAddress={props.recipientAddress}
                    recipientCountry={props.recipientCountry}
                    recipientState={props.recipientState}
                    currency={product.currency}
                    productVendor={product.vendor}
                    dateAddedToCart={props.dateAddedToCart}
                    handleMakeOpenLoginFormDialogStatus={
                      handleMakeOpenLoginFormDialogStatus
                    }
                    getCurrencyCode={getCurrencyCode}
                    handleCartItemForCheckoutBox={
                      props.handleCartItemForCheckoutBox
                    }
                    handleSuccessfulCreateSnackbar={
                      props.handleSuccessfulCreateSnackbar
                    }
                    handleFailedSnackbar={props.handleFailedSnack}
                  />
                )}
              </Grid>
            </Grid>
          </CardActionArea>
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
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>

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
