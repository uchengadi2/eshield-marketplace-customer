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

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import UpperFooter from "../ui/UpperFooter";

import FeatureProductsCard from "./FeatureProductsCard";
import AppPagination from "../pagination/AppPagination";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    // height: "80vh",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  // rootMobile: {
  //   width: "100%",
  //   height: "80vh",
  //   marginTop: "8em",
  //   // height: "100%",
  //   position: "relative",
  //   "& video": {
  //     objectFit: "cover",
  //   },
  // },
  rootMobile: {
    maxWidth: 600,
    //height: 440,
    height: 900,
    width: 400,

    marginLeft: "-10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
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
  footer: {
    width: "100%",
    marginTop: "10rem",
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

function FeatureProductsPage(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [limit, setLimit] = useState(32);
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

  const cartHolder = params.userId;

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
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products?page=${page}&limit=${limit}`, {
        params: {
          // isFeaturedProduct: true,
        },
      });
      const items = response.data.data.data;

      items.map((product) => {
        allData.push({
          id: product._id,
          name: product.name,
          imageCover: product.imageCover,
          shortDescription: product.shortDescription,
          refNumber: product.refNumber,
          totalUnits: product.totalUnits,
          remainingTotalUnits: product.remainingTotalUnits,
          vendor: product.vendor,
          pricePerUnit: product.pricePerUnit,
          currency: product.currency,
          minimumQuantity: product.minimumQuantity,
          estimatedDeliveryPeriodInDays: product.estimatedDeliveryPeriodInDays,
          estimatedDeliveryPeriodInHours:
            product.estimatedDeliveryPeriodInHours,
          estimatedDeliveryPeriodInMinutes:
            product.estimatedDeliveryPeriodInMinutes,
          isFeaturedProduct: product.isFeaturedProduct,
          configuration: product.configuration,
          sku: product.sku,
          ranking: product.ranking,
          location: product.location,
          locationCountry: product.locationCountry,
          category: product.category,
        });
      });

      setProductList(allData);
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

  const cartList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {productList.map((product, index) => (
            <FeatureProductsCard
              productId={product.id}
              name={product.name}
              image={product.imageCover}
              shortDescription={product.shortDescription}
              minimumQuantity={product.minimumQuantity}
              remainingTotalUnits={product.remainingTotalUnits}
              pricePerUnit={product.pricePerUnit}
              currency={product.currency}
              estimatedDeliveryPeriodInDays={
                product.estimatedDeliveryPeriodInDays
              }
              estimatedDeliveryPeriodInHours={
                product.estimatedDeliveryPeriodInHours
              }
              estimatedDeliveryPeriodInMinutes={
                product.estimatedDeliveryPeriodInMinutes
              }
              configuration={product.configuration}
              sku={product.sku}
              ranking={product.ranking}
              location={product.location}
              locationCountry={product.locationCountry}
              vendor={product.vendor}
              category={product.category}
              key={`${product.id}${index}`}
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
          {productList.map((product, index) => (
            <FeatureProductsCard
              productId={product.id}
              name={product.name}
              image={product.imageCover}
              shortDescription={product.shortDescription}
              minimumQuantity={product.minimumQuantity}
              remainingTotalUnits={product.remainingTotalUnits}
              pricePerUnit={product.pricePerUnit}
              currency={product.currency}
              estimatedDeliveryPeriodInDays={
                product.estimatedDeliveryPeriodInDays
              }
              estimatedDeliveryPeriodInHours={
                product.estimatedDeliveryPeriodInHours
              }
              estimatedDeliveryPeriodInMinutes={
                product.estimatedDeliveryPeriodInMinutes
              }
              configuration={product.configuration}
              sku={product.sku}
              ranking={product.ranking}
              vendor={product.vendor}
              location={product.location}
              locationCountry={product.locationCountry}
              category={product.category}
              key={`${product.id}${index}`}
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
    <>
      {matchesMD ? (
        <Grid container direction="row" className={classes.root}>
          {/* <Typography variant="h4" style={{ marginLeft: 650 }}>
            Hot Sales
          </Typography> */}
          <Grid item style={{ width: "100%", marginTop: "20px" }}>
            <Grid item>{cartList}</Grid>
          </Grid>
          {isPaginationVisible && (
            <Grid item style={{ marginTop: 80 }}>
              <AppPagination
                setPage={setPage}
                page={page}
                pageNumber={totalData}
              />
            </Grid>
          )}
          <Grid item className={classes.footer}>
            <UpperFooter />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" className={classes.rootMobile}>
          {/* <Typography variant="h4" style={{ marginLeft: 130, marginTop: 0 }}>
            Hot Sales
          </Typography> */}
          <Grid item style={{ width: "100%", marginTop: "20px" }}>
            <Grid item>{cartList}</Grid>
          </Grid>
          {isPaginationVisible && (
            <Grid item style={{ marginTop: 80 }}>
              <AppPagination
                setPage={setPage}
                page={page}
                pageNumber={totalData}
              />
            </Grid>
          )}
          <Grid item className={classes.footer}>
            <UpperFooter />
          </Grid>
        </Grid>
      )}

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

export default FeatureProductsPage;
