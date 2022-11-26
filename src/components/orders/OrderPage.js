import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import UpperFooter from "../ui/UpperFooter";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category, LibraryMusicOutlined } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";
import AppPagination from "../pagination/AppPagination";

import OrderProductCard from "./OrderProductCard";
//import CheckoutCard from "./CheckoutCard";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    marginTop: "10em",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },

  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

function OrderPage(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState();
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const user = params.userId;

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders?page=${page}&limit=${limit}`, {
        params: { orderedBy: user },
      });
      const items = response.data.data.data;

      items.map((order) => {
        allData.push({
          id: order._id,
          orderNumber: order.orderNumber,
          cartId: order.cartId,
          product: order.product.id,
          dateAddedToCart: order.dateAddedToCart,
          orderedQuantity: order.orderedQuantity,
          orderedPrice: order.orderedPrice,
          productCurrency: order.productCurrency,
          locationCountry: order.locationCountry,
          productLocation: order.productLocation,
          recipientName: order.recipientName,
          recipientPhoneNumber: order.recipientPhoneNumber,
          recipientAddress: order.recipientAddress,
          recipientCountry: order.recipientCountry,
          recipientState: order.recipientState,
          totalDeliveryCost: order.totalDeliveryCost,
          totalProductCost: order.totalProductCost,
          dateAddedToCart: order.dateAddedToCart,
          dateOrdered: order.dateOrdered,
          orderedBy: order.orderedBy,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
        });
      });

      setOrderList(allData);
      setNumberOfPages(response.data?.total);
    };

    //call the function

    fetchData().catch(console.error);
  }, [page]);

  useEffect(() => {
    if (!numberOfPages) {
      setIsPaginationVisible(false);
      return;
    }

    const totalPages = numberOfPages / limit;

    let newTotalPages;

    if (parseInt(numberOfPages) <= parseInt(limit)) {
      newTotalPages = 1;
      setIsPaginationVisible(false);
    } else if (parseInt(numberOfPages) % parseInt(limit) === 0) {
      newTotalPages = +totalPages;
      setIsPaginationVisible(true);
    } else {
      newTotalPages = +totalPages + 1;
      setIsPaginationVisible(true);
    }

    setTotalData(parseInt(newTotalPages));
  }, [numberOfPages]);

  const Str = require("@supercharge/strings");

  const customerOrderList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {orderList.map((order, index) => (
            <OrderProductCard
              product={order.product}
              key={`${order.id}${index}`}
              cartId={order.id}
              dateAddedToCart={order.dateAddedToCart}
              locationCountry={order.locationCountry}
              productLocation={order.productLocation}
              orderedQuantity={order.orderedQuantity}
              orderedPrice={order.orderedPrice}
              productCurrency={order.productCurrency}
              totalProductCost={order.totalProductCost}
              dateOrdered={order.dateOrdered}
              paymentStatus={order.paymentStatus}
              paymentMethod={order.paymentMethod}
              recipientName={order.recipientName}
              recipientPhoneNumber={order.recipientPhoneNumber}
              recipientAddress={order.recipientAddress}
              recipientCountry={order.recipientCountry}
              recipientState={order.recipientState}
              totalDeliveryCost={order.totalDeliveryCost}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {orderList.map((order, index) => (
            <OrderProductCard
              product={order.product}
              key={`${order.id}${index}`}
              cartId={order.id}
              dateAddedToCart={order.dateAddedToCart}
              locationCountry={order.locationCountry}
              productLocation={order.productLocation}
              orderedQuantity={order.orderedQuantity}
              orderedPrice={order.orderedPrice}
              productCurrency={order.productCurrency}
              totalProductCost={order.totalProductCost}
              dateOrdered={order.dateOrdered}
              paymentStatus={order.paymentStatus}
              paymentMethod={order.paymentMethod}
              recipientName={order.recipientName}
              recipientPhoneNumber={order.recipientPhoneNumber}
              recipientAddress={order.recipientAddress}
              recipientCountry={order.recipientCountry}
              recipientState={order.recipientState}
              totalDeliveryCost={order.totalDeliveryCost}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        <Grid item>{customerOrderList}</Grid>
        {/*....INFORMATION BLOCK....*/}
      </Grid>
      {isPaginationVisible && (
        <Grid item style={{ marginTop: 80 }}>
          <AppPagination setPage={setPage} page={page} pageNumber={totalData} />
        </Grid>
      )}
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default OrderPage;
