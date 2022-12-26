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
import ProductDetailCard from "./ProductDetailCard";
import UpperFooter from "../ui/UpperFooter";

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
  footer: {
    width: "100%",
    marginTop: "10rem",
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

function ProductDetails(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();

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
  const productId = params.productId;

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

  //confirm if product is on promp
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/productsonsale`, {
        params: {
          product: productId,
          //status: "active",
        },
      });
      const item = response.data.data.data;

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products/${productId}`);
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
        deliveryCostPerUnitWithinProductLocation:
          product.deliveryCostPerUnitWithinProductLocation,
        priceMarkupPerUnit: product.priceMarkupPerUnit,
        configuration: product.configuration,
        isFeaturedProduct: product.isFeaturedProduct,
        baselineDeliveryCostWithinProductLocation:
          product.baselineDeliveryCostWithinProductLocation,
        maxmumQuantityForBaselineDelivery:
          product.maxmumQuantityForBaselineDelivery,
        estimatedDeliveryPeriodInDays: product.estimatedDeliveryPeriodInDays,
        estimatedDeliveryPeriodInHours: product.estimatedDeliveryPeriodInHours,
        estimatedDeliveryPeriodInMinutes:
          product.estimatedDeliveryPeriodInMinutes,
      });

      setProduct({
        id: allData[0].id,
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
        priceMarkupPerUnit: allData[0].priceMarkupPerUnit,
        configuration: allData[0].configuration,
        isFeaturedProduct: allData[0].isFeaturedProduct,
        baselineDeliveryCostWithinProductLocation:
          allData[0].baselineDeliveryCostWithinProductLocation,
        maxmumQuantityForBaselineDelivery:
          allData[0].maxmumQuantityForBaselineDelivery,
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

  const Str = require("@supercharge/strings");

  const productData = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          <ProductDetailCard
            product={product}
            isOnPromo={isOnPromo}
            promoPrice={promoPrice}
            promoMinQuantity={promoMinQuantity}
            key={product.id}
            token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            handleSuccessfulCreateSnackbar={
              props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={props.handleFailedSnackbar}
          />
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
          <ProductDetailCard
            product={product}
            isOnPromo={isOnPromo}
            promoPrice={promoPrice}
            promoMinQuantity={promoMinQuantity}
            key={product.id}
            token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            handleSuccessfulCreateSnackbar={
              props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={props.handleFailedSnackbar}
          />
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "10px" }}>
        <Grid item>{productData}</Grid>

        {/*....INFORMATION BLOCK....*/}
      </Grid>
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
