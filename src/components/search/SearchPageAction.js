import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ProductDetails from "../products/ProductDetails";
import ButtonArrow from "../ui/ButtonArrow";
import theme from "./../ui/Theme";
import api from "./../../apis/local";
import { CREATE_RATE, EDIT_RATE } from "../../actions/types";

//import CheckoutPage from "./CheckoutPage";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.orange,
      color: "white",
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

const renderRecipientNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Name"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

const renderRecipientPhoneNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Phone Number"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

function SearchPageAction(props) {
  const {
    price,
    productId,
    categoryId,
    minimumQuantity,
    remainingTotalUnits,
    weight,
    token,
    userId,
  } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();

  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [rate, setRate] = useState();
  const [rateNumber, setRateNumber] = useState();
  const [rateComment, setRateComment] = useState();
  const [rateId, setRateId] = useState();
  const [dateRated, setDateRated] = useState();
  const [hasRate, setHasRate] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const user = params.userId;

  const classes = useStyles();
  const [total, setTotal] = useState(
    price
      ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : 0
  );
  const [loading, setLoading] = useState();

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/rates`, {
        params: { product: props.productId, ratedBy: user },
      });

      const item = response.data.data.data;
      console.log("rate response:", item);

      allData.push({
        id: item[0]._id,
        rate: item[0].rate,
        rateComment: item[0].rateComment,
        dateRated: item[0].dateRated,
      });

      if (!allData) {
        return;
      }

      if (allData[0].rate) {
        setRate(allData[0].rate);
      }
      if (allData[0].rateComment) {
        setRateComment(allData[0].rateComment);
      }
      if (allData[0].dateRated) {
        setDateRated(allData[0].dateRated);
      }
      if (allData[0].id) {
        setRateId(allData[0].id);
      }
      setHasRate(true);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: country },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  const onChange = (e) => {
    const quantity = parseFloat(e.target.value);
    setQuantity(quantity);
    const newTotal = quantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  };

  const onRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const onRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const onRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === productLocation) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setIsCheckoutVisible(false);
    setProvideDeliveryCost(true);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const onRateCommentChange = (event) => {
    setRateComment(event.target.value);
  };

  const handleRateNumberChange = (event) => {
    setRateNumber(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  //get the state list
  const renderLocationList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderTotalField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Total Product Cost"
        label={label}
        id={input.name}
        name={input.name}
        value={total}
        //defaultValue={total}
        fullWidth
        type={type}
        disabled
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
        }}
      />
    );
  };

  const renderProductRateCommentField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Rate Comment"
        label={label}
        id={input.name}
        name={input.name}
        defaultValue={rateComment}
        fullWidth
        type={type}
        style={{ marginTop: 10, width: 300 }}
        onChange={input.onChange}
        multiline
        minRows={3}
      />
    );
  };

  const renderRequestedQuantityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Quantity Ordered"
        variant="outlined"
        label={label}
        id={input.name}
        //value={input.value}
        fullWidth
        //required
        type={type}
        {...custom}
        defaultValue={quantity}
        onChange={input.onChange}
        //   inputProps={{
        //     style: {
        //       height: 1,
        //     },

        //   }}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
            },
          },
        }}
      />
    );
  };

  const renderProductCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="locationCountry"
            id="locationCountry"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 140, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductLocationField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            style={{ width: 150, marginTop: 0, marginLeft: 30, height: 38 }}
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 40 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductRateField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="rate"
            id="rate"
            value={rate}
            onChange={handleRateChange}
            label="Account Type"
            style={{ height: 38, width: 300, marginTop: 10 }}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
          </Select>
          <FormHelperText>Rate</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const totalDeliveryCost = props.totalDeliveryCost;

  const totalProductCost = props.totalProductCost;
  const totalProductCostForDisplay = totalProductCost;

  const totalDeliveryCostForDisplay = totalDeliveryCost;

  const buttonContent = () => {
    return <React.Fragment>Show Details</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    // if (props.paymentStatus !== "confirmed") {
    //   props.handleFailedSnackbar(
    //     "You can only rate a product with a confirmed payment"
    //   );
    //   setLoading(false);
    //   return;
    // }

    if (!rate) {
      props.handleFailedSnackbar("Please select a rating value and try again");
      setLoading(false);
      return;
    }

    let data = {};

    data = {
      refNumber: "RT-" + Math.floor(Math.random() * 100000000000),
      rate: rate,
      ratedBy: user,
      product: props.productId,
      rateComment: formValues["rateComment"],
    };

    console.log("rate data is:", data);

    if (!hasRate) {
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.post(`/rates`, data);

          if (response.data.status === "success") {
            dispatch({
              type: CREATE_RATE,
              payload: response.data.data.data,
            });

            props.handleSuccessfulCreateSnackbar(
              `Thank you for your feedback. We always strive to serve you better!`
            );

            setLoading(false);
            setIsCheckoutVisible(true);
            setHasRate(true);
          } else {
            props.handleFailedSnackbar(
              "Something went wrong, please try again!!!"
            );
          }
        };
        createForm().catch((err) => {
          props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    } else {
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(`/rates/${rateId}`, data);

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_RATE,
              payload: response.data.data.data,
            });

            props.handleSuccessfulCreateSnackbar(
              `Thank you for updating your feedback. We always strive to serve you better!`
            );

            setLoading(false);
            setIsCheckoutVisible(true);
            setHasRate(true);
          } else {
            props.handleFailedSnackbar(
              "Something went wrong, please try again!!!"
            );
          }
        };
        createForm().catch((err) => {
          props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    }
    return;
  };

  return (
    <form id="searchActionPage">
      <Box
        sx={{
          width: 200,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        className={classes.root}
      >
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>
        <Typography>
          <span style={{ fontSize: 15, marginLeft: 0 }}>
            <strong> Unit Weight:</strong>
            <span>{weight}&nbsp;kg</span>
          </span>
        </Typography>
        <Typography style={{ width: 300, marginTop: 15 }}>
          <strong>Stock Quantity:</strong>&nbsp;{remainingTotalUnits}
          &nbsp;unit(s)
        </Typography>
        <Typography style={{ width: 300, marginTop: 15 }}>
          <strong>Minimum Quantity Required(MQR):</strong>&nbsp;
          {minimumQuantity}&nbsp;unit(s)
        </Typography>

        <Button
          component={Link}
          // to="/mobileapps"
          to={`/categories/${categoryId}/${productId}`}
          varaint="outlined"
          className={classes.submitButton}
          onClick={() => (
            <ProductDetails productId={productId} token={props.token} />
          )}
        >
          {/* <span style={{ marginRight: 10 }}>Show Details </span> */}
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
          {/* <ButtonArrow
            height={10}
            width={10}
            fill={theme.palette.common.blue}
          /> */}
        </Button>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "searchActionPage",
})(SearchPageAction);
