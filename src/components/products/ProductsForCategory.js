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
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
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

function ProductsForCategory(props) {
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

  const categoryId = params.categoryId;

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
      const response = await api.get("/products", {
        params: { category: categoryId },
      });
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: product.name,
          imageCover: product.imageCover || " ",
          shortDescription: product.shortDescription || " ",
          fullDescription: product.fullDescription,
          sku: product.sku,
          remainingTotalUnits: product.remainingTotalUnits,
          totalUnits: product.totalUnits,
          category: product.category,
          vendor: product.vendor,
          pricePerUnit: product.pricePerUnit,
          currency: product.currency,
          ranking: product.ranking,
          location: product.location,
          locationCountry: product.locationCountry,
          minimumQuantity: product.minimumQuantity,
          deliveryCostPerUnitWithinProductLocation:
            product.deliveryCostPerUnitWithinProductLocation,
        });
      });
      setProductList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const Str = require("@supercharge/strings");

  const productsList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {productList.map((product, index) => (
            <CategoryProductsCard
              name={product.name}
              key={`${product.id}${index}`}
              shortDescription={Str(product.shortDescription)
                .limit(100, "...")
                .get()}
              //description={category.description}
              image={product.imageCover}
              productId={product.id}
              categoryId={product.category}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              price={product.pricePerUnit}
              currency={product.currency}
              ranking={product.ranking}
              totalUnits={product.totalUnits}
              sku={product.sku}
              location={product.location}
              locationCountry={product.locationCountry}
              minimumQuantity={product.minimumQuantity}
              deliveryCostPerUnitWithinProductLocation={
                product.deliveryCostPerUnitWithinProductLocation
              }
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
            <CategoryProductsCard
              name={product.name}
              key={`${product.id}${index}`}
              shortDescription={Str(product.shortDescription)
                .limit(100, "...")
                .get()}
              //description={category.description}
              image={product.imageCover}
              productId={product.id}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              price={product.pricePerUnit}
              currency={product.currency}
              ranking={product.ranking}
              totalUnits={product.totalUnits}
              sku={product.sku}
              location={product.location}
              locationCountry={product.locationCountry}
              minimumQuantity={product.minimumQuantity}
              deliveryCostPerUnitWithinProductLocation={
                product.deliveryCostPerUnitWithinProductLocation
              }
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        <Grid item>{productsList}</Grid>
        {/*....INFORMATION BLOCK....*/}
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ height: "80em" }}
          className={classes.infoBackground}
        >
          <Grid
            container
            style={{
              textAlign: matchesXS ? "center" : "inherit",
            }}
            direction={matchesSM ? "column" : "row"}
          >
            <Grid
              item
              sm
              style={{
                marginLeft: matchesXS ? 0 : matchesSM ? "2em" : "5em",
              }}
            >
              <Grid
                container
                direction="column"
                style={{ marginBottom: matchesXS ? "10em" : 0 }}
              >
                <Typography
                  variant="h2"
                  style={{
                    color: "white",
                    fontSize: matchesSM ? "1.75rem" : "2.5rem",
                  }}
                >
                  About Us
                </Typography>
                {matchesMD ? (
                  <Typography variant="subtitle2">
                    Let's get personal
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" style={{ fontSize: 14 }}>
                    <span>
                      We are an online Business-to-Business Marketplace. <br />{" "}
                      We connect Retailers to Dealers & Manufacturers
                      <br />
                      of Fast Moving Goods and Commodities across Africa
                    </span>
                  </Typography>
                )}
                {matchesMD ? (
                  <Grid item>
                    <Button
                      // component={Link}
                      // to="/about"
                      varaint="outlined"
                      className={classes.learnButton}
                      onClick={() => [setAboutUsOpen(true)]}
                      style={{ color: "white", borderColor: "white" }}
                    >
                      <span style={{ marginRight: 10 }}>Learn More </span>
                      <ButtonArrow height={10} width={10} fill="white" />
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={aboutUsOpen}
                  onClose={() => [setAboutUsOpen(false)]}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogContent>
                    <AboutUsFormContainer
                      token={props.token}
                      // handleDialogOpenStatus={handleDialogOpenStatus}
                    />
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>

            <Grid
              item
              sm
              style={{
                marginRight: matchesXS ? 0 : matchesSM ? "2em" : "5em",
                textAlign: matchesXS ? "center" : "right",
              }}
            >
              <Grid container direction="column">
                <Typography
                  variant="h2"
                  style={{
                    color: "white",
                    fontSize: matchesSM ? "1.75rem" : "2.5rem",
                  }}
                >
                  Contact Us
                </Typography>
                {matchesMD ? (
                  <Typography variant="subtitle2">Say hello!</Typography>
                ) : (
                  <Typography variant="subtitle2" style={{ fontSize: 14 }}>
                    <span>12 Wharf Road, off Itapeju street Apapa, Lagos</span>
                    <br />

                    <span>enquiries@udaraa.com</span>
                    <br />

                    <span>+234 809 429 8412, +234 809 835 4000</span>
                  </Typography>
                )}
                {matchesMD ? (
                  <Grid item>
                    <Button
                      // component={Link}
                      // to="/contact"
                      varaint="outlined"
                      className={classes.learnButton}
                      style={{ color: "white", borderColor: "white" }}
                      onClick={() => [setContactUsOpen(true)]}
                    >
                      <span style={{ marginRight: 10 }}>Learn More </span>
                      <ButtonArrow height={10} width={10} fill="white" />
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={contactUsOpen}
                  onClose={() => [setContactUsOpen(false)]}
                >
                  <DialogContent>
                    <ContactUsContainerForm
                      token={props.token}
                      // handleDialogOpenStatus={handleDialogOpenStatus}
                    />
                  </DialogContent>
                </Dialog>
                <Dialog
                  //style={{ zIndex: 1302 }}
                  fullScreen={matchesXS}
                  open={becomePartnerOpen}
                  onClose={() => [setBecomePartnerOpen(false)]}
                >
                  <DialogContent>
                    <BecomePartnerFormContainer
                      token={props.token}
                      userId={props.userId}
                      // handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar={
                      //   handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar
                      // }
                      // handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar={
                      //   handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar
                      // }
                    />
                  </DialogContent>
                </Dialog>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        {/*....CALL TO ACTION BLOCK ....*/}
        <CallToAction
          setValue={props.setValue}
          token={props.token}
          userId={props.userId}
          // handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar={
          //   handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar
          // }
          // handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar={
          //   handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar
          // }
        />
      </Grid>
    </Grid>
  );
}

export default ProductsForCategory;
