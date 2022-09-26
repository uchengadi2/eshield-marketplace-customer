import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import data from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 190,
    marginTop: 30,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function AddPaymentForm(props) {
  const classes = useStyles();

  const [orderPayment, setOrderPayment] = useState();
  const [operationalCurrency, setOperationalCurrency] = useState();
  const [preferredCurrency, setPreferredCurrency] = useState();
  const [currentPaymentRound, setCurrentPaymentRound] = useState();
  const [operationalCurrencyList, setOperationalCurrencyList] = useState([]);
  const [preferredCurrencyList, setPreferredCurrencyList] = useState([]);
  const [value, setValue] = useState();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/currencies");
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setOperationalCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/currencies");
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setPreferredCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleCurrentPaymentValue = (event) => {
    setValue(event.target.value);
  };

  const handleOrderPaymentChange = (event) => {
    setOrderPayment(event.target.value);
  };

  const handleCurrentPaymentRoundChange = (event) => {
    setCurrentPaymentRound(event.target.value);
    //setValue(event.target.value);
  };

  const handleOperationalCurrencyChange = (event) => {
    setOperationalCurrency(event.target.value);
  };

  const handlePreferredCurrencyChange = (event) => {
    setPreferredCurrency(event.target.value);
  };

  const paymentStatusList = ["pending", "partial", "full"];

  //retrieve all payment status

  const renderPaymentStatusList = () => {
    return paymentStatusList.map((item, index) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  //get the operational currency list
  const renderOperationalCurrencyList = () => {
    return operationalCurrencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the operational currency list
  const renderPreferredCurrencyList = () => {
    return preferredCurrencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderSelectablePaymentPhaseField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box style={{ marginTop: 15 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Choose the agreed payment installments
          </FormLabel>
          <RadioGroup
            aria-label="currentPaymentRound"
            name="currentPaymentRound"
            value={currentPaymentRound}
            onChange={handleCurrentPaymentRoundChange}
            style={{ marginTop: 10 }}
          >
            <Grid item container direction="row">
              <Grid item style={{ width: "34%" }}>
                <FormControlLabel
                  value={"1"}
                  control={<Radio />}
                  label="One Installment"
                />
              </Grid>

              <Grid item style={{ width: "33%" }}>
                <FormControlLabel
                  value={"2"}
                  control={<Radio />}
                  label="Two Installments"
                />
              </Grid>
              <Grid item style={{ width: "33%" }}>
                <FormControlLabel
                  value={"3"}
                  control={<Radio />}
                  label="Three Installments"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderPercentageForThirdPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Third % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.paymentStatus}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderPercentageForSecondPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Second % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.totalAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        // disabled

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAgreedAmountForPaymentField = ({
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
        helperText="Enter Total Amount Agreed for this Order"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.totalAmountExpected - params.totalAmountAlreadyPaid}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderPercentageForInitialPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Initial % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.lastPaymentAmountMade}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderAgreedPaymentCurrencyField = ({
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
            labelId="agreedPaymentCurrency"
            id="agreedPaymentCurrency"
            value={preferredCurrency}
            onChange={handlePreferredCurrencyChange}
            // label="Prefered Currency"
            style={{ marginTop: 10, width: 200 }}
          >
            {renderPreferredCurrencyList()}
          </Select>
          <FormHelperText>Select Agreed Payment Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderForPaymentField = ({
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
            labelId="order"
            id="order"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            // label="Order"
            style={{ marginTop: 10, width: 150 }}
          >
            {renderPaymentStatusList()}
          </Select>
          <FormHelperText>Select Order</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderedCustomerid = ({
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
            labelId="customer"
            id="customer"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            // label="Customer"
            style={{ marginTop: 10, width: 160 }}
          >
            {renderPaymentStatusList()}
          </Select>
          <FormHelperText>Select Customer</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorsForOrderid = ({
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
            labelId="vendor"
            id="vendor"
            value={paymentStatus}
            onChange={handlePaymentStatusChange}
            // label="Vendor"
            style={{ marginTop: 10, width: 180 }}
          >
            {renderPaymentStatusList()}
          </Select>
          <FormHelperText>Select Vendor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Agreed Payment for an Order
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="paymentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 520,
          height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="orderNumber"
              name="orderNumber"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="customer"
              name="customer"
              type="text"
              component={renderOrderedCustomerid}
            />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="vendor"
              name="vendor"
              type="text"
              component={renderVendorsForOrderid}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="agreedPaymentCurrency"
              name="agreedPaymentCurrency"
              type="text"
              component={renderAgreedPaymentCurrencyField}
              style={{ marginTop: 10 }}
            />
          </Grid>

          <Grid item style={{ width: "58%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalAmountForPayment"
              name="totalAmountForPayment"
              type="text"
              component={renderTotalAgreedAmountForPaymentField}
              style={{ marginTop: 10 }}
            />
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: 10, width: "100%" }}>
          <Field
            label=""
            id="currentPaymentRound"
            name="currentPaymentRound"
            type="number"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="percentageForInitialPayment"
              name="percentageForInitialPayment"
              type="number"
              component={renderPercentageForInitialPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="percentageForSecondayment"
              name="percentageForSecondayment"
              type="number"
              component={renderPercentageForSecondPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="percentageForThirdPayment"
              name="percentageForThirdPayment"
              type="number"
              component={renderPercentageForThirdPaymentField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "addPaymentForm",
})(AddPaymentForm);
