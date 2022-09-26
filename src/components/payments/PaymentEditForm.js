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
    width: 100,
    marginLeft: 200,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function PaymentEditForm(props) {
  const classes = useStyles();

  const [orderPayment, setOrderPayment] = useState();
  const [selectedOperationalCurrency, setSelectedOperationalCurrency] =
    useState();
  const [selectedPreferredCurrency, setSelectedPreferredCurrency] = useState();
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const [params, setParams] = useState({});
  const [preferredCurrencyList, setPreferredCurrencyList] = useState([]);
  const [operationalCurrencyList, setOperationalCurrencyList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/payments/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((payment) => {
        console.log("this is the payments:", payment);
        row = {
          id: payment.id,
          orderNumber: payment.order,
          vendor: payment.vendor,
          customer: payment.customer,
          totalAmountExpected: payment.totalAmountExpected,
          totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
          lastPaymentAmountMade: payment.lastPaymentAmountMade,
          lastPaymentRound: payment.lastPaymentRound,
          currentPaymentRound: payment.currentPaymentRound,
          startingPaymentDate: payment.startingPaymentDate,
          lastPaymentDate: payment.lastPaymentDate,
          agreedPaymentCurrency: payment.agreedPaymentCurrency,
          preferredPaymentCurrency: payment.preferredPaymentCurrency,
          paymentStatus: payment.paymentStatus,
          initialPaymentAmountExpected:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountExpected,
          initialPaymentAmountPaid:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountPaid,
          dateInitialPaymentWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateInitialPaymentWasMade,
          initialPaymentStatus:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentStatus,
          secondPaymentAmountExpected:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountExpected,
          secondPaymentAmountPaid:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountPaid,
          dateSecondPaymentWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateSecondPaymentWasMade,
          secondPaymentStatus:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentStatus,
          thirdPaymentAmountExpected:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountExpected,
          thirdPaymentAmountPaid:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountPaid,
          thirdSecondPaymentWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdSecondPaymentWasMade,
          thirdPaymentStatus:
            payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
        };
      });
      setParams(row);
      setSelectedOperationalCurrency(row.agreedPaymentCurrency);
      setSelectedPreferredCurrency(row.preferredPaymentCurrency);
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

  const handleOrderPaymentChange = (event) => {
    setOrderPayment(event.target.value);
  };

  const handlePaymentStatusChange = (event) => {
    setSelectedPaymentStatus(event.target.value);
  };

  const handleOperationalCurrencyChange = (event) => {
    setSelectedOperationalCurrency(event.target.value);
  };

  const handlePreferredCurrencyChange = (event) => {
    setSelectedPreferredCurrency(event.target.value);
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

  const renderOrderForPaymentField = ({
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
        helperText="Order Number"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.orderNumber}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
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
      <TextField
        //error={touched && invalid}
        helperText="Customer that made the Order"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.customer}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
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
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose the payment phase</FormLabel>
          <RadioGroup
            aria-label="currentPaymentRound"
            name="currentPaymentRound"
            value={params.currentPaymentRound}
            onChange={handleOrderPaymentChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Initial Installment Payment"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Second Installment Payment"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Third Installment Payment"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  // const PaymentStatusField = ({
  //   input,
  //   label,
  //   meta: { touched, error, invalid },
  //   type,
  //   id,
  //   ...custom
  // }) => {
  //   return (
  //     <TextField
  //       //error={touched && invalid}
  //       helperText="Payment Status"
  //       variant="outlined"
  //       //label={label}
  //       id={input.name}
  //       value={params.paymentStatus}
  //       fullWidth
  //       //required
  //       type={type}
  //       {...custom}
  //       style={{ marginTop: 10 }}
  //       //disabled

  //       //onChange={handleInput}
  //     />
  //   );
  // };

  const rendertotalExpectedAmountField = ({
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
        helperText="Total Amount Expected"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.totalAmountExpected}
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

  const renderRemainingAmountField = ({
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
        helperText="Remaining Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.totalAmountExpected - params.totalAmountAlreadyPaid}
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

  const renderAmountToBePaidField = ({
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
        helperText="Enter the Amount to be paid"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.lastPaymentAmountMade}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderOperationalCurrencyField = ({
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
            labelId="operationalCurrency"
            id="operationalCurrency"
            value={
              selectedOperationalCurrency
                ? selectedOperationalCurrency
                : params.agreedPaymentCurrency
            }
            onChange={handleOperationalCurrencyChange}
            label="Operational Currency"
            style={{ marginTop: 10, width: 200 }}
          >
            {renderOperationalCurrencyList()}
          </Select>
          <FormHelperText>Select Operational Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentStatusField = ({
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
            labelId="paymentStatus"
            id="paymentStatus"
            value={
              selectedPaymentStatus
                ? selectedPaymentStatus
                : params.paymentStatus
            }
            onChange={handlePaymentStatusChange}
            label="Payment Status"
            style={{ marginTop: 10, width: 150 }}
          >
            {renderPaymentStatusList()}
          </Select>
          <FormHelperText>Select Operational Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPrefferedCurrencyField = ({
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
            labelId="preferredCurrency"
            id="preferredCurrency"
            value={
              selectedPreferredCurrency
                ? selectedPreferredCurrency
                : params.preferredPaymentCurrency
            }
            onChange={handlePreferredCurrencyChange}
            label="Prefered Currency"
            style={{ marginTop: 10, width: 500 }}
          >
            {renderPreferredCurrencyList()}
          </Select>
          <FormHelperText>Select Preferred Currency</FormHelperText>
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
          Order Payment
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="paymentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="orderNumber"
              name="orderNumber"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "57%", marginLeft: 10 }}>
            <Field
              label=""
              id="customer"
              name="customer"
              type="text"
              component={renderOrderedCustomerid}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="preferredCurrency"
          name="preferredCurrency"
          type="text"
          component={renderPrefferedCurrencyField}
          style={{ marginTop: 10 }}
        />
        <Grid item style={{ marginTop: 10 }}>
          <Field
            label=""
            id="currentPaymentRound"
            name="currentPaymentRound"
            type="text"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="paymentStatus"
              name="paymentStatus"
              type="text"
              component={renderPaymentStatusField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalAmountExpected"
              name="totalAmountExpected"
              type="text"
              component={rendertotalExpectedAmountField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="remainingamount"
              name="remainingamount"
              type="text"
              component={renderRemainingAmountField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="operationalCurrency"
              name="operationalCurrency"
              type="text"
              component={renderOperationalCurrencyField}
            />
          </Grid>
          <Grid item style={{ width: "58%", marginLeft: 10 }}>
            <Field
              label=""
              id="amountToBePaid"
              name="amountToBePaid"
              type="number"
              component={renderAmountToBePaidField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Close
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "paymentForm",
})(PaymentEditForm);
