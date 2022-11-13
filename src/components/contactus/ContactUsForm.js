import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function ContactUsForm(props) {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
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
          <Typography variant="h4">Contact Us</Typography>
        </FormLabel>
      </Grid>
      <Box
        // component="form"
        // id="contactUsForm"
        // // onSubmit={onSubmit}
        sx={{
          width: 400,
          height: 340,
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item container direction="row" alignItems="center">
          <Typography variant="h5" style={{ marginTop: 50 }}>
            <span style={{ color: "orange" }}>Address:</span>{" "}
            <span style={{ marginLeft: 10 }}>
              Pearl Garden Estate, Block 9,{" "}
              <span style={{ marginLeft: 100 }}>
                {" "}
                Plot 11, Sangotedo, Lagos{" "}
              </span>{" "}
              {/* <span style={{ marginLeft: 100 }}>
                Estate, Ilasa, Lagos, Nigeria
              </span> */}
            </span>
            <br /> <br />
          </Typography>
          <Typography variant="h5" style={{ marginTop: 10 }}>
            <span style={{ color: "orange" }}>Email:</span>{" "}
            <span style={{ marginLeft: 30 }}>info@eshieldafrica.com </span>
            <br /> <br /> <span style={{ color: "orange" }}>Tel:</span>{" "}
            <span style={{ marginLeft: 50 }}>+234 803 937 3978</span>
            <br /> <br />
            <span style={{ marginLeft: 100 }}>+234 802 469 7155</span>
          </Typography>
        </Grid>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "contactUsForm",
})(ContactUsForm);
