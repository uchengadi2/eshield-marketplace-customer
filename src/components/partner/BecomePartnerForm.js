import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";

import data from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 550,
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 150,
    marginTop: 20,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
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

const renderAgreedInitialPercentagePaymentField = ({
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
      helperText="Enter initial % payment"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderAgreedDaysToPaymentRemittanceField = ({
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
      helperText="Days from payment to remittance"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderPlatformPercentageChargeField = ({
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
      helperText="Platform percentage charge"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderAgreedSecondPercentagePaymentField = ({
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
      helperText="Enter second % payment"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderAgreedSecondDaysToPaymentRemittanceField = ({
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
      helperText="Days from payment to remittance"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderSecondPlatformPercentageChargeField = ({
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
      helperText="Platform percentage charge"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderAgreedThirdPercentagePaymentField = ({
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
      helperText="Enter third % payment"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderAgreedThirdDaysToPaymentRemittanceField = ({
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
      helperText="Days from payment to remittance"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderThirdPlatformPercentageChargeField = ({
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
      helperText="Platform percentage charge"
      variant="outlined"
      //label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderNameField = ({
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
      helperText="Enter the name of the Vendor"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderDescriptionField = ({
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
      helperText="Describe the Vendor"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={8}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      fullWidth
      defaultValue={input.value}
      style={{ marginTop: 20 }}
      helperText="Upload Category Image"
      onChange={input.onChange}
    />
  );
};

const renderVendorAddressField = ({
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
      helperText="Enter the Vendor Address Location"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      multiline={true}
      minRows={2}
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderVendorContactNameField = ({
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
      helperText="Enter the contact Person's Name"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderVendorPhoneNumberField = ({
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
      helperText="Enter the contact person's phone numbers"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderVendorEmailAddressField = ({
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
      helperText="Enter the contact Person's email address"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderBankAccountNameField = ({
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
      helperText="Enter the bank account name"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderBankSwiftCodeNumberField = ({
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
      helperText="Enter the bank Swift code"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderBankIBANField = ({
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
      helperText="Enter the bank IBAN number"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderBankNameField = ({
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
      helperText="Enter the bank name"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderBankAccountNumberField = ({
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
      helperText="Enter the bank account number"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

function BecomePartnerForm(props) {
  const classes = useStyles();
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryStateList, setCountryStateList] = useState([]);
  const [stateCityList, setStateCityList] = useState([]);
  const [bankCountry, setBankCountry] = useState("");
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [bankAccountType, setBankAccountType] = useState();
  const [vendorType, setVendorType] = useState();
  const [
    enforceGlobalPlatformPolicyContract,
    setEnforceGlobalPlatformPolicyContract,
  ] = useState("true");
  const [
    permittableMaximumNumberOfPaymentInstallments,
    setPermittableMaximumNumberOfPaymentInstallments,
  ] = useState("1");
  const [loading, setLoading] = useState(false);

  //spool the vendor document & data

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/states");

      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities");
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleVendorTypeChange = (event) => {
    setVendorType(event.target.value);
  };

  const handleLocationCityChange = (event) => {
    setLocationCity(event.target.value);
  };

  const handleLocationStateChange = (event) => {
    setLocationState(event.target.value);
    setCityList([]);
  };

  const handleLocationCountryChange = (event) => {
    setLocationCountry(event.target.value);
    setStateList([]);
    setCityList([]);
  };

  const handleAccountTypeChange = (event) => {
    setBankAccountType(event.target.value);
  };

  const handleBankCountryChange = (event) => {
    setBankCountry(event.target.value);
  };

  const handleGlobalPolicyChange = (event) => {
    setEnforceGlobalPlatformPolicyContract(event.target.value);
  };

  const handleMaximumPaymentInstallmentChange = (event) => {
    setPermittableMaximumNumberOfPaymentInstallments(event.target.value);
  };

  // const newParams = Object.values(params);
  // const contactPersonName = ((params || {}).contactPerson || {})
  //   .contactPersonName;

  // const percentageAmountForThirdInstallmentPayment = (
  //   (params || {}).contract ||
  //   {}.thirdPaymentInstallment ||
  //   {}
  // ).percentageAmountForThirdInstallmentPayment;

  console.log("this is the selected location country:", locationCountry);

  console.log("this is th countrylist:", countryList);
  //get the city list
  const renderCityList = () => {
    return cityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the state list
  const renderStateList = () => {
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

  const renderTypeRadioField = ({
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
          <FormLabel style={{ color: "blue" }} component="legend">
            Vendor Type
          </FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={vendorType}
            onChange={handleVendorTypeChange}
            {...input}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="corporate"
                  control={<Radio />}
                  label="Corporate"
                />
              </Grid>

              <Grid item></Grid>
              <FormControlLabel
                value="individual"
                control={<Radio />}
                label="individual"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderBankCountryField = ({
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
            labelId="backCountry"
            id="bankCountry"
            value={bankCountry}
            onChange={handleBankCountryChange}
            label="Bank Country"
            {...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Bank Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorLocationCityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="city"
            id="city"
            value={locationCity}
            onChange={handleLocationCityChange}
            label="City"
            {...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>Select City</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorLocationStateField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="locationState"
            id="locationState"
            value={locationState}
            onChange={handleLocationStateChange}
            label="State"
            {...input}
          >
            {renderStateList()}
          </Select>
          <FormHelperText>Select State/Region/Province</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorLocationCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="locationCountry"
            id="locationCountry"
            value={locationCountry}
            onChange={handleLocationCountryChange}
            label="Country"
            {...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderBankAccountTypeField = ({
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
            labelId="bankAccountType"
            id="bankAccountType"
            value={bankAccountType}
            onChange={handleAccountTypeChange}
            label="Account Type"
            {...input}
          >
            <MenuItem value={"savings"}>Savings</MenuItem>
            <MenuItem value={"current"}>Current</MenuItem>
            <MenuItem value={"domicilary"}>Domicilary</MenuItem>
          </Select>
          <FormHelperText>Select Account Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderEnforceGlobalPlatformPolicyField = ({
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
          <FormLabel component="legend">
            Enforce Platform Global Policy Contract?
          </FormLabel>
          <RadioGroup
            aria-label="enforceGlobalPlatformPolicyContract"
            name="enforceGlobalPlatformPolicyContract"
            value={enforceGlobalPlatformPolicyContract}
            onChange={handleGlobalPolicyChange}
            {...input}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value={"true"}
                  control={<Radio />}
                  label="Yes"
                />
              </Grid>

              <Grid item></Grid>
              <FormControlLabel
                value={"false"}
                control={<Radio />}
                label="No"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const rendermaxNumberOfPaymentInstallmentAllowed = ({
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
          <FormLabel component="legend">
            Choose maximum number of payment installments
          </FormLabel>
          <RadioGroup
            aria-label="permittableMaximumNumberOfPaymentInstallments"
            name="permittableMaximumNumberOfPaymentInstallments"
            value={permittableMaximumNumberOfPaymentInstallments}
            onChange={handleMaximumPaymentInstallmentChange}
            {...input}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel value={"1"} control={<Radio />} label="One" />
              </Grid>

              <Grid item>
                <FormControlLabel value={"2"} control={<Radio />} label="Two" />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={"3"}
                  control={<Radio />}
                  label="Three"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    setLoading(false);
    const data = {
      vendorNumber: Math.floor(Math.random() * 100000000),
      name: formValues["name"],
      description: formValues["description"] || "",
      type: formValues["vendorType"],
      vendorCountry: formValues["locationCountry"],
      location: {
        locationAddress: formValues["locationAddress"] || "",
        locationCity: formValues["locationCity"],
        locationState: formValues["locationState"],
        locationCountry: formValues["locationCountry"],
        locationCoordinates: [],
        officePhoneNumber: "",
      },
      contactPerson: {
        contactPersonName: formValues["contactPersonName"] || "",
        contactPersonPhoneNumber: formValues["contactPersonPhoneNumber"] || "",
        contactPersonEmailAddress:
          formValues["contactPersonEmailAddress"] || "",
      },
      bankDetails: {
        bankName: formValues["bankName"],
        bankAccountNumber: formValues["bankAccountNumber"],
        bankAccountType: formValues["bankAccountType"],
        bankAccountName: formValues["bankAccountName"],
        bankCountry: formValues["bankCountry"],
        bankAccountSwiftCode: formValues["bankAccountSwiftCode"] || "",
        bankAccountIBAN: formValues["bankAccountIBAN"] || "",
      },
      contract: {
        enforceGlobalPlatformPolicyContract:
          formValues["enforceGlobalPlatformPolicyContract"],
        permittableMaximumNumberOfPaymentInstallments:
          formValues["permittableMaximumNumberOfPaymentInstallments"],
        initialPaymentInstallment: {
          initialPaymentAgreedRemittablePercentage:
            formValues["initialPaymentAgreedRemittablePercentage"] || 0,
          initialPaymentAgreedDaysToPaymentRemittance:
            formValues["initialPaymentAgreedDaysToPaymentRemittance"],
        },
        secondPaymentInstallment: {
          secondPaymentAgreedRemittablePercentage:
            formValues["secondPaymentAgreedRemittablePercentage"] || 0,
          secondPaymentAgreedDaysToPaymentRemittance:
            formValues["secondPaymentAgreedDaysToPaymentRemittance"],
        },
        thirdPaymentInstallment: {
          thirdPaymentAgreedRemittablePercentage:
            formValues["thirdPaymentAgreedRemittablePercentage"] || 0,
          thirdPaymentAgreedDaysToPaymentRemittance:
            formValues["thirdPaymentAgreedDaysToPaymentRemittance"] || 0,
        },
      },
    };

    props.onSubmit(data);
    setLoading(true);
  };

  const buttonContent = () => {
    return <React.Fragment>Submit</React.Fragment>;
  };

  return (
    <div className={classes.root}>
      <form id="vendorCategory" className={classes.formStyles}>
        <Grid container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "blue", fontSize: "1.5em" }}
            component="legend"
          >
            Vendor Details
          </FormLabel>
        </Grid>
        <Box
          sx={{
            width: 550,
            height: 420,
          }}
          noValidate
          autoComplete="off"
        >
          <Field
            label=""
            id="name"
            name="name"
            type="text"
            component={renderNameField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="description"
            name="description"
            type="text"
            component={renderDescriptionField}
          />

          <Grid container direction="column" style={{ marginTop: 30 }}>
            <Grid item>
              <Field
                label=""
                id="vendorType"
                name="vendorType"
                component={renderTypeRadioField}
              />
            </Grid>

            <Grid container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Enter Vendor Contacts
              </FormLabel>
            </Grid>
            <Grid container direction="column" style={{ marginTop: 30 }}>
              <Grid item>
                <Field
                  label=""
                  id="locationAddress"
                  name="locationAddress"
                  type="text"
                  component={renderVendorAddressField}
                />
              </Grid>
              <Grid item container direction="row" style={{ marginTop: 20 }}>
                <Grid item>
                  <Field
                    label=""
                    id="locationCountry"
                    name="locationCountry"
                    component={renderVendorLocationCountryField}
                  />
                </Grid>
                <Grid item style={{ marginLeft: 30 }}>
                  <Field
                    label=""
                    id="locationState"
                    name="locationState"
                    component={renderVendorLocationStateField}
                  />
                </Grid>

                <Grid item style={{ marginLeft: 30 }}>
                  <Field
                    label=""
                    id="locationCity"
                    name="locationCity"
                    component={renderVendorLocationCityField}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: 30 }}>
                <Field
                  label=""
                  id="contactPersonName"
                  name="contactPersonName"
                  component={renderVendorContactNameField}
                />
              </Grid>
              <Grid item container direction="row" style={{ marginTop: 30 }}>
                <Grid item>
                  <Field
                    label=""
                    id="contactPersonPhoneNumber"
                    name="contactPersonPhoneNumber"
                    component={renderVendorPhoneNumberField}
                  />
                </Grid>
                <Grid item style={{ marginLeft: 30, minWidth: "50%" }}>
                  <Field
                    label=""
                    id="contactPersonEmailAddress"
                    name="contactPersonEmailAddress"
                    type="email"
                    component={renderVendorEmailAddressField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
              <FormLabel style={{ color: "blue" }} component="legend">
                Enter Vendor Bank Details
              </FormLabel>
            </Grid>
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountType"
                  name="bankAccountType"
                  component={renderBankAccountTypeField}
                  className={classes.dropDown}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  component={renderBankAccountNumberField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountName"
                  name="bankAccountName"
                  type="text"
                  component={renderBankAccountNameField}
                />
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item style={{ marginTop: 20 }}>
                <Field
                  label=""
                  id="bankCountry"
                  name="bankCountry"
                  component={renderBankCountryField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountSwiftCode"
                  name="bankAccountSwiftCode"
                  type="text"
                  component={renderBankSwiftCodeNumberField}
                />
              </Grid>
              <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
                <Field
                  label=""
                  id="bankAccountIBAN"
                  name="bankAccountIBAN"
                  type="text"
                  component={renderBankIBANField}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="bankName"
                name="bankName"
                type="text"
                component={renderBankNameField}
              />
            </Grid>
            <FormLabel
              style={{ color: "blue", marginTop: 30 }}
              component="legend"
            >
              Vendor Contract
            </FormLabel>

            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="enforceGlobalPlatformPolicyContract"
                name="enforceGlobalPlatformPolicyContract"
                // type="text"
                component={renderEnforceGlobalPlatformPolicyField}
              />
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Field
                label=""
                id="permittableMaximumNumberOfPaymentInstallments"
                name="permittableMaximumNumberOfPaymentInstallments"
                //type="number"
                component={rendermaxNumberOfPaymentInstallmentAllowed}
              />
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Initial Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "44%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="initialPaymentAgreedRemittablePercentage"
                    name="initialPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedInitialPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "53%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="initialPaymentAgreedDaysToPaymentRemittance"
                    name="initialPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedDaysToPaymentRemittanceField}
                  />
                </Grid>
                {/* <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="initialPaymentPlatformPercentageForRetention"
                    name="initialPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderPlatformPercentageChargeField}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Second Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "44%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="secondPaymentAgreedRemittablePercentage"
                    name="secondPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedSecondPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "53%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="secondPaymentAgreedDaysToPaymentRemittance"
                    name="secondPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedSecondDaysToPaymentRemittanceField}
                  />
                </Grid>
                {/* <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="secondPaymentPlatformPercentageForRetention"
                    name="secondPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderSecondPlatformPercentageChargeField}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <FormLabel style={{ marginTop: 20 }} component="legend">
              Third Payment Details
            </FormLabel>
            <Grid item container direction="row">
              <Grid item container direction="row">
                <Grid item style={{ marginTop: 20, width: "44%" }}>
                  <Field
                    label="Enter agreed initial percentage payment"
                    id="thirdPaymentAgreedRemittablePercentage"
                    name="thirdPaymentAgreedRemittablePercentage"
                    type="number"
                    component={renderAgreedThirdPercentagePaymentField}
                  />
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "53%" }}
                >
                  <Field
                    label="Enter agreed number of days to remittance"
                    id="thirdPaymentAgreedDaysToPaymentRemittance"
                    name="thirdPaymentAgreedDaysToPaymentRemittance"
                    type="number"
                    component={renderAgreedThirdDaysToPaymentRemittanceField}
                  />
                </Grid>
                {/* <Grid
                  item
                  style={{ marginLeft: 5, marginTop: 20, width: "31%" }}
                >
                  <Field
                    label="Enter Platform Percentage Charge"
                    id="thirdPaymentPlatformPercentageForRetention"
                    name="thirdPaymentPlatformPercentageForRetention"
                    type="number"
                    component={renderThirdPlatformPercentageChargeField}
                  />
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            {/* Update Vendor */}
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "vendorForm",
})(BecomePartnerForm);
