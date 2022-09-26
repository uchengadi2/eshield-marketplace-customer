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

function OrderShowForm(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState("");
  const [country, setCountry] = useState("");
  const [customer, setCustomer] = useState();
  const [category, setCategory] = useState();
  const [logisticInsuranceType, setLogisticInsuranceType] = useState();
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
  const [params, setParams] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sourceCountryList, setSourceCountryList] = useState([]);
  const [destinationCountryList, setDestinationCountryList] = useState([]);
  const [sourceStateList, setSourceStateList] = useState([]);
  const [destinationStateList, setDestinationStateList] = useState([]);
  const [sourceCityList, setSourceCityList] = useState([]);
  const [destinationCityList, setDestinationCityList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSourceCountry, setSelectedSourceCountry] = useState();
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState();
  const [selectedLogisticInsuranceType, setSelectedLogisticInsuranceType] =
    useState();
  const [selectedSourceState, setSelectedSourceState] = useState();
  const [selectedDestinationState, setSelectedDestinationState] = useState();
  const [selectedSourceCity, setSelectedSourceCity] = useState();
  const [selectedDestinationCity, setSelectedDestinationCity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/orders/${props.params.id}`, {
        // params: { id: props.params.id },
      });

      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((order) => {
        row = {
          id: order.id,
          orderNumber: order.orderNumber,
          dateOrdered: order.dateOrdered,
          status: order.status,
          category: order.category,
          consignmentCountry: order.consignmentCountry,
          destinationCountry: order.destinationCountry,
          orderQuantity: order.orderQuantity,
          orderedBy: order.orderedBy,
          remainingOrderedQuantity: order.remainingOrderedQuantity,
          logisticsInsurancetype: order.logisticsInsurancetype,
          consignmentName: order.consignment.name,
          consignmentDescription: order.consignment.description,
          // consignmentWeight: order.consignment.weight.weight,
          consignmentWeight: order.consignment.weight,
          consignmentOwner: order.consignment.owner,
          consignmentType: order.consignment.type,
          consignmentQuantity: order.consignment.quantity,
          consignmentCoverImage: order.consignment.coverImage,
          consignmentImages: order.consignment.images,
          sourceName: order.sourceLocation.sourceName,
          sourceDescription: order.sourceLocation.sourceDescription,
          sourceAddress: order.sourceLocation.sourceAddress,
          sourceLatitude: order.sourceLocation.sourceLatitude,
          sourceLongtitude: order.sourceLocation.sourceLongtitude,
          sourceType: order.sourceLocation.sourceType,
          sourceCity: order.sourceLocation.sourceCity,
          sourceState: order.sourceLocation.sourceState,
          sourcePlace: order.sourceLocation.sourcePlace,
          sourceContactPersonName:
            order.sourceLocation.sourceContactPerson.contactPersonName,
          sourceContactPersonPhoneNumber:
            order.sourceLocation.sourceContactPerson.contactPersonPhoneNumber,
          destinationName: order.destinationLocation.destinationName,
          destinationDescription:
            order.destinationLocation.destinationDescription,
          destinationAddress: order.destinationLocation.destinationAddress,
          destinationLatitude: order.destinationLocation.destinationLatitude,
          destinationLongtitude:
            order.destinationLocation.destinationLongtitude,
          destinationType: order.destinationLocation.destinationType,
          destinationCity: order.destinationLocation.destinationCity,
          destinationState: order.destinationLocation.destinationState,
          destinationPlace: order.destinationLocation.destinationPlace,
          destinationContactPersonName:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonName,
          destinationContactPersonPhoneNumber:
            order.destinationLocation.destinationContactPerson
              .destinationContactPersonPhoneNumber,
        };
      });

      setParams(row);
      setSelectedSourceCountry(row.consignmentCountry);
      setSelectedDestinationCountry(row.destinationCountry);
      setSelectedCategory(row.category);
      setSelectedLogisticInsuranceType(row.logisticsInsurancetype);
      setSelectedSourceState(row.sourceState);
      setSelectedDestinationState(row.destinationState);
      setSelectedSourceCity(row.sourceCity);
      setSelectedDestinationCity(row.destinationCity);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.params.id]);

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

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setSourceCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setDestinationCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/states", {
        params: { country: selectedSourceCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setSourceStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedSourceCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/states", {
        params: { country: selectedDestinationCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setDestinationStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedDestinationCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities", {
        params: { state: selectedSourceState },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setSourceCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedSourceState]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/cities", {
        params: { state: selectedDestinationState },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setDestinationCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedDestinationState]);

  console.log("this is the source country list:", sourceCountryList);

  console.log("this is the destination country list:", destinationCountryList);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleConsignmentLocationChange = (event) => {
    setConsignmentLocation(event.target.value);
  };

  const handleSourceCountryChange = (event) => {
    setSelectedSourceCountry(event.target.value);
  };

  const handleDestinationCountryChange = (event) => {
    setSelectedDestinationCountry(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
    setSelectedCustomer(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const handleConsignmentSourceCityChange = (event) => {
    setSelectedSourceCity(event.target.value);
  };

  const handleConsignmentSourceStateChange = (event) => {
    setSelectedSourceState(event.target.value);
    setSourceCityList([]);
  };

  const handleConsignmentSourceCountryChange = (event) => {
    setConsignmentSourceCountry(event.target.value);
    setSelectedSourceCountry(event.target.value);
    setSourceStateList([]);
    setSourceCityList([]);
  };

  const handleConsignmentDestinationCityChange = (event) => {
    setSelectedDestinationCity(event.target.value);
  };

  const handleConsignmentDestinationStateChange = (event) => {
    setSelectedDestinationState(event.target.value);
    setDestinationCityList([]);
  };

  const handleConsignmentDestinationCountryChange = (event) => {
    setConsignmentDestinationCountry(event.target.value);
    setSelectedDestinationCountry(event.target.value);
    setDestinationStateList([]);
    setDestinationCityList([]);
  };

  const handleLogisticsInsuranceTypeChange = (event) => {
    // setLogisticInsuranceType(event.target.value);
    setSelectedLogisticInsuranceType(event.target.value);
  };

  //get the category list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the customer list
  const renderCustomerList = () => {
    return customerList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the source country list
  const renderSourceCountryList = () => {
    return sourceCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the destination country list
  const renderDestinationCountryList = () => {
    return destinationCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the source country list
  const renderSourceStateList = () => {
    return sourceStateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the destination country list
  const renderDestinationStateList = () => {
    return destinationStateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the source city list
  const renderSourceCityList = () => {
    return sourceCityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the destination city list
  const renderDestinationCityList = () => {
    return destinationCityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  console.log("this is the source city list:", sourceCityList);
  console.log("this is the destinatiob city list:", destinationCityList);
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
            value={selectedCustomer ? selectedCustomer : params.orderedBy}
            onChange={handleCustomerChange}
            label="Customer"
            style={{ width: 290 }}
            disabled
          >
            {renderCustomerList()}
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
            value={selectedCategory ? selectedCategory : params.category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 20, width: 280 }}
          >
            {renderCategoryList()}
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
        helperText="Enter number of vehicle(s) required"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.orderQuantity}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
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
        value={params.sourceAddress}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
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
        value={params.destinationAddress}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
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
            labelId="sourceCity"
            id="sourceCity"
            value={selectedSourceCity ? selectedSourceCity : params.sourceCity}
            onChange={handleConsignmentSourceCityChange}
            label="Consignment Source City"
            style={{ width: 150 }}
          >
            {renderSourceCityList()}
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
            labelId="destinationCity"
            id="destinationCity"
            value={
              selectedDestinationCity
                ? selectedDestinationCity
                : params.destinationCity
            }
            onChange={handleConsignmentDestinationCityChange}
            label="Consignment Destination City"
            style={{ width: 150 }}
          >
            {renderDestinationCityList()}
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
            labelId="scourceState"
            id="sourceState"
            value={
              selectedSourceState ? selectedSourceState : params.sourceState
            }
            onChange={handleConsignmentSourceStateChange}
            label="Consignment Source State"
            style={{ width: 150 }}
          >
            {renderSourceStateList()}
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
            labelId="destinationState"
            id="destinationState"
            value={
              selectedDestinationState
                ? selectedDestinationState
                : params.destinationState
            }
            onChange={handleConsignmentDestinationStateChange}
            label="Consignment Destination State"
            style={{ width: 150 }}
          >
            {renderDestinationStateList()}
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
            labelId="consignmentCountry"
            id="consignmentCountry"
            value={
              selectedSourceCountry
                ? selectedSourceCountry
                : params.consignmentCountry
            }
            onChange={handleConsignmentSourceCountryChange}
            label="Consignment Source Country"
            style={{ width: 150 }}
          >
            {renderSourceCountryList()}
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
            labelId="destinationCountry"
            id="destinationCountry"
            value={
              selectedDestinationCountry
                ? selectedDestinationCountry
                : params.destinationCountry
            }
            onChange={handleConsignmentDestinationCountryChange}
            label="Consignment Destination Country"
            style={{ width: 150 }}
          >
            {renderDestinationCountryList()}
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
        value={params.consignmentType}
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
        value={params.consignmentWeight}
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
        value={params.consignmentDescription}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
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
        value={params.sourceContactPersonName}
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
        value={params.destinationContactPersonName}
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
        value={params.sourceContactPersonPhoneNumber}
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
        value={params.destinationContactPersonPhoneNumber}
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
        value={params.consignmentOwner}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderOrderNumberField = ({
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
            labelId="logisticsinsurancetType"
            id="logisticsinsuranceTtype"
            value={
              selectedLogisticInsuranceType
                ? selectedLogisticInsuranceType
                : params.logisticsInsuranceType
            }
            onChange={handleLogisticsInsuranceTypeChange}
            label="Logistics Insurance Type"
            style={{ width: 290, marginTop: 0 }}
          >
            <MenuItem value={"notApplicable"}>Not Applicable</MenuItem>
            <MenuItem value={"atSourceCountryOnly"}>
              At Source Country Only
            </MenuItem>
            <MenuItem value={"atDestinationCountryOnly"}>
              At Destination Country Only
            </MenuItem>
            <MenuItem value={"fromSourceToDestination"}>
              From Source to Destination Country
            </MenuItem>
          </Select>
          <FormHelperText>Choose preferred Insurance Type </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderStatusField = ({
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
        helperText="Order Status"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.status}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
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
          Order/Booking Details
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
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row" style={{ marginTop: 20 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="orderNumber"
              name="orderNumber"
              type="text"
              component={renderOrderNumberField}
            />
          </Grid>
          <Grid item style={{ width: "55%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentName"
              name="consignmentName"
              type="text"
              component={renderSelectNameField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "51%" }}>
            <Field
              label=""
              id="category"
              name="category"
              type="text"
              component={renderCategoryField}
              // style={{ marginTop: 15 }}
            />
          </Grid>
          <Grid item style={{ width: "43%", marginLeft: 30 }}>
            <Field
              label=""
              id="orderQuantity"
              name="orderQuantity"
              type="number"
              component={renderVehicleQuantityField}
              style={{ marginTop: 20 }}
            />
          </Grid>
        </Grid>

        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1.2em" }}
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
          style={{ marginTop: 15 }}
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
              id="sourceContactPersonName"
              name="sourceContactPersonName"
              type="text"
              component={renderConsignmentSourceContactPerson}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5 }}>
            <Field
              label=""
              id="sourceContactPersonPhoneNumber"
              name="sourceContactPersonPhoneNumber"
              type="text"
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
        <Grid container direction="row" style={{ marginTop: 15 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="consignmentCountry"
              name="consignmentCountry"
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
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="sourceCity"
              name="sourceCity"
              type="text"
              component={renderConsignmentSourceCityField}
            />
          </Grid>
        </Grid>

        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1em" }}
          component="legend"
        >
          Enter Consignment Destination Location Details
        </FormLabel>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "59%" }}>
            <Field
              label=""
              id="destinationContactPersonName"
              name="destinationContactPersonName"
              type="text"
              component={renderConsignmentDestinationContactPerson}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5 }}>
            <Field
              label=""
              id="destinationContactPersonPhoneNumber"
              name="destinationContactPersonPhoneNumber"
              type="text"
              component={renderConsignmentDestinationContactPhoneNumber}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="destinationAddress"
          name="destinationAddress"
          type="text"
          component={renderConsignmentDestinationAddressField}
        />
        <Grid container direction="row" style={{ marginTop: 15 }}>
          <Grid item style={{ width: "33%" }}>
            <Field
              label=""
              id="consignmentDestinationCountry"
              name="consignmentDestinationCountry"
              type="text"
              component={renderConsignmentDestinationCountryField}
            />
          </Grid>
          <Grid item style={{ width: "31%", marginLeft: 10 }}>
            <Field
              label=""
              id="consignmentDestinationState"
              name="consignmentDestinationState"
              type="text"
              component={renderConsignmentDestinationStateField}
            />
          </Grid>
          <Grid item style={{ width: "31%", marginLeft: 10 }}>
            <Field
              label=""
              id="destinationCity"
              name="destinationCity"
              type="text"
              component={renderConsignmentDestinationCityField}
            />
          </Grid>
        </Grid>
        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1em" }}
          component="legend"
        >
          Insurance
        </FormLabel>
        <Grid container direction="row">
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="logisticsInsuranceType"
              name="logisticsInsuranceType"
              type="text"
              component={renderLogisticsInsuranceTypeField}
            />
          </Grid>
          <Grid itemstyle={{ width: "30%", marginTop: 30, marginLeft: 10 }}>
            <Field
              label=""
              id="status"
              name="status"
              type="text"
              component={renderOrderStatusField}
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
  form: "orderForm",
})(OrderShowForm);
