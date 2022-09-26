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
    width: 150,
    marginLeft: 180,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function OrderForm(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [customer, setCustomer] = useState();
  const [category, setCategory] = useState();
  const [consignmentLocation, setConsignmentLocation] = useState();
  const [consignmentSourceCity, setConsignmentSourceCity] = useState();
  const [consignmentSourceState, setConsignmentSourceState] = useState();
  const [consignmentSourceCountry, setConsignmentSourceCountry] = useState();
  const [consignmentDestinationCity, setConsignmentDestinationCity] =
    useState();
  const [consignmentDestinationState, setConsignmentDestinationState] =
    useState();
  const [consignmentDestinationCountry, setConsignmentDestinationCountry] =
    useState();
  const [logisticsInsuranceType, setLogisticsInsuranceType] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleConsignmentLocationChange = (event) => {
    setConsignmentLocation(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConsignmentSourceCityChange = (event) => {
    setConsignmentSourceCity(event.target.value);
  };

  const handleConsignmentSourceStateChange = (event) => {
    setConsignmentSourceState(event.target.value);
  };

  const handleConsignmentSourceCountryChange = (event) => {
    setConsignmentSourceCountry(event.target.value);
  };

  const handleConsignmentDestinationCityChange = (event) => {
    setConsignmentDestinationCity(event.target.value);
  };

  const handleConsignmentDestinationStateChange = (event) => {
    setConsignmentDestinationState(event.target.value);
  };

  const handleConsignmentDestinationCountryChange = (event) => {
    setConsignmentDestinationCountry(event.target.value);
  };

  const handleLogisticsInsuranceTypeChange = (event) => {
    setLogisticsInsuranceType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/users");
      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push({ id: user._id, name: user.name });
      });
      setCustomerList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/categories");
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const renderSelectNameField = ({
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
            value={customer}
            onChange={handleCustomerChange}
            label="Customer"
            style={{ marginTop: 10, width: 500 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"nigeria"}>Nigeria</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select User/Customer Name</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 10, width: 500 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"nigeria"}>Nigeria</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Vehicle Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVehicleQuantityField = ({
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
        helperText="Enter the number of vehicle(s) you need under this category"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderCountryField = ({
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
            labelId="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={{ marginTop: 10, width: 500 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"nigeria"}>Nigeria</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Country where city is located</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentLocationAddressField = ({
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
        helperText="Enter the source address of this consignment"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 10 }}
        multiline={true}
        minRows={3}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderConsignmentDestinationAddressField = ({
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
        helperText="Enter the destination address of this consignment"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 10 }}
        multiline={true}
        minRows={3}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderConsignmentSourceCityField = ({
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
            labelId="consignmentsourcecity"
            id="consignmentsourcecity"
            value={consignmentSourceCity}
            onChange={handleConsignmentSourceCityChange}
            label="Consignment Source City"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select the Source City </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentDestinationCityField = ({
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
            labelId="consignmentdestinationcity"
            id="consignmentdestinationcity"
            value={consignmentDestinationCity}
            onChange={handleConsignmentDestinationCityChange}
            label="Consignment Destination City"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Destination City </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentSourceStateField = ({
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
            labelId="consignmentcourcestate"
            id="consignmentsourcestate"
            value={consignmentSourceState}
            onChange={handleConsignmentSourceStateChange}
            label="Consignment Source State"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select the Source State </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentDestinationStateField = ({
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
            labelId="consignmentdestinationstate"
            id="consignmentdestinationstate"
            value={consignmentDestinationState}
            onChange={handleConsignmentDestinationStateChange}
            label="Consignment Destination State"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Destination State </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentSourceCountryField = ({
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
            labelId="consignmentsourcecountry"
            id="consignmentsourcecountry"
            value={consignmentSourceCountry}
            onChange={handleConsignmentSourceCountryChange}
            label="Consignment Source Country"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Source Country </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentDestinationCountryField = ({
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
            labelId="consignmentdestinationcountry"
            id="consignmentdestinationcountry"
            value={consignmentDestinationCountry}
            onChange={handleConsignmentDestinationCountryChange}
            label="Consignment Destination Country"
            style={{ width: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Destination Country </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderConsignmentType = ({
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
        helperText="Enter Consignment Type(eg container etc)"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderWeightinKg = ({
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
        helperText="Enter Consignment Weight(in kg)"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderConsignmentDescriptionField = ({
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
        helperText="Describe the consignment"
        label={label}
        id={input.name}
        // value={formInput.description}
        fullWidth
        type={type}
        style={{ marginTop: 10 }}
        multiline={true}
        minRows={5}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderConsignmentSourceContactPerson = ({
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
        helperText="Enter Contact Person Name"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderConsignmentDestinationContactPerson = ({
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
        helperText="Enter Contact Person Name"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderConsignmentSourceContactPhoneNumber = ({
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
        helperText="Enter Contact Person Number"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderConsignmentDestinationContactPhoneNumber = ({
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
        helperText="Enter Contact Person Number"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderConsignmentOwnerField = ({
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
        helperText="Enter the Name of the owner of this Consignment"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderLogisticsInsuranceTypeField = ({
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
            labelId="logisticsinsurancettype"
            id="logisticsinsurancettype"
            value={logisticsInsuranceType}
            onChange={handleLogisticsInsuranceTypeChange}
            label="Logistics Insurance Type"
            style={{ width: 500, marginTop: 10 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"ikeja"}>Ikeja</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Choose preferred Insurance Type </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Enter Order/Booking Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="orderForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row">
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderSelectNameField}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="category"
          name="category"
          type="text"
          component={renderCategoryField}
          style={{ marginTop: 10 }}
        />

        <Field
          label=""
          id="quantity"
          name="quantity"
          type="number"
          component={renderVehicleQuantityField}
          style={{ marginTop: 10 }}
        />
        <FormLabel
          style={{ color: "blue", marginTop: 10, fontSize: "1.2em" }}
          component="legend"
        >
          Enter Consignment Details
        </FormLabel>
        <Field
          label=""
          id="consignmentOwner"
          name="consignmentOwner"
          type="text"
          component={renderConsignmentOwnerField}
          style={{ marginTop: 10 }}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="consignmentType"
              name="consignmentType"
              type="text"
              component={renderConsignmentType}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5 }}>
            <Field
              label=""
              id="consignmentWeight"
              name="consignmentWeight"
              type="number"
              component={renderWeightinKg}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="consignmentDescription"
          name="consignmentDescription"
          type="text"
          component={renderConsignmentDescriptionField}
        />
        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1em" }}
          component="legend"
        >
          Enter Consignment Source Location Details
        </FormLabel>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "59%" }}>
            <Field
              label=""
              id="consignmentSourceContactPerson"
              name="consignmentSourceContactPerson"
              type="text"
              component={renderConsignmentSourceContactPerson}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5 }}>
            <Field
              label=""
              id="consignmentSourceContactPhoneNumber"
              name="consignmentSoyrceContactPhoneNumber"
              type="number"
              component={renderConsignmentSourceContactPhoneNumber}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="consignmentSourceAddress"
          name="consignmentSourceAddress"
          type="text"
          component={renderConsignmentLocationAddressField}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "33%" }}>
            <Field
              label=""
              id="consignmentsourcecountry"
              name="consignmentsourcecountry"
              type="text"
              component={renderConsignmentSourceCountryField}
            />
          </Grid>

          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentsourcestate"
              name="consignmentsourcestate"
              type="text"
              component={renderConsignmentSourceStateField}
            />
          </Grid>
          <Grid item style={{ width: "30%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentsourcecity"
              name="consignmentsourcecity"
              type="text"
              component={renderConsignmentSourceCityField}
            />
          </Grid>
        </Grid>

        <FormLabel
          style={{ color: "blue", marginTop: 10, fontSize: "1em" }}
          component="legend"
        >
          Enter Consignment Destination Location Details
        </FormLabel>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "59%" }}>
            <Field
              label=""
              id="consignmentDestinationContactPerson"
              name="consignmentDestinationContactPerson"
              type="text"
              component={renderConsignmentDestinationContactPerson}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5 }}>
            <Field
              label=""
              id="consignmentDestinationContactPhoneNumber"
              name="consignmentDestinationContactPhoneNumber"
              type="number"
              component={renderConsignmentDestinationContactPhoneNumber}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="consignmentDestinationAddress"
          name="consignmentDestinationAddress"
          type="text"
          component={renderConsignmentDestinationAddressField}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "33%" }}>
            <Field
              label=""
              id="consignmentdestinationcountry"
              name="consignmentdestinationcountry"
              type="text"
              component={renderConsignmentDestinationCountryField}
            />
          </Grid>

          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentdestinationstate"
              name="consignmentdestinationstate"
              type="text"
              component={renderConsignmentDestinationStateField}
            />
          </Grid>
          <Grid item style={{ width: "30%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentdestinationcity"
              name="consignmentdestinationcity"
              type="text"
              component={renderConsignmentDestinationCityField}
            />
          </Grid>
        </Grid>
        <FormLabel
          style={{ color: "blue", marginTop: 10, fontSize: "1em" }}
          component="legend"
        >
          Insurance
        </FormLabel>
        <Field
          label=""
          id="logisticsinsurancetype"
          name="logisticsinsurancetype"
          type="text"
          component={renderLogisticsInsuranceTypeField}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Place Order
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "orderForm",
})(OrderForm);
