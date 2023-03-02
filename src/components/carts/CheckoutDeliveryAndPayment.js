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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../apis/local";
import { CREATE_ORDER, DELETE_CART } from "../../actions/types";
import CheckoutPage from "./CheckoutPage";
import Paystack from "../../Paystack";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  rootMobile: {
    maxWidth: 370,
    //height: 440,
    height: 950,
    width: 370,

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
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 200,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 150,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
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
  bankDetails: {
    fontSize: 12,
    marginBottom: 4,
    padding: 10,
  },
  info: {
    fontSize: 15,
    marginBottom: 4,
    padding: 10,
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
      //style={{ marginTop: 10, width: 600 }}
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

const renderRecipientAddressField = ({
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
      helperText="Recipient Address"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={4}
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
      //style={{ marginTop: 10, width: 300 }}
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

function CheckoutDeliveryAndPayment(props) {
  const theme = useTheme();
  const { totalCost, currency, token, userId } = props;
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
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [total, setTotal] = useState();
  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
  );

  const dispatch = useDispatch();

  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //     : 0
  // );
  const [loading, setLoading] = useState();

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      if (!currency) {
        return;
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${currency}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (allData[0].name) {
        setCurrencyName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [currency]);

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
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  //get the email address of the customer

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${props.userId}`);
      const user = response.data.data.data;
      allData.push({ id: user._id, name: user.name, email: user.email });
      setCustomerEmail(allData[0].email);
      setCustomerName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //   const onChange = (e) => {
  //     const quantity = parseFloat(e.target.value);
  //     setQuantity(quantity);
  //     const newTotal = quantity * parseFloat(price);
  //     setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  //   };

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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setIsOnlinePayment(true);
    } else {
      setIsOnlinePayment(false);
    }
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

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
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
            style={
              matchesMD
                ? { width: 350, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
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
            style={
              matchesMD
                ? { width: 415, marginLeft: 20, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 0 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentMethodField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            label="Payment Method"
            style={{ height: 38, width: 300, marginTop: 0, marginLeft: 10 }}
          >
            <MenuItem value={"cheque"}>Cheque</MenuItem>
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            <MenuItem value={"bank-transfer"}>Bank Transfer</MenuItem>
            <MenuItem value={"cash"}>Cash</MenuItem>
          </Select>
          <FormHelperText>Payment Method</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost = 0;

  //   const diff = +quantity - +props.maxmumQuantityForBaselineDelivery;

  //   if (diff <= 0) {
  //     totalDeliveryCost = 0;
  //     // parseFloat(
  //     //   props.baselineDeliveryCostWithinProductLocation
  //     // );
  //   } else {
  //     const quantityUnitsForNonBaselineDelivery =
  //       parseInt(quantity) - parseInt(props.maxmumQuantityForBaselineDelivery);
  //     const costforNonBaselineDelivery =
  //       +quantityUnitsForNonBaselineDelivery *
  //       parseFloat(props.deliveryCostPerUnitWithinProductLocation);
  //     totalDeliveryCost = 0;
  //     // +costforNonBaselineDelivery +
  //     // parseFloat(props.baselineDeliveryCostWithinProductLocation);
  //   }

  const totalProductCost = parseFloat(totalCost) + totalDeliveryCost;
  const totalProductCostForDisplay = totalProductCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalDeliveryCostForDisplay = totalDeliveryCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalProductCost.toFixed(2) * 100;

  const buttonContent = () => {
    return <React.Fragment>Make Payment</React.Fragment>;
  };

  const onSubmit = () => {
    setLoading(true);

    if (!recipientName) {
      props.handleFailedSnackbar("the recipient field cannot be empty");
      setLoading(false);
      return;
    }
    if (!recipientPhoneNumber) {
      props.handleFailedSnackbar(
        "the recipient Phone Number field cannot be empty"
      );
      setLoading(false);
      return;
    }
    if (!recipientAddress) {
      props.handleFailedSnackbar("the recipient address field cannot be empty");
      setLoading(false);
      return;
    }
    if (!location) {
      props.handleFailedSnackbar("the state field cannot be empty");
      setLoading(false);
      return;
    }
    if (!country) {
      props.handleFailedSnackbar("the country field cannot be empty");
      setLoading(false);
      return;
    }
    if (!paymentMethod) {
      props.handleFailedSnackbar("the payment method field cannot be empty");
      setLoading(false);
      return;
    }

    props.productList.map((cart, index) => {
      const data = {
        orderNumber: orderNumber,
        product: cart.product,
        orderedPrice: cart.price,
        recipientName: recipientName,
        recipientPhoneNumber: recipientPhoneNumber,
        recipientAddress: recipientAddress,
        recipientCountry: country,
        recipientState: location,
        productLocation: cart.location,
        locationCountry: cart.locationCountry,
        totalDeliveryCost: totalDeliveryCost.toFixed(2),
        //totalProductCost: totalProductCost.toFixed(2),
        productVendor: cart.productVendor,
        cartId: cart.id,
        quantityAdddedToCart: cart.quantity,
        orderedQuantity: cart.quantity,
        dateAddedToCart: cart.dateAddedToCart,
        productCurrency: cart.currency,
        paymentMethod: paymentMethod,
        paymentStatus: "to-be-confirmed",
        orderedBy: cart.cartHolder,
      };

      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.post(`/orders`, data);

          if (response.data.status === "success") {
            dispatch({
              type: CREATE_ORDER,
              payload: response.data.data.data,
            });

            setLoading(false);
          } else {
            props.handleFailedSnackbar(
              "Something went wrong, please try again!!!"
            );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        //props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    });

    const cartData = {
      status: "checkedout",
    };

    //change the status of this cart items
    props.productList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);

        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, we will process your request as soon as possible`
    );
    history.push("/");
  };

  const renderOnlinePayment = (email, amount, orderNumber) => {
    const data = {
      orderNumber: orderNumber,
      //   product: props.productId,
      //   orderedPrice: props.price,
      recipientName: recipientName,
      recipientPhoneNumber: recipientPhoneNumber,
      recipientAddress: recipientAddress,
      recipientCountry: country,
      recipientState: location,
      totalDeliveryCost: totalDeliveryCost ? totalDeliveryCost.toFixed(2) : 0,
      totalProductCost: totalProductCost ? totalProductCost.toFixed(2) : 0,
      //   productVendor: props.productVendor,
      //   cartId: props.cartId,
      //   quantityAdddedToCart: props.quantity,
      //   orderedQuantity: quantity,
      //   dateAddedToCart: props.dateAddedToCart,
      //   productCurrency: props.currency,
      paymentMethod: paymentMethod,
      paymentStatus: "paid",
      orderedBy: props.userId,
    };
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Make Payment"}
        orderNumber={orderNumber}
        data={data}
        productList={props.productList}
        token={props.token}
        handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
        handleFailedSnackbar={props.handleFailedSnackbar}
      />
    );
  };

  return (
    <>
      {matchesMD ? (
        <Grid container direction="row" className={classes.root}>
          <Grid
            item
            container
            style={{
              width: "60%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Grid item container style={{ marginTop: 20, width: 600 }}>
                <FormLabel
                  style={{
                    color: "blue",
                    marginBottom: 30,
                    marginLeft: 300,
                    fontSize: 20,
                  }}
                  component="legend"
                >
                  Delivery Details
                </FormLabel>
              </Grid>
              <Box
                sx={
                  {
                    //width: 1310,
                    //height: 450,
                  }
                }
                noValidate
                autoComplete="off"
              >
                <form id="cartUpdateAndDeliveryForm">
                  <Field
                    label=""
                    id="recipient"
                    name="recipient"
                    onChange={onRecipientNameChange}
                    type="text"
                    component={renderRecipientNameField}
                    //style={{ width: 200, marginTop: 30 }}
                  />
                  <Field
                    label=""
                    id="recipientPhoneNumber"
                    name="recipientPhoneNumber"
                    onChange={onRecipientPhoneNumberChange}
                    type="text"
                    component={renderRecipientPhoneNumberField}
                    // style={{ width: 400 }}
                  />

                  <Grid
                    container
                    direction="row"
                    style={{ marginTop: 10, width: 600 }}
                  >
                    <Grid item style={{ width: "55%" }}>
                      <Field
                        label=""
                        id="locationCountry"
                        name="locationCountry"
                        type="text"
                        component={renderProductCountryField}
                      />
                    </Grid>
                    <Grid item style={{ width: "40%", marginLeft: 10 }}>
                      <Field
                        label=""
                        id="location"
                        name="location"
                        type="text"
                        component={renderProductLocationField}
                      />
                    </Grid>
                  </Grid>
                  <Field
                    label=""
                    id="recipientAddress"
                    name="recipientAddress"
                    onChange={onRecipientAddressChange}
                    type="text"
                    component={renderRecipientAddressField}
                    style={{ width: 400 }}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{
              width: "34%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Typography
              style={{
                width: 300,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod && (
              <Typography className={classes.bankDetails}>
                Bank: Ecobank; Name: E-Shield Africa Limited; Account number:
                5140090808
              </Typography>
            )}
            {!isOnlinePayment && (
              <Button
                variant="contained"
                className={classes.submitButton}
                onClick={onSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            )}
            {isOnlinePayment &&
              paymentMethod == "card" &&
              !recipientName &&
              !recipientPhoneNumber &&
              !recipientAddress &&
              !country &&
              !location && (
                <Typography className={classes.info}>
                  Please complete the recipient delivery detail form before
                  making payment
                </Typography>
              )}
            {isOnlinePayment &&
              recipientName &&
              recipientPhoneNumber &&
              recipientAddress &&
              country &&
              location &&
              renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid
            item
            container
            style={{
              //width: "60%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Grid item container style={{ marginTop: 20, width: 300 }}>
                <FormLabel
                  style={{
                    color: "blue",
                    marginBottom: 30,
                    marginLeft: 100,
                    fontSize: 20,
                  }}
                  component="legend"
                >
                  Delivery Details
                </FormLabel>
              </Grid>
              <Box
                sx={{
                  width: 350,
                  //height: 450,
                }}
                noValidate
                autoComplete="off"
              >
                <form id="cartUpdateAndDeliveryForm">
                  <Field
                    label=""
                    id="recipient"
                    name="recipient"
                    onChange={onRecipientNameChange}
                    type="text"
                    component={renderRecipientNameField}
                    style={{ width: 250 }}
                  />
                  <Field
                    label=""
                    id="recipientPhoneNumber"
                    name="recipientPhoneNumber"
                    onChange={onRecipientPhoneNumberChange}
                    type="text"
                    component={renderRecipientPhoneNumberField}
                    style={{ width: 250 }}
                  />
                  <Field
                    label=""
                    id="recipientAddress"
                    name="recipientAddress"
                    onChange={onRecipientAddressChange}
                    type="text"
                    component={renderRecipientAddressField}
                    style={{ width: 300, marginTop: 10 }}
                  />

                  <Grid
                    container
                    direction="column"
                    style={{ marginTop: 5, width: 400 }}
                  >
                    <Grid
                      item
                      style={
                        matchesMD
                          ? { width: 365, marginTop: 0, height: 38 }
                          : {
                              width: 350,
                              height: 38,
                              marginTop: 2,
                              marginBottom: 20,
                            }
                      }
                    >
                      <Field
                        label=""
                        id="locationCountry"
                        name="locationCountry"
                        type="text"
                        component={renderProductCountryField}
                      />
                    </Grid>
                    <Grid
                      item
                      style={
                        matchesMD
                          ? { width: 365, marginTop: 0, height: 38 }
                          : { width: 350, height: 38, marghinTop: 5 }
                      }
                    >
                      <Field
                        label=""
                        id="location"
                        name="location"
                        type="text"
                        component={renderProductLocationField}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{
              // width: "34%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Typography
              style={{
                width: 300,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
              }}
            >
              Total Cost:{getCurrencyCode()}
              {totalProductCostForDisplay}
            </Typography>

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod && (
              <Typography className={classes.bankDetails}>
                Bank: Ecobank; Name: E-Shield Africa Limited; Account number:
                5140090808
              </Typography>
            )}
            {!isOnlinePayment && (
              <Button
                variant="contained"
                className={classes.submitButtonMobile}
                onClick={onSubmit}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            )}
            {isOnlinePayment &&
              paymentMethod == "card" &&
              !recipientName &&
              !recipientPhoneNumber &&
              !recipientAddress &&
              !country &&
              !location && (
                <Typography className={classes.info}>
                  Please complete the recipient delivery detail form before
                  making payment
                </Typography>
              )}
            {isOnlinePayment &&
              recipientName &&
              recipientPhoneNumber &&
              recipientAddress &&
              country &&
              location &&
              renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default reduxForm({
  form: "checkoutDeliveryAndPayment",
})(CheckoutDeliveryAndPayment);
