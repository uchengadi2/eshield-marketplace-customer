import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useToken from "../custom-hooks/useToken";
import useUserId from "../custom-hooks/useUserId";
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
import history from "../history";
import data from "./../apis/local";
import UserLogin from "./users/UserLogin";

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
  submitButtonMobile: {
    borderRadius: 10,
    height: 30,
    width: 120,
    marginLeft: 80,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={5}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
    />
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={3}
      {...custom}
      onChange={input.onChange}
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
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={3}
      {...custom}
      onChange={input.onChange}
    />
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
      defaultValue={input.value}
      // {...input}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}

      //onChange={handleInput}
    />
  );
};

function BookingForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
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
  const [sourceCountry, setSourceCountry] = useState();
  const [destinationCountry, setDestinationCountry] = useState();
  const [selectedLogisticInsuranceType, setSelectedLogisticInsuranceType] =
    useState();
  const [sourceState, setSourceState] = useState();
  const [destinationState, setDestinationState] = useState();
  const [sourceCity, setSourceCity] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [sourcePlaceType, setSourcePlaceType] = useState();
  const [destinationPlaceType, setDestinationPlaceType] = useState();
  const [loading, setLoading] = useState(false);

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
      const response = await data.get("/states");
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setSourceStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
    // }, [sourceCountry]);
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
      setDestinationStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
    //}, [destinationCountry]);
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
      setSourceCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
    //}, [sourceState]);
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
      setDestinationCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
    //}, [destinationState]);
  }, []);

  const handleSourcePlaceTypeChange = (event) => {
    setSourcePlaceType(event.target.value);
  };

  const handleDestinationPlaceTypeChange = (event) => {
    setDestinationPlaceType(event.target.value);
  };

  const handleConsignmentLocationChange = (event) => {
    setConsignmentLocation(event.target.value);
  };

  const handleSourceCountryChange = (event) => {
    setSourceCountry(event.target.value);
  };

  const handleDestinationCountryChange = (event) => {
    setDestinationCountry(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    // setSelectedCategory(event.target.value);
  };

  const handleConsignmentSourceCityChange = (event) => {
    setSourceCity(event.target.value);
  };

  const handleConsignmentSourceStateChange = (event) => {
    setSourceState(event.target.value);
    setSourceCityList([]);
  };

  const handleConsignmentSourceCountryChange = (event) => {
    setSourceCountry(event.target.value);
    // setSelectedSourceCountry(event.target.value);

    setSourceStateList([]);
    setSourceCityList([]);
  };

  const handleConsignmentDestinationCityChange = (event) => {
    setDestinationCity(event.target.value);
  };

  const handleConsignmentDestinationStateChange = (event) => {
    setDestinationState(event.target.value);
    setDestinationCityList([]);
  };

  const handleConsignmentDestinationCountryChange = (event) => {
    setDestinationCountry(event.target.value);
    // setSelectedDestinationCountry(event.target.value);
    setDestinationStateList([]);
    setDestinationCityList([]);
  };

  const handleLogisticsInsuranceTypeChange = (event) => {
    setLogisticsInsuranceType(event.target.value);
    // setSelectedLogisticInsuranceType(event.target.value);
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
            style={{ marginTop: 20, width: matchesMD ? 280 : 300 }}
            {...input}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Select Vehicle Category</FormHelperText>
        </FormControl>
      </Box>
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
            value={sourceCity}
            onChange={handleConsignmentSourceCityChange}
            label="Consignment Source City"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
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
            value={destinationCity}
            onChange={handleConsignmentDestinationCityChange}
            label="Consignment Destination City"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
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
            value={sourceState}
            onChange={handleConsignmentSourceStateChange}
            label="Consignment Source State"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
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
            value={destinationState}
            onChange={handleConsignmentDestinationStateChange}
            label="Consignment Destination State"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
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
            value={sourceCountry}
            onChange={handleConsignmentSourceCountryChange}
            label="Consignment Source Country"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
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
            value={destinationCountry}
            onChange={handleConsignmentDestinationCountryChange}
            label="Consignment Destination Country"
            style={{ width: matchesMD ? 150 : 300 }}
            {...input}
          >
            {renderDestinationCountryList()}
          </Select>
          <FormHelperText>Select Destination Country </FormHelperText>
        </FormControl>
      </Box>
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
            value={logisticsInsuranceType}
            onChange={handleLogisticsInsuranceTypeChange}
            label="Logistics Insurance Type"
            style={{ width: matchesMD ? 500 : 300, marginTop: 0 }}
            {...input}
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

  const renderSourcePlaceTypeField = ({
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
            labelId="sourcePlaceType"
            id="sourcePlaceType"
            value={sourcePlaceType}
            onChange={handleSourcePlaceTypeChange}
            label="Source Place Type"
            style={{ width: matchesMD ? 500 : 300, marginTop: 10 }}
            {...input}
          >
            <MenuItem value={"warehouse"}>Warehouse</MenuItem>
            <MenuItem value={"port"}>Port</MenuItem>
            <MenuItem value={"jetty"}>Jetty</MenuItem>
            <MenuItem value={"airport"}>Airport</MenuItem>
            <MenuItem value={"park"}>Park</MenuItem>
            <MenuItem value={"street"}>Street</MenuItem>
            <MenuItem value={"businessPlace"}>Business Premises</MenuItem>
            <MenuItem value={"residentialBuilding"}>
              Residential Building
            </MenuItem>
            <MenuItem value={"school"}>School</MenuItem>
            <MenuItem value={"complex"}>Complex</MenuItem>
            <MenuItem value={"market"}>Market Place</MenuItem>
            <MenuItem value={"placeofWorship"}>Place Of Worship</MenuItem>
            <MenuItem value={"militaryZone"}>Miliatry Place/Zone</MenuItem>
            <MenuItem value={"plantation"}>Plantation</MenuItem>
            <MenuItem value={"farm"}>Farm</MenuItem>
            <MenuItem value={"zoo"}>Zoo</MenuItem>
            <MenuItem value={"barracks"}>Barracks</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
          <FormHelperText>Select the Source Place Type </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDestinationPlaceTypeField = ({
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
            labelId="destinationPlaceType"
            id="destinationPlaceType"
            value={destinationPlaceType}
            onChange={handleDestinationPlaceTypeChange}
            label="Destination Place Type"
            style={{ width: matchesMD ? 500 : 300, marginTop: 10 }}
            {...input}
          >
            <MenuItem value={"warehouse"}>Warehouse</MenuItem>
            <MenuItem value={"port"}>Port</MenuItem>
            <MenuItem value={"jetty"}>Jetty</MenuItem>
            <MenuItem value={"airport"}>Airport</MenuItem>
            <MenuItem value={"park"}>Park</MenuItem>
            <MenuItem value={"street"}>Street</MenuItem>
            <MenuItem value={"businessPlace"}>Business Premises</MenuItem>
            <MenuItem value={"residentialBuilding"}>
              Residential Building
            </MenuItem>
            <MenuItem value={"school"}>School</MenuItem>
            <MenuItem value={"complex"}>Complex</MenuItem>
            <MenuItem value={"market"}>Market Place</MenuItem>
            <MenuItem value={"placeofWorship"}>Place Of Worship</MenuItem>
            <MenuItem value={"militaryZone"}>Miliatry Place/Zone</MenuItem>
            <MenuItem value={"plantation"}>Plantation</MenuItem>
            <MenuItem value={"farm"}>Farm</MenuItem>
            <MenuItem value={"zoo"}>Zoo</MenuItem>
            <MenuItem value={"barracks"}>Barracks</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
          <FormHelperText>Select the Destination Place Type </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    //prepare the data for submission

    setLoading(false);
    const data = {
      orderNumber: Math.floor(Math.random() * 10000000000),
      category: formValues["category"],
      consignmentCountry: formValues["consignmentCountry"],
      destinationCountry: formValues["consignmentDestinationCountry"],
      orderQuantity: formValues["orderQuantity"],
      orderedBy: props.userId,
      logisticsInsurancetype: formValues["logisticsInsuranceType"],
      consignment: {
        name: formValues["consignmentType"],
        description: formValues["consignmentDescription"],
        weight: {
          weight: formValues["consignmentWeight"],
          unit: "",
        },
        owner: formValues["consignmentOwner"],
        type: formValues["consignmentType"],
        quantity: "",
        coverImage: "",
        images: "",
      },
      sourceLocation: {
        sourceName: "",
        sourceDescription: "",
        sourceAddress: formValues["consignmentSourceAddress"],
        sourceCity: formValues["sourceCity"],
        sourceState: formValues["consignmentsourcestate"],
        sourcePlaceType: formValues["sourcePlaceType"],
        sourceCoordinates: [],
        // sourceLatitude: "",
        // sourceLongtitude: "",
        sourceContactPerson: {
          contactPersonName: formValues["sourceContactPersonName"],
          contactPersonPhoneNumber:
            formValues["sourceContactPersonPhoneNumber"],
        },
      },
      destinationLocation: {
        destinationName: "",
        destinationDescription: "",
        destinationAddress: formValues["destinationAddress"],
        destinationCoordinates: [],
        // destinationLatitude: "",
        // destinationLongtitude: "",
        destinationCity: formValues["destinationCity"],
        destinationState: formValues["consignmentDestinationState"],
        destinationPlaceType: formValues["destinationPlaceType"],
        destinationContactPerson: {
          destinationContactPersonName:
            formValues["destinationContactPersonName"],
          destinationContactPersonPhoneNumber:
            formValues["destinationContactPersonPhoneNumber"],
        },
      },
    };
    props.onSubmit(data, props.token);
    setLoading(true);
  };

  const buttonContent = () => {
    return matchesMD ? (
      <React.Fragment>Place Order</React.Fragment>
    ) : (
      <div style={{ fontSize: "0.65rem" }}>Place Order</div>
    );
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: matchesMD ? "1.5em" : "1.15em" }}
          component="legend"
        >
          Order/Booking Details
        </FormLabel>
      </Grid>

      {matchesMD ? (
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
          {/* <Grid container direction="row" style={{ marginTop: 20 }}>
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
        </Grid> */}
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
          <Field
            label=""
            id="sourcePlaceType"
            name="sourcePlaceType"
            type="text"
            component={renderSourcePlaceTypeField}
          />

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
          <Field
            label=""
            id="destinationPlaceType"
            name="destinationPlaceType"
            type="text"
            component={renderSourcePlaceTypeField}
          />
          <FormLabel
            style={{ color: "blue", marginTop: 15, fontSize: "1em" }}
            component="legend"
          >
            Insurance
          </FormLabel>
          <Grid container direction="row" style={{ marginTop: 10 }}>
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="logisticsInsuranceType"
                name="logisticsInsuranceType"
                type="text"
                component={renderLogisticsInsuranceTypeField}
              />
            </Grid>
            {/* <Grid itemstyle={{ width: "30%", marginTop: 30, marginLeft: 10 }}>
            <Field
              label=""
              id="status"
              name="status"
              type="text"
              component={renderOrderStatusField}
            />
          </Grid> */}
          </Grid>

          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            {/* Place Order */}
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>
        </Box>
      ) : (
        <>
          <Box
            component="form"
            id="orderForm"
            // onSubmit={onSubmit}
            sx={{
              width: 300,
              //height: 300,
            }}
            noValidate
            autoComplete="off"
            style={{ marginTop: 20 }}
          >
            {/* <Grid container direction="row" style={{ marginTop: 20 }}>
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
      </Grid> */}

            <Field
              label=""
              id="category"
              name="category"
              type="text"
              component={renderCategoryField}
              // style={{ marginTop: 15 }}
            />
            <Field
              label=""
              id="orderQuantity"
              name="orderQuantity"
              type="number"
              component={renderVehicleQuantityField}
              style={{ marginTop: 20 }}
            />

            <FormLabel
              style={{ color: "blue", marginTop: 15, fontSize: "0.75em" }}
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

            <Field
              label=""
              id="consignmentType"
              name="consignmentType"
              type="text"
              component={renderConsignmentType}
            />
            <Field
              label=""
              id="consignmentWeight"
              name="consignmentWeight"
              type="number"
              component={renderWeightinKg}
            />

            <Field
              label=""
              id="consignmentDescription"
              name="consignmentDescription"
              type="text"
              component={renderConsignmentDescriptionField}
            />
            <FormLabel
              style={{ color: "blue", marginTop: 15, fontSize: "0.75em" }}
              component="legend"
            >
              Enter Consignment Source Location Details
            </FormLabel>

            <Field
              label=""
              id="sourceContactPersonName"
              name="sourceContactPersonName"
              type="text"
              component={renderConsignmentSourceContactPerson}
            />
            <Field
              label=""
              id="sourceContactPersonPhoneNumber"
              name="sourceContactPersonPhoneNumber"
              type="text"
              component={renderConsignmentSourceContactPhoneNumber}
            />

            <Field
              label=""
              id="consignmentSourceAddress"
              name="consignmentSourceAddress"
              type="text"
              component={renderConsignmentLocationAddressField}
            />

            <Field
              label=""
              id="consignmentCountry"
              name="consignmentCountry"
              type="text"
              component={renderConsignmentSourceCountryField}
            />
            <Field
              label=""
              id="consignmentsourcestate"
              name="consignmentsourcestate"
              type="text"
              component={renderConsignmentSourceStateField}
            />
            <Field
              label=""
              id="sourceCity"
              name="sourceCity"
              type="text"
              component={renderConsignmentSourceCityField}
            />

            <Field
              label=""
              id="sourcePlaceType"
              name="sourcePlaceType"
              type="text"
              component={renderSourcePlaceTypeField}
            />

            <FormLabel
              style={{ color: "blue", marginTop: 15, fontSize: "0.75em" }}
              component="legend"
            >
              Enter Consignment Destination Location Details
            </FormLabel>

            <Field
              label=""
              id="destinationContactPersonName"
              name="destinationContactPersonName"
              type="text"
              component={renderConsignmentDestinationContactPerson}
            />
            <Field
              label=""
              id="destinationContactPersonPhoneNumber"
              name="destinationContactPersonPhoneNumber"
              type="text"
              component={renderConsignmentDestinationContactPhoneNumber}
            />

            <Field
              label=""
              id="destinationAddress"
              name="destinationAddress"
              type="text"
              component={renderConsignmentDestinationAddressField}
            />

            <Field
              label=""
              id="consignmentDestinationCountry"
              name="consignmentDestinationCountry"
              type="text"
              component={renderConsignmentDestinationCountryField}
            />
            <Field
              label=""
              id="consignmentDestinationState"
              name="consignmentDestinationState"
              type="text"
              component={renderConsignmentDestinationStateField}
            />
            <Field
              label=""
              id="destinationCity"
              name="destinationCity"
              type="text"
              component={renderConsignmentDestinationCityField}
            />

            <Field
              label=""
              id="destinationPlaceType"
              name="destinationPlaceType"
              type="text"
              component={renderSourcePlaceTypeField}
            />
            <FormLabel
              style={{ color: "blue", marginTop: 15, fontSize: "0.75em" }}
              component="legend"
            >
              Insurance
            </FormLabel>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item style={{ width: "100%" }}>
                <Field
                  label=""
                  id="logisticsInsuranceType"
                  name="logisticsInsuranceType"
                  type="text"
                  component={renderLogisticsInsuranceTypeField}
                />
              </Grid>
              {/* <Grid itemstyle={{ width: "30%", marginTop: 30, marginLeft: 10 }}>
          <Field
            label=""
            id="status"
            name="status"
            type="text"
            component={renderOrderStatusField}
          />
        </Grid> */}
            </Grid>

            <Button
              variant="contained"
              className={classes.submitButtonMobile}
              onClick={props.handleSubmit(onSubmit)}
            >
              {/* Place Order */}
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="text"
                  onClick={() => [
                    props.handleBookingsOpenDialogStatus(),
                    history.push("/"),
                  ]}
                  style={{ marginRight: 50 }}
                >
                  <span style={{ fontSize: 10 }}>Cancel</span>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "orderForm",
})(BookingForm);
