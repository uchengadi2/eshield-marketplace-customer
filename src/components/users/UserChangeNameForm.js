import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField, Typography } from "@material-ui/core";
import background from "./../../logistic_assets/cover_image_1.png";
import history from "./../../history";
import data from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.1rem",
    backgroundColor: theme.palette.common.blue,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  root: {
    maxWidth: 600,
    marginTop: 10,
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "10em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

const renderTextField = ({
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
      helperText={label}
      variant="outlined"
      id={input.name}
      fullWidth
      type={type}
      defaultValue={input.value}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderPhoneNumberField = ({
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
      helperText={label}
      variant="outlined"
      id={input.name}
      fullWidth
      type={type}
      defaultValue={input.value}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const buttonContent = () => {
  return <React.Fragment>Submit</React.Fragment>;
};

const UserChangeNameForm = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(null);

  function telephoneCheck(phoneNumber) {
    var found = phoneNumber.search(
      /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/
    );
    if (found > -1) {
      return true;
    } else {
      return false;
    }
  }

  const onSubmit = (formValues) => {
    setLoading(true);

    const newPhoneNumber = formValues.phoneNumber
      ? formValues.phoneNumber
      : props.user.phoneNumber;

    if (!telephoneCheck(newPhoneNumber)) {
      props.handleFailedSnackbar(
        "Your entered an invalid phone number. Please correct this and try again"
      );
      setLoading(false);

      return;
    }

    const data = {
      name: formValues.name ? formValues.name : props.user.name,
      phoneNumber: formValues.phoneNumber
        ? formValues.phoneNumber
        : props.user.phoneNumber,
    };

    props.onSubmit(props.userId, data, props.existingToken);
    setLoading(false);
  };

  return (
    <Box className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          <Typography variant="h5">Update User Details</Typography>
        </FormLabel>
      </Grid>
      <Box
        component="div"
        id="userChangeNameForm"
        // onSubmit={onSubmit}
        sx={{
          width: 300,
          //height: 200,
        }}
        noValidate
        autoComplete="off"
        // style={{ marginTop: 20 }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Grid item>
            <Field
              label="Name"
              id="name"
              name="name"
              type="text"
              defaultValue={props.user.name}
              component={renderTextField}
              style={{ marginTop: 10, width: 280 }}
            />
          </Grid>
          <Grid item>
            <Field
              label="Phone Number (country code when used should have a space between it and other numbers)"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={props.user.phoneNumber}
              type="text"
              component={renderPhoneNumberField}
              style={{ marginTop: 10, width: 280 }}
            />
          </Grid>
          <Button
            variant="contained"
            className={classes.sendButton}
            onClick={props.handleSubmit(onSubmit)}
            // onClick={() => [
            //   props.handleMakeChangeNameDialogForm(),
            //   props.handleSubmit(onSubmit),

            //   history.push("/profile"),
            // ]}
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

const validate = (formValues) => {
  const errors = {};
  let valid;

  if (!formValues.email) {
    errors.email = "Invalid email";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
  ) {
    errors.email = "Invalid email";
  }

  if (!formValues.password) {
    errors.password = "Please enter your password";
  }

  return errors;
};

export default reduxForm({
  form: "userChangeNameForm",
  validate: validate,
})(UserChangeNameForm);
