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
import api from "./../../apis/local";
import { CREATE_ORDER } from "../../actions/types";
import CheckoutPage from "./CheckoutPage";
import Paystack from "../../Paystack";

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
    width: 200,
    marginLeft: 70,
    marginTop: 30,
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
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={2}
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

function CheckoutActionPage(props) {
  const { price, productId, token, userId } = props;
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
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [total, setTotal] = useState(
    price
      ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
      : 0
  );
  const [loading, setLoading] = useState();

  console.log("this is the props:", props);

  // //get the currency name
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let allData = [];
  //     api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //     const response = await api.get(`/carts/${props.cartId}`);

  //     const item = response.data.data.data;

  //     console.log("the response is:", item);

  //     allData.push({
  //       id: item[0]._id,
  //       quantity: item[0].quantity,
  //       productLocation: item[0].productLocation,
  //       locationCountry: item[0].locationCountry,
  //       cartHolder: item[0].cartHolder,
  //       recipientName: item[0].recipientName,
  //       recipientPhoneNumber: item[0].recipientPhoneNumber,
  //       recipientAddress: item[0].recipientAddress,
  //       recipientCountry: item[0].recipientCountry,
  //       recipientState: item[0].recipientState,
  //       status: item[0].status,
  //       quantityAdddedToCart: item[0].quantityAdddedToCart,
  //       dateAddedToCart: item[0].dateAddedToCart,
  //     });

  //     if (!allData) {
  //       return;
  //     }

  //     if (allData[0].quantity) {
  //       setProductQuantityInCart(allData[0].quantity);
  //     }
  //     if (allData[0].location) {
  //       setProductLocation(allData[0].location);
  //     }
  //     if (allData[0].locationCountry) {
  //       setProductLocationCountry(allData[0].locationCountry);
  //     }
  //     if (allData[0].cartHolder) {
  //       setCartHolder(allData[0].cartHolder);
  //     }

  //     if (allData[0].id) {
  //       setCartId(allData[0].id);
  //     }

  //     setOrderDetails({
  //       productLocation: allData[0].productLocation,
  //       locationCountry: allData[0].locationCountry,
  //       cartHolder: allData[0].cartHolder,
  //       recipientName: allData[0].recipientName,
  //       recipientPhoneNumber: allData[0].recipientPhoneNumber,
  //       recipientAddress: allData[0].recipientAddress,
  //       recipientCountry: allData[0].recipientCountry,
  //       recipientState: allData[0].recipientState,
  //       quantityAdddedToCart: allData[0].quantityAdddedToCart,
  //       dateAddedToCart: allData[0].dateAddedToCart,
  //     });
  //   };

  //   //call the function

  //   fetchData().catch(console.error);
  // }, []);

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

  const renderMinimumQuantityField = ({
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
        helperText="Minimum Quantity Required(MQR)"
        variant="outlined"
        label={label}
        id={input.name}
        //value={input.value}
        fullWidth
        //required
        type={type}
        {...custom}
        defaultValue={`${props.minimumQuantity} unit(s)`}
        disabled
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

  const renderCheckbox = ({ input, label }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="SomeName"
            value="SomeValue"
            onChange={input.onChange}
          />
        }
        label={label}
      />
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
            label="Account Type"
            style={{ height: 38, width: 300, marginTop: 10, marginLeft: 10 }}
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

  const quantityUnitsForNonBaselineDelivery =
    parseInt(quantity) - parseInt(props.maxmumQuantityForBaselineDelivery);
  const costforNonBaselineDelivery =
    +quantityUnitsForNonBaselineDelivery *
    parseFloat(props.deliveryCostPerUnitWithinProductLocation);
  const totalDeliveryCost =
    +costforNonBaselineDelivery +
    parseFloat(props.baselineDeliveryCostWithinProductLocation);

  const totalProductCost = price * quantity + totalDeliveryCost;
  const totalProductCostForDisplay = totalProductCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalDeliveryCostForDisplay = totalDeliveryCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalProductCost + totalDeliveryCost - 100;
  const amountDue = +totalProductCost + totalDeliveryCost;

  console.log("amount due is:", amountDue);
  console.log("amountForPayment is:", amountForPayment);

  const buttonContent = () => {
    return <React.Fragment>Make Payment</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    if (ordered === true) {
      props.handleFailedSnackbar(
        "This order had already been placed and there is no need for this new request"
      );
      setLoading(false);
      return;
    }

    if (+quantity < +props.minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);
      return;
    }

    if (!paymentMethod) {
      props.handleFailedSnackbar(
        "Please select a Payment Method and try again"
      );
      setLoading(false);
      return;
    }

    let data = {};

    data = {
      orderNumber:
        "OR-" + Math.floor(Math.random() * 100000000000) + "-" + "ES",
      product: props.productId,
      orderedPrice: props.price,
      recipientName: props.recipientName,
      recipientPhoneNumber: props.recipientPhoneNumber,
      recipientAddress: props.recipientAddress,
      recipientCountry: props.recipientCountry,
      recipientState: props.recipientState,
      productLocation: props.location,
      locationCountry: props.locationCountry,
      totalDeliveryCost: totalDeliveryCost,
      totalProductCost: totalProductCost,
      cartId: props.cartId,
      quantityAdddedToCart: props.quantity,
      orderedQuantity: quantity,
      dateAddedToCart: props.dateAddedToCart,
      productCurrency: props.currency,
      paymentMethod: paymentMethod,
      paymentStatus:
        paymentMethod !== "card"
          ? "to-be-confirmed"
          : "paid-but-awaiting-confirmation",

      orderedBy: props.userId,
    };

    if (paymentMethod !== "card") {
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

            props.handleSuccessfulCreateSnackbar(
              `Thank you for the order. We appreciate your patronage!`
            );

            setLoading(false);
            setIsCheckoutVisible(true);
            setOrdered(true);

            //delete the product from the cart
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${props.token}`;
            await api.delete(`/carts/${props.cartId}`);
            //props.handleCartItemForCheckoutBox();
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
      //integrate to paystack payment gateway here
      props.handleFailedSnackbar(
        "We currently do not support payment with Credit or Debit Card, Please select other payment method options and try again"
      );
      setLoading(false);
    }
    return;
  };

  const email = "williams@gmail.com";
  const amount = 3333399;
  const orderNumber = "67990-ert123";

  return (
    <>
      <Typography style={{ width: 300, marginTop: 15, marginLeft: 10 }}>
        Total Product Cost:{props.getCurrencyCode()}
        {total}
      </Typography>
      <Typography style={{ width: 300, marginTop: 15, marginLeft: 10 }}>
        Total Delivery Cost:{props.getCurrencyCode()}
        {totalDeliveryCostForDisplay}
      </Typography>
      <Typography
        style={{ width: 300, fontSize: 20, marginTop: 15, marginLeft: 10 }}
      >
        Total Cost:{props.getCurrencyCode()}
        {totalProductCostForDisplay}
      </Typography>

      {renderPaymentMethodField()}

      {!isOnlinePayment && (
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>
      )}

      {isOnlinePayment && (
        <Paystack
          email={email}
          amount={amount}
          text={"Make Payment2"}
          orderNumber={orderNumber}
        />
      )}
    </>

    // <form id="checkoutActionPage">
    //   <Box
    //     sx={{
    //       width: 200,
    //       //height: 450,
    //     }}
    //     noValidate
    //     autoComplete="off"
    //     className={classes.root}
    //   >
    //     <Grid
    //       item
    //       container
    //       style={{ marginTop: 10, marginBottom: 10 }}
    //       justifyContent="center"
    //     ></Grid>
    //     <Field
    //       label=""
    //       id="minimumQuantity"
    //       name="minimumQuantity"
    //       defaultValue={`${props.minimumQuantity} unit(s)`}
    //       type="text"
    //       component={renderMinimumQuantityField}
    //       style={{ width: 300 }}
    //     />
    //     <Field
    //       label=""
    //       id="quantity"
    //       name="quantity"
    //       defaultValue={quantity}
    //       type="number"
    //       onChange={onChange}
    //       component={renderRequestedQuantityField}
    //       style={{ width: 300, marginTop: 10 }}
    //     />

    //     <Field
    //       label=""
    //       id="paymentMethod"
    //       name="paymentMethod"
    //       type="text"
    //       component={renderPaymentMethodField}
    //       style={{ width: 300 }}
    //     />

    //     {isVisible && !isCheckoutVisible && (
    //       <Button
    //         variant="contained"
    //         className={classes.submitButton}
    //         onClick={props.handleSubmit(onSubmit)}
    //       >
    //         {loading ? (
    //           <CircularProgress size={30} color="inherit" />
    //         ) : (
    //           buttonContent()
    //         )}
    //       </Button>
    //     )}
    //   </Box>
    // </form>
  );
}

export default reduxForm({
  form: "checkoutActionPage",
})(CheckoutActionPage);
